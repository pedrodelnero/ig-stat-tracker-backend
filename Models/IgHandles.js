import Sequelize from 'sequelize';

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
