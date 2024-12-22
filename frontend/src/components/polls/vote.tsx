import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useVoteStore } from '@/store/vote';
import { Link, useParams } from 'react-router';
import { getPollById } from '@/api/poll';
import { useQuery } from '@tanstack/react-query';
import { TChoice, TQuestion } from '@/types/poll';

function Vote() {
  const { pollId } = useParams() as {
    pollId: string;
  };
  const [selected, setSelected] = useState('');
  const [choices, setChoices] = useState<TChoice[]>();
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion>();
  const { setQuestions } = useVoteStore((state) => state);

  const { data: poll, isLoading } = useQuery({
    queryKey: ['poll', pollId],
    queryFn: () => getPollById(pollId),
  });

  useEffect(() => {
    if (!isLoading && poll) {
      setQuestions(poll.questions);
      setCurrentQuestion(
        poll.questions.find(
          (q: TQuestion) => q.order === poll.currQuestionIndex
        )
      );
      setChoices(
        JSON.parse(
          poll.questions.find(
            (q: TQuestion) => q.order === poll.currQuestionIndex
          ).choices
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollId, poll]);

  return (
    <section className="min-h-screen grid place-items-center w-full max-w-lg mx-auto p-4 lg:px-10">
      <div className="w-full space-y-8">
        <p className="text-2xl font-semibold">{currentQuestion?.question}</p>
        <div className="space-y-4">
          {choices &&
            choices.map((choice) => (
              <label
                key={choice.id}
                className="flex items-center space-x-3 cursor-pointer font-medium"
              >
                <input
                  type="radio"
                  name="options"
                  value={choice.id}
                  checked={selected === choice.id}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-800">{choice.choice}</span>
              </label>
            ))}
        </div>
        <Button className="w-full rounded-full shadow-none">Submit</Button>
      </div>
      <div className="w-max mx-auto pb-8 lg:fixed lg:right-8 lg:bottom-8 lg:pb-0">
        <Link
          to={'/'}
          className="font-bold text-xs flex items-center gap-1.5 bg-background shadow-sm rounded-md px-3 py-1.5 border hover:-translate-y-0.5 hover:scale-105 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
              clipRule="evenodd"
            />
          </svg>
          Powered by ezzypolls
        </Link>
      </div>
    </section>
  );
}

export default Vote;
