import React from 'react';

const NewUserForm = function ({
  handleCreate,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) {
  return (
    <div className="py-4">
      <form onSubmit={handleCreate} className="box">
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Add User</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
