import { useEffect, useState } from "react";

function Formulario({ jugador, setJugador }) {
  
  const API = import.meta.env.VITE_API_URL;
  const [paises, setPaises] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [pies, setPies] = useState([]);

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const posiciones = [
    "POR", "DFC", "LD", "LI", "MCD",
    "MC", "MCO", "EI", "ED", "DC"
  ];

 const clubLiga = {
    // España - La Liga
    "Real Madrid": "La Liga",
    "Barcelona": "La Liga",
    "Atlético Madrid": "La Liga",

    // Inglaterra - Premier League
    "Manchester United": "Premier League",
    "Manchester-City": "Premier League",
    "Liverpool": "Premier League",
    "Chelsea": "Premier League",
    "Arsenal": "Premier League",

    // Italia - Serie A
    "Juventus": "Serie A",
    "Inter de Milan": "Serie A",
    "AC de Milan": "Serie A",

    // Alemania - Bundesliga
    "Bayern Munich": "Bundesliga",
    "Borussia Dortmund": "Bundesliga",

    // Francia - Ligue 1
    "Paris Saint-Germain": "Ligue 1",

    // USA - MLS
    "Inter-Miami": "MLS",
  };

  const validarNumero = (valor) => {
    let num = parseInt(valor);

    if (isNaN(num)) return "";
    if (num < 1) return 1;
    if (num > 99) return 99;

    return num;
  };

  const datosCompletos =
    jugador.nombre &&
    jugador.pais &&
    jugador.posicion &&
    jugador.club &&
    jugador.liga &&
    jugador.pie;

  const cambiarHabilidad = (nombre, valor) => {
    const numero = validarNumero(valor);

    setJugador({
      ...jugador,
      habilidades: {
        ...jugador.habilidades,
        [nombre]: numero
      }
    });
  };

  const guardarCarta = async (e) => {
    e.preventDefault();

    const h = jugador.habilidades;

    const promedio = Math.round(
      (
        Number(h.ritmo || 0) +
        Number(h.tiro || 0) +
        Number(h.pase || 0) +
        Number(h.regate || 0) +
        Number(h.defensa || 0) +
        Number(h.fisico || 0)
      ) / 6
    );

    setGuardando(true);
    setMensaje("");
    setError("");

    try {
      const respuesta = await fetch(`${API}/api/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...jugador,
          grl: promedio
        })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(data.message);

        setJugador({
          nombre: "",
          pais: "",
          posicion: "",
          club: "",
          liga: "",
          pie: "",
          grl: "",
          imagen: "",
          habilidades: {
            ritmo: "",
            tiro: "",
            pase: "",
            regate: "",
            defensa: "",
            fisico: ""
          }
        });

      } else {
        setError(data.error);
      }

    } catch {
      setError("Error servidor");
    }

    setGuardando(false);
  };

  useEffect(() => {
    fetch(`${API}/api/metadata`)
      .then((res) => res.json())
      .then((data) => {
        setPaises(data.Pais);
        setClubes(data.Club);
        setLigas(data.Liga);
        setPies(data.Pie);
      });
  }, []);

  return (
    <form className="formulario" onSubmit={guardarCarta}>

      <h2>Crear Jugador</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={jugador.nombre}
        onChange={(e) =>
          setJugador({
            ...jugador,
            nombre: e.target.value
          })
        }
      />

      <select
        value={jugador.pais}
        onChange={(e) =>
          setJugador({
            ...jugador,
            pais: e.target.value
          })
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
          setJugador({
            ...jugador,
            posicion: e.target.value
          })
        }
      >
        <option value="">Posición</option>

        {posiciones.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <select
        value={jugador.club}
        onChange={(e) => {
          const club = e.target.value;

          setJugador({ 
            ...jugador,
            club,
            liga: clubLiga[club] || ""
          });
        }}
      >
        <option value="">Club</option>

        {clubes.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <select
        value={jugador.liga}
        onChange={(e) =>
          setJugador({
            ...jugador,
            liga: e.target.value
          })
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
          setJugador({
            ...jugador,
            pie: e.target.value
          })
        }
      >
        <option value="">Pie</option>

        {pies.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={(e) => {
          const archivo = e.target.files[0];

          if (archivo) {
            const url = URL.createObjectURL(archivo);

            setJugador({
              ...jugador,
              imagen: url
            });
          }
        }}
      />

      <h3>Stats</h3>

      <input type="number" placeholder="Ritmo" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("ritmo", e.target.value)} />
      <input type="number" placeholder="Tiro" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("tiro", e.target.value)} />
      <input type="number" placeholder="Pase" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("pase", e.target.value)} />
      <input type="number" placeholder="Regate" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("regate", e.target.value)} />
      <input type="number" placeholder="Defensa" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("defensa", e.target.value)} />
      <input type="number" placeholder="Físico" disabled={!datosCompletos} onChange={(e) => cambiarHabilidad("fisico", e.target.value)} />

      <button type="submit">
        {guardando ? "Guardando..." : "Guardar Carta"}
      </button>

      {mensaje && <p className="exito">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

    </form>
  );
}

export default Formulario;