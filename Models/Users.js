import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

import db from '../db/db.js';

const { DataTypes } = Sequelize;

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

User.findByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) throw new Error('No account found with this username');

    const isMatch = await bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!isMatch) throw new Error('Wrong password');

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default User;
