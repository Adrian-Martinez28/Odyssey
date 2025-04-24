import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { Paper, ScrollArea, Stack, TextInput, Text, Image, } from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from 'react-markdown';
import { LoadingAnimation } from './LoadingAnimation';

interface ChatProps {
  answers: Record<number, string>;
}

export default function Chat({ answers }: ChatProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: "Hola soy Odyssey, estoy analizando tus respuestas para recomendarte los mejores portátiles..."
      }
    ]
  });

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchRecommendations = async () => {
      try {
        hasFetched.current = true;

        // First fetch questions to get context
        const questionsResponse = await fetch('/api/generate-questions');
        if (!questionsResponse.ok) throw new Error('Error al obtener preguntas');
        const questions = await questionsResponse.json();

        // Create context object mapping questions to answers
        const context = questions.reduce((acc: Record<string, any>, q: any) => {
          acc[q.id] = {
            question: q.question,
            answer: answers[q.id]
          };
          return acc;
        }, {});

        const response = await fetch('/api/get-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers,
            context
          })
        });

        if (!response.ok) throw new Error('Error al obtener recomendaciones');

        const { recommendations } = await response.json();

        if (!recommendations.length) {
          setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Lo siento, no encontré portátiles que coincidan con tus criterios. ¿Podrías ajustar tu presupuesto o requisitos?'
          }]);
          return;
        }

        const recommendationsMessage = {
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          content: `Basado en tus respuestas, aquí están mis mejores recomendaciones:\n\n${recommendations.map((pc: any, index: number) =>
            `${index + 1}. ${pc.name}\n` +
            `   • Precio: ${pc.price.toLocaleString()} COP\n` +
            `   • Procesador: ${pc.processor}\n` +
            `   • RAM: ${pc.ram}\n` +
            `   • Pantalla: ${pc.screen_size}\n` +
            `   • Gráficos: ${pc.graphics ?? "Sin Informacion"}\n` +
            `   • Más info: [Ver product](${pc.link})\n` +
            `   ![${pc.name}](${pc.image})\n`
          ).join('\n')
            }\n\n¿Qué te parecen estas opciones? Puedes preguntarme más detalles sobre cualquiera de ellas.`
        };

        setMessages(prev => [...prev, recommendationsMessage]);

      } catch (err) {
        hasFetched.current = false;  // Reset in case of error to allow retry
        setError('Error al obtener recomendaciones. Por favor, intenta de nuevo.');
        console.error('Error fetching recommendations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [answers]);

  if (error) {
    return (
      <Text c="red" ta="center">{error}</Text>
    );
  }

  const MessageContent = ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <Text
              c="white"
              style={{
                whiteSpace: 'pre-line',
                lineHeight: 1.6,
                fontFamily: 'inherit',
                marginBottom: '1rem',
              }}
            >
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <ul style={{ color: 'white', marginBottom: '1rem', paddingLeft: '1.2rem' }}>
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li style={{ color: 'white', marginBottom: '0.5rem', lineHeight: 1.5 }}>
              {children}
            </li>
          ),
          img: ({ src, alt }) => (
            <Image src={src || ''} alt={alt || 'Imagen'} width={300} radius="md" mb="md" />
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };



  return (
    <Stack h="100%" gap="md">
      <ScrollArea
        h="calc(100vh - 300px)"
        type="hover"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
        }}
      >
        <Stack p="md" gap="lg" w="100%">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                minHeight: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoadingAnimation
                text="Analizando tus respuestas..."
                messages={[
                  "Analizando tus respuestas...",
                  "Buscando los mejores portátiles...",
                  "Comparando especificaciones...",
                  "Verificando disponibilidad...",
                  "Preparando recomendaciones personalizadas..."
                ]}
              />
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.filter((m) => m.role !== "system").map((message) => (
                <motion.div
                  key={message.id || crypto.randomUUID()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent:
                      message.role === "assistant" ? "flex-start" : "flex-end",
                  }}
                >
                  <Paper
                    p="md"
                    radius="lg"
                    style={{
                      backgroundColor:
                        message.role === "assistant"
                          ? "rgba(26, 35, 66, 0.9)"
                          : "rgba(66, 99, 235, 0.9)",
                      maxWidth: "80%",
                      width: "fit-content",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <MessageContent content={message.content} />
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </Stack>
      </ScrollArea>

      {!isLoading && (
        <Stack
          gap="xs"
          p="md"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: '12px',
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              size="lg"
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              radius="xl"
              styles={{
                input: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:focus": {
                    borderColor: "rgba(66, 99, 235, 0.5)",
                  }
                },
              }}
            />
          </form>
        </Stack>
      )}
    </Stack>
  );
}
