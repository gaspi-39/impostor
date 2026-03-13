import { useEffect, useState } from "react"

function Menu({ socket }) {
	const [nombre, setNombre] = useState("")
	const [codigoSala, setCodigoSala] = useState("")

	// useEffect(() => {

	// 	// limpia el oido
	// 	return () => {
	// 		socket.off()
	// 	}
	// }, [])

	const manejarNombre = (e) => {
		setNombre(e.target.value) //e es lo que se escribio y se pasa por el evento change, disparado por el "onChange"
	}
	const manejarSala = (e) => {
		setCodigoSala(e.target.value) //e es lo que se escribio y se pasa por el evento change, disparado por el "onChange"
	}
	const crearSala = () => {
		socket.emit("crear_sala", { nombre: nombre })
	}
	const unirseSala = () => {
		socket.emit("unirse_sala", { nombre: nombre, codigoSala: codigoSala })
	}
	return (
		<div>
			<input
				className="input"
				type="text"
				placeholder="Nombre"
				value={nombre} // El input muestra el estado
				onChange={manejarNombre} // El estado se actualiza al escribir
			></input>
			<input
				className="input"
				type="text"
				placeholder="Codigo de sala"
				value={codigoSala} // El input muestra el estado
				onChange={manejarSala} // El estado se actualiza al escribir
			></input>
			<button className="btn-primary" onClick={crearSala}>
				Crear Partida
			</button>
			<button className="btn-secondary" onClick={unirseSala}>
				Unirse
			</button>
		</div>
	)
}
export default Menu
