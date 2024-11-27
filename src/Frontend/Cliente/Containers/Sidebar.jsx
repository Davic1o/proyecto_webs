import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  
  render(){
    return (
      <div>
          <aside className="sidebar">

            <Link to='/Cliente-Pedidos'>
            <div>Pedidos</div>
            </Link>
            <Link to='/Cliente-Facturacion'>
            <div>Facturación</div>
            </Link>
          </aside>
    </div>
    );
  }
  
}
export default Sidebar;