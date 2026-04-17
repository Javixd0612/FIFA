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
  res.send("Proyecto Fifa funcionando");
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
    !jugador.league ||
    !jugador.foot ||
    !jugador.rating ||
    !jugador.habilidades
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
    Pais: ["Colombia", "Argentina", "Brasil", "Francia", "España"],
    Posicion: ["Portero", "Defensa", "Mediocampista", "Delantero"],
    Club: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Juventus"],
    League: ["La Liga", "Premier League", "Serie A", "Bundesliga", "Ligue 1"],
    Foot: ["Derecho", "Izquierdo"],
    Rating: "1-99",
    Habilidades: ["Velocidad", "Tiro", "Pase", "Regate", "Defensa"],
  });
});

// Crear una carta (POST)
app.post("/api/cards", (req, res) => {
  const nuevaCarta = req.body;

  // Validación básica
  if (!nuevaCarta.nombre || !nuevaCarta.pais) {
    return res.status(400).json({
      error: "Faltan datos obligatorios",
    });
  }

  // Validar habilidades
  if (!Array.isArray(nuevaCarta.habilidades)) {
    return res.status(400).json({
      error: "Habilidades debe ser un array",
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