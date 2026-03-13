import { useEffect, useState } from "react"

function Juego({ socket, datosSala, rol, rematch, volverMenu }) {
	useEffect(() => {}, [])
	return (
		<div>
			<h1 className="titulo">Tu rol</h1>
			<h2>{rol}</h2>
			<button className="btn-primary" onClick={rematch}>
				¡Jugar otra vez! -host-
			</button>
			<button className="btn-secondary" onClick={volverMenu}>
				Volver al menú
			</button>
		</div>
	)
}
export default Juego
