import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import CircleIcon from "@mui/icons-material/Circle";
import Card from "@mui/material/Card";
import "./App.css";

// USE EFFECT, EFECTOS EN REACT
const App = () => {
  const [personajes, setPersonajes] = useState([]);
  const [valorDelInput, setValorDelInput] = useState("");

  // tiene dos parametros, el primero es una funcion que ejecuta el codigo que quiero mostrar a veces.
  // el segundo parametro es un array de dependencia y puede tener dentro variables
  useEffect(() => {
    // nos permite determinar que un codigo se va a ejecutar
    // solo en algunas ocasiones
    fetch(`https://rickandmortyapi.com/api/character?name=${valorDelInput}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setPersonajes(data.results);
      });
  }, [valorDelInput]);

  const handleChange = (e) => {
    setValorDelInput(e.target.value);
  };
  return (
    <div className="column">
      <h2>Personaje Buscado: {valorDelInput}</h2>
      <input type="text" onChange={handleChange}></input>
      <div className="App">
        
        {personajes.map((personaje) => (
          <Card
            sx={{
              display: "flex",
              margin: 10,
              bgcolor: "text.secondary",
              width: 600,
            }}
            variant="outlined"
          >
            <img src={personaje.image} alt=""></img>

            <div className="info-card">
              <h2>{personaje.name}</h2>
              <p className="estado-vivo-muerto">
                <Icon sx={{ marginRight: 1 }}>
                  <CircleIcon
                    className={personaje.status === "Alive" ? "verde" : "rojo"}
                  ></CircleIcon>
                </Icon>
                {personaje.status} - {personaje.species}
              </p>
              <h3>Location</h3>
              <p>{personaje.location.name}</p>
              <h3>Origen</h3>
              <p>{personaje.origin.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default App;
