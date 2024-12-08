import { getPollById } from '@/api/poll';
import { usePollStore } from '@/store/poll';
import { TQuestion } from '@/types/poll';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from '../ui/button';
import PollsHeader from './header';
import Question from './question';

function Create() {
  const { pollId } = useParams() as {
    pollId: string;
  };

  const { questions, addQuestion, setQuestions } = usePollStore(
    (state) => state
  );

  const { data: poll, isLoading } = useQuery({
    queryKey: ['poll', pollId],
    queryFn: () => getPollById(pollId),
  });

  useEffect(() => {
    if (!isLoading && poll) {
      setQuestions(poll.questions);
    }
  }, [isLoading, poll, setQuestions]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100">
      <PollsHeader pollName={poll.name} />
      <section className="max-w-screen-sm mx-auto dark:bg-background w-full min-h-[calc(100vh-56px)] space-y-4 pt-8 pb-12 px-3">
        <div className="max-w-screen-sm mx-auto flex justify-end">
          <Button
            type="button"
            className="rounded-full shadow-none"
            onClick={() =>
              addQuestion({
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
              })
            }
          >
            <PlusIcon className="w-4 h-4" />
            New question
          </Button>
        </div>
        {poll.questions.length > 0 ? (
          questions.map((poll: TQuestion) => (
            <Question key={poll.id} poll={poll} />
          ))
        ) : (
          <div className="h-72 grid place-items-center max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg p-6">
            <p className="text-lg font-medium">Add your first question</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Create;
