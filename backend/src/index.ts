import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';

import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(
  process.env.PORT, 
  () => console.log(`Server running on http://localhost:${process.env.PORT}/`)
)
