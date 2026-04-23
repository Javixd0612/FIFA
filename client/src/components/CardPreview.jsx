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
 Inglaterra:"https://flagcdn.com/gb.svg",
 Argentina:"https://flagcdn.com/ar.svg",
 Brasil:"https://flagcdn.com/br.svg",
 España:"https://flagcdn.com/es.svg",
 Francia:"https://flagcdn.com/fr.svg",
 Alemania:"https://flagcdn.com/de.svg",
 Italia:"https://flagcdn.com/it.svg",
 Portugal:"https://flagcdn.com/pt.svg",
 Colombia:"https://flagcdn.com/co.svg",
 Venezuela:"https://flagcdn.com/ve.svg",
 "Países Bajos":"https://flagcdn.com/nl.svg",
 Uruguay:"https://flagcdn.com/uy.svg",
 Bélgica:"https://flagcdn.com/be.svg",
 México:"https://flagcdn.com/mx.svg",
 "Estados Unidos":"https://flagcdn.com/us.svg"
};

/* ESCUDOS CLUBES - Nombres unificados con la API y clubLiga */
const escudos = {
  "Barcelona":"https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Liverpool":"https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Inter-Miami":"https://upload.wikimedia.org/wikipedia/en/5/5c/Inter_Miami_CF_logo.svg",
  "Manchester United":"https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "Paris Saint-Germain":"https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "Arsenal":"https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "Inter de Milan":"https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
  "Real Madrid": "/client/public/logos/realmadrid.png",
  "Chelsea": "/client/public/logos/chelsea.png",
  "Juventus": "/client/public/logos/juventus.png",
  "Atlético Madrid": "/client/public/logos/atletico.png",
  "Manchester-City": "/client/public/logos/mancity.png",
  "Bayern Munich": "/client/public/logos/bayern.png",
  "AC de Milan": "/client/public/logos/acmilan.png",
  "Borussia Dortmund": "/client/public/logos/dortmund.png"
};


  /* LIGAS */
  const logosLigas = {
  "Premier League":"https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
  "Serie A":"https://1000logos.net/wp-content/uploads/2021/10/Serie-A-logo.png",
  "La Liga": "/client/public/logos/laliga.png",
  "Ligue 1": "/client/public/logos/ligue1.png",
  "MLS": "/client/public/logos/mls.png",
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