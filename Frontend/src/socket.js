import { io } from "socket.io-client";

// Reemplaza con la URL y puerto exacto que use tu backend (ej. 8080 o 3000)
const URL = "http://localhost:8080";

export const socket = io(URL, {
  autoConnect: false, // Lo conectaremos manualmente cuando el usuario entre
});
