import React from "react";
import PokemonItem from "../PokemonItem/PokemonItem";
import styles from "./PokemonList.module.css";

const PokemonList = ({ pokemon }) => {
	return (
		<ul className={styles.PokemonList}>
			{pokemon.map((poke, index) => (
				<PokemonItem key={index} pokemon={poke} />
			))}
		</ul>
	);
};

export default PokemonList;
