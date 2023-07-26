import React, { useState } from 'react';
import { Button, Form, InputGroup, Alert, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const UserSearch = () => {
  const [dataUser, setDataUser] = useState([]);
  const [rut, setRut] = useState('');
  const [message, setMessage] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDataUser(data);
          setMessage(<Alert variant="success">Usuario encontrado correctamente.</Alert>);
        } else {
          setDataUser([]);
          setMessage(<Alert variant="warning">Usuario no encontrado.</Alert>);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage(<Alert variant="danger">Hubo un error en la solicitud.</Alert>);
      });
  };

  const navigate = useNavigate();

  const handleSubmitBooks = (rut) => {
    fetch('http://localhost:3001/obtener_libros_usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rut }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserBooks(data);
        setShowModal(true); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false); 
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
                    <Button variant="danger" onClick={() => handleSubmitBooks(user.rut)}>
                      Ver Libros
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Libros del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>ID Libro</th>
                <th>Título</th>
                <th>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {userBooks.map((book) => (
                <tr key={book.id_libro}>
                  <td>{book.id_libro}</td>
                  <td>{book.titulo}</td>
                  <td>{book.ISBN}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserSearch;
