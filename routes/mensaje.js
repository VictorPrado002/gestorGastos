const nodemailer = require("nodemailer"); //correo

function conectionEmail() {
  return (transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "victor000hugo10@gmail.com",
      pass: "aiqpxzzmenwfnyud",
    },
  }));
}

function CrearMensaje(correo, asunto, descripcion) {
  return (mensaje = {
    from: "stonks",
    to: correo,
    subject: asunto,
    text: descripcion,
    html: "<h1>" + asunto + "</h1><p>" + descripcion + "</p>",
  });
}

module.exports={ conectionEmail,CrearMensaje};
