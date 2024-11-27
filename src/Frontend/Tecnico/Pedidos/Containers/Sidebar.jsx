import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  
  render(){
    return (
      <div>
          <aside className="sidebar">

            <Link to='/tecnico-Pedidos'>
            <div>Pedidos</div>
            </Link>
          </aside>
    </div>
    );
  }
  
}
export default Sidebar;