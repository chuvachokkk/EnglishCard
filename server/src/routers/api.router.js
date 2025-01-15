const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');;
const tokenRouter = require('./token.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);

module.exports = router;
