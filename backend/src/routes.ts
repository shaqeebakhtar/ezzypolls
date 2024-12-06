import { Router } from 'express';
import { createPoll } from './controllers/poll';

export const router = Router();

router.post('/poll', createPoll);
