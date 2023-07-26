import React, { useState } from 'react';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const UserSearch = () => {
  const [dataUser, setDataUser] = useState([]);
  const [rut, setRut] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChangeRut = (event) => {
    if (event.target.name === 'rut') {
      setRut(event.target.value);
    }
  };

  const handleSubmitUser = () => {
    fetch('http://localhost:3001/realizar_busqueda_usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rut }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setDataUser(data);
        setMessage(<Alert variant="success">Usuario encontrado correctamente.</Alert>);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
        setMessage(<Alert variant="danger">Hubo un error al buscar el usuario.</Alert>);
      });
  };

  const handleSubmitBooks = (rut) => {
    fetch('http://localhost:3001/obtener_libros_usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rut }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the fetched books data (if needed)
        console.log(data);
        setMessage(<Alert variant="success">Libros del usuario obtenidos correctamente.</Alert>);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los libros:', error);
        setMessage(<Alert variant="danger">Hubo un error al obtener los libros del usuario.</Alert>);
      });
  };

  return (
    <div>
      {message && <div className="mb-3">{message}</div>}
      <Link to="/MainScreen">
        <button type="button" className="btn btn-secondary volver">
          Volver
        </button>
      </Link>
      <center>
        <InputGroup className="mb-3">
          <Form.Control
            name="rut"
            onChange={handleChangeRut}
            placeholder="Ingresa rut del usuario"
          />
        </InputGroup>
        <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmitUser}>
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
              {dataUser.map((user) => (
                <tr key={user.rut}>
                  <td>{user.rut}</td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.telefono}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleSubmitBooks(user.rut)}
                    >
                      Ver Libros
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
};

export default UserSearch;
