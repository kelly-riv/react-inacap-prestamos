import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserSearch = () => {

  return (
    <div>
        <Link to={"/MainScreen"}>
            <button type="button" className="btn btn-secondary volver" >Volver</button>
        </Link>
        <center>
            <InputGroup className="mb-3">
            <Form.Control
            placeholder="Ingresa rut del usuario"
            />
            </InputGroup>
            <Button variant="outline-secondary" id="button-addon2">
                Buscar
            </Button>
            
        </center>
    </div>
  );
};

export default UserSearch;
