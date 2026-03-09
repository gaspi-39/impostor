import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

function read() {
	try {
		const __filename = fileURLToPath(import.meta.url)
		const __dirname = path.dirname(__filename)
		const filepath = path.join(__dirname, "db.json")
		const data = fs.readFileSync(filepath, "utf-8")
		return JSON.parse(data)
	} catch (error) {
		console.error("No se encontraron datos", error)
		return
	}
}
function randomInt(max) {
	return Math.floor(Math.random() * max)
}
export function roles(cant) {
	const { futbol } = read()
	const jugador = futbol[randomInt(futbol.length - 1)]
	const roles = []
	for (let index = 0; index < cant; index++) {
		roles.push(jugador)
	}
	roles[randomInt(roles.length - 1)] = "Impostor"
	return roles
}
