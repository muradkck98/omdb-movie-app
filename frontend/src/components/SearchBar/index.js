import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoviesRequest } from '../../redux/actions';
import './index.css';


const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
  
    const handleSearch = (e) => {
      setKeyword(e.target.value);
      if (e.target.value.length >= 3) {
        dispatch(fetchMoviesRequest(e.target.value));
      }
    };

  return (
    <>     
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-bar"
        value={keyword}
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchBar;
