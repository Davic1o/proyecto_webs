import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  
  render(){
    return (
      <div>
          <aside className="sidebar">
            <Link to='/Admin-User'>
            <div>Usuarios</div>
            </Link>
            <Link to='/Admin-Pedidos'>
            <div>Pedidos</div>
            </Link>
            <Link to='/Admin-Facturacion'>
            <div>Facturación</div>
            </Link>
          </aside>
    </div>
    );
  }
  
}
export default Sidebar;