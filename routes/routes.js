const express = require("express");
const router = express.Router();
const fs = require("fs");

const nodemailer = require("nodemailer"); //correo
let msj = require("./mensaje.js");
let jsonHdlr = require("../handdleJson.js");
let encrypter = require("../encrypter.js");


const { body, param, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  res.send("<h1>HOLAA</h1>");
});

router.post(
  "/sendEmail",
  [
    body("correo").not().isEmpty().isString(),
    body("asunto").not().isEmpty().isString(),
    body("descripcion").not().isEmpty().isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    const { correo, asunto, descripcion } = req.body;
    descripcionF =
      "Recibimos su comentario (" +
      descripcion +
      "), se atenderá lo antes posible!";
    mensaje = msj.CrearMensaje(correo, asunto, descripcionF);
    console.log(mensaje);
    var transporter = msj.conectionEmail();

    transporter.sendMail(mensaje, (error, info) => {
      if (error) {
        console.log("Error enviando email");
        console.log(error.message);
      } else {
        let ruta =
          "C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/correos.json";
        //guardarEnJSON(req.body,"C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/correos.json");
        jsonHdlr.guardarEnJSON(bodyEnc, ruta);
        console.log("Email enviado");
        //console.log("datos json", datosCorreo);

        res.json({
          success: true,
          data: JSON.stringify({ correo, asunto, descripcion }),
        });
      }
    });
  }
);

router.post("/register", async (req, res) => {
  try {
    const { nickName, edad, correo, contrasena } = req.body;
    //console.log( req.body);
    bodyEnc=
    {
      nickName: encrypter.encryptString(nickName),
      edad: edad,
      correo: encrypter.encryptString(correo),
      contrasena: encrypter.encryptString(contrasena)
    }
   // console.log(bodyEnc);

    let ruta =
      "C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/usuarios.json";
    //guardarEnJSON(req.body,"C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/correos.json");
    datosUsr = jsonHdlr.obtenerDatosJSON(ruta);
    var personaEncontrada = null;
    let contraEncontrada = "";

    for (var i = 0; i < datosUsr.length; i++) {
      var persona = datosUsr[i];
      if (persona.correo === bodyEnc.correo) {
        personaEncontrada = persona;
        //console.log("Persona:", personaEncontrada);
        break; // Detiene el bucle cuando se encuentra la persona
      }
    }
    console.log("Persona:", personaEncontrada);
    if (personaEncontrada != null) {
      res.status(500).json({ success: false, err: "Usuario ya existente" });
      return;
    }else{
      jsonHdlr.guardarEnJSON(bodyEnc, ruta);
    console.log("Cliente registrado con éxito:");

    // return res.status(200);
    res.json({
      success: true,
    });
    return;
    }

    
  } catch (error) {
    console.error("Error general al procesar la solicitud:", error);
    res.status(500).json({ success: false, err: JSON.stringify(error) });
    return;
  }
});
router.post("/registerPsic", async (req, res) => {
  try {
    const { nombre,apePat,apeMat, cedula, correo, contrasena } = req.body;
    console.log( req.body);
    bodyEnc=
    {
      nombre: encrypter.encryptString(nombre),
      apePat: encrypter.encryptString(apePat),
      apeMat: encrypter.encryptString(apeMat),
      cedula: cedula,
      correo: encrypter.encryptString(correo),
      contrasena: encrypter.encryptString(contrasena)
    }
   // console.log(bodyEnc);

    let ruta =
      "C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/psicologos.json";
    //guardarEnJSON(req.body,"C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/correos.json");
    datosUsr = jsonHdlr.obtenerDatosJSON(ruta);
    var personaEncontrada = null;
    let contraEncontrada = "";

    for (var i = 0; i < datosUsr.length; i++) {
      var persona = datosUsr[i];
      if (persona.cedula === bodyEnc.cedula) {
        personaEncontrada = persona;
        //console.log("Persona:", personaEncontrada);
        break; // Detiene el bucle cuando se encuentra la persona
      }
    }
    console.log("Persona:", personaEncontrada);
    if (personaEncontrada != null) {
      res.status(500).json({ success: false, err: "Usuario ya existente" });
      return;
    }else{
      jsonHdlr.guardarEnJSON(bodyEnc, ruta);
    console.log("Cliente registrado con éxito:");

    // return res.status(200);
    res.json({
      success: true,
    });
    return;
    }

    
  } catch (error) {
    console.error("Error general al procesar la solicitud:", error);
    res.status(500).json({ success: false, err: JSON.stringify(error) });
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    console.log("Intentando buscar al usuario");
    console.log("Correo:", correo);
    console.log("Contra:", contrasena);
    let ruta =
      "C:/Users/victo/OneDrive/Escritorio/ProyectoRedes/dataBase/usuarios.json";
    datosUsr = jsonHdlr.obtenerDatosJSON(ruta);
    bodyEnc=
    {
      correo: encrypter.encryptString(correo),
      contrasena: encrypter.encryptString(contrasena)
    }

    //console.log(datosUsr);
    var personaEncontrada = null;
    let contraEncontrada = "";

    for (var i = 0; i < datosUsr.length; i++) {
      var persona = datosUsr[i];
      if (persona.correo === bodyEnc.correo) {
        personaEncontrada = persona;
        //console.log("Persona:", personaEncontrada);
        break; // Detiene el bucle cuando se encuentra la persona
      }
    }
    console.log("Persona:", personaEncontrada);
    if (personaEncontrada != null) {
      contraEncontrada = personaEncontrada.contrasena;

      // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
      const passwordMatch = bodyEnc.contrasena === contraEncontrada;

      if (!passwordMatch) {
        console.log("Contraseña no coincide");
        res.status(500).json({ success: false, err: "Contraseña no coincide" });
        return;
      }
      bodyDenc=
      {
        nickName: encrypter.decryptString(personaEncontrada.nickName),
        edad: personaEncontrada.edad,
        correo: encrypter.decryptString(personaEncontrada.correo),
        contrasena: encrypter.decryptString(personaEncontrada.contrasena)
      }
      // Envía una respuesta exitosa
      console.log("Inicio de sesión exitoso");
      return res.json({ success:true, message: "Inicio de sesión exitoso", data: bodyDenc});
    } else {
      res.status(500).json({ success: false });
      return;
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ success: false, err: JSON.stringify(error) });
    return;
  }
  console.log("Solicitud de inicio de sesión recibida:", req.body);
});

module.exports = router;
