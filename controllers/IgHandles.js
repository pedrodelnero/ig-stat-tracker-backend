import Sequelize from 'sequelize';

import IgHandle from '../Models/IgHandles.js';

const op = Sequelize.Op;

export const createHandle = async (req, res) => {
  const { handle } = req.body;
  const id = req.user.dataValues.id;

  try {
    if (!handle.igHandle) throw new Error('Missing field');

    let igUser = await IgHandle.findOne({
      where: { [op.and]: [{ user_id: id }, { handle: handle.igHandle }] },
    });

    if (igUser) {
      throw new Error('Handle Already Exists');
    } else {
      const newIgHandle = await IgHandle.create({
        handle: handle.igHandle,
        user_id: id,
      });

      res
        .status(201)
        .send({ message: 'handle added', id: newIgHandle.dataValues.id });
    }
  } catch (err) {
    console.log(`Error handle ${err}`);
    res.status(400).send(err.message);
  }
};

export const getHandles = async (req, res) => {
  const id = req.user.dataValues.id;

  try {
    let handles = await IgHandle.findAll({ where: { user_id: id } });

    res.status(201).send(handles);
  } catch (err) {
    console.log(`Error handle ${err}`);
    res.status(400).send(err.message);
  }
};

export const deleteHandle = async (req, res) => {
  const { handleId } = req.params;
  const userId = req.user.dataValues.id;

  try {
    await IgHandle.destroy({
      where: { [op.and]: [{ user_id: userId }, { id: handleId }] },
    });

    res.status(201).send({ message: 'Handle was deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateHandle = async (req, res) => {
  const { newHandle } = req.body;
  const { handleId } = req.params;
  const userId = req.user.dataValues.id;

  try {
    const ighandle = await IgHandle.findOne({
      where: { [op.and]: [{ user_id: userId }, { id: handleId }] },
    });
    if (ighandle.dataValues.handle !== newHandle) ighandle.handle = newHandle;

    await ighandle.save();
    res.status(201).send({ message: 'Handle was changed' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
