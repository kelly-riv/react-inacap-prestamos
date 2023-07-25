import React, {useState,useEffect} from "react";


const LoanTableFragment =({prestamos})=>{

return(
    <div className="table-responsive">
        <h1>Listado de Préstamos</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID Préstamo</th>
                <th>Fecha Inicio</th>
                <th>Fecha Devolución</th>
                <th>Multa Total</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((prestamo) => (
                <tr key={prestamo.id_prestamo}>
                  <td>{prestamo.id_prestamo}</td>
                  <td>{prestamo.fecha_inicio}</td>
                  <td>{prestamo.fecha_devolucion}</td>
                  <td>{prestamo.multa_total}</td>
                </tr>
              ))
        }
            </tbody>    
          </table>
        </div>
);
}

export default LoanTableFragment