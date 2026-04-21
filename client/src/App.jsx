import "./App.css";
import { useState } from "react";
import Formulario from "./components/Formulario";
import CardPreview from "./components/CardPreview";

function App() {
  const [jugador, setJugador] = useState({ 
    /* con el UseState inicializamos el estado del jugador, la funcion va a retornar un array, en el que contiene el valor inicial que se podra actualizar y el otro sera la funcion que vamos a llamar para actualizarlo */
    nombre: "",
    pais: "",
    posicion: "",
    club: "",
    liga: "",
    pie: "",
    grl: "",
    img:"",
    
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
        setJugador={setJugador}/>
      </section>

    </div>
  );
}

export default App;