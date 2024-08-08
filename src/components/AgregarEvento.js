import { API_URL } from "../constants/constants";

const AgregarEvento = ({categorias}) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h2>Agregar nuevo evento</h2>
        <div className="form-floating">
          <input type="text" className="form-control" id="detalle" placeholder="Detalles del evento" />
          <label htmlFor="nombre">Detalles</label>
        </div>
      </div>
    </div>
  )
};

export default AgregarEvento;
