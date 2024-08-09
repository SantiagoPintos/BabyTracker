import { useSelector } from "react-redux";
import { API_URL } from "../constants/constants";
import { useState, useRef } from "react";

const AgregarEvento = () => {
  const categorias = useSelector(state => state.categorias.categorias);
  const [categoria, setCategoria] = useState(null);
  const detalle = useRef('');
  const fecha = useRef('');

  const cargarCategorias = (event) => {
    const idCategoria = event.target.value;
    if(idCategoria === -1) return;
    setCategoria(idCategoria);
  };

  const agregarEvento = () => {
    const fechaActual = new Date().toISOString().split('T')[0];
    if(categoria === null || categoria === -1 || detalle.current.value === '' || fecha.current.value === '' || new Date(fecha.current.value) > new Date(fechaActual)){
      alert('Datos incorrectos');
      return;
    }
    const usuario = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const evento = {
      idCategoria: categoria,
      idUsuario: usuario,
      detalle: detalle.current.value,
      fecha: fecha.current.value,
    };
    fetch(API_URL+'eventos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': usuario,
        'iduser': id,
      },
      body: JSON.stringify(evento)
    })
    .then(response => response.json())
    .then(data => {
      if(data.codigo === 200){
        alert(data.mensaje);
      } else {
        alert(data.mensaje);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h2>Agregar nuevo evento</h2>
        <div className="form-floating">
          <input type="text" className="form-control" id="detalle" ref={detalle} />
          <label htmlFor="nombre">Detalles</label>
        </div>
        <div className="form-floating my-3">
          <select className="form-select" id="selectDepto" onChange={cargarCategorias}>
              <option key={-1} value={-1}>Seleccione...</option>
              {
                categorias !== null && categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
                ))
              }
          </select>
          <label htmlFor="selectDpto">Categoría</label>
        </div>
        <div className="form-floating">
          <input type="date" className="form-control" id="detalle" ref={fecha} />
          <label htmlFor="nombre">Detalles</label>
        </div>
         <input className="btn btn-primary my-3" type="button" value="Agregar" onClick={agregarEvento}/>
      </div>
    </div>
  )
};

export default AgregarEvento;
