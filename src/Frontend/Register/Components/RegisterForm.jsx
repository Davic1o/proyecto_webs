import React from 'react';
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './LoginForm.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div className="contendor_principal">

    <div className="contenedor__Login">
    <form onSubmit={handleSubmit} className='form-login' >
      <Input fondo="username" tipo="text" placeholder="Username" />
      <Input fondo="password" tipo="password" placeholder="Password" />
      <Input fondo="repeat-password" tipo="password" placeholder="Repeat Password" />
      <div className="remember-me">
        <input type="checkbox" /> Acepto los términos y condiciones
      </div>
      <Buton texto="Registrar" type="submit" estilo="aceptar" />
      <div className="links">
        <Link to='/Login'>
        <div>¿Ya tienes cuenta? Inicia sesión</div>
        </Link>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
