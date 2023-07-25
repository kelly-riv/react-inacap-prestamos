import React from 'react';
import { Button, Modal, Form, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class StockScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            showModal: false,
            selectedBook: '',
            updatedStockQuantity: 0,
            isDamaged: false,
        };
    }
    //OBTENER TABLA

    componentDidMount() {
        this.obtenerStock();
    }

    obtenerStock = () => {
        fetch('http://localhost:3001/obtener_stock')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ stock: data });
            })
            .catch((error) => console.error('Error:', error));
    };

    handleOpenModal = (isbn) => {
        this.setState({ showModal: true, selectedBook: isbn, updatedStockQuantity: 0, isDamaged: false });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleStockUpdate = (event) => {
        this.setState({ updatedStockQuantity: parseInt(event.target.value) });
    };

    handleCheckboxChange = (event) => {
        this.setState({ isDamaged: event.target.checked });
    };

    //DAR DE BAJA UN LIBRO

    handleSubmitBaja = () => {
        const { selectedBook, updatedStockQuantity, isDamaged } = this.state;
        fetch('http://localhost:3001/dar_baja_libro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isbn: selectedBook,
                cantidadBaja: updatedStockQuantity,
                isDamaged: isDamaged,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                this.handleCloseModal();
                this.obtenerStock();
            })
            .catch((error) => console.error('Error:', error));
    };

    render() {
        const { stock, showModal, selectedBook, updatedStockQuantity, isDamaged } = this.state;
    
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
                                        onClick={() => this.handleOpenModal(libro.ISBN)}
                                    >
                                        Dar de baja
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    <Modal show={showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Dar de baja libro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Estás seguro de que quieres dar de baja este libro?
                            <Form.Check
                                type="checkbox"
                                label="Marcar como libro en mal estado"
                                checked={isDamaged}
                                onChange={this.handleCheckboxChange}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmitBaja}>
                                Dar de baja
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                </center>
    );
} 
} 
export default StockScreen;
