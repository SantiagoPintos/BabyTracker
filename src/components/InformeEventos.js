import { useSelector } from "react-redux"
import Biberones from "./Biberones"


const InformeEventos = () => {
    //id de la categoría de biberones es 35
    const eventos = useSelector(state => state.eventos.eventos);
    const biberones = eventos.filter(evento => evento.idCategoria == 35);
    const panales = eventos.filter(evento => evento.idCategoria == 33);
    return (
        <div>
            <h2 className="text-center pb-3">Informe de eventos</h2>
            <Biberones
                imagen={5} 
                elemento={biberones} 
                nombre={'Biberones'} 
            />
            
            <Biberones 
                imagen={3} 
                elemento={panales} 
                nombre={'Pañales'} 
            />
        </div>
    )
}

export default InformeEventos
