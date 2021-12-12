import React from 'react';
import DatePicker from 'react-datepicker';
import NameSearch from './NameSearch';

const Filters = function ({
  nameSearch,
  setNameSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <div className="columns px-3">
      <NameSearch nameSearch={nameSearch} setNameSearch={setNameSearch} />
      <div className="column control">
        <label className="label is-title">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
      </div>
      <div className="column control">
        <label className="label">End Date</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
    </div>
  );
};

export default Filters;
