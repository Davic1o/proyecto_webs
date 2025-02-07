import React from 'react';
import LandingLayout from '../Layout/LandingLayout';
import './Nosotros.css';
import portada2 from '../Images/Portada2.jpg';
export default function Nosotros() {
  return (
    <LandingLayout>
      <div className="landing-container">
  <div className="about-section-container">
    <div className="about-section">
      <h1>¿Quienes somos?</h1>
      <p>
        Electricados ofrece soluciones eléctricas seguras, confiables y
        eficientes para hogares y negocios. Nos enorgullecemos de brindar
        un servicio de calidad adaptado a tus necesidades eléctricas.
      </p>
      <h2>Beneficios de elegirnos:</h2>
      <ul>
        <li>Atención personalizada</li>
        <li>Uso de materiales de primera calidad</li>
        <li>Precios competitivos</li>
        <li>Garantía de trabajo seguro</li>
      </ul>
      <p>Transforma tu hogar con energía segura.</p>
    </div>
    <div className="image-section">
      <img
        src={portada2}
        alt="Electricado en acción"
        className="about-image"
      />
    </div>
  </div>
</div>
    </LandingLayout>
  );
}