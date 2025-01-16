const express = require('express');

const router = express.Router();

const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const cardRouter = require('./card.router');
const themeRouter = require('./theme.router');
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/card', cardRouter);
router.use('/theme', themeRouter);
router.use('/user', userRouter);

module.exports = router;
