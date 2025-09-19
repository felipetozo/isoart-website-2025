const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "mail.infc.srv.br",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Função para mandar email
export async function sendMail(to: string, subject: string, html: string) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: html,
        });

        console.log('Email enviado:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Erro ao enviar email', error);
        return { success: false, error: error};
    }
}