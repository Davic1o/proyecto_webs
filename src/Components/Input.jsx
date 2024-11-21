
import React from 'react'
import './Input.css'

export default function Input({fondo, tipo}) {
  return (
    <div>
    <input 
    type={tipo} 
    placeholder={fondo} 
    className="inputs" 
    
    />
</div>
  )
}
