import { useSelector } from "react-redux"
import LogoutBoton from "./LogoutBoton"

const Header = () => {
    const estaLogueado = useSelector((state) => state.login.estaLogueado);

    return (
      <div className="container-fluid">
          <div className="row mt-3">
              <nav className="col-9">
              </nav>
              <div className="col-3 d-flex justify-content-end">
                  {estaLogueado ? <LogoutBoton /> : null}
              </div>
          </div>
      </div>
    )
}

export default Header