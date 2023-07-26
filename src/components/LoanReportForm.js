import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoanTableFragment from './fragments/LoanTableFragment';

function LoanReportForm() {

  const [state,setState] = useState([])


  const obtenerPrestamos = () => {
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
      .then((data) => setState(data))
      .catch((error) => console.error('Error al obtener los préstamos:', error));
  };

  const [loanDate,setLoanDate] = useState();
  const [texto, setTexto] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/obtener_texto') 
      .then(response => response.json())
      .then(data => setTexto(data.texto))
      .catch(error => console.error('Error al obtener el texto:', error));
  }, []);

  const handleChange = (event) => {
    if (event.target.name === 'loanDate') {
      setLoanDate(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    fetch('http://localhost:3001/generar_reporte_fecha', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ loanDate }), 
    })
    .then(response => response.json())
    .then(data => {
      setState(data)
      console.log(data);
    });
  };
  

  const inputStyle = {
    width: '500px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  return (
    <main className='principal'>
      <Link to={"/MainScreen"}>
        <button type="button" className="btn btn-secondary volver" >Volver</button>
      </Link>
      <p>{texto}</p>
      <h1>Generar un reporte</h1>
      <div className="input-group mb-3">
        <input
          name='loanDate'
          type="text"
          className="form-control"
          placeholder="Ingrese la fecha de la cual desea obtener un reporte (DD-MM-AAAA)"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Generar</button>
      <LoanTableFragment prestamos={state}/>

      



    </main>
  );
};

export default LoanReportForm
