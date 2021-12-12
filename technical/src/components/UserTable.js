import React from 'react';

// bulma is-clickable in combination with an onClick to set sort type when column is clicked

const UserTable = function ({ filteredNames, handleDelete, setSortType }) {
  return (
    <div>
      <p className="has-text-centered is-size-1 has-text-primary">
        Users
      </p>
      <div className="table-container">
        <table className="table is-bordered is-hoverable">
          <tbody>
            <tr>
              <th className="is-clickable" onClick={() => setSortType('first_name')}>
                First Name
              </th>
              <th className="is-clickable" onClick={() => setSortType('last_name')}>
                Last Name
              </th>
              <th>Email</th>
              <th>ID</th>
              <th className="is-clickable" onClick={() => setSortType('created_at')}>
                Creation Date
              </th>
              <th className="is-clickable" onClick={() => setSortType('updated_at')}>
                Last Update
              </th>
            </tr>
          </tbody>
          {filteredNames.map((user, i) => (
            <tbody key={i}>
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.id}</td>
                <td>{user.created_at.substring(0, 10)}</td>
                <td>{user.updated_at.substring(0, 10)}</td>

                <button className="py-2 px-2 mx-3" onClick={() => handleDelete(user.id)}>
                  Delete User
                </button>

              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UserTable;
