require(`dotenv`).config();

const express = require('express');
const cors = require(`cors`);
const app = express();
const router = require('./app/router');

app.use(
  cors({
    // Allow frontend development servers only
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
    ],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}`);
});

