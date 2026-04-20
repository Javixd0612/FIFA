function CardPreview({ jugador }) {
  return (
    <div className="card">

      {/* Arriba izquierda */}
      <div className="top-left">
        <h1>{jugador.grl || 0}</h1>
        <h3>{jugador.posicion || "??"}</h3>
        <p>{jugador.pais || "PAIS"}</p>
        <p>{jugador.club || "CLUB"}</p>
      </div>

      {/* Espacio imagen */}
      <div className="player-image"></div>

      {/* Nombre */}
      <h2>{jugador.nombre || "TU NOMBRE"}</h2>

      {/* Stats */}
      <div className="stats">

        <div>
          <p>{jugador.habilidades.ritmo || 0} RIT</p>
          <p>{jugador.habilidades.tiro || 0} TIR</p>
          <p>{jugador.habilidades.pase || 0} PAS</p>
        </div>

        <div>
          <p>{jugador.habilidades.regate || 0} REG</p>
          <p>{jugador.habilidades.defensa || 0} DEF</p>
          <p>{jugador.habilidades.fisico || 0} FIS</p>
        </div>

      </div>

      {/* PIE ABAJO */}
      <div className="foot-section">
        {jugador.pie}
      </div>

    </div>
  );
}

export default CardPreview;