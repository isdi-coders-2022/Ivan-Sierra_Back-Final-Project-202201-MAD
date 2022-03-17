import express from 'express';
import { mongoConnect } from './services/db.js';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
mongoConnect();
const app = express();
const port = 5500;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

import garagesRouter from './routes/garages.routes.js';
import servicesRouter from './routes/service.routes.js';
import loginRouter from './routes/login.routes.js';

app.use('/garages', garagesRouter);
app.use('/services', servicesRouter);
app.use('/login', loginRouter);

app.use((err, req, resp) => {
  console.log(err.message);
  resp.send({ error: err.message });
});

app.post('/garages', (req, res) => {
  console.log('nuevo endpoint');

  res.send('He usado POST');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server esta escuchando en http://localhost:${port} `);
});
