const { Seeder } = require('mongo-seeding');
const path = require('path');
const configVars = require('./config');

const mongoURI = configVars.MONGODB_URI;

// config file for seeding via mongoDB
// dropDatabase: true fully resets database on every run
const config = {
  database: mongoURI,
  dropDatabase: true,
};

// sets seeder object
const seeder = new Seeder(config);

// finds collections for importing
const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

// function that seeds db
// if mongoDB user is not set to admin this will fail as admin rights are required to drop databases
const seedDB = async () => {
  try {
    await seeder.import(collections);
    console.log('Seeder was succesful! Database populated!');
  } catch (error) {
    console.log('Seeder failed', error);
  }
};

module.exports = {
  seedDB,
};
