import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Soporte Cinemark" <rodte1234@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.log("Error sending verification email: " + error);
  }
};

const HTMLVerificationEmailCinema = (verificationCode, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de Correo Electrónico</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #101010;
                color: #fff;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #1a1a1a;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                text-align: center;
            }
            h2 {
                color: #f1c40f;
                font-size: 28px;
                text-transform: uppercase;
                margin-bottom: 20px;
            }
            p {
                color: #fff;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .code {
                font-size: 28px;
                font-weight: bold;
                background-color: #f39c12;
                padding: 12px 30px;
                border-radius: 8px;
                color: #2c3e50;
                letter-spacing: 3px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
                display: inline-block;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                background-color: #e74c3c;
                color: #fff;
                font-size: 18px;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 8px;
                transition: all 0.3s;
            }
            .button:hover {
                background-color: #c0392b;
                transform: scale(1.05);
            }
            .footer {
                font-size: 14px;
                color: #bbb;
                margin-top: 30px;
                text-align: center;
            }
            .footer a {
                color: #f1c40f;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>¡Verifica tu correo electrónico!</h2>
            <p>Para confirmar tu dirección de correo, usa el siguiente código:</p>
            <div class="code">${verificationCode}</div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Tu Cine Favorito. Todos los derechos reservados.</p>
                <p><a href="#">Política de Privacidad</a> | <a href="#">Términos de Servicio</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export { sendMail, HTMLVerificationEmailCinema };
