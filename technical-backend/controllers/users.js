const usersRouter = require('express').Router();
const User = require('../models/user');

// date function for setting date on user Object
const dateFunction = () => {
  const date = new Date().toISOString();
  return date;
};

// GET ALL USERS
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// GET USER BY ID
usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// CREATE NEW USER
usersRouter.post('/', async (req, res) => {
  // If req is missing either name or email it will throw an error
  if (!req.body.first_name || !req.body.last_name || !req.body.email) {
    console.log('missing info');
    return res.status(400).json({ error: 'Must fill all fields' });
  }

  // new user object
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    created_at: dateFunction(),
  });

  const savedUser = await user.save();
  return res.json(savedUser);
});

// DELETE USER BY ID
usersRouter.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      error: 'invalid ID',
    });
  }
});

// UPDATE USER
usersRouter.put('/:id', async (req, res) => {
  const { body } = req;

  // build user object from req
  const user = {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    updated_at: dateFunction(),
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.send(400).json({ error: 'Could not update user' });
  }
});

module.exports = usersRouter;
