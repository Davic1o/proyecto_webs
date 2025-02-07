import React from 'react';
import './Layout.css';
import { NavLink } from 'react-router-dom';

export default function LandingLayout({ children }) {
  return (
    <div className="layout-container">
      <div className="navbar">
        <div className="otros">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/Nosotros">Nosotros</NavLink>
          <NavLink to="/Contacto">Contacto</NavLink>
          <NavLink to="/Register">Registro</NavLink>
          <NavLink to="/Login">Login</NavLink>
        </div>
      </div>
      <div className="content-area">{children}</div>
    </div>
  );
}

