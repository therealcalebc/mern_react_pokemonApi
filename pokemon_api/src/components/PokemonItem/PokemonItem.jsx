import React from "react";
import styles from "./PokemonItem.module.css";

const PokemonItem = ({ pokemon }) => {
	return <li className={styles.PokemonItem}>{pokemon}</li>;
};

export default PokemonItem;
