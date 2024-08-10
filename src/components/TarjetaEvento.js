import { useSelector } from "react-redux";
import { IMG_API_URL } from "../constants/constants";
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

const TarjetaEvento = ({evento}) => {
    const categorias = useSelector(state => state.categorias.categorias);
    /*
        Se usa "==" en vez de "===" de forma INTENCIONAL
        El id que viene de la api es string, pero el id almacenado
        por el globalState de Redux es un nro, por lo tanto la comparacion
        debe ser débil
    */
    const categoria = categorias.find(categoria => categoria.id == evento.idCategoria);
    //img es de 38x38px
    const imgUrl = `${IMG_API_URL}${categoria.imagen}.png`;
    return (
        <Card sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <CardMedia
              component="img"
              image={imgUrl}
              alt={`Imagen de categoria ${categoria.tipo}`}
              sx={{ width: 38, height: 38 }}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="body1">{categoria.tipo}</Typography>
              <Typography variant="body2">{evento.detalle}</Typography>
              <Typography variant="body2" color="textSecondary">
                {evento.fecha}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Button variant="contained" color="primary">
              Eliminar
            </Button>
          </Box>
        </Card>
    )
}

export default TarjetaEvento;
