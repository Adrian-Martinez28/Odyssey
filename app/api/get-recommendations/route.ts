import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/get-supabase';
import { parseBudgetRange } from '../../../lib/utils';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { answers, context } = await req.json();
    // Get budget from the first question (ID: 1001)
    const budgetAnswer = answers[1001];
    const { max: maxBudget } = parseBudgetRange(budgetAnswer);

    // Get laptops within budget (up to max)
    const { data: laptops, error } = await supabase
      .from('laptops')
      .select('*')
      .lte('price', maxBudget)
      .gte('price', maxBudget * 0.3)
      .limit(35)
      .order('price', { ascending: false });
    

    if (error) throw error;
    if (!laptops?.length) {
      return NextResponse.json({ 
        recommendations: [] 
      }, { status: 200 });
    }

    // Enhanced prompt with question context
    console.log('Context:', Object.entries(context).map(([_, data]: [string, any]) => 
  `Question: ${data.question}\nAnswer: ${data.answer}`
).join('\n\n'));
    const prompt = `Based on the following user responses:
${Object.entries(context).map(([_, data]: [string, any]) => 
  `Question: ${data.question}\nAnswer: ${data.answer}`
).join('\n\n')}

Please analyze these computers and rank them from best to worst match, considering the user's needs. Skip any duplicate PCs.
Return ONLY a comma-separated list of IDs in order of best to worst match.

Available computers:
${laptops.map(l => `${JSON.stringify(l)}`).join('\n')}`;

    const { text: rankingResponse } = await generateText({
      model: google("gemini-2.0-flash-thinking-exp-01-21"),
      prompt,
      temperature: 0.3,
      maxTokens: 100_000,
    });

    console.log('Ranking response:', rankingResponse);  
    

    // Parse ranked IDs
    const rankedIds = rankingResponse
      .replace(/\s/g, '')
      .split(',')
      .map(id => Number.parseInt(id))
      .filter(id => !Number.isNaN(id));

    // Get top 5 recommended laptops in ranked order
    const recommendations = rankedIds
      .slice(0, 5)
      .map(id => laptops.find(l => Number.parseInt(l.id) === id))
      .filter(Boolean);

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ 
      error: "Error al obtener recomendaciones." 
    }, { status: 500 });
  }
}
