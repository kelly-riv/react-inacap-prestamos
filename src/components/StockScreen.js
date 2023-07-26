import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StockScreen = () => {

    const [stock, setStock] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    //Datos de entrada para localhost
    const [selectedBook, setSelectedBook] = useState('');
    const [isbn, setIsbn] = useState('')
    const [isDamaged, setIsDamaged] = useState(false);

    useEffect(() => {
        obtenerStock();
    }, []);

    const obtenerStock = async () => {
        try {
            const response = await fetch('http://localhost:3001/obtener_stock');
            const data = await response.json();
            setStock(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOpenModal = (isbn) => {
        setShowModal(true);
        setSelectedBook(isbn);
        setIsDamaged(false);
    };

    const handleOpenModal2 = (isbn) => {
        setShowModal2(true);
        setSelectedBook(isbn);
    };

    const handleOpenModal3 = () => {
        setShowModal3(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };
    const handleCloseModal3 = () => {
        setShowModal3(false);
    };

    const handleCheckboxChange = (event) => {
        setIsDamaged(event.target.checked);
    };

    const handleSubmitBaja = async () => {
        try {
            const response = await fetch('http://localhost:3001/dar_baja_libro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isbn: selectedBook,
                    isDamaged: isDamaged,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(data.message);
            handleCloseModal();
            obtenerStock();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const tableStyles = {
        marginTop: '2%',
        width: '80%',
        fontSize: '100%'
    };

    const handleSubmitHab = async () => {
        try {
            const response = await fetch('http://localhost:3001/habilitar_libro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isbn: selectedBook,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(data.message);
            handleCloseModal();
            obtenerStock();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Libros en Stock</h1>
            <button
                type="button" style={{width: '10%'}}
                className="btn btn-danger"
                onClick={() => handleOpenModal3()}
                >
                Añadir Libro
            </button>
            <center>
                <Link to={'/MainScreen'}>
                    <Button type="button" className="btn btn-secondary volver">
                        Volver
                    </Button>
                </Link>

                <div className="table-responsive">
                    
                    <table className="table" style={tableStyles}>
                    <thead>
                        <tr>
                            <th>ID Libro</th>
                            <th>Título</th>
                            <th>ISBN</th>
                            <th>Condición</th>
                            <th>Disponibilidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((libro) => (
                            <tr key={libro.id_libro}>
                                <td>{libro.id_libro}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.ISBN}</td>
                                <td>{libro.condicion === 1 ? "Mal estado" : "Buen estado"}</td>
                                <td>{libro.disponibilidad === 1 ? "Disponible" : "No Disponible"}</td>
                                <td>
                                    <div className='row'>
                                 <button
                                        type="button" style={{width: '80%'}}
                                        className="btn btn-danger"
                                        onClick={() => handleOpenModal(libro.ISBN)}
                                        disabled={libro.disponibilidad === 0} 
                                    >
                                        Dar de baja
                                    </button>
                                    <button
                                        type="button" style={{width: '80%'}}
                                        className="btn btn-danger"
                                        onClick={() => handleOpenModal2(libro.ISBN)}
                                        disabled={libro.disponibilidad === 1} 
                                    >
                                        Habilitar Libro
                                    </button>
                                    
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Dar de baja libro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Estás seguro de que quieres dar de baja este libro?
                            <Form.Check
                                type="checkbox"
                                label="Marcar como libro en mal estado"
                                checked={isDamaged}
                                onChange={handleCheckboxChange}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleSubmitBaja}>
                                Dar de baja
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showModal2} onHide={handleCloseModal2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Habilitar Libro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Estás seguro de que quieres volver a habilitar este libro?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal2}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleSubmitHab}>
                                Habilitar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showModal3} onHide={handleCloseModal3}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir Libro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBookTitle">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el título del libro" />
                            </Form.Group>

                            <Form.Group controlId="formBookAuthor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el autor del libro" />
                            </Form.Group>

                            <Form.Group controlId="formBookPublisher">
                                <Form.Label>Editorial</Form.Label>
                                <Form.Control type="text" placeholder="Introduce la editorial del libro" />
                            </Form.Group>

                            <Form.Group controlId="formBookIsbn">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el ISBN del libro" />
                            </Form.Group>

                            <Form.Group controlId="formBookYear">
                                <Form.Label>Año de Publicación (AAAA)</Form.Label>
                                <Form.Control type="year" placeholder="Introduce el año de publicación del libro" />
                            </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal3}>
                                    Cerrar
                                </Button>
                                <Button variant="primary" onClick={handleSubmitHab}>
                                    Registrar Libro
                                </Button>
                            </Modal.Footer>
                        </Modal>

                </div>
                </center>
                </div>
    );
} 
export default StockScreen;
