import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class StockScreen extends React.Component {
    state = {
      stock: [],
      showModal: false,
      selectedBook: null,
      cantidadBaja: 0,
    };

    obtenerStock= () => {
        fetch('http://localhost:3001/obtener_stock', {
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
          .then((data) => this.setState({ stock: data }))
          .catch((error) => console.error('Error al obtener los préstamos:', error));
      };

    componentDidMount() {
        this.obtenerStock();
      }

    handleOpenModal = (isbn) => {
        this.setState({ showModal: true, selectedBook: isbn });
    };
    
    handleCloseModal = () => {
        this.setState({ showModal: false, selectedBook: null, cantidadBaja: 0 });
    };

    handleSubmitBaja = () => {
      fetch('http://localhost:3001/dar_baja_libro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isbn: this.state.selectedBook,
          cantidadBaja: this.state.cantidadBaja,
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

    handleCantidadChange = (event) => {
      this.setState({cantidadBaja: parseInt(event.target.value)});
    }

    render() { return(
      <center>
      <Link to={"/MainScreen"}>
        <button type="button" className="btn btn-secondary volver">Volver</button>
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
                    <button type="button" className="btn btn-danger" onClick={() => this.handleOpenModal(libro.isbn)}>Dar de baja</button>
                  </td>
                </tr>
              ))}
            </tbody>    
          </table>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Dar de baja</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" placeholder="Ingresar cantidad" onChange={this.handleCantidadChange}/>
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