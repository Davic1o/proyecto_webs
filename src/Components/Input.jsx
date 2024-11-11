import React, {Component} from 'react'
import './Input.css'

class Input extends Component{
  render(){
      const {fondo, tipo}=this.props;
      return(
          <div>
              <input 
              type={tipo} 
              placeholder={fondo} 
              className="inputs" 
              
              />
          </div>
      )
  }
}

export default Input
