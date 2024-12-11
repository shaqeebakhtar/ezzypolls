import { pollController } from '../controllers/poll';
import { Router } from 'express';

export const pollRouter = Router();

pollRouter.post('/poll', pollController.createPoll);
pollRouter.get('/poll/:pollId', pollController.getPollById);
pollRouter.post('/poll/:pollId', pollController.addQuestionByPollId);
pollRouter.patch(
  '/poll/:pollId/question/:questionId',
  pollController.updateQuestionById
);
