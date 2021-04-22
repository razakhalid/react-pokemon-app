import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon, GetPokemonList } from "../actions/pokemonActions";
import _ from "lodash";

export default function Pokemon(props) {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.Pokemon);

  useEffect(() => {
    fetchData(pokemonName);
  }, []);

  function fetchData(p) {
    dispatch(GetPokemon(p));
  }

  function showData() {
    if (!_.isEmpty(pokemon.data[pokemonName])) {
      const pokeData = pokemon.data[pokemonName];
      return (
        <div className="pokemon__wrapper">
          <div className="pokemon__item">
            <h1>Sprites</h1>
            <img src={pokeData.sprites.front_default} alt="" />
            <img src={pokeData.sprites.back_default} alt="" />
            <img src={pokeData.sprites.front_shiny} alt="" />
            <img src={pokeData.sprites.back_shiny} alt="" />
          </div>
          <div className="pokemon__item">
            {pokeData.stats.map((elem) => {
              return (
                <p>
                  {elem.stat.name} {elem.base_stat}
                </p>
              );
            })}
          </div>
          <div className="pokemon__item">
            {pokeData.abilities.map((elem) => {
              return <p>{elem.ability.name}</p>;
            })}
          </div>
        </div>
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
      <h1>{pokemonName}</h1>
      {showData()}
    </div>
  );
}
