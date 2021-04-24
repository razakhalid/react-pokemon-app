import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function Pokemon(props) {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.Pokemon);

  useEffect(() => {
    fetchData(pokemonName);
  });

  function fetchData(p) {
    dispatch(GetPokemon(p));
  }

  function showData() {
    if (!_.isEmpty(pokemon.data[pokemonName])) {
      const pokeData = pokemon.data[pokemonName];
      return (
        <>
          <div className="pokemon">
            <div className="pokemon__card">
              <div className="body">
                <div className="pokemon__imgs-wrapper">
                  <img src={pokeData.sprites.front_default} alt="" />
                  <img src={pokeData.sprites.back_default} alt="" />
                  <img src={pokeData.sprites.front_shiny} alt="" />
                  <img src={pokeData.sprites.back_shiny} alt="" />
                </div>

                <div className="pokemon__stats-wrapper">
                  {pokeData.stats.map((elem) => {
                    return (
                      <>
                        <div className="label pokemon__stat-label">
                          {elem.stat.name}
                        </div>
                        <div className="pokemon__stat">{elem.base_stat}</div>
                      </>
                    );
                  })}
                </div>
                <div className="pokemon__abilities-wrapper">
                  <p className="label pokemon__stat-label">
                    <p>Abilities</p>
                  </p>
                  <ul className="abilities-list">
                    {pokeData.abilities.map((elem) => {
                      return <li className="ability">{elem.ability.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (pokemon.loading) {
      return <p>loading...</p>;
    }

    if (pokemon.errorMsg !== "") {
      return <p>{pokemon.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  }
  return (
    <div className="pokemon">
      <nav className="navbar">
        <Link to={"/pokemon"}>
          <p className="navbar-back-icon">Back</p>
        </Link>
        <div className="navbar-main-wrapper">
          <p className="navbar-label">
            {pokemonName.charAt(0).toUpperCase().toUpperCase() +
              pokemonName.slice(1)}
          </p>
        </div>
      </nav>
      {showData()}
    </div>
  );
}
