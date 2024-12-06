import cors from 'cors';
import express, { Express } from 'express';
import { router } from './routes';
import { PORT } from './utils/config';

const app: Express = express();

const port = PORT || 3000;

const corsOption = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
