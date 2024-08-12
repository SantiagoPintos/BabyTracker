import { useSelector } from "react-redux"
import TarjetaInformeEventosHoy from "./TarjetaInformeEventosHoy"


const InformeEventos = () => {
    //id de la categoría de biberones es 35
    const eventos = useSelector(state => state.eventos.eventos);
    const biberones = eventos.filter(evento => evento.idCategoria == 35);
    const panales = eventos.filter(evento => evento.idCategoria == 33);
    return (
        <div>
            <h4 className="text-center pb-3">Informe de eventos diarios</h4>
            <div className="row">
                <div className="col-6">
                <TarjetaInformeEventosHoy
                    imagen={5} 
                    elemento={biberones} 
                    nombre={'Biberones'}
                />
                </div>
                <div className="col-6">
                <TarjetaInformeEventosHoy 
                    imagen={3} 
                    elemento={panales} 
                    nombre={'Pañales'} 
                />
                </div>

            </div>
        </div>
    )
}

export default InformeEventos
