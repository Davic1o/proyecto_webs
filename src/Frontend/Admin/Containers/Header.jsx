import React from 'react'
import Input from '../../../Components/Input';
import Buton from '../../../Components/Buton';
import './Header.css'

class Header extends React.Component {
  
  render(){
    return (
        <div className='user-header'>
            <Input fondo="Nombre"></Input>
            <Buton texto="Buscar" estilo="aceptar"></Buton>
        </div>
    );
  }
  
}
export default Header;