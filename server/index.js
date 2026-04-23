const express = require("express");
const cors = require("cors");

const app = express();

const cards = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Proyecto Fifa Funcionando");
});

app.get("/api/metadata", (req, res) => {
  res.json({
    Pais: [
      "Inglaterra",
      "Argentina",
      "Brasil",
      "España",
      "Francia",
      "Alemania",
      "Italia",
      "Portugal",
      "Colombia",
      "Venezuela",
      "Países Bajos",
      "Uruguay",
      "Bélgica",
      "México",
      "Estados Unidos",
    ],

    Club: [
      "Real Madrid",
      "Barcelona",
      "Manchester United",
      "Manchester-City",
      "Bayern Munich",
      "Juventus",
      "Paris Saint-Germain",
      "Liverpool",
      "Chelsea",
      "Atlético Madrid",
      "Inter de Milan",
      "Inter-Miami",
      "Arsenal",
      "AC de Milan",
      "Borussia Dortmund", 
    ],

    Liga: [
      "La Liga",
      "Premier League",
      "Serie A",
      "Bundesliga",
      "Ligue 1",
      "MLS",
    ],

    Pie: ["Derecho", "Izquierdo", "Ambidiestro"],
  });
});

app.post("/api/cards", (req, res) => {
  const nuevaCarta = req.body;

  if (
    !nuevaCarta.nombre.trim() ||
    !nuevaCarta.pais ||
    !nuevaCarta.club ||
    !nuevaCarta.posicion ||
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

app.get("/api/cards", (req, res) => {
  res.json(cards);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});