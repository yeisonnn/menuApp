const client = require('./client');

const createMenu = async ({ name, category, price, description }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO menu(name, category, price, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [name, category, price, description]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllMenu = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM menu`);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getproductByName = async (ProductName) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM menu
      WHERE username=$1;
    `,
      [ProductName]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getproductByCategory = async (category) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM menu
      WHERE category=$1;
    `,
      [category]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getproductById = async (id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM menu
      WHERE id=$1;
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMenu,
  getAllMenu,
  getproductByCategory,
  getproductByName,
  getproductById,
};
