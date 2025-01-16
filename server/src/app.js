require('dotenv').config();
const express = require('express');
const {PORT} = process.env
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router');



const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер!');
});

app.use('/api', authRouter);

app.options('*', cors());
app.listen(PORT, () => {
  console.log(`Сервер запущен на : ${PORT}`);
});
module.exports = app;
