import React from "react";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ onChange, onClick, searchTerm }) => {
    return (
      <div className="mb-6">
        <label htmlFor="search-input" className="text-lg mb-2 block">
          Search
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Searching for:{" "}
          <span id="search-term" className="font-semibold">
            {searchTerm}
          </span>
        </p>
        <input
          id="search-input"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          onChange={onChange}
          value={searchTerm}
          placeholder="Search advocates..."
          aria-label="Search advocates"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={onClick}
          aria-label="Reset search"
        >
          Reset Search
        </button>
      </div>
    );
  }
);

export default SearchBar;
