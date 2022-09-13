require('dotenv').config();
const express = require('express');
const menuRouter = express.Router();
const {
  createMenu,
  getAllMenu,
  getproductByCategory,
  getproductByName,
  getproductById,
} = require('../db/menu');

menuRouter.get('/', async (req, res, next) => {
  try {
    const allMenu = await getAllMenu();
    if (allMenu) {
      res.send(allMenu);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

menuRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await getproductById(req.params.id);
    if (product) {
      res.send(product);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

menuRouter.post('/', async (req, res, next) => {
  try {
    const product = await createMenu(req.body);
    if (product) {
      res.send(product);
    }
  } catch (error) {}
});

module.exports = menuRouter;
