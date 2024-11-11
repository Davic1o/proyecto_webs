import React, {Component} from "react";
import './Table.css'

class Table extends Component{
    render(){
        const {usuarios}=this.props;
        return(
            <div>
                <table  className="tabla_users">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample rows */}
              {usuarios.map((user, index) => (
                <tr key={index}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <span className="edit">✏️</span>
                    <span className="delete">🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
        )
    }
}
export default Table