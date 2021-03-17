import React, { useEffect, useState } from "react";
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
		fetch(url)
			.then((response) => {
				setUrlFromLastFetch(url);
				return response.json();
			})
			.then((response) => {
				console.log(response);
				console.log(`setUrlForNextFetch(${response.next});`);
				const tempResults = response.results.map((item) => item.name);
				let tempList = [];
				if (response.previous != null)
					tempList = [...pokemonListAll, ...tempResults];
				else tempList = tempResults;
				console.log("TEMPLIST:  ", tempList);
				setPokemonListAll(tempList);
				if (urlForNextFetch !== response.next)
					setUrlForNextFetch(response.next);
				if (
					response.next == null ||
					response.next === "null" ||
					response.next === undefined
				)
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
