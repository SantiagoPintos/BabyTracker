import LogoutBoton from "./LogoutBoton"
import { estaLogueado } from "../utils/ManejadorDeLogin";

const Header = () => {
    const logueado = estaLogueado();

    return (
      <div className="container-fluid">
          <div className="row mt-3">
              <nav className="col-9">
              </nav>
              <div className="col-3 d-flex justify-content-end">
                  {logueado ? <LogoutBoton /> : null}
              </div>
          </div>
      </div>
    )
}

export default Header