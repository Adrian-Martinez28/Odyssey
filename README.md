# Tesis de Pregrado

Este es el repositorio de la Tesis de Pregrado de **Jorge Adrián Martínez Gómez**, titulada:

> **"Prototipo web de un sistema de recomendación para la compra de computadores portátiles."**

Odyssey es un prototipo web desarrollado como parte de una tesis de grado en Ingeniería en Sistemas. Su propósito es asistir a los usuarios en la compra de computadores portátiles, realizando recomendaciones inteligentes basadas en sus necesidades mediante modelos de inteligencia artificial.

---

## Requisitos Previos

- Tener instalado [Docker](https://www.docker.com/)

---

## ⚙️ Cómo Ejecutar el Proyecto

### 1. Construir la imagen Docker

```bash
docker build -t nextjs-bun-app .
```

### 2. Ejecutar el contenedor

```bash
docker run -p 3000:3000 --rm nextjs-bun-app
```

Esto iniciará la aplicación en `http://localhost:3000`.

---

## 📁 Contenido del Repositorio

### `/app`
Contiene el núcleo de la aplicación web:

- **`/api`**: Módulos que procesan lógica del sistema:
  - `chat/route.ts`: Gestión de mensajes del usuario y respuestas de IA.
  - `generate-questions/route.ts`: Generación dinámica de preguntas.
  - `get-recommendations/route.ts`: Lógica de recomendación.

- **`/components`**: Componentes visuales reutilizables (Chat, animaciones, etc.).

- **`/data/questions.ts`**: Contiene la pregunta base del sistema de recomendación(Presupuesto).

- **`layout.tsx`**: Estructura visual global de la app.

- **`page.tsx`**: Página principal de la aplicación.

### `/lib`
Funciones auxiliares como:

- `get-supabase.ts`: Conexión a Supabase.
- `utils.ts`: Contiene funciones auxiliares. Actualmente implementa parseBudgetRange, una función que extrae el valor máximo de presupuesto desde una cadena de texto, convirtiéndolo en número entero para ser usado en las recomendaciones.

### `/types`

- `database.ts`: Tipado personalizado en TypeScript para la base de datos.

### `/public`

Archivos estáticos accesibles desde el navegador:

- `favicon.svg`, `Fondo.png`, `Logo Odyssey.svg`, `Personaje.png`, etc.

### Archivos Clave

- `Dockerfile`: Instrucciones para construir la imagen Docker.
- `package.json`: Dependencias y scripts del proyecto.
- `bun.lockb`: Lockfile generado por Bun.
- `.env`: Variables de entorno (no se incluye en el repositorio).
- `.gitignore`: Archivos ignorados por Git.
- `ai-sdk.md`: Notas sobre integración de IA.
- `tsconfig.json`: Configuración de TypeScript.
- `theme.ts`: Tema de estilos globales.
- `README.md`: Este archivo.

---

## 🧑‍💻 Autor

**Jorge Adrián Martínez Gómez**  
Estudiante de Ingeniería en Sistemas  
Correo: `tu-correo@ejemplo.com`

---

## 📩 Nota para Evaluación

Para poder acceder al sistema desplegado en Railway o activar la base de datos, por favor comunicarse por correo con el autor. La app puede requerir activación previa.

---

## 📄 Licencia

Este proyecto es académico y no tiene fines comerciales.

