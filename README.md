\# Chatbot MERN



Proyecto de chatbot desarrollado con el stack MERN completo.



\## 🛠️ Stack Tecnológico



\- \*\*MongoDB\*\* v8.2.6 — Base de datos NoSQL

\- \*\*Express.js\*\* v4.x — Servidor backend API REST

\- \*\*React.js\*\* v18.x + Vite — Interfaz frontend

\- \*\*Node.js\*\* v24.14.0 — Entorno de ejecución



\## Estructura del Proyecto

```

chatbot-mern/

├── server/          ← Backend Express + Mongoose

│   ├── index.js

│   └── package.json

└── client/          ← Frontend React + Vite

&#x20;   ├── src/

&#x20;   │   ├── App.jsx

&#x20;   │   └── App.css

&#x20;   └── package.json

```



\## Instalación y Uso



\### 1. Clonar el repositorio

```bash

git clone https://github.com/Leinnerf/chatbot-mern.git
 
cd chatbot-mern

```



\### 2. Instalar dependencias

```bash

\# Dependencias raíz

npm install



\# Dependencias del servidor

cd server \&\& npm install



\# Dependencias del cliente

cd ../client \&\& npm install

```



\### 3. Configurar variables de entorno

Crear archivo `server/.env`:

```

PORT=5000

MONGO\_URI=mongodb://127.0.0.1:27017/chatbot\_db

NODE\_ENV=development

```



\### 4. Iniciar el proyecto

```bash

npm run dev

```



\- Frontend: http://localhost:3000

\- Backend: http://localhost:5000/api/health



\## ⚙️ Requisitos Previos

\- Node.js v24.x

\- MongoDB v8.x corriendo como servicio

\- npm v11.x

```

