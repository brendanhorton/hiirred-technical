import React from 'react';

const NameSearch = function ({ nameSearch, setNameSearch }) {
  return (
    <div className="column">
      <label className="label">User Search</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="nameSearch"
          value={nameSearch}
          placeholder="Search by Name or ID"
          onChange={({ target }) => setNameSearch(target.value)}
        />
      </div>
    </div>
  );
};

export default NameSearch;
