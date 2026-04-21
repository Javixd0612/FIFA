import html2canvas from "html2canvas";
import { useRef } from "react";

function CardPreview({ jugador }) {
  const cartaRef = useRef();

  const stats = jugador.habilidades || {
    ritmo: 0,
    tiro: 0,
    pase: 0,
    regate: 0,
    defensa: 0,
    fisico: 0
  };

  const cartaLista =
    jugador.nombre &&
    jugador.pais &&
    jugador.posicion &&
    jugador.club &&
    (
      stats.ritmo ||
      stats.tiro ||
      stats.pase ||
      stats.regate ||
      stats.defensa ||
      stats.fisico
    );

  const descargarCarta = async () => {
    if (!cartaRef.current) return;

    const canvas = await html2canvas(cartaRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2
    });

    const link = document.createElement("a");
    link.download = `carta-${jugador.nombre || "fifa"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* BANDERAS */
  const banderas = {
    Venezuela: "https://flagcdn.com/w80/ve.png",
    Colombia: "https://flagcdn.com/w80/co.png",
    Argentina: "https://flagcdn.com/w80/ar.png",
    Brasil: "https://flagcdn.com/w80/br.png",
    Portugal: "https://flagcdn.com/w80/pt.png",
    España: "https://flagcdn.com/w80/es.png",
    Francia: "https://flagcdn.com/w80/fr.png",
    Alemania: "https://flagcdn.com/w80/de.png",
    Italia: "https://flagcdn.com/w80/it.png"
  };

  /* ESCUDOS CLUBES - Corregido el link del Real Madrid */
const escudos = {
  "Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", 
  "Liverpool": "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "Juventus": "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
  "Inter-Miami": "https://upload.wikimedia.org/wikipedia/en/5/5c/Inter_Miami_CF_logo.svg",
  "Atlético Madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "Manchester United": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "Bayern Munich": "https://upload.wikimedia.org/wikipedia/commons/1/1f/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
  "Paris Saint-Germain": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"
};

  /* LIGAS */
  const logosLigas = {
    "La Liga":
      "https://upload.wikimedia.org/wikipedia/commons/0/03/LaLiga_logo.svg",

    "Premier League":
      "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",

    "Serie A":
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",

    "Bundesliga":
      "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",

    "Ligue 1":
      "https://upload.wikimedia.org/wikipedia/en/c/c7/Ligue1.svg",

    "MLS":
      "https://upload.wikimedia.org/wikipedia/en/7/76/Major_League_Soccer_logo.svg"
  };

  const promedio =
    (
      Number(stats.ritmo) +
      Number(stats.tiro) +
      Number(stats.pase) +
      Number(stats.regate) +
      Number(stats.defensa) +
      Number(stats.fisico)
    ) / 6;

  const grl = Math.round(promedio);

  let tipoCarta = "normal";

  if (grl > 0 && grl < 70) tipoCarta = "bronce";
  else if (grl >= 70 && grl < 80) tipoCarta = "plata";
  else if (grl >= 80 && grl < 90) tipoCarta = "azul";
  else if (grl >= 90) tipoCarta = "oro";

  return (
    <div className="preview-container">
      <div ref={cartaRef} className={`card ${tipoCarta}`}>

        {/* GRL */}
        <div className="top-left">
          <h1>{grl || 0}</h1>
          <h3>{jugador.posicion || "??"}</h3>
        </div>

        {/* SOLO ICONOS */}
        <div className="logos-card">
          {banderas[jugador.pais] && <img src={banderas[jugador.pais]} alt="bandera" className="bandera" />}
          {escudos[jugador.club] && <img src={escudos[jugador.club]} alt="escudo" className="escudo" />}
          {logosLigas[jugador.liga] && <img src={logosLigas[jugador.liga]} alt="liga" className="liga-logo" />}
        </div>

        {/* FOTO */}
        <div className="player-image">
          <img
            src={
              jugador.imagen ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Jugador"
          />
        </div>

        {/* NOMBRE */}
        <h2>{jugador.nombre || "TU NOMBRE"}</h2>

        {/* STATS */}
        <div className="stats">
          <div className="stat-group">
            <p><strong>{stats.ritmo || 0}</strong> RIT</p>
            <p><strong>{stats.tiro || 0}</strong> TIR</p>
            <p><strong>{stats.pase || 0}</strong> PAS</p>
          </div>

          <div className="stat-group">
            <p><strong>{stats.regate || 0}</strong> REG</p>
            <p><strong>{stats.defensa || 0}</strong> DEF</p>
            <p><strong>{stats.fisico || 0}</strong> FIS</p>
          </div>
        </div>

        <div className="foot-section">
          {jugador.pie || "PIE"}
        </div>
      </div>

      <button
        className="btn-descargar"
        onClick={descargarCarta}
        disabled={!cartaLista}
      >
        {cartaLista ? "Descargar Carta" : "Completa la Carta"}
      </button>
    </div>
  );
}

export default CardPreview;