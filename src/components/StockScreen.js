import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class StockScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            showModal: false,
            selectedBook: '',
            updatedStockQuantity: 0,
        };
    }

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
        this.setState({ showModal: true, selectedBook: isbn, updatedStockQuantity: 0 });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleStockUpdate = (event) => {
        this.setState({ updatedStockQuantity: parseInt(event.target.value) });
    };

    handleSubmitBaja = () => {
        const { selectedBook, updatedStockQuantity } = this.state;
        fetch('http://localhost:3001/dar_baja_libro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isbn: selectedBook,
                cantidadBaja: updatedStockQuantity,
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
        const { stock, showModal, selectedBook, updatedStockQuantity } = this.state;

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
                    <th>ISBN</th>
                    <th>Título</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.stock.map((libro) => (
                    <tr key={libro.isbn}>
                      <td>{libro.isbn}</td>
                      <td>{libro.titulo}</td>
                      <td>{libro.cantidad}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleOpenModal(libro.isbn)}
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
                            <Modal.Title>Dar de baja</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingresar cantidad"
                                        onChange={this.handleStockUpdate}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
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