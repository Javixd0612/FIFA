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

  /* BANDERAS ACTUALIZADAS */
  const banderas = {
  Inglaterra: "https://flagcdn.com/w80/gb-eng.png",
  Argentina: "https://flagcdn.com/w80/ar.png",
  Brasil: "https://flagcdn.com/w80/br.png",
  España: "https://flagcdn.com/w80/es.png",
  Francia: "https://flagcdn.com/w80/fr.png",
  Alemania: "https://flagcdn.com/w80/de.png",
  Italia: "https://flagcdn.com/w80/it.png",
  Portugal: "https://flagcdn.com/w80/pt.png",
  Colombia: "https://flagcdn.com/w80/co.png",
  Venezuela: "https://flagcdn.com/w80/ve.png",
  "Países Bajos": "https://flagcdn.com/w80/nl.png",
  Uruguay: "https://flagcdn.com/w80/uy.png",
  Bélgica: "https://flagcdn.com/w80/be.png",
  México: "https://flagcdn.com/w80/mx.png",
  "Estados Unidos": "https://flagcdn.com/w80/us.png",
};

/* ESCUDOS CLUBES - Nombres unificados con la API y clubLiga */
const escudos = {
    "Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    "Real Madrid": "https://i.ibb.co/fzrCPdbR/Real-Madrid-CF-svg.png",
    "Liverpool": "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    "Chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    "Juventus": "https://i.ibb.co/HL2DKqN7/Juventus.png",
    "Inter-Miami": "https://upload.wikimedia.org/wikipedia/en/5/5c/Inter_Miami_CF_logo.svg", // Sin guion
    "Atlético Madrid": "https://i.ibb.co/B5M7TrbG/i.png",
    "Manchester United": "https://i.ibb.co/FPR1RsP/J.png",
    "Bayern Munich": "https://i.ibb.co/zWr3XCrx/bayer.png",
    "Paris Saint-Germain": "https://i.ibb.co/278DCLm5/paris.png",
    "Manchester-City": "https://i.ibb.co/ZR6kyKhq/Manchester-City-FC-badge-svg.png", // Sin guion
    "Arsenal": "https://i.ibb.co/4wL8q6R4/arsenal.png",
    "Inter de Milan": "https://i.ibb.co/vCdHxXH8/inter-de-milan-1.png", // Con tilde y nombre completo
    "AC de Milan": "https://i.ibb.co/39THWxJX/milan.png", // Nombre limpio
    "Borussia Dortmund": "https://i.ibb.co/fPHvyvP/boru-1.png",
  };


  /* LIGAS */
  const logosLigas = {
    "La Liga":
      "https://i.ibb.co/RGwf8jzy/laliga-Photoroom.png",
    "Premier League":
      "https://i.ibb.co/gLVQVnF8/LEON-Photoroom.png",

    "Serie A":
      "https://i.ibb.co/WYqZM2n/serie-Photoroom.png",
    "Bundesliga":
      "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",

    "Ligue 1":
      "https://i.ibb.co/W4hQzYSS/Ligue1-logo.png",

    "MLS":
      "https://i.ibb.co/pjpmhZmW/mls-logo3-Photoroom.png"
    
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