import { getPollById } from '@/api/poll';
import { usePollStore } from '@/store/poll';
import { TPoll } from '@/types/poll';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { Button } from '../ui/button';
import PresentationControls from './controls';
import PollsHeader from './header';
import Poll from './poll';
import { useEffect } from 'react';

function Create() {
  const { pollId } = useParams() as {
    pollId: string;
  };

  const { polls, addPoll, setPolls } = usePollStore((state) => state);

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

  const { data: poll, isLoading } = useQuery({
    queryKey: ['poll', pollId],
    queryFn: () => getPollById(pollId),
  });

  useEffect(() => {
    if (!isLoading && poll) {
      setPolls(poll.questions);
    }
  }, [isLoading, poll, setPolls]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100">
      <PollsHeader pollName={poll.name} />
      <section className="max-w-screen-sm mx-auto dark:bg-background w-full min-h-[calc(100vh-56px)] space-y-4 pt-8 pb-12 px-3">
        <PresentationControls />
        {polls.length > 0 ? (
          polls.map((poll: TPoll) => <Poll key={poll.id} poll={poll} />)
        ) : (
          <div className="h-72 grid place-items-center max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg p-6">
            <p className="text-lg font-medium">Add your first question</p>
          </div>
        )}
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

export default Create;
