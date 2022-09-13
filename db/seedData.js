const client = require('./client');
const { createUser } = require('./users');
const { createMenu } = require('./menu');
const { dataMenu } = require('./data-dev');

const dropTables = async () => {
  try {
    console.log('Dropping all the tables');
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS menu;`);
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
};

const createTables = async () => {
  console.log('Starting to build tables..');
  try {
    await client.query(`CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(70) UNIQUE NOT NULL,
      password VARCHAR(70) NOT NULL,
      email VARCHAR(60),
      admin BOOLEAN DEFAULT false
    );`);

    await client.query(`CREATE TABLE menu(
    id SERIAL PRIMARY KEY,
    name VARCHAR(70),
    category VARCHAR(70),
    price NUMERIC(6,2),
    description VARCHAR
  )`);
  } catch (error) {
    console.log('Error creating tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        username: 'lincon',
        password: 'lincon123',
        email: 'lincon@mail.com',
        admin: true,
      },
      {
        username: 'jose',
        password: 'jose123',
        email: 'jose@mail.com',
        admin: false,
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
};

const createInitialmenu = async () => {
  console.log('Starting to create menu...');
  try {
    const menu = await Promise.all(dataMenu.map(createMenu));
  } catch (error) {
    console.error('Error creating menu!');
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialmenu();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
