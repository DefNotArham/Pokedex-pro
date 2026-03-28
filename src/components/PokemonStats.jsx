import capitalize from "../utils/capitalize.js";
import removeDash from "../utils/removeDash.js";

function PokemonStats({ stats, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-2 ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">Stats</h1>

      {stats &&
        stats.map((stat) => (
          <div key={stat.name} className="flex items-center mb-2">
            <span className="w-33 font-medium mt-2">
              {capitalize(removeDash(stat.name))}
            </span>
            <div
              className={`flex-1 h-3 rounded-full overflow-hidden ml-2 ${
                theme === "light" ? "bg-gray-300" : "bg-gray-700"
              }`}
            >
              <div
                className="h-full bg-blue-500"
                style={{ width: `${stat.value}%` }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PokemonStats;
