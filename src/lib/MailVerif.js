import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "mx52.hostgator.mx", 
    port: 465,                  
    secure: true,              
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verifica-correo?token=${token}`;

  await transporter.sendMail({
    from: `"Mavide" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verifica tu correo en MAVIDE",
    html: `
      <p>Gracias por registrarte en Mavide. Haz clic en este enlace para activar tu cuenta:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  });
}
