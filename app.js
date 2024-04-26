const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const Score = require('./models/score');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/score', async (req, res) => {
  const { name, time } = req.body;

  try {
    const newScore = await Score.create({ name, time });
    res.status(201).send(newScore);
  } catch(err) {
    res.status(400).send(err);
  }
});

app.get('/scores', async (req, res) => {
  try {
    const scores = await Score.findAll({
      order: [['time', 'ASC']],
      limit: 10
    });
    
    res.status(200).send(scores);
  } catch(err) {
    res.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})