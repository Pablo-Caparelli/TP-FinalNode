📡 Chat App - Backend (Node + Express + MongoDB + Socket.io)

Este proyecto es un backend de una aplicación de chat en tiempo real desarrollado con Node.js, Express, MongoDB y Socket.io, con validaciones usando Zod y configuración de entorno con dotenv.

🚀 Tecnologías utilizadas
Node.js
Express.js
MongoDB + Mongoose
Socket.io
Zod (validaciones)
dotenv
CORS

📌 Requisitos previos
Tener MongoDB instalado y corriendo localmente
Tener Node.js instalado

📦 Instalación

1. Clonar el repositorio
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo

2. Instalar dependencias
   npm install

3. Crear archivo .env

Crear un archivo .env en la raíz del proyecto:
PORT=1234
MONGO_URL=mongodb://127.0.0.1:27017/db_tpfinal_node
CLIENT_URL=http://localhost:5173

4. Ejecutar el servidor
   npm run dev

Servidor corriendo en:
http://localhost:1234

🧠 Estructura del proyecto
src/
│
├── config/
├── controllers/
├── models/
├── routes/
├── validators/
├── middlewares/
└── server.js

📌 Endpoints de la API
👤 USERS
➕ Crear usuario
POST /users
Body:
{
"name": "Juan",
"email": "juan@mail.com"
}
Response:
{
"success": true,
"data": { ...user }
}
📥 Obtener usuarios
GET /users
❌ Eliminar usuario
DELETE /users/:id
✏️ Actualizar usuario
PUT /users/:id
💬 CHATS
➕ Crear chat
POST /chats
Body:
{
"user1": "id1",
"user2": "id2"
}
📥 Obtener chats
GET /chats
📨 MESSAGES
➕ Enviar mensaje
POST /messages
Body:
{
"text": "Hola!",
"userId": "idUsuario",
"chatId": "idChat"
}
📥 Obtener mensajes por chat
GET /messages/chat/:chatId
✏️ Editar mensaje
PUT /messages/:id
❌ Eliminar mensaje
DELETE /messages/:id

🔌 Socket.io (tiempo real)
Eventos implementados:
📤 enviar mensaje
socket.emit("enviar_mensaje", data);
📥 recibir mensaje
socket.on("recibir_mensaje", data);
📂 unirse a chat
socket.emit("join_chat", chatId);

⚙️ Middleware de errores
Se implementó un middleware global:
errorHandler(err, req, res, next)

Formato de respuesta:
{
"success": false,
"message": "Error interno del servidor"
}

🧪 Validaciones (Zod)

Se usa Zod para validar:

Usuarios
Mensajes
Chats

Ejemplo:
userSchema.safeParse(req.body)

🌐 Conexión con frontend (React)

El frontend consume la API usando:
axios.get("http://localhost:1234/users")
axios.post("http://localhost:1234/messages", payload)

Socket.io:
const socket = io("http://localhost:1234");

📌 Notas
Base de datos: MongoDB local
Puerto configurable con .env
Proyecto preparado para producción básica

📌 Variables de entorno
PORT → Puerto del servidor
MONGO_URL → Conexión a MongoDB
CLIENT_URL → Frontend permitido en CORS

✨ Bonus implementados
✔ Socket.io (tiempo real)
✔ Zod validation
✔ Error handler middleware
✔ dotenv
✔ CRUD completo
✔ Arquitectura separada (controllers, routes, models)

👨‍🎓 Créditos
Nombre: Pablo Caparelli
TP Final Desarrollo con Node
Diplomatura en Professional Full-Stack Developer
Comisión 999201567
