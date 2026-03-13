import { Server } from "socket.io"
import SocketManager from "./sockets/socketManager.js" // Importamos nuestro Gerente
const PORT = process.env.PORT || 3000
const io = new Server(PORT, {
	cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173" },
})

const socketManager = new SocketManager(io)
process.on("uncaughtException", (error) => {
	console.error("Ocurrió un error inesperado:", error)
	// Aquí podrías enviar un log a un servicio externo
})

console.log("Servidor iniciado en el puerto 3000")
