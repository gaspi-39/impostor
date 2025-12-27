import express from "express"
import ImpostorRouter from "./routes/routes.js"

const app = express()
app.use(express.json())

app.use("/impostor", ImpostorRouter)

export default app
