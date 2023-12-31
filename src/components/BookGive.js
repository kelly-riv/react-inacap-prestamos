import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BookGive = () =>{
    const [bookCode,setBookCode] = useState('')
    const inputStyle = {
        width: '250px',
        margin: 'auto',
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/entregar_libro', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ bookCode }), 
        })
        .then(response => response.json())
        .then(data => {
          alert(data.message)
          
        })
        .catch(error => console.error('Error al verificar el encargado:', error));
      };

    const handleChange =(event)=>{
        setBookCode(event.target.value)
    }

    return (
        <main className='principal'>
            <Link to={"/MainScreen"}>
                <button type="button" className="btn btn-secondary volver">Volver</button>
            </Link>
            <h1>Ingrese el código del libro que se devolverá:</h1> <br/><br/>
            <input
          style={inputStyle}
          type="text"
          className="form-control"
          placeholder="Ingrese el código del libro"
          name="book-code"
          onChange={handleChange}
          aria-label="Username"
          aria-describedby="basic-addon1"
        /> <br/>
        <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Devolver</button>

        </main>
      );

}

export default BookGive