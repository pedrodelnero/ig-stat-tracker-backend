import Sequelize from 'sequelize';

import db from '../db/db.js';

const { DataTypes } = Sequelize;

const IgHandle = db.define('ig_handles', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  handle: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default IgHandle;
