import bcrypt from 'bcrypt';

import User from '../Models/Users.js';

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('000', username, password);

  try {
    if (!username || !password) throw new Error('Missing field');

    let user = await User.findOne({ where: { username: username } });
    console.log('111');

    if (user) {
      throw new Error('User Already Exists');
    } else {
      const newUser = await User.create({
        username,
        password: bcrypt.hashSync(password, 8),
      });

      // console.log('user', pedro);
      req.session.user = newUser.dataValues.username;
      // const token = jwt.sign(newUser.username, process.env.JWT_SECRET, {
      //   expiresIn: '24h',
      // });
      res.status(201).send({ username });
    }
  } catch (error) {
    console.log(`Error 1 ${error}`);
    res.status(400).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('000', username, password);

  try {
    if (!username || !password) throw new Error('Missing field');

    let user = await User.findOne({ where: { username: username } });
    console.log('111');

    if (user) {
      throw new Error('User Already Exists');
    } else {
      const pedro = await User.create({
        username,
        password: bcrypt.hashSync(password, 8),
      });

      console.log('user', pedro);
      // const token = jwt.sign(newUser.username, process.env.JWT_SECRET, {
      //   expiresIn: '24h',
      // });
      // res.status(201).send({ user_name, token });
    }
  } catch (error) {
    console.log(`Error 1 ${error}`);
    res.status(400).send(error.message);
  }
};
