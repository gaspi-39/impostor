import { Server } from "socket.io"
import SocketManager from "./sockets/socketManager.js" // Importamos nuestro Gerente
const PORT = process.env.PORT || 3000
const io = new Server(PORT, {
	cors: { origin: "*" },
})

const socketManager = new SocketManager(io)
process.on("uncaughtException", (error) => {
	console.error("Ocurrió un error inesperado:", error)
	// Aquí podrías enviar un log a un servicio externo
})

console.log(`Server running on ${PORT}`)
