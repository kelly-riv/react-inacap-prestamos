import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Prorroga(props) {
    //MODAL
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [libros, setLibros] = useState([]);
    
    const tableStyle = {
        marginTop: '2%'
    }

    const obtenerLibros = () => {
        fetch('http://localhost:3001/obtener_libros', {
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
        .catch((error) => console.error('Error al obtener los préstamos:', error));
    };

    const insertarProrroga = (libro) => {
      fetch('http://localhost:3001/insertar_prorroga', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            id_libro: libro.id_libro,
            id_prestamo: libro.id_prestamo
        }),
      })
      .then((response) => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error al insertar la prórroga:', error));
  };

    useEffect(() => {
        obtenerLibros(); 
    }, []);

    return (
    <div>
        <Link to={'/'}>
            <Button variant='secondary' className='volver'>
                Volver
            </Button>
        </Link>
        <h1>Registro de prorroga</h1>
        <center>

        <table className="table" style={tableStyle}>
            <thead>
              <tr>
                <th>ID LIBRO</th>
                <th>ID PRÉSTAMO</th>
                <th>Título</th>
                <th>Acción</th> 
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => ( 
                <tr key={libro.isbn}>
                  <td>{libro.id_libro}</td>
                  <td>{libro.id_prestamo}</td>
                  <td>{libro.titulo}</td>
                  <td>
                    <Button variant="danger" onClick={() => {handleShow(); insertarProrroga(libro)}}>Extender Plazo</Button>
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
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ingresa fecha de inicio de prorroga.</Form.Label>
                        <Form.Control type="date" placeholder="name@example.com" onChange={event => setStartDate(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Ingresa fecha de termino de prorroga.</Form.Label>
                        <Form.Control type="date" placeholder="name@example.com" onChange={event => setEndDate(event.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

        </center>
    </div>
  );
}

export default Prorroga;
