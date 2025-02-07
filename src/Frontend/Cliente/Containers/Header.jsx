import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Icono de flecha
import { useNavigate } from 'react-router-dom'; // Para redirigir
import Swal from 'sweetalert2'; // Importación de SweetAlert
import Input from '../../../Components/Input';
import './Header.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // Controla la visibilidad del menú
  const navigate = useNavigate(); // Hook para navegación
  const userStorage=localStorage.getItem('user')
  const user = userStorage ? JSON.parse(userStorage) : { nombre: 'Cliente' };
  const handleSearch = () => {
    console.log('Search query:', search);
    // Implementa la funcionalidad de búsqueda aquí
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Alterna el menú desplegable
  };

  const handleLogout = () => {
    // Elimina la variable del localStorage
    localStorage.removeItem('user');

    // Muestra el mensaje de SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Tu sesión se ha cerrado correctamente.',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      // Redirige a la página de inicio de sesión
      navigate('/login');
    });
  };

  return (
    <div className="user-header">
      <div className="buscador-header">
    
      </div>
      <div className="bienvenido-user" onClick={toggleMenu}>
        Bienvenido {user.nombre}
        <FaChevronDown className="chevron-icon" />
        {menuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="menu-item">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
