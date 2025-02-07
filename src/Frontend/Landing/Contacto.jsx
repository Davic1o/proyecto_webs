import React, { useState } from 'react';
import LandingLayout from '../Layout/LandingLayout';
import './Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías implementar el envío a un backend o servicio de correo.
    console.log(formData);
    alert("Gracias por contactarnos. Nos pondremos en contacto contigo pronto.");
    setFormData({ name: '', email: '', message: '' });
  }
  
  return (
    <LandingLayout>
      <div className="contact-section">
      <h1>Contáctanos</h1>
      <p>Estamos aquí para ayudarte. Puedes contactarnos a través de los siguientes medios:</p>

      <div className="contact-info">
        <div className="contact-item">
          <h2>Dirección</h2>
          <p>Avenida Siempre Viva #123, Ciudad Quito</p>
        </div>

        <div className="contact-item">
          <h2>Teléfono</h2>
          <p>(+593) 0995462897</p>
        </div>

        <div className="contact-item">
          <h2>Email</h2>
          <p>contacto@electricados.com</p>
        </div>
      </div>
    </div>
    </LandingLayout>
  );
}