import { addQuestionByPollId, getPollById } from '@/api/poll';
import { TQuestion } from '@/types/poll';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { Button } from '../ui/button';
import PollsHeader from './header';
import Question from './question';
import { toast } from 'sonner';

function Create() {
  const { pollId } = useParams() as {
    pollId: string;
  };

  const queryClient = useQueryClient();

  const { data: poll, isLoading } = useQuery({
    queryKey: ['poll', pollId],
    queryFn: () => getPollById(pollId),
  });

  const mutation = useMutation({
    mutationFn: addQuestionByPollId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poll', pollId] });
    },
    onError: () => {
      toast.error('Failed to add question');
    },
  });

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
            onClick={() => mutation.mutate(pollId)}
          >
            <PlusIcon className="w-4 h-4" />
            New question
          </Button>
        </div>
        {poll.questions.length > 0 ? (
          poll.questions.map((question: TQuestion) => (
            <Question key={question.id} question={question} />
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
