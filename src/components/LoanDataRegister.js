import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LoanDataRegister() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bookCount, setBookCount] = useState(0);
  const [idUser,setIdUser] = useState(1);
  const [idEncargado,setIdEncargado] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/insertar_prestamos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, idUser, idEncargado })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/SelectBooks', { state: { bookCount: bookCount } });
    });
  };

  return (
    <main>
      <label>Fecha de inicio del préstamo:</label>
      <input type="date" value={startDate} name="startDate" onChange={handleChange}  className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      <br></br>
      <br></br>
      <label>Fecha de termino del préstamo:</label>
      <input type="date" value={endDate} name="endDate" onChange={handleChange} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      <br></br>
      <br></br>
      <label>Cantidad de libros:</label>
      <input type="number" value={bookCount} onChange={e => setBookCount(e.target.value)} className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      <br></br>
      <br></br>

      <button type="button" onClick={handleSubmit} className="btn btn-secondary">Continuar</button>

      <Link to={"/MainScreen"}>
        <button type="button" className="btn btn-secondary volver" >Cancelar</button>
      </Link>
    </main>
  );
}

export default LoanDataRegister;
