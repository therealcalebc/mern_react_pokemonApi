// import logo from './logo.svg';
import PokeDex from "./components/PokeDex/PokeDex";
import "./App.css";

const pokemon = [
	"Bulbasaur",
	"Ivysaur",
	"Venusaur",
	"Charmander",
	"Charmeleon",
	"Charizard",
	"Squirtle",
	"Wartortle",
	"Blastoise",
];

function App() {
	return (
		<div className='App'>
			<PokeDex pokemon={pokemon} />
		</div>
	);
}

export default App;

// <header className='App-header'>
// 	<img src={logo} className='App-logo' alt='logo' />
// 	<p>
// 		Edit <code>src/App.js</code> and save to reload.
// 	</p>
// 	<a
// 		className='App-link'
// 		href='https://reactjs.org'
// 		target='_blank'
// 		rel='noopener noreferrer'
// 	>
// 		Learn React
// 	</a>
// </header>;
