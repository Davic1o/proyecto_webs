import React from 'react';
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recuperar contraseña solicitado');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recuperar Contraseña</h2>
      <p>Por favor, ingresa tu correo electrónico para enviarte las instrucciones de recuperación.</p>
      <Input fondo="email" tipo="email" placeholder="Correo electrónico" />
      <Buton texto="Enviar instrucciones" type="submit" estilo="aceptar" />
      <div className="links">
        <a href="./">¿Ya recuerdas tu contraseña? Inicia sesión</a>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
