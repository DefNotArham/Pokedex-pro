import capitalize from "../utils/capitalize.js";

function Abilities({ pokemon, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-2 flex flex-col ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">Abilities</h1>

      <div className="flex gap-3">
        {pokemon.abilities &&
          pokemon.abilities.map((ability) => (
            <div
              key={ability}
              className={`px-4 py-2 rounded-xl text-sm ${
                theme === "light"
                  ? "bg-gray-300 text-black"
                  : "bg-blue-600 text-white"
              }`}
            >
              {capitalize(ability)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Abilities;
