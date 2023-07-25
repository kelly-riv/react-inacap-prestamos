import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StockScreen = () => {

    const [stock, setStock] = useState([]);
    const [showModal, setShowModal] = useState(false);
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

    const handleCloseModal = () => {
        setShowModal(false);
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

    return (
            <center>
                <Link to={'/MainScreen'}>
                    <Button type="button" className="btn btn-secondary volver">
                        Volver
                    </Button>
                </Link>
                <div className="table-responsive">
                    <h1>Listado de Libros en Stock</h1>
                    <table className="table">
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
                                <td>{libro.disponibilidad === 1 ? "No Disponible" : "Disponible"}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleOpenModal(libro.ISBN)}
                                    >
                                        Dar de baja
                                    </button>
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
                </div>
                </center>
    );
} 
export default StockScreen;
