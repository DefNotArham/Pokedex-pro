import capitalize from "../utils/capitalize.js";

function GameVersions({ pokemon, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-4 flex flex-col justify-center items-center ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">5 Game Versions</h1>

      <div className="flex items-center gap-4 mt-3">
        {pokemon.gameVersion.slice(0, 5).map((v) => (
          <div
            key={v}
            className={`px-6 py-2 rounded-xl text-sm ${
              theme === "light"
                ? "bg-gray-300 text-black"
                : "bg-blue-600 text-white"
            }`}
          >
            {capitalize(v)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameVersions;
