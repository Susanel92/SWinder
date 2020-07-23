import React, { Component } from "react";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

class App extends Component {
  state = {
    characters: [],
    characterOnDisplay: "",
    counter: 0,
    error: "",
  };

  getData = () => {
    const API = `https://swapi.dev/api/people/`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (!response.ok && response.status === 404) {
          throw Error("Strona nie została odnaleziona");
        } else if (!response.ok && response.status === 500) {
          console.log("Wewnętrzny błąd serwera");
        }
        throw Error("Nie udało się");
      })
      .then((data) => {
        // Używamy części danych z API
        // data.results.map((person) => {
        //   const character = {
        //     name: person.name,
        //     height: person.height,
        //     mass: person.mass,
        //     hair_color: person.hair_color,
        //     eye_color: person.eye_color,
        //     gender: person.gender,
        //     homeworld: person.homeworld,
        //     species: person.species,
        //   };

        //   return this.setState((prevState) => ({
        //     characters: [...prevState.characters, character],
        //   }));
        // });

        //Używamy wszystkich danych z API
        this.setState((prevState) => ({
          characters: [...prevState.characters, ...data.results],
          characterOnDisplay: data.results[this.state.counter],
        }));
      })
      .catch((error) => console.log(error));
  };

  handleCharacterChange = () => {
    let counter = this.state.counter;
    counter++;

    if (counter < this.state.characters.length) {
      // console.log("kolejna postać", counter, this.state.characters[counter]);
      const characterOnDisplay = this.state.characters[counter];
      this.setState({
        counter,
        characterOnDisplay,
      });
    } else {
      // console.log("brak postaci", counter, this.state.characters[counter]);
      alert("Brak postaci do wyświetlenia");
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <main className="app">
        <div className="logo">
          <img src={logo} alt="Star Wars logo" />
        </div>
        <Card character={this.state.characterOnDisplay} />
        <div className="btns">
          <button className="times" onClick={this.handleCharacterChange}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: 40, height: 40, color: "#EA6B4F" }}
            />
          </button>
          <button className="heart" onClick={this.handleCharacterChange}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: 40, height: 40, color: "#76BF93" }}
            />
          </button>
        </div>
      </main>
    );
  }
}

export default App;
