const router = require('express').Router();
const { where } = require('sequelize');
const { Card, Result } = require('../../db/models');

// Получаем карточки, созданные пользователем
router.get('/card/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cards = await Card.findAll({ where: { userId } });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка при загрузке карточек' });
  }
});

// Создание новой карточки
router.post('/cards', async (req, res) => {
  const { english, russian, themeId, userId } = req.body;
  try {
    const card = await Card.create({ english, russian, themeId, userId });
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка при создании карточки' });
  }
});

// Удаление карточки
router.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Card.destroy({ where: { id } });
    res.json({ message: 'Карточка успешно удалена' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка при удалении карточки' });
  }
});

// Получение прогресса пользователя
router.get('/results/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Result.findAll({
      where: { userId },
      include: [{ model: Theme, attributes: ['name'] }],
    });

    const formatted = result.map((result) => ({
      themeId: result.themeId,
      themeName: result.Theme.name,
      result: result.result,
      totalCards: result.totalCards,
    }));
    res.json(formatted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка при загрузке прогресса' });
  }
});

module.exports = router;
