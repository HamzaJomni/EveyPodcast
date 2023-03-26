
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
        navigate('/search/' + searchTerm); // passer à la page /search avec le mot saisie
    }
  }

  const handleKeyPress = (event) => { //passer à la page /search quand on clic sur la touche entrée du clavier
    if (event.key === 'Enter') { // si (event.key === la touche "Entrée" du clavier) alors fait appel à handleSearch()
      handleSearch();
    }
  }

  return (
    <span className="search-bar-container">
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>
      <img src='/search.png' />
      </button>

    </span>
  );
}

export default SearchBar;
