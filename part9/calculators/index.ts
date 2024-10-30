import express from 'express';
import bodyParser from 'body-parser';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.status(400).send({ error: 'Missing required parameters: height and weight' });
    return;
  }
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi
    });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(Array.isArray(daily_exercises));
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'Missing required parameters' });
    return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } else if (Array.isArray(daily_exercises) && daily_exercises.every((value: any) => { return !isNaN(Number(value)); }) && !isNaN(Number(target))) { 
    const dailyHours = daily_exercises.map(Number); 
    const result = calculateExercises(Number(target), dailyHours);
    res.json(result);
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});