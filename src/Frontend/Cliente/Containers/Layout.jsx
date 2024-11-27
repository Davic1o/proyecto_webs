// AppLayout.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './AppLayout.css';
import { useNavigate } from 'react-router-dom'; // Usar useNavigate

const AppLayout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    // Obtén los datos del localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Verifica si el perfil es 'admin'
    if (userData && userData.profile === 'cliente') {
      setIsAdmin(true);
    } else {
      // Si no es admin, redirige a la página de login
      navigate('/login');
    }
  }, [navigate]);

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
