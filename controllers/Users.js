import bcrypt from 'bcrypt';

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

      req.session.user = newUser.dataValues.id;

      console.log('sess', req.session.user);
      // const token = jwt.sign(newUser.username, process.env.JWT_SECRET, {
      //   expiresIn: '24h',
      // });
      res.status(201).send({ message: 'Account created' });
    }
  } catch (error) {
    console.log(`Error 1 ${error}`);
    res.status(400).send(error.message);
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
      req.session.user = user.dataValues.id;
      console.log('Log');
      res.status(201).send({ message: 'Logged in' });
    }
  } catch (error) {
    console.log(`Error 1 ${error}`);
    res.status(400).send(error.message);
  }
};
