# TesisPregrado

Este es el repositorio de la Tesis de Pregrado de Jorge Adrian Martinez Gomez, titulada "Prototipo web de un sistema de recomendación para la compra de computadores portátiles.".

Odyssey es un prototipo web desarrollado como parte de una tesis de grado en Ingeniería en Sistemas. Su propósito es asistir a los usuarios en la compra de computadores portátiles, realizando recomendaciones inteligentes basadas en sus necesidades mediante modelos de inteligencia artificial.

Para probar la ejecucion del prototipo odyssey se necesita tener los siguientes prerequisitos: 

## Requisitos Previos

- Tener instalado [Docker](https://www.docker.com/)

## Cómo Ejecutar el Proyecto
- Construir la imagen:
-> docker build -t nextjs-bun-app .

- Correr el contenedor:
-> docker run -p 3000:3000 --rm nextjs-bun-app
