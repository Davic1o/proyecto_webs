import React from 'react';
import Input from '../../Components/Input';
import Buton from '../../Components/Buton';
import './Login.css'

class Index extends React.Component  {
        
    render(){
        const handleSubmit =()=>{
            console.log("holis")
            }
        return (
  
            <div>
            <div className="login-container">
              <div className="navbar">
                <div className="inicio">
                  <a href="./">Inicio</a>
                </div>
                <div className="otros">
                  <a href="./">Nosotros</a>
                  <a href="./">Contacto</a>
                  <a href="./">Registro</a>
                  <a href="./" className="active">Login</a>
                </div>
              </div>
              <div className="login-box">
                <form onSubmit={handleSubmit}>
                  <Input fondo="username" tipo="text"></Input>                  
                  <Input fondo="password" tipo="password"></Input>
                  <div className="remember-me">
                    <input type="checkbox" /> Recuérdame
                  </div>
                  <Buton texto="Ingresar" type="submit" estilo="aceptar" />
                </form>
                <div className="links">
                  <a href="./">¿No tienes cuenta? Regístrate</a>
                  <a href="./">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
          
            
          );
    }
  }
  export default Index