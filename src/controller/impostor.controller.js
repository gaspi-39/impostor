import { Partida } from "../models/partida.model.js"
import { ImpostorService } from "../service/impostor.service.js"
import { partidaActual } from "../service/impostor.service.js"

export const ImpostorController = {
	create(req, res) {
		const { cantidad } = req.params
		const numero = Number(cantidad)
		if (cantidad < 3) {
			return res.status(400).json({ error: "Muy pocos jugadores" })
		}

		const partida = ImpostorService.create(numero)
		const tokens = partida.jugadores.map((j) => j.id)

		res.send(tokens)
	},
	showRol(req, res) {
		const { id } = req.params
		const rol = ImpostorService.showRol(id)
		res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Tu rol</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #111;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background: #222;
          padding: 40px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .rol {
          font-size: 2.5rem;
          margin-top: 20px;
          color: ${rol === "impostor" ? "#ff4d4d" : "#4dff88"};
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Tu rol es</h1>
        <div class="rol">${rol}</div>
        <p style="margin-top:20px; opacity:0.6">
          No muestres esta pantalla 👀
        </p>
      </div>
    </body>
    </html>
  `)
	},
}
