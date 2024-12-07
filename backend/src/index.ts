import cors from 'cors';
import express, { Express } from 'express';
import { PORT } from './utils/config';
import cluster from 'cluster';
import { cpus } from 'os';
import { createServer } from 'http';
import { SocketService } from './services/socket';
import { pollRouter } from './routes/poll';

const app: Express = express();
const httpServer = createServer(app);

const socketService = new SocketService(httpServer);
socketService.init();

const port = PORT || 3000;
const cpuCount = cpus().length;

const corsOption = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', pollRouter);

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker process ${worker.process.pid} exited. Restarting...`);
    cluster.fork();
  });
} else {
  httpServer.listen(port, () => {
    console.log(
      `Worker process ${process.pid} is running at http://localhost:${port}`
    );
  });
}
