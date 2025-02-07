import React from 'react'
import LandingLayout from '../Layout/LandingLayout'
import "./Home.css"
import portada1 from '../Images/Portada1.jpg';
import {useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate=useNavigate()
  return (
    <LandingLayout>
        <div className="home-container">
        <div className="hero-text">
          <h1>Bienvenidos a Electricados</h1>
          <p>
            Soluciones eléctricas domiciliarias seguras y confiables para transformar tu hogar.
          </p>
          <button className="hero-button" onClick={()=>navigate("/Register")}>Solicita tu presupuesto</button>
        </div>
        <div className="hero-image">
          {/* Reemplaza '/path/to/your/electric-image.jpg' por la ruta de tu imagen */}
          <img src={portada1} alt="Instalación eléctrica" />
        </div>
      </div>
    </LandingLayout>
  )
}
