import React, { useState } from 'react';
import { Input } from 'reactstrap';

const Search = ({onChange}) => {
  const [userInput, setUserInput] = useState('');
  const handleChange = (e) => {
    setUserInput(e.target.value);
    onChange(e.target.value)
  };

  return (
    <nav className="navbar-search">
      <div className="search">
        <Input
          name="searchKeyword"
          id="searchKeyword"
          placeholder="Search"
          value={userInput}
          onChange={handleChange}
        />
        <span className="search-icon">
          <i className="simple-icon-magnifier" />
        </span>
      </div>
    </nav>
  );
};

export default Search;
