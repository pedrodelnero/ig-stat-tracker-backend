import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../Models/Users.js';

export const createUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    if (!username || !password || !confirmPassword)
      throw new Error('Missing field');
    if (password !== confirmPassword) throw new Error('Passwords do not match');

    let user = await User.findOne({ where: { username: username } });

    if (user) {
      throw new Error('User Already Exists');
    } else {
      const newUser = await User.create({
        username,
        password: bcrypt.hashSync(password, 8),
      });

      const token = jwt.sign(
        { id: newUser.dataValues.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        }
      );

      res.status(201).send({ message: 'Account created', token });
    }
  } catch (err) {
    console.log(`Error Create User ${err}`);
    res.status(400).send(err.message);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw new Error('Missing field');

    let user = await User.findByCredentials(username, password);

    if (!user) {
      throw new Error('No account found');
    } else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        }
      );

      res.status(201).send({ message: 'Logged in', token });
    }
  } catch (err) {
    console.log(`Error 1 ${err}`);
    res.status(400).send(err.message);
  }
};

export const logOut = async (req, res) => {
  try {
    res.status(200).send('Logged out');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
