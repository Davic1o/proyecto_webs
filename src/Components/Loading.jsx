import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css'; // Asegúrate de tener el archivo de estilo

const Loading = () => {
  return (
    <div className="loading-container">
      <ReactLoading type="spin" color="#00008B" height={100} width={100} />
    </div>
  );
};

export default Loading;
