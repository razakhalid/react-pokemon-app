import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";

export default function PokemonList(props) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    fetchData(1);
  });

  function firstUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function fetchData(page = 1) {
    dispatch(GetPokemonList(page));
  }

  function showData() {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="pokemon-list__wrapper">
          {pokemonList.data.map((elem) => {
            return (
              <>
                <Link to={`/pokemon/${elem.name}`}>
                  <div className="pokemon-list__item">
                    <p>{firstUpperCase(elem.name)}</p>
                    <p>View</p>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      );
    }

    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  }
  return (
    <>
      <nav className="navbar">
        <div className="navbar-main-wrapper">
          <input
            className="search-bar"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => props.history.push(`/pokemon/${search}`)}
          >
            Search
          </button>
        </div>
      </nav>
      <div className="pokemon-list">
        <div className="pokemon-list__card">{showData()}</div>
      </div>
    </>
  );
}
