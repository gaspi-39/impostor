import { io } from "socket.io-client"

// La URL de tu servidor backend que corre en el puerto 3000
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
// Configuramos la instancia del socket
const socket = io(URL, {
	// Evita que se conecte automáticamente al importar el archivo
	// Esto es útil para conectar solo cuando el usuario pone su nombre
	autoConnect: false,

	// Configuraciones de reconexión para hacerlo "tolerante a fallos"
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
})
export default socket
