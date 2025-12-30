import { Jugador, Partida } from "../models/partida.model.js"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

export let partidaActual = null

export const ImpostorService = {
	create(cantidad) {
		let jugadores = []
		const data = this.read()
		const indice = this.randomInt(data.futbol.length)

		for (let i = 0; i < cantidad; i++) {
			const jugador = this.createplayers(indice)
			jugadores.push(jugador)
		}
		const partida = new Partida(jugadores)
		const impostor = this.randomInt(jugadores.length)
		partida.jugadores[impostor].rol = "impostor"
		console.log(partida.jugadores)
		partidaActual = partida
		return partida
	},
	createplayers(indice) {
		const shortId = uuidv4().slice(0, 4)
		const data = this.read()
		const jugador = new Jugador(shortId, data.futbol[indice])
		return jugador
	},
	showRol(id) {
		const rol = partidaActual.jugadores.find((j) => j.id === id)
		return rol.rol
	},
	read() {
		try {
			const __filename = fileURLToPath(import.meta.url)
			const __dirname = path.dirname(__filename)
			const filepath = path.join(__dirname, "db.json")
			const data = fs.readFileSync(filepath, "utf-8")
			return JSON.parse(data)
		} catch (error) {
			console.error("No se encontro datos", error)
			return
		}
	},
	randomInt(max) {
		return Math.floor(Math.random() * max)
	},
}
