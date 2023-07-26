import React, { useState } from 'react';
import {Navigate } from 'react-router-dom';
import LogoInacap from '../media/1200px-Logotipo_Inacap.svg.png';
import InacapImage1 from '../media/header-sede.jpg';
import InacapImage2 from '../media/header3.jpg';
import InacapImage3 from '../media/maxresdefault.jpg';
import CarouselFragment from './fragments/CarouselFragment';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import WaveFragment from "./fragments/WaveFragment.js";

import wave from "../assets/images/wave.svg"

function LoginScreen() {
  const inputStyle = {
    width: '250px',
    margin: 'auto',
  };
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'rut') {
      setRut(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/encargado_existe', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ rut, password }), 
    })
    .then(response => response.json())
    .then(data => {
      if (data === 1) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage('Rut o contraseña incorrectos.');
      }
    })
    .catch(error => console.error('Error al verificar el encargado:', error));
  };

  const LogoInacapStyles = {
    width: '200px',
    height: 'auto',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  if (isAuthenticated) {
    return <Navigate to="/MainScreen" />;
  }

  return (
    <>
    <main className='login'>
      <h1>Bienvenido al servicio de préstamo de libros</h1>
      <br/>

      <CarouselFragment
        img1={InacapImage1}
        img2={InacapImage2}
        img3={InacapImage3}
      />
      <img src={LogoInacap} style={LogoInacapStyles} alt="Logo Inacap" />
      <br></br>
      <h2>Para continuar, inicie sesión</h2>
      <form className='LoginForm' onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          className="form-control"
          placeholder="Ingrese su RUT Ej: '11111111-1'"
          name="rut"
          value={rut}
          onChange={handleChange}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <br></br>
        <input
          style={inputStyle}
          type="password"
          className="form-control"
          placeholder="Ingrese su contraseña"
          name="password"
          value={password}
          onChange={handleChange}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <br></br>
        <button type="submit" className="btn btn-secondary">Iniciar Sesión</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </main>
    <footer>
      
    <WaveFragment image={wave} />

    </footer>
    </>
  );
}

export default LoginScreen;
