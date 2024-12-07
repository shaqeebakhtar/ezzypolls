import { router } from '.';
import { pollController } from '../controllers/poll';

router.post('/poll', pollController.createPoll);
