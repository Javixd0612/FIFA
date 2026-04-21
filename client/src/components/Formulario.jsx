import { useEffect, useState } from "react";

function Formulario({ jugador, setJugador }) { 

  const [paises, setPaises] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [pies, setPies] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const posiciones = [
    "POR", "DFC", "LD", "LI", "MCD", "MC", "MCO", "EI", "ED", "DC"
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
  
  /*Validar numero 1-99 */
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

  /*Actualizar las Stats*/
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


  const guardarCarta = async (e) => { /* Cree una función asíncrona que evita que el formulario recargue la página (e.preventDefault). Activo un estado de carga (setGuardando(true)) para avisar al usuario.
Uso un bloque de seguridad try para pedirle al fetch que envíe un POST a la API. Le aviso que mando un JSON y convierto mi objeto jugador a texto con JSON.stringify.
Espero la respuesta, la convierto en un objeto legible con data y verifico: si el servidor dice que todo está ok, muestro el éxito; si no, muestro el error del backend. Si el servidor ni siquiera responde, el catch atrapa el fallo y muestra 'Error servidor'. Finalmente, apago el estado de carga */
  e.preventDefault();

  const h = jugador.habilidades;

  const promedio = Math.round(
    Number(h.ritmo || 0) +
    Number(h.tiro || 0) +
    Number(h.pase || 0) +
    Number(h.regate || 0) +
    Number(h.defensa || 0) +
    Number(h.fisico || 0) 
  ) / 6

  setGuardando(true);
  setMensaje("");
  setError("");


  try {
    const respuesta = await fetch("http://localhost:3000/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ... jugador,
        grl: promedio
    })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      setMensaje(data.message);
      setJugador({
        nombre:"",
        pais:"",
        posicion:"",
        club:"",
        liga:"",
        pie:"",
        grl:"",
        habilidades:{
          ritmo:"",
          tiro:"",
          pase:"",
          regate:"",
          defensa:"",
          fisico:"",
        }
      })
    } else {
      setError(data.error);
    }

  } catch {
    setError("Error servidor");
  }

  setGuardando(false);
};


  useEffect(() => { /* Con useEffect hacemos que al cargar el componente se ejecute la función que está adentro, y hace que pueda cargar y actualizar la información del formulario */
    fetch("http://localhost:3000/api/metadata") /* Con fetch de hacemos una solicitud al servidor donde tenemos la metadata */
      .then((res) => res.json()) /* Esto es una promesa, y con el then (luego) de recibir la respuesta  del servido, res la va a indicar que mostrar y actualizar y mandar en el formato JSON */
      .then((data) => {  /*data es la información que recibimos del servidor, y con eso llamamos al Set para actualizarlo y mostrar, los estado de cada uno de los select del formulario */
        setPaises(data.Pais);
        setClubes(data.Club);
        setLigas(data.Liga);
        setPies(data.Pie);
      });
  }, []);

  /* El UseEffect es una funcion que toma una funcion como primer parametro, y dentro de Effect podamos hacer cualquier cosa, como por ejemplo si queremos hacer algo cuando la aplicacion se carge, actualizar un valor en especifico, escuchar un evento o la aplicacion se desmonte algo */   
  /*Fetch es una herrmanienta que nos permite hacer solicitudes HTTP a un servidor, y nos dejará consumir las APIs Rest y trabaja mediante promesas, Fetch es una interfaz nativa no requiere librerías externas y solo se utiliza el metodo*/

  return (
    <form className="formulario" onSubmit={guardarCarta}>
      <h2>Crear Jugador</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={jugador.nombre} 
        onChange={(e) =>
          setJugador({ ...jugador, nombre: e.target.value })
        }
      />

      {/* El input es un componente controlado: su value depende totalmente del estado. El evento onChange captura cada pulsación de tecla y ejecuta setJugador. Usamos el spread operator (...jugador) para crear una copia del estado anterior y solo sobrescribir el campo específico (como el nombre). Esto es vital para no borrar los demás datos del jugador al actualizar uno solo */}
      {/* El map() recorre el array (lista) de datos y lo transforma en elementos de interfaz (JSX). El item representa cada dato individual y i su índice. La key es un identificador único que React necesita para rastrear qué elementos han cambiado, se han agregado o eliminado, optimizando así el rendimiento al no tener que redibujar toda la lista innecesariamente  */}
      
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
      type="file"
      accept="image/png, image/jpeg, image/jpg, image/webp" 
      onChange={(e) => {
        const archivo = e.target.files[0];

        if (archivo) {
          const url = URL.createObjectURL(archivo);

          setJugador({
            ...jugador, 
            imagen: url
          })
        }
      }}/>

      <h3>Stats</h3>

      <input type="number" placeholder="Ritmo" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("ritmo", e.target.value)} />

      <input type="number" placeholder="Tiro" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("tiro", e.target.value)} />

      <input type="number" placeholder="Pase" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("pase", e.target.value)} />

      <input type="number" placeholder="Regate" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("regate", e.target.value)} />

      <input type="number" placeholder="Defensa" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("defensa", e.target.value)} />

      <input type="number" placeholder="Físico" disabled={!datosCompletos} onChange={(e)=>cambiarHabilidad("fisico", e.target.value)} />

      <button type="submit">
        {guardando ? "Guardando..." : "Guardar Carta"}
      </button>
      {mensaje && <p className="exito">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

    </form>
  );
}

export default Formulario;