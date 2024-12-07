import { pollController } from '../controllers/poll';
import { Router } from 'express';

export const pollRouter = Router();

pollRouter.post('/poll', pollController.createPoll);
pollRouter.get('/poll/:pollId', pollController.getPollById);
