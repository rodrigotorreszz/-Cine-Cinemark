import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correos
import crypto from "crypto"; // Codigo aleatorio

import clientsModel from "../models/customers.js";
import { config } from "../config.js";
import { sendMail, HTMLVerificationEmailCinema } from "../utils/MailConfirmCode.js";

//Array de funciones
const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  //1- Solicitar los datos que vamos a registrar
  const {
    name,
    email,
    password,
    phone,
    address,
    active
  } = req.body;

  try {
    // Verificamos si el cliente ya existe
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exists" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardar el cliente en la base de datos
    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      phone,
      address,
      active
    });

    await newClient.save();

    // Generar un código de verificación aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Generar token de verificación
    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    // Enviar el correo electrónico de verificación
    await sendMail(
      email,
      "Verificación de correo electrónico",
      `Tu código de verificación es: ${verificationCode}`,
      HTMLVerificationEmailCinema(verificationCode)
    );

    res.json({
      message: "Cliente registrado, verifica tu correo con el código enviado",
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  // Obtengo el token guardado en las cookies
  const token = req.cookies.verificationToken;

  try {
    // Verificar y decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    // Comparar el código que envié por correo con el que el usuario ingresó
    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }

    // Marcar al cliente como verificado
    const client = await clientsModel.findOne({ email });
    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export default registerClientsController;
