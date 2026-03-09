import { roles } from "../service/impostor.service.js"

export default class GameHandler {
	constructor(io, socket, salas) {
		this.io = io
		this.socket = socket
		this.salas = salas
		this.registrarEventos()
	}

	registrarEventos() {
		this.socket.on("crear_sala", (datos) => this.crearSala(datos))
		this.socket.on("unirse_sala", (datos) => this.unirseSala(datos))
		this.socket.on("empezar_juego", () => this.empezarJuego())
	}

	crearSala(datos) {
		const codigoSala = Math.random().toString(36).substring(2, 6).toUpperCase()
		const { nombre } = datos
		this.salas[codigoSala] = {
			host: this.socket.id,
			estado: "lobby",
			jugadores: [{ id: this.socket.id, nombre: nombre, rol: null }],
		}

		this.socket.join(codigoSala)
		this.socket.emit("sala_creada", {
			codigoSala,
			jugadores: this.salas[codigoSala].jugadores,
		})
		console.log(`Sala ${codigoSala} creada por ${datos.nombre}`)
	}

	unirseSala(datos) {
		const { codigoSala, nombre } = datos

		if (this.salas[codigoSala]) {
			this.salas[codigoSala].jugadores.push({
				id: this.socket.id,
				nombre: nombre,
				rol: null,
			})
			this.socket.join(codigoSala)

			this.io
				.to(codigoSala)
				.emit("jugador_unido", this.salas[codigoSala].jugadores)
			console.log(`${nombre} se unió a ${codigoSala}`)
		} else {
			this.socket.emit("error_sala", { mensaje: "La sala no existe" })
		}
	}
	empezarJuego() {
		const salasJugador = Array.from(this.socket.rooms) // devuelve un set con la id y la sala en la que está
		const codigoSala = salasJugador.find((sala) => sala !== this.socket.id)
		if (this.socket.id === this.salas[codigoSala].host) {
			this.salas[codigoSala].estado = "Juego"
			let i = 0
			const rol = roles(this.salas[codigoSala].jugadores.length)
			this.salas[codigoSala].jugadores.forEach((j) => {
				j.rol = rol[i]
				this.io.to(j.id).emit("rol_asignado", {
					rol: j.rol,
					mensaje:
						j.rol === "Impostor" ?
							"¡Shhh! Elimina a la tripulación."
						:	"sobrevive.",
				})
				i++
			})
			console.log(this.salas[codigoSala])
		} else {
			this.socket.emit("error_sala", {
				mensaje: "No autorizado, no tienes permisos o hay pocos jugadores",
			})
		}
	}
}
