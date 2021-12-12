const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./controllers/users');

const databaseSeeder = require('./utils/database_seeder');
const databaseConnect = require('./utils/database_connection');

// morgan for middleware logging
morgan.token('post', (req, res) => (req.method === 'POST' ? JSON.stringify(req.body) : null));

// seedDB
databaseSeeder.seedDB();
// Connect to database
databaseConnect.connectDB();

app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status - :total-time ms :post'));
app.use(cors());

// routers
app.use('/api/users', usersRouter);

module.exports = app;
