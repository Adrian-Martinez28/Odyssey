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
- `utils.ts`: Contiene funciones auxiliares.

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

Para acceder al sistema desplegado, visita el siguiente enlace:

🔗 [https://odyssey-production-8859.up.railway.app/](https://odyssey-production-8859.up.railway.app/)

Si necesita activar la base de datos o hay algún problema de conexión, por favor comunicarse con el autor al correo:

📧 **jorge.adrian.martinez@correounivalle.edu.co**

La aplicación puede requerir activación previa desde Railway para su correcto funcionamiento.








