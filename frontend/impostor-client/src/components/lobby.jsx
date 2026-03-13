import { useEffect, useState } from "react"

function Lobby({ socket, datosSala }) {
	useEffect(() => {}, [])

	const comenzarjuego = () => {
		socket.emit("empezar_juego")
	}
	return (
		<div>
			<h1 className="titulo"> Codigo de sala</h1>
			<p>{datosSala.codigoSala}</p>
			<h1 className="titulo"> Jugadores</h1>
			<ul className="listaJugadores">
				{datosSala.jugadores.map((j) => (
					<li key={j.id}>{j.nombre}</li>
				))}
			</ul>
			<button className="button" onClick={comenzarjuego}>
				¡Jugar!
			</button>
			<h2>Esperando al host</h2>
		</div>
	)
}
export default Lobby
