import React from 'react';
import './Buton.css';

const Buton = ({ texto, onClick, estilo, type }) => {
  return (
    <button onClick={onClick} className={estilo} type={type}>
      {texto}
    </button>
  );
};

export default Buton;

