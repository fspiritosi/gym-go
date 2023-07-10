const nodemailer = require("nodemailer");

const email = {
  username: "username",
  user: "smtp.gmail.com",
  pass: "meinuawqtlusswun",
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: { rejectUnauthorized: false },
  auth: {
    username: email.username,
    user: "david.marbello@gmail.com",
    pass: email.pass,
  },
});

const registerEmail = async (recipientEmail) => {
  await transporter.sendMail({
    from: "Gym-go david.marbello@gmail.com",
    to: recipientEmail,
    subject: `Confirmacion de registro  ✔`,
    text: "Confirmacion de registro  ✔",
    html: `
    <body>
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #333;">Confirmación de registro</h1>
        <p style="color: #666;">Hola ${recipientEmail}</p>
        <p style="color: #666;">Gracias por registrarte en nuestra plataforma.</p>
        <p style="color: #666;">Tu cuenta ha sido creada exitosamente.</p>
        <p style="color: #666;">¡Bienvenido/a a Gym-go!</p>
        <p style="color: #666;">Visita nuestro sitio web: <a href="https://gym-go-five.vercel.app">https://gym-go-five.vercel.app</a></p>
      </div>
  </body> 
  `,
  });
};

const purchaseEmail = async (recipientEmail) => {
  await transporter.sendMail({
    from: "Gym-go david.marbello@gmail.com",
    to: recipientEmail,
    subject: `Confirmación de compra de clases ✔`,
    text: "Confirmación de compra de clases ✔",
    html: `
    <body>
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #333;">Notificación de compra</h1>
        <p style="color: #666;">¡Felicitaciones!</p>
        <p style="color: #666;">Tu compra ha sido procesada con éxito.</p>
        <p style="color: #666;">Detalles de la compra:</p>
        <table style="width: 100%; max-width: 400px; margin: 20px auto; border-collapse: collapse;">
          <tr style="background-color: #f7f7f7;">
            <th style="padding: 10px; border: 1px solid #ddd;">Producto</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Cantidad</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Precio</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Producto 1</td>
            <td style="padding: 10px; border: 1px solid #ddd;">2</td>
            <td style="padding: 10px; border: 1px solid #ddd;">$20.00</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Producto 2</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1</td>
            <td style="padding: 10px; border: 1px solid #ddd;">$15.00</td>
          </tr>
        </table>
        <p style="color: #666;">Gracias por tu compra.</p>
        <p style="color: #666;">Visita nuestro sitio web: <a href="https://gym-go-five.vercel.app">https://gym-go-five.vercel.app</a></p>        
    </div>
  </body>
  `,
  });
};

module.exports = { registerEmail, purchaseEmail };
