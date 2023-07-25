import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BookGive = () =>{
    const [bookCode,setBookCode] = useState('')

    return (
        <main>
            <Link to={"/MainScreen"}>
                <button type="button" className="btn btn-secondary">Volver</button>
            </Link>
        </main>
      );

}

export default BookGive