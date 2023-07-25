import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LoanRegister() {

  const inputStyle = {
    width: '330px',
  }
  const [rut, setRut] = useState('');
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === 'rut') {
      setRut(event.target.value);
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
    event.preventDefault();
    obtenerTipoUsuario();
  }

  useEffect(() => {
    if(userType !== null) {
      navigate('/LoanDataRegister');
    }
  }, [userType]);

  return (
    <main>
        <button type="button" className="btn btn-secondary volver" onClick={() => navigate("/MainScreen")}>Volver</button>
        <form className='form' onSubmit={handleSubmit}>
          <div className="input-group mb-3">
              <input style={inputStyle} name='rut' onChange={handleChange} type="text" className="form-control" placeholder="Ingrese RUT del solicitante (Ej: 11111111-1)" aria-label="Ingrese RUT del solicitante (Ej: 11111111-1)" aria-describedby="basic-addon2"/>
          </div>
          <button type="submit" className="btn btn-secondary">Continuar</button>
        </form>
        {error && <div>{error}</div>}
    </main>
  );
}

export default LoanRegister;
