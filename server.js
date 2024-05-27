require(`dotenv`).config();

const express = require('express');
const app = express();

const router = require('./app/router');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}`);
});

