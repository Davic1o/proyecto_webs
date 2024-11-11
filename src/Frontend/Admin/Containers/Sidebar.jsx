import React from 'react'
import './Sidebar.css'

class Sidebar extends React.Component {
  
  render(){
    return (
      <div>
          <aside className="sidebar">
            <a href="./">Usuarios</a>
            <a href="./">Pedidos</a>
            <a href="./">Facturación</a>
          </aside>
    </div>
    );
  }
  
}
export default Sidebar;