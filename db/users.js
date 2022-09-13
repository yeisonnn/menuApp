const client = require('./client');

const createUser = async ({ username, password, email, admin }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO users(username,password,email, admin)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
      [username, password, email, admin]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM users`);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (userName) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [userName]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
};
