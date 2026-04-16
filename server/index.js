const express = require('express'); /* Express es un framework que sirve para crear aplicaciones web y APIs con Node.js, el va a gestionar las peticiones, (recibe/envia). */
const cors = require('cors'); /* cors es un Middleware (guradia de seguridad), que permite que React (frontend) se comunique con Node(backend) ya que el acepta peticiones de otros dominios*/

const app = express(); /* app es una instancia de express, es decir, es un objeto */
const jugadores = []; /* jugadores es un array vacio que va a almacenar la informacion de los jugadores que se reciban del frontend, es decir, del cliente */

//Middlewares
app.use(cors()); /* permite que el servidor acepte peticiones de otros dominios */
app.use(express.json()); /* permite que el servidor entienda las peticiones en formato JSON */
    
//Rutas
app.get('/', (req, res) => {  /* es una ruta que responde a la petición GET */ 
    res.send('Proyecto Fifa funcionando'); /* envía */
}); 

app.post('/api/jugadores' , (req, res) => { /* app es la variable que representa la aplicación Expres, el post va a enviar o crear la informacion, en la ruta /api/jugadores que seria como el camino que va a tomar, luego alli le damos la instruccion que vamos a recibir esa informacion del usuario y que la vamos a responder de la siguiente manera 
    va a mostrar el jugador con el console log, va a conetener la informacion dentro del cuerpo de la petición 
    para que finalmente de como resultado que se recibio la informacion y mando el dato del jugador */
    const jugador = req.body; /* primero obtiene a el jugador y luego lo guardamos la informacion en el  cuerpo de la petición */

    if (!jugador.nombre  || !jugador.pais || !jugador.posicion || !jugador.club || !jugador.league || !jugador.foot || !jugador.rating || !jugador.habilidades) { /* si el jugador no tiene alguno de estos campos, entonces se va a enviar un mensaje de error */
        return res.status(400).json({ message: 'Faltan campos obligatorios' }); /* responde con un mensaje de error y un status 400 que significa que la solicitud no se pudo procesar debido a un error del cliente */
    }

    console.log(jugador); /* muestra el jugador en la consola */

    jugadores.push(jugador); /* agrega el jugador al array de jugadores */

    res.json({ message: 'Jugador recibido correctamente' , 
        data: jugador 
        }); /* responde con un mensaje y los datos del jugador que se recibieron */
    }
);

app.get('/api/jugadores', (req, res) => {
    res.json(jugadores);
});

app.get('/api/metadata', (req, res) => {  /* esta ruta va a responder a la petición GET en la ruta /api/metadata, y va a enviar un objeto JSON con la información de los jugadores, como el pais, posicion, club, league, foot, rating y habilidades */
        res.json({   /* responde con un objeto JSON que contiene la información de los jugadores */
            Pais: ["Colombia", "Argentina", "Brasil", "Francia", "España"],
            Posicion: ["Portero", "Defensa", "Mediocampista", "Delantero"],
            Club: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Juventus"],
            League: ["La Liga", "Premier League", "Serie A", "Bundesliga", "Ligue 1"],
            Foot: ["Derecho", "Izquierdo"],
            Rating: "1-99",
            Habilidades: ["Velocidad", "Tiro", "Pase", "Regate", "Defensa"]
        }); 
    }
);

app.listen(3000, () => { /* el servidor escucha en el puerto 3000 */
    console.log('Servidor en puerto 3000'); 
}
);  






