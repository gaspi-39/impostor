import GameHandler from "./socketHandler.js"

export default class SocketManager {
	constructor(io) {
		this.io = io
		this.salas = {} // ¡Aquí vive el estado de todas las partidas!
		this.iniciarListeners()
	}

	iniciarListeners() {
		this.io.on("connection", (socket) => {
			console.log(`Jugador conectado: ${socket.id}`)

			// Por cada jugador que entra, le asignamos un "Controlador de Juego"
			// Le pasamos io, el socket del jugador, y la referencia a las salas
			new GameHandler(this.io, socket, this.salas)

			socket.on("disconnect", () => {
				console.log(`Jugador desconectado: ${socket.id}`)
				// Aquí luego podemos poner lógica para sacarlo de su sala
			})
		})
	}
}
