import capitalize from "../utils/capitalize.js";
import removeDash from "../utils/removeDash.js";

function TenMoves({ pokemon, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-4 flex flex-col items-center ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">10 Moves</h1>

      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {pokemon.moves.slice(0, 10).map((m) => (
          <div
            key={m}
            className={`px-3 py-1 rounded-xl text-sm font-medium ${
              theme === "light"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {removeDash(capitalize(m))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenMoves;
