import { ImpostorService } from "../service/impostor.service.js"

export const ImpostorController = {
	create(req, res) {
		const { cantidad } = req.params
		const numero = Number(cantidad)
		if (cantidad < 3) {
			return res.status(400).json({ error: "Muy pocos jugadores" })
		}

		const partida = ImpostorService.create(numero)
		const tokens = partida.jugadores.map((j) => j.id)
		// const links = tokens.map(
		// 	(t) => `https://api-impostor-game.onrender.com/impostor/${t}`,
		// )

		res.send(tokens)
	},
	showRol(req, res) {
		const { id } = req.params
		const rol = ImpostorService.showRol(id)
		res.send({ rol: rol })
	},
}
