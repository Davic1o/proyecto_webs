import React, { useState} from 'react';
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Importar SweetAlert
import axios from 'axios'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/login/users`,{username, password})
      .then(res => {
        const user = res.data.user
        localStorage.setItem('user', JSON.stringify(user)); 
        const token= res.data.token
        localStorage.setItem('token', JSON.stringify(token)); 
        // constokenole.log("este es el profile")
        // const token=res.data.
        
        if (user.profile) {
          // Mostrar alerta de éxito
           
          
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });

          // Redirigir según el perfil
          if (user.profile === "admin") {
            console.log('Redirigiendo a:', '/Admin-User');
            
            navigate('/Admin-User');
          } else if (user.profile === 'cliente') {
            navigate(`/Cliente-pedidos/`);
          } else if (user.profile=== 'tecnico') {
            navigate(`/Tecnico-Pedidos/`);
          }
        }
      })
      .catch(error => {console.log("Respuesta fallida: "+error)
       
        setError('Usuario o contraseña incorrectos');

        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
        });
      });

  };

  return (
    <div className="contendor_principal">
      <div className="contenedor__Login_1">
        <form onSubmit={handleSubmit} className='form-login'>
          <Input
            fondo="username"
            tipo="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            fondo="password"
            tipo="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          
          <div className="remember-me">
            <input type="checkbox" /> Recuérdame
          </div>

          <div className="buton_login">
            <Buton texto="Ingresar" type="submit" estilo="aceptar" />
          </div>

          <div className="links">
            <Link to='/Register'>
              <div>¿No tienes cuenta? Regístrate</div>
            </Link>
          </div>

          <div className="links">
            <Link to='/Forget'>
              <div>¿Olvidaste tu contraseña?</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

