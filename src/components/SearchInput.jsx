import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function SearchInput({
  search,
  setSearch,
  handleSearch,
  setTheme,
  theme,
  handleEnter,
}) {
  return (
    <>
      {" "}
      <div className={`w-full flex justify-center items-center gap-3`}>
        <input
          placeholder="Search Pokémon..."
          type="text"
          className={`w-[90%] border p-3 rounded-2xl border-gray-400`}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={handleEnter}
        />
        <button
          className={`bg-blue-500 text-white px-5 py-3 rounded-xl cursor-pointer`}
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl cursor-pointer "
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>
      </div>
    </>
  );
}

export default SearchInput;
