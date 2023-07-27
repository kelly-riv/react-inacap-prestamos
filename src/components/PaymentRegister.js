import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import billete1k from '../media/1000_anverso.jpg';
import billete2k from '../media/2000_anverso.jpg';
import billete5k from '../media/5000_anverso.jpg';
import billete10k from '../media/6557-10000-pesos-2.jpg';
import billete20k from '../media/20000-anverso.jpg';
import moneda10 from '../media/10-reverso.png';
import moneda50 from '../media/50-reverso.png';
import moneda100 from '../media/100Moneda.png';
import moneda500 from '../media/500Moneda.png';

function PaymentRegister() {
  
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [multaTotal, setMultaTotal] = useState(0);
  const [idPrestamo, setIdPrestamo] = useState('  ');
  const [diferencia, setDiferencia] = useState(0);
  const [message, setMessage] = useState(null); 

  useEffect(() => {
    let multa = localStorage.getItem('multaTotal');
    setMultaTotal(parseFloat(multa));
    setIdPrestamo(localStorage.getItem('idPrestamo'));
  }, []);

  useEffect(() => {
    calcularDiferencia();
  }, [totalAmount, multaTotal]);

  const calcularDiferencia = () => {
    const diff = totalAmount - multaTotal;
    setDiferencia(diff >= 0 ? diff : 0);
  }

  const handleClick = (imageValue) => {
    setTotalAmount(prevTotalAmount => prevTotalAmount + imageValue);
  };

  const resetTotalAmount = () => {
    setTotalAmount(0);
    setMessage(null); 
  };
  
  const handleSubmit = () => {
    if(totalAmount >= multaTotal){
      fetch('http://localhost:3001/registrar_pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_prestamo: idPrestamo })
      })
      .then(response => {
        if(response.ok){
          setMessage(<Alert variant="success">Multa cancelada correctamente.</Alert>);
          setTimeout(() => {
            navigate('/MainScreen');
          }, 3000); 
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setMessage(<Alert variant="danger">Hubo un error al pagar la multa.</Alert>);
      });
    } else {
      setMessage(<Alert variant="warning">El monto ingresado es menor al monto total.</Alert>);
    }
  };

  return (
    <div className='principal'>
    <center>
      <Link to={"/PaymentScreen"}>
        <button type="button" className="btn btn-secondary volver" >Volver</button>
      </Link>
      <div className='moneyForm'>
        <h1>Registrar pago de multas</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <a>
                  <img src={billete1k} className='billete' onClick={() => handleClick(1000)} />
                </a>
              </td>
              <td>
                <img src={moneda10} className='moneda' onClick={() => handleClick(10)} />
              </td>
            </tr>
            <tr>
              <td>
                <a>
                  <img src={billete2k} className='billete' onClick={() => handleClick(2000)} />
                </a>
              </td>
              <td>
                <img src={moneda50} className='moneda' onClick={() => handleClick(50)} />
              </td>
            </tr>
            <tr>
              <td>
                <a>
                  <img src={billete5k} className='billete' onClick={() => handleClick(5000)} />
                </a>
              </td>
              <td>
                <img src={moneda100} className='moneda' onClick={() => handleClick(100)} />
              </td>
            </tr>
            <tr>
              <td>
                <a>
                  <img src={billete10k} className='billete' onClick={() => handleClick(10000)} />
                </a>
              </td>
              <td>
                <img src={moneda500} className='moneda' onClick={() => handleClick(500)} />
              </td>
            </tr>
            <tr>
              <td>
                <a>
                  <img src={billete20k} className='billete' onClick={() => handleClick(20000)} />
                </a>
              </td>
            </tr>
            </tbody>
        </table>
      </div>
      <div className='totalAmount'>
        <h2>Monto total: {multaTotal}</h2>
        <h2>Monto ingresado: {totalAmount}</h2>
        <h2>Diferencia: {diferencia}</h2>
        <button type="button" className="btn btn-secondary reset" onClick={resetTotalAmount}>Reiniciar monto</button>
      
        <button type="button" onClick={handleSubmit} className="btn btn-success">Pagar Multa</button>
        <Link to={'/MainScreen'}>
          <button type="button" className="btn btn-danger">Cancelar</button>
        </Link>

        {message}
      </div>
    </center>
    </div>
  );
}

export default PaymentRegister;
