const router = require('express').Router();
const { Card } = require('../../db/models')

router.get('/:themeId', async (req, res) => {
  try {
    const { themeId } = req.params;
    const cards = await Card.findAll({ where: { themeId } });
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;