import { useState, useEffect } from "react"
import Menu from "./components/menu.jsx"
import Lobby from "./components/lobby.jsx"
import Juego from "./components/juego.jsx"
import socket from "./socketClient.js"
import "./App.css"

function App() {
	const [pantalla, setPantalla] = useState("Menu")
	const [datosSala, setDatosSala] = useState({})
	const [rol, setRol] = useState(null)
	useEffect(() => {
		socket.connect()

		socket.on("sala_creada", (data) => {
			setDatosSala(data)
			setPantalla("lobby")
		})
		socket.on("jugador_unido", (data) => {
			setDatosSala((prev) => ({ ...prev, jugadores: data })) // el spread devuelve una copia
			// parentesis para avisar q devolvemos un objeto
			setPantalla("lobby")
		})
		socket.on("rol_asignado", (data) => {
			setRol(data.rol)
			setPantalla("Juego")
		})
		socket.on("error_sala", (data) => {
			alert(data.mensaje)
		})

		// limpiar
		return () => {
			socket.off("sala_creada")
			socket.off("jugador_unido")
			socket.off("rol_asignado")
			socket.off("error_sala")
		}
	}, [])

	const volverMenu = () => {
		setPantalla("Menu")
		socket.emit("abandonar_sala")
	}
	const rematch = () => {
		socket.emit("reiniciar_juego")
	}
	return (
		<>
			<div className="contenedor-principal">
				{pantalla === "Menu" && <Menu socket={socket} />}
				{pantalla === "lobby" && (
					<Lobby socket={socket} datosSala={datosSala} />
				)}
				{pantalla === "Juego" && (
					<Juego
						socket={socket}
						datosSala={datosSala}
						rol={rol}
						rematch={rematch}
						volverMenu={volverMenu}
					/>
				)}
			</div>
		</>
	)
}

export default App
