import React, { useState, useEffect } from 'react';
import userService from './services/users';
import NewUserForm from './components/NewUserForm';
import Filters from './components/Filters';
import UserTable from './components/UserTable';

import 'bulma/css/bulma.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const App = function () {
  const [users, setUsers] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [sortType, setSortType] = useState('first_name');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // use effect which populates users on start
  useEffect(() => {
    async function getUsers() {
      const userData = await userService.getAll();
      setUsers(userData.data);
      console.log(userData);
    }
    getUsers();
  }, []);

  // useEffect for refreshing list after sorting
  // runs on sortType change
  // manages sorting via dropdown box
  useEffect(() => {
    const sortArray = (type) => {
      // different categories to sort by
      const types = {
        first_name: 'first_name',
        last_name: 'last_name',
        created_at: 'created_at',
        updated_at: 'updated_at',
      };

      // == specfic type of sorting
      const sortProperty = types[type];

      // if chain to sort based on type
      // first name
      if (sortProperty === 'first_name') {
        const sortedUsers = [...users].sort((a, b) => a.first_name.localeCompare(b.first_name));
        setUsers(sortedUsers);
      } // last name
      if (sortProperty === 'last_name') {
        const sortedUsers = [...users].sort((a, b) => a.last_name.localeCompare(b.last_name));
        setUsers(sortedUsers);
      } // created_at
      if (sortProperty === 'created_at') {
        const sortedUsers = [...users].sort((a, b) => a.created_at.localeCompare(b.created_at));
        setUsers(sortedUsers);
        console.log(sortedUsers);
      } // updated_at sorts in reverse newest at top
      if (sortProperty === 'updated_at') {
        const sortedUsers = [...users].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
        setUsers(sortedUsers);
      }
    };
    sortArray(sortType);
  }, [sortType]);

  // handler for creation of new users
  const handleCreate = async (event) => {
    event.preventDefault();
    // build new user from state
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
    };

    // finds if matching name in array and returns index number or -1
    // if both index for names match asks if you want to update or create new user
    //! problem here using this method if someone has a shared name only finds the first entry and may not return match
    // can write function to loop both arrays for match after time permitting
    const firstIndex = users
      .map((u) => u.first_name.toLowerCase())
      .indexOf(firstName.toLowerCase());
    const lastIndex = users
      .map((u) => u.last_name.toLowerCase())
      .indexOf(lastName.toLowerCase());

    console.log(firstIndex, lastIndex);
    // checks if first matches second first index must not match with -1 preventing firing on no find for both entries
    if (firstIndex === lastIndex && firstIndex !== -1) {
      if (
        window.confirm(
          `This name already exists in the database. Would you like to update ${firstName}? Cancel to create a new user.`,
        )
      ) {
        console.log('updating user');
        try {
          const userID = users[firstIndex].id;
          const response = await userService.update(userID, newUser);
          // sets users by maping new array and returning normal user if id doesnt match replaces user if ID matches
          setUsers(
            users.map((user) => (user.id !== userID ? user : response.data)),
          );
          // reset fields
          setEmail('');
          setFirstName('');
          setLastName('');
          alert('User updated!');
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Creating new user');
        try {
          const response = await userService.create(newUser);
          // adds new user to database through concat
          // prevents unneccesary calls
          setUsers(users.concat(response.data));
          // reset fields
          setEmail('');
          setFirstName('');
          setLastName('');
          alert('New User Created');
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        // this runs if no user matches both indexes (returns -1)
        const response = await userService.create(newUser);
        setUsers(users.concat(response.data));
        alert('New User Created');
        // reset fields
        setEmail('');
        setFirstName('');
        setLastName('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  // handler for managing deletion of user when delete button is clicked
  const handleDelete = async (id) => {
    try {
      await userService.remove(id);
      alert('User Deleted Succesfully');
      // removes user from users by filtering selection with a matching id
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // filtering the list based on input into search field for name and id
  const searchFilter = users.filter((user) => (
    user.first_name.toLowerCase().includes(nameSearch.toLowerCase())
      || user.last_name.toLowerCase().includes(nameSearch.toLowerCase())
      || user.id.includes(nameSearch)
  ));

  // second filter for removing anything not between selected dates
  // STARTDATE / ENDDATE / NAME / ID
  const filteredNames = searchFilter.filter(
    (user) => user.created_at >= startDate.toISOString()
      && user.created_at <= endDate.toISOString(),
  );

  // DISPLAY
  //
  //
  return (
    <div className="container">
      <div className="mb-3">
        <p className="title is-1 has-text-primary">Brendan's House of Goods</p>
        <p className="subtitle is-3">User Information</p>
      </div>
      <Filters
        nameSearch={nameSearch}
        setNameSearch={setNameSearch}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <NewUserForm
        handleCreate={handleCreate}
        setFirstName={setFirstName}
        firstName={firstName}
        setLastName={setLastName}
        lastName={lastName}
        email={email}
        setEmail={setEmail}
      />
      <UserTable
        handleDelete={handleDelete}
        filteredNames={filteredNames}
        setSortType={setSortType}
      />
    </div>
  );
};

export default App;
