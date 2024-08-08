import LogoutBoton from "./LogoutBoton"

const Header = () => {
    return (
      <div className="container-fluid">
          <div className="row mt-3">
                <nav className="col-9">
                </nav>
                <div className="col-3 d-flex justify-content-end">
                    <LogoutBoton />
                </div>
          </div>
      </div>
    )
}

export default Header