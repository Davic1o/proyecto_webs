import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './LoginForm.css';


const LoginForm = () => {
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    RUC: "",
    direccion: "",
    telefono: "",
    username: "",
    password: "",
    email: "",
    profile: "cliente"
  });

  const [rPassword, setRpassword] = useState("");
  const [check, setCheck] = useState(false);

  const handleCheckboxChange = (e) => {
    setCheck(e.target.checked);
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();

    if (!check) {
      Swal.fire({
        text: `Debe aceptar términos y condiciones`,
        icon: 'warning',
        confirmButtonColor: '#607493',
        confirmButtonText: 'Entendido',
      });
      return;
    }
    if (cliente.password !== rPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonColor: '#607493',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    try {
      const result = await axios.post('http://localhost:8000/users', cliente);

      Swal.fire({
        title: 'Registro Exitoso',
        text: `El usuario ${cliente.nombre} se ha creado exitosamente`,
        icon: 'success',
        confirmButtonColor: '#607493',
        confirmButtonText: 'Entendido',
      });

      // Limpia los campos
      setCliente({
        id: "",
        nombre: "",
        RUC: "",
        direccion: "",
        telefono: "",
        username: "",
        password: "",
        email: "",
        profile: "cliente"
      });

      setRpassword("");
      setCheck(false);

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al registrar el usuario',
        icon: 'error',
        confirmButtonColor: '#607493',
        confirmButtonText: 'Entendido',
      });
    }
  };

  const registrar = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const registrarRP = (e) => {
    setRpassword(e.target.value);
  };

  return (
    <div className="contendor_principal">
      <div className="contenedor__Login">
        <form onSubmit={handleRegistrar} className='form-login'>
          <Input fondo="Nombre completo" tipo="text" name="nombre" value={cliente.nombre} onChange={registrar} />
          <Input fondo="RUC o cédula" tipo="text" name="RUC" value={cliente.RUC} onChange={registrar} />
          <Input fondo="Dirección" tipo="text" name="direccion" value={cliente.direccion} onChange={registrar} />
          <Input fondo="teléfono o celular" tipo="text" name="telefono" value={cliente.telefono} onChange={registrar} />
          <Input fondo="email" tipo="text" name="email" value={cliente.email} onChange={registrar} />
          <Input fondo="username" tipo="text" name="username" value={cliente.username} onChange={registrar} />
          <Input fondo="password" tipo="password" name="password" value={cliente.password} onChange={registrar} />
          <Input fondo="repeat-password" tipo="password" name="rPassword" value={rPassword} onChange={registrarRP} />

          <div className="remember-me">
            <input type="checkbox" checked={check} onChange={handleCheckboxChange} />
            Acepto los términos y condiciones
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
