const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.get('/profile', verifyAccessToken, async (req, res) => {
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

router.put('/update', verifyAccessToken, async (req, res) => {

  const { newUsername, newPassword} = req.body;
  const userId = res.locals.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Текущий пароль неверный' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (newUsername) {
      user.name = newUsername;
    }

    await user.save();

    res.status(200).json({ message: 'Профиль успешно обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
