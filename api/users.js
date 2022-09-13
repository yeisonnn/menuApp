require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
} = require('../db/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

userRouter.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

//Register an user
userRouter.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.header('Authorization'));

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    }

    const user = await createUser({
      username,
      password,
      email,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );

    res.send({
      message: 'thank you for signing up',
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// user Login
userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    });
  }

  try {
    const user = await getUserByUsername(username);
    if (user && user.password == password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token, user: user });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRouter;
