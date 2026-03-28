import SearchInput from "./components/SearchInput";
import PokemonStats from "./components/PokemonStats";
import Abilities from "./components/Abilities.jsx";
import EvolutionChain from "./components/EvolutionChain.jsx";
import TenMoves from "./components/TenMoves.jsx";
import GameVersions from "./components/GameVersions.jsx";
import Breeding from "./components/Breeding.jsx";

import { MdError } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

import capitalize from "./utils/capitalize.js";

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const formattedSearch = search.trim().toLowerCase().replace(/\s+/g, "-");
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${formattedSearch.toLowerCase()}`,
      );

      const speciesRes = await axios.get(response.data.species.url);

      setPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
        types: response.data.types.map((t) => t.type.name),
        stats: response.data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        abilities: response.data.abilities.map((a) => a.ability.name),
        speciesUrl: response.data.species.url,
        moves: response.data.moves.map((m) => m.move.name),
        gameVersion: response.data.game_indices.map((v) => v.version.name),
        height: response.data.height,
        weight: response.data.weight,
        base_experience: response.data.base_experience,
        generation: speciesRes.data.generation.name,
        breeding: {
          eggGroups: speciesRes.data.egg_groups.map((g) => g.name),
          hatchSteps: (speciesRes.data.hatch_counter + 1) * 255,
        },
      });
    } catch (error) {
      console.log(error);
      setPokemon(null);
      setError("Pokémon not found. Try another name!");
      setEvolutionChain([]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!pokemon) return;

    const fetchEvolutionChain = async () => {
      try {
        const speciesRes = await axios.get(pokemon.speciesUrl);
        const evolutionUrl = speciesRes.data.evolution_chain.url;

        const evolutionRes = await axios.get(evolutionUrl);

        const chainNames = [];
        const extractEvolution = (node) => {
          chainNames.push(node.species.name);
          node.evolves_to.forEach(extractEvolution);
        };

        extractEvolution(evolutionRes.data.chain);

        const evolutionData = await Promise.all(
          chainNames.map(async (name) => {
            const pokeRes = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${name}`,
            );
            return {
              name,
              image: pokeRes.data.sprites.front_default,
            };
          }),
        );

        setEvolutionChain(evolutionData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  return (
    <div className={theme === "light" ? "bg-gray-300" : "bg-gray-900"}>
      <div
        className={`min-h-screen flex items-center justify-center py-10 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        <div
          className={`flex p-5 rounded-3xl w-[90%] justify-center flex-col overflow-auto scrollbar-hide ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <SearchInput
            setSearch={setSearch}
            search={search}
            handleSearch={handleSearch}
            setTheme={setTheme}
            theme={theme}
            handleEnter={handleEnter}
          />
          {pokemon && (
            <div className="flex justify-between pl-10 mt-5">
              <div className="text-center">
                <img className="w-70" src={pokemon.image} alt={pokemon.name} />
                <h1 className="font-bold text-2xl">
                  {capitalize(pokemon.name)}
                </h1>
              </div>

              <div className="w-full flex flex-col justify-between items-center gap-6">
                <div
                  className={`w-[90%] rounded-xl px-5 py-2 ${
                    theme === "light"
                      ? "bg-gray-100 text-black"
                      : "bg-[#111827] text-white"
                  }
                  }`}
                >
                  <h1 className="font-bold mb-2">Types</h1>
                  <p>{capitalize(pokemon.types.join(", "))}</p>
                </div>

                <PokemonStats stats={pokemon.stats} theme={theme} />

                <Abilities pokemon={pokemon} theme={theme} />

                <EvolutionChain evolutionChain={evolutionChain} theme={theme} />

                <Breeding pokemon={pokemon} theme={theme} />

                <TenMoves pokemon={pokemon} theme={theme} />

                <GameVersions pokemon={pokemon} theme={theme} />

                <div
                  className={`w-[90%] rounded-xl px-5 py-2 ${
                    theme === "light"
                      ? "bg-gray-100 text-black"
                      : "bg-[#111827] text-white"
                  }`}
                >
                  <h1 className="font-bold mb-2">Other Info</h1>
                  <p>
                    Height: <span>{pokemon.height / 10} m</span>
                  </p>
                  <p>
                    Weight: <span>{pokemon.weight / 10} kg</span>
                  </p>
                  <p>
                    Base Experience: <span>{pokemon.base_experience}</span>
                  </p>
                  <p>
                    Generation: <span>{capitalize(pokemon.generation)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 mt-5 mx-auto font-bold flex items-center gap-2 text-2xl">
              <MdError />
              Pokemon not found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
