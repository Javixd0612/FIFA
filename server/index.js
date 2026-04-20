const express = require("express"); /* Libreria de framework. */
const cors = require("cors"); /* Middleware para comunicación frontend-backend */

const app = express(); 
const jugadores = []; 
const cards = []; 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// --- RUTAS ---

app.get("/", (req, res) => {
  res.send("Proyecto Fifa Funcionando");
});

// Obtener todos los jugadores
app.get("/api/jugadores", (req, res) => {
  res.json(jugadores);
});

// Crear un jugador
app.post("/api/jugadores", (req, res) => {
  const jugador = req.body;

  if (
    !jugador.nombre ||
    !jugador.pais ||
    !jugador.posicion ||
    !jugador.club ||
    !jugador.liga ||
    !jugador.pie ||
    !jugador.grl ||
    !jugador.habilidades ||
    !jugador.habilidades.ritmo ||
    !jugador.habilidades.tiro ||
    !jugador.habilidades.pase ||
    !jugador.habilidades.regate ||
    !jugador.habilidades.defensa
  ) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }

  console.log("Jugador recibido:", jugador);
  jugadores.push(jugador);

  res.json({
    message: "Jugador recibido correctamente",
    data: jugador,
  });
});

app.get("/api/metadata", (req, res) => {
  res.json({
    
    
    Pais: ["Argentina", "Brasil", "España", "Francia", "Alemania", "Inglaterra", "Italia", "Portugal", "Países Bajos", "Colombia", "México", "Estados Unidos", "Rusia", "Japón", "Venezuela"],
    Club: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Juventus", "Paris Saint-Germain", "Liverpool", "Chelsea", "Atlético Madrid", "Inter de Milán", "Atletico Parceros", "Seleccion", "Inter-Miami"],
    Liga: ["La Liga", "Premier League", "Serie A", "Bundesliga", "Ligue 1", "MLS", "Brasileirão", "Liga Argentina", "Copa-America", "UEFA-EURO"],
    Pie: ["Derecho", "Izquierdo", "Ambidiestro", "Ninguno"],
    Habilidades: {
      ritmo: [1, 99],
      tiro: [1, 99],
      pase: [1, 99],
      regate: [1, 99],
      defensa: [1, 99],
    },
  });
});

// Crear una carta (POST)
app.post("/api/cards", (req, res) => {
  const nuevaCarta = req.body;

  if (
    !nuevaCarta.nombre ||
    !nuevaCarta.pais ||
    !nuevaCarta.club ||
    !nuevaCarta.posicion ||
    !nuevaCarta.habilidades ||
    !nuevaCarta.grl ||
    !nuevaCarta.liga ||
    !nuevaCarta.pie 
  ) {
    return res.status(400).json({
      error: "Faltan campos obligatorios",
    });
  }

  cards.push(nuevaCarta);

  res.json({
    message: "Carta creada correctamente",
    data: nuevaCarta,
  });
});

// Ver todas las cartas (GET)
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

