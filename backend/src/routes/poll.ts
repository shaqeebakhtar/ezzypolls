import { router } from '.';
import { createPoll } from '../controllers/poll';

router.post('/poll', createPoll);
