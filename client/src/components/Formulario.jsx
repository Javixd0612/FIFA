import { useEffect, useState } from "react";

function Formulario({ jugador, setJugador }) {
  const [paises, setPaises] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [pies, setPies] = useState([]);

  const posiciones = [
    "POR",
    "DFC",
    "LD",
    "LI",
    "MCD",
    "MC",
    "MCO",
    "EI",
    "ED",
    "DC"
  ];

  const clubLiga = {
    "Real Madrid": "La Liga",
    "Barcelona": "La Liga",
    "Manchester United": "Premier League",
    "Bayern Munich": "Bundesliga",
    "Juventus": "Serie A",
    "Paris Saint-Germain": "Ligue 1",
    "Liverpool": "Premier League",
    "Chelsea": "Premier League",
    "Atlético Madrid": "La Liga",
    "Inter de Milán": "Serie A"
  };
  

  useEffect(() => {
    fetch("http://localhost:3000/api/metadata")
      .then((res) => res.json())
      .then((data) => {
        setPaises(data.Pais);
        setClubes(data.Club);
        setLigas(data.Liga);
        setPies(data.Pie);
      });
  }, []);

  const cambiarHabilidad = (nombre, valor) => {
    setJugador({
      ...jugador,
      habilidades: {
        ...jugador.habilidades,
        [nombre]: valor
      }
    });
  };

  return (
    <form className="formulario">
      <h2>Crear Jugador</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={jugador.nombre}
        onChange={(e) =>
          setJugador({ ...jugador, nombre: e.target.value })
        }
      />

      <select
        value={jugador.pais}
        onChange={(e) =>
          setJugador({ ...jugador, pais: e.target.value })
        }
      >
        <option value="">País</option>
        {paises.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <select
        value={jugador.posicion}
        onChange={(e) =>
          setJugador({ ...jugador, posicion: e.target.value })
        }
      >
        <option value="">Posición</option>
        {posiciones.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <select
      value={jugador.club}
      onChange={(e)=>{
        const club = e.target.value;


        setJugador({
          ...jugador,
          club: club,
          liga: clubLiga[club]
        });
      }}
      >
      <option value="">Club</option>

      {clubes.map((item,i)=>(
      <option key={i}>{item}</option>
      ))}
      </select>
      
      <select
        value={jugador.liga}
        onChange={(e) =>
          setJugador({ ...jugador, liga: e.target.value })
        }
      >
        <option value="">Liga</option>
        {ligas.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <select
        value={jugador.pie}
        onChange={(e) =>
          setJugador({ ...jugador, pie: e.target.value })
        }
      >
        <option value="">Pie</option>
        {pies.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="GRL"
        value={jugador.grl}
        onChange={(e) =>
          setJugador({ ...jugador, grl: e.target.value })
        }
      />

      <h3>Stats</h3>

      <input
        type="number"
        placeholder="Ritmo"
        onChange={(e) =>
          cambiarHabilidad("ritmo", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Tiro"
        onChange={(e) =>
          cambiarHabilidad("tiro", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Pase"
        onChange={(e) =>
          cambiarHabilidad("pase", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Regate"
        onChange={(e) =>
          cambiarHabilidad("regate", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Defensa"
        onChange={(e) =>
          cambiarHabilidad("defensa", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Físico"
        onChange={(e) =>
          cambiarHabilidad("fisico", e.target.value)
        }
      />
    </form>
  );
}

export default Formulario;