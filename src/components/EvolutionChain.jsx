import capitalize from "../utils/capitalize.js";

function EvolutionChain({ evolutionChain, theme }) {
  return (
    <div
      className={`w-[90%] rounded-xl px-5 py-2 flex flex-col items-center ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-[#111827] text-white"
      }`}
    >
      <h1 className="font-bold mb-2">Evolution Chain</h1>
      <div className="flex items-center space-x-4">
        {evolutionChain.map((p) => (
          <div key={p.name} className="flex flex-col items-center">
            <img src={p.image} alt={p.name} />
            <p>{capitalize(p.name)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;
