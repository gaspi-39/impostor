import { Server } from "socket.io"
import SocketManager from "./sockets/socketManager.js" // Importamos nuestro Gerente

const io = new Server(3000, {
	cors: { origin: "*" },
})

const socketManager = new SocketManager(io)
process.on("uncaughtException", (error) => {
	console.error("Ocurrió un error inesperado:", error)
	// Aquí podrías enviar un log a un servicio externo
})

console.log("Servidor iniciado en el puerto 3000")
