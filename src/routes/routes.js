import { Router } from "express"
import { ImpostorController } from "../controller/impostor.controller.js"

const router = Router()

router.get("/play/:cantidad", ImpostorController.create)
router.get("/:id", ImpostorController.showRol)
export default router
