import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SelectBooks() {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const bookCount = 1
  /* const bookCount = Number(location.state.bookCount); */
  const [selectedBooks, setSelectedBooks] = useState(Array(bookCount).fill(''));

  useEffect(() => {
    fetch('http://localhost:3001/obtener_libros')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const handleSelect = (index, selectedOptions) => {
    setSelectedBooks((prevSelectedBooks) => {
      const newSelectedBooks = [...prevSelectedBooks];
      newSelectedBooks[index] = selectedOptions;
      return newSelectedBooks;
    });
  };

  return (
    <center>
      {Array(bookCount).fill(null).map((_, index) =>
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
            multiple
          >
            {books.map((book) => (
              <option key={book.id_libro} value={book.id_libro}>
                {book.titulo}
              </option>
            ))}
          </select>
        </div>
      )}
    </center>
  );
}

export default SelectBooks;
