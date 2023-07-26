import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Prorroga(props) {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idProrroga, setIdProrroga] = useState('');
  const [idLibro, setIdLibro] = useState('');

  const [libros, setLibros] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const tableStyle = {
    marginTop: '2%',
  };

  const handleData = (libro) => {
    setIdLibro(libro.id_libro);
    setIdProrroga(libro.id_prestamo);
  };

  const obtenerPrestamos = () => {
    fetch('http://localhost:3001/obtener_prestamos_prorroga', {
      method: 'GET',
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
      .then((data) => setLibros(data))
      .catch((error) => {
        console.error('Error al obtener los préstamos:', error);
        setErrorMessage('Error al obtener los préstamos.');
      });
  };

  const insertarProrroga = (libro) => {
    fetch('http://localhost:3001/insertar_prorroga', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endDate: endDate,
        id_libro: idLibro,
        id_prestamo: idProrroga,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(data.error)
      })
      .catch((error) => {
        console.error('Error al insertar la prórroga:', error);
        setErrorMessage('Error al insertar la prórroga.');
        handleClose();
      });
  };

  useEffect(() => {
    obtenerPrestamos();
  }, []);

  return (
    <div>
      <Link to={'/MainScreen'}>
        <Button variant="secondary" className="volver">
          Volver
        </Button>
      </Link>
      <h1>Registro de prorroga</h1>
      <center>
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
            {errorMessage}
          </Alert>
        )}

        <table className="table" style={tableStyle}>
          <thead>
            <tr>
              <th>ID PRESTAMO</th>
              <th>FECHA INICIO</th>
              <th>FECHA TERMINO</th>
              <th>MULTA</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro.isbn}>
                <td>{libro.id_prestamo}</td>
                <td>{libro.fecha_inicio}</td>
                <td>{libro.fecha_termino}</td>
                <td>{libro.multa_total}</td>
                <td>
                  <Button variant="danger" onClick={() => { handleShow(); handleData(libro) }}>
                    Extender Plazo
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Completa los datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ingresa fecha de termino de prorroga.</Form.Label>
                <Form.Control type="date" placeholder="name@example.com" onChange={event => setEndDate(event.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={insertarProrroga}>Extender plazo</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </center>
    </div>
  );
}

export default Prorroga;
