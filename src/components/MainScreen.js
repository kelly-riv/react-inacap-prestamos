import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../App.css';
import { Link } from 'react-router-dom';

class MainScreen extends React.Component {
  state = {
    prestamos: [],
  };

  obtenerPrestamos = () => {
    fetch('http://localhost:3001/obtener_prestamos', {
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
      .then((data) => this.setState({ prestamos: data }))
      .catch((error) => console.error('Error al obtener los préstamos:', error));
  };

  componentDidMount() {
    this.obtenerPrestamos();
  }

  render() {
    return (
      <center>
        <Link to={"/"}>
          <button type="button" className="btn btn-secondary volver" >Cerrar Sesión</button>
        </Link>
        <div >
          <table className='actionButtons'>
            <tbody>
              <tr>
              <td>
                  <Link to={"/RegistrarEntrega"}>
                    <button type="button" className="btn btn-secondary">Registrar entrega de libro</button>
                  </Link>
                </td>
                <td>
                  <Link to={"/RegistrarPrestamoCompleto"}>
                    <button type="button" className="btn btn-secondary">Registrar un Préstamo</button>
                  </Link>
                </td>
                <td>
                  <Link to={"/PaymentScreen"}>
                    <button type="button" className="btn btn-secondary">Registrar pago de multa</button>
                  </Link>
                </td>
                <td>
                  <Link to={"/LoanReportForm"}>
                    <button type="button" className="btn btn-secondary">Generar un Reporte</button>
                  </Link>
                </td>
                <td>
                  <Link to={"/StockScreen"}>
                  <button type="button" className="btn btn-secondary">Gestionar Stock de Libros</button>
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-secondary">Registrar prorroga</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-responsive">
        <h1>Listado de Préstamos</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID Préstamo</th>
                <th>Fecha Inicio</th>
                <th>Fecha Devolución</th>
                <th>ID Usuario</th>
                <th>ID Encargado</th>
                <th>Multa Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.prestamos.map((prestamo) => (
                <tr key={prestamo.id_prestamo}>
                  <td>{prestamo.id_prestamo}</td>
                  <td>{prestamo.fecha_inicio}</td>
                  <td>{prestamo.fecha_devolucion}</td>
                  <td>{prestamo.id_user}</td>
                  <td>{prestamo.id_encargado}</td>
                  <td>{prestamo.multa_total}</td>
                </tr>
              ))
        }
            </tbody>    
          </table>
        </div>
      </center>
    );
  }
}

export default MainScreen;
