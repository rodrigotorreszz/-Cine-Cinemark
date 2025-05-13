import express from "express";
import registerEmployeesController from "../Controller/registerEmployeesController.js";
const router = express.Router();

router.route("/").post(registerEmployeesController.register)

export default router;