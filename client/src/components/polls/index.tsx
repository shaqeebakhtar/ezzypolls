import { TPoll } from '@/types/poll';
import { Button } from '../ui/button';
import PresentationControls from './controls';
import PollsHeader from './header';
import Poll from './poll';
import { PlusIcon } from 'lucide-react';
import { usePollStore } from '@/store/poll';

function CreatePoll() {
  const { polls, addPoll } = usePollStore((state) => state);

  const addQuestion = () => {
    addPoll({
      id: Date.now().toString(),
      question: '',
      choices: [
        {
          id: `${Date.now() + Math.random()}`,
        },
        {
          id: `${Date.now() + Math.random()}`,
        },
      ],
      settings: {
        showResponses: false,
        showResult: false,
      },
    });
  };

  return (
    <div className="bg-gray-100">
      <PollsHeader />
      <section className="max-w-screen-sm mx-auto dark:bg-background w-full min-h-[calc(100vh-56px)] space-y-4 pt-8 pb-12 px-3">
        <PresentationControls />
        {polls.map((poll: TPoll) => (
          <Poll key={poll.id} poll={poll} />
        ))}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full rounded-full shadow-none"
          onClick={addQuestion}
        >
          <PlusIcon className="w-4 h-4 mr-1.5" />
          New question
        </Button>
      </section>
    </div>
  );
}

export default CreatePoll;
