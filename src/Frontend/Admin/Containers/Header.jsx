import React from 'react'
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './Header.css'

onclick=()=>{
  console.log('click')
}
class Header extends React.Component {
  
  render(){
    return (
        <div className='user-header'>
          <div className="buscador_header">

            <Input fondo="Buscar"></Input>
            <Buton texto="Buscar" estilo="aceptar" 
            type='button'
            onClick={onclick}/>
            </div>
            <div className="bienvenido_user">Bienvenido Administrador</div>

        </div>
    );
  }
  
}
export default Header;