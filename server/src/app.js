require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const apiRouter = require('./routers/api.router');

const { PORT } = process.env;

const app = express();

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
app.use(cors(corsConfig));

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

app.use('/api/', apiRouter);

app.options('*', cors());
app.listen(PORT, () => {
  console.log(`Сервер запущен на : ${PORT}`);
});
module.exports = app;
