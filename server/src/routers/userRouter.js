const express = require('express');
const userRouter = express.Router();
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

userRouter.get('/profile', verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.status(200).json({ id: user.id, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
module.exports = userRouter;
