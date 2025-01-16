const express = require('express');
const router = express.Router();
const { Theme } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  } catch (error) {
    console.error('Ошибка при получении тем:', error);
    res.status(500).json({ error: 'Ошибка при получении тем' });
  }
});

router.post('/', async (req, res) => {
  const { name, imagePath } = req.body;
  try {
    const theme = await Theme.create({ name, imagePath });
    res.json(theme);
  } catch (error) {
    console.error('Ошибка при создании темы:', error);
    res.status(500).json({ error: 'Ошибка при создании темы' });
  }
});

module.exports = router;
