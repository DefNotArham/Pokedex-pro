import capitalize from "../utils/capitalize.js";

function Breeding({ pokemon, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-4 flex flex-col ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">Breeding</h1>
      <div>
        <p className="font-bold">
          Egg Groups:{" "}
          <span className="font-normal">
            {pokemon.breeding.eggGroups.map(capitalize).join(", ")}
          </span>
        </p>

        <p className="font-bold">
          Hatch Steps:{" "}
          <span className="font-normal">{pokemon.breeding.hatchSteps}</span>
        </p>
      </div>
    </div>
  );
}

export default Breeding;
