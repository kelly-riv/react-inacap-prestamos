import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class PaymentScreen extends React.Component {
  state = {
    multas: [],
  };

  obtenerMultas = () => {
    fetch('http://localhost:3001/obtener_multas', {
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
      .then((data) => this.setState({ multas: data }))
      .catch((error) => console.error('Error al obtener las multas:', error));
  };

  componentDidMount() {
    this.obtenerMultas();
  }

  render() {
    return (
      <div className='principal'>
      <center >
        <Link to={"/MainScreen"}>
          <button type="button" className="btn btn-secondary volver">Volver</button>
        </Link>
        <div className='row'>
          <div className="table-responsive">
            <h1>Listado de Multas</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID Préstamo</th>
                  <th>Monto Total</th>
                  <th>Rut de usuario</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {this.state.multas.map((multa) => (
                  multa.multa_total > 0 ?
                    <tr key={multa.id_prestamo}>
                      <td>{multa.id_prestamo}</td>
                      <td>{multa.multa_total}</td>
                      <td>{multa.rut}</td>
                      <td>
                        <Link
                          to="/PaymentRegister"
                          onClick={() => {
                            localStorage.setItem('multaTotal', multa.multa_total);
                            localStorage.setItem('idPrestamo', multa.id_prestamo);
                          }}
                        >
                          <button className="btn btn-secondary">Pagar</button>
                        </Link>
                      </td>
                    </tr>
                    : null
                ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </center>
      </div>
    );
  }
}

export default PaymentScreen;
