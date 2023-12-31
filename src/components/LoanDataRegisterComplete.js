import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LoanDataRegisterComplete() {
  const inputStyle = {
    width: '330px',
  }
  const [rut, setRut] = useState('');
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bookCount, setBookCount] = useState(0);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const count = 1
  const [selectedBooks, setSelectedBooks] = useState(Array(bookCount).fill(''));

  useEffect(() => {
    fetch('http://localhost:3001/obtener_libros')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const handleSelect = (index, selectedOptions) => {
    alert(selectedBooks)
    setSelectedBooks([])
    setSelectedBooks(selectedOptions);
    alert(selectedBooks)
  };
  
  const handleChange = (event) => {
    if (event.target.name === 'rut') {
      setRut(event.target.value);
    }
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const obtenerTipoUsuario = () => {
    fetch('http://localhost:3001/obtener_tipo_usuario', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ rut }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUserType(data.docente);
          setError(data.message)
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el tipo de usuario:', error);
        setError('Error al obtener el tipo de usuario: ' + error);
      });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    obtenerTipoUsuario();
  }

  const handleSubmit1 = () => {
    fetch('http://localhost:3001/insertar_prestamos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, selectedBooks })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(data.message)
    });
  };

  const handleFinalSubmit = (event) => {
    handleSubmit(event);
    handleSubmit1();
  };

  return (
    <main className='principal'>
      <h1>Ingrese los datos para registrar el préstamo</h1><br/>
      <button type="button" className="btn btn-secondary volver" onClick={() => navigate("/MainScreen")}>Volver</button>
      <form className='form'>
        <div className="input-group mb-3">
          <input style={inputStyle} name='rut' onChange={handleChange} type="text" className="form-control" placeholder="Ingrese RUT del solicitante (Ej: 11111111-1)" aria-label="Ingrese RUT del solicitante (Ej: 11111111-1)" aria-describedby="basic-addon2"/>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Verificar</button>
      </form>
      {error && <div>{error}</div>}
      <label>Fecha de inicio del préstamo:</label>
      <input type="date" value={startDate} name="startDate" onChange={handleChange}  className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      <br></br>
      <br></br>
      <label>Fecha de termino del préstamo:</label>
      <input type="date" value={endDate} name="endDate" onChange={handleChange} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      <br></br>
      <br></br>
      <Link to={"/MainScreen"}>
        <button type="button" className="btn btn-secondary volver" >Volver</button>
      </Link>
      <label>Seleccione el libro deseado</label>
      {Array(count).fill(null).map((_, index) =>
        <div key={index}>
          <select
            onChange={(e) =>
              handleSelect(
                index,
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={selectedBooks[index]}
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          > 
            {books.map((book) => (
              <option key={book.id_libro} value={book.id_libro}>
                {book.titulo}
              </option>
            ))}
          </select>
        </div>
      )}
      <button type="button" onClick={handleFinalSubmit} className="btn btn-secondary">Continuar</button>
    </main>
  );
}
export default LoanDataRegisterComplete;
