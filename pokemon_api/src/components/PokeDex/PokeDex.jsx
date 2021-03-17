import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "../PokemonList/PokemonList";
import styles from "./PokeDex.module.css";

const PokeDex = (props) => {
	// const { pokemon } = props;
	const initFetchUrl = "https://pokeapi.co/api/v2/pokemon";
	const [pokemonListAll, setPokemonListAll] = useState([]);
	const [urlForNextFetch, setUrlForNextFetch] = useState(null);
	const [urlFromLastFetch, setUrlFromLastFetch] = useState(null);
	const [fetchInitiated, setFetchInitiated] = useState(false);

	const fetchPokemonByUrl = (url) => {
		if (url == null || url === "null" || url === undefined) {
			if (fetchInitiated) setFetchInitiated(false);
			return;
		}
		if (url === urlFromLastFetch) return;
		// gotta fetch 'em all
		axios
			.get(url)
			.then((response) => {
				setUrlFromLastFetch(url);
				console.log(response);
				const { next, previous, results } = response.data;
				console.log(`setUrlForNextFetch(${next});`);
				const tempResults = results.map((item) => item.name);
				let tempList = [];
				if (previous != null)
					tempList = [...pokemonListAll, ...tempResults];
				else tempList = tempResults;
				console.log("TEMPLIST:  ", tempList);
				setPokemonListAll(tempList);
				if (urlForNextFetch !== next) setUrlForNextFetch(next);
				if (next == null || next === "null" || next === undefined)
					setFetchInitiated(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchPokemon = () => {
		if (fetchInitiated) {
			setFetchInitiated(false);
			return;
		}
		if (pokemonListAll.length) setPokemonListAll([]);
		setFetchInitiated(true);
		fetchPokemonByUrl(initFetchUrl);
	};
	useEffect(() => {
		if (
			fetchInitiated &&
			urlForNextFetch !== null &&
			urlForNextFetch !== "null" &&
			urlForNextFetch !== undefined
		) {
			fetchPokemonByUrl(urlForNextFetch);
		}
	});
	return (
		<div className={styles.PokeDex}>
			<button onClick={fetchPokemon}>Fetch Pokemon</button>
			<PokemonList pokemon={pokemonListAll} />
		</div>
	);
};

export default PokeDex;
