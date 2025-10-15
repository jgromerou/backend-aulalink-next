import * as emailjs from '@emailjs/nodejs';

const envioEmail = async (nombreUsuario, emailDestinatario) => {
  try {
    const templateParams = {
      from_name: 'AulaLink',
      user_name: nombreUsuario,
      destinatario: emailDestinatario,
      message: 'Gracias por usar nuestros servicios. Deseamos que tengas una buena experiencia con nosotros.'
    };

    const response = await emailjs.send(
      process.env.YOUR_SERVICE_ID,
      process.env.YOUR_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.YOUR_PUBLIC_KEY,   // opcional
        privateKey: process.env.YOUR_PRIVATE_KEY, // ⚡ requerido para Node.js
      }
    );

    console.log('✅ Enviado correctamente!', response.status, response.text);
  } catch (error) {
    console.error('❌ Ocurrió un error...', error);
  }
};

export default envioEmail;