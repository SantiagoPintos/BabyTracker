import { useSelector } from "react-redux"
import Biberones from "./Biberones"


const InformeEventos = () => {
    //id de la categoría de biberones es 35
    const eventos = useSelector(state => state.eventos.eventos);
    const biberones = eventos.filter(evento => evento.idCategoria == 35);
    return (
        <div>
            <h2 className="text-center pb-3">Informe de eventos</h2>
            <Biberones biberones={biberones} />
        </div>
    )
}

export default InformeEventos
