import express from "express";
import registerClientsController from "../Controller/registerClientsController.js";
const router = express.Router();

router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientsController.verifyCodeEmail);

export default router;