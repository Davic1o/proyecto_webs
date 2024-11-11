import React, { Component } from 'react';
import './Buton.css';

class Buton extends Component {
  render() {
    const { texto, onclick, estilo, type } = this.props;
    
    return (
      <div>
        <button
          onClick={onclick}
          className={estilo}
          type={type}
        >
          {texto}
        </button>
      </div>
    );
  }
}

export default Buton;
