import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserSearch = () => {
  
  const handleSubmitUser = () => {
    fetch('http://localhost:3001//realizar_busqueda_usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => this.setState({ user: data }))
      .catch((error) => console.error('Error al encontrar al usuario:', error));
      this.render()
  };

  const handleSubmitBooks = () => {
    fetch('http://localhost:3001/obtener_libros_usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => this.setState({ libros: data }))
      .catch((error) => console.error('Error al obtener los datos de los libros:', error));
      this.render()
  };
  


  return (
    <div>
        <Link to={"/MainScreen"}>
            <button type="submit" className="btn btn-secondary volver" onSubmit={handleSubmit()}>Volver</button>
        </Link>
        <center>
            <InputGroup className="mb-3">
            <Form.Control
            placeholder="Ingresa rut del usuario"
            />
            </InputGroup>
            <Button variant="outline-secondary" id="button-addon2">
                Buscar
            </Button>
            <div>
            <table className="table">
            <thead>
              <tr>
                <th>RUT</th>
                <th>NOMBRE</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {this.state.prestamos.map((prestamo) => (
                <tr key={user.id_prestamo}>
                  <td>{prestamo.id_prestamo}</td>
                  <td>{prestamo.fecha_inicio}</td>
                  <td>{prestamo.fecha_devolucion}</td>
                  <td>{prestamo.id_user}</td>
                  <td><Button variant="danger">Ver Libros</Button>{' '}</td>
                </tr>
              ))
        }
            </tbody>    
          </table>
          </div>
        </center>
    </div>
  );
};

export default UserSearch;
