const express = require('express'); /* Express es un framework que sirbe para crear aplicaciones web y APIs con Node.js, el va a gestionar las peticiones, (recibe/envia). */
const cors = require('cors'); /* cors es un Middleware (guradia de seguridad), que permite que React (frontend) se comunique con Node(backend) ya que el acepta peticiones de otros dominios*/

const app = express(); /* app es una instancia de express, es decir, es un objeto */

//Middlewares
app.use(cors()); /* permite que el servidor acepte peticiones de otros dominios */
app.use(express.json()); /* permite que el servidor entienda las peticiones en formato JSON */

//Rutas
app.get('/', (req, res) => {  /* es una ruta que responde a la petición GET */ 
    res.send('Proyecto Fifa funcionando'); /* envía */
}); 

app.listen(3306, () => { /* el servidor escucha en el puerto 3306 */
    console.log('Servidor en puerto 3306'); 
}
);





