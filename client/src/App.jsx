import "./App.css";
import { useState } from "react";
import Formulario from "./components/Formulario";
import CardPreview from "./components/CardPreview";

function App() {
  const [jugador, setJugador] = useState({
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

  return (
    <div className="container">

      <section className="left-panel">
        <Formulario
          jugador={jugador}
          setJugador={setJugador}
        />
      </section>

      <section className="right-panel">
        <CardPreview
          jugador={jugador}
        />
      </section>

    </div>
  );
}

export default App;