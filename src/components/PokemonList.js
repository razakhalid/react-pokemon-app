import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function PokemonList(props) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    fetchData(1);
  });

  function fetchData(page = 1) {
    dispatch(GetPokemonList(page));
  }

  function showData() {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="pokemon-list__wrapper">
          {pokemonList.data.map((elem) => {
            return (
              <div className="pokemon-list__item">
                <p>{elem.name}</p>
                <Link to={`/pokemon/${elem.name}`}>View</Link>
              </div>
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
    <div>
      <div className="search-wrapper">
        <p>Search: </p>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>
          Search
        </button>
      </div>
      <div className="pokemon-list">{showData()}</div>
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => fetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      )}
    </div>
  );
}
