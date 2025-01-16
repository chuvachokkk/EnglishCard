const router = require("express").Router();
const { Theme } = require("../../db/models");

router.get("/all", async (req, res) => {
  try {
    const themes = await Theme.findAll();
    
    // const mapedThemes = themes.map((theme) => theme.get({plain: true}));
    // console.log(mapedThemes);
    res.json(themes);
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
});

module.exports = router;
