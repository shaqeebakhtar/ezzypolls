import { TChoice, TPoll } from '@/types/poll';
import { create } from 'zustand';

type PollsStore = {
  polls: TPoll[];

  setPolls: (polls: TPoll[]) => void;
  addPoll: (poll: TPoll) => void;
  removePoll: (pollId: string) => void;

  updateChoices: (pollId: string, choices: TChoice[]) => void;
};

function setChoices({
  state,
  pollId,
  choices,
}: {
  state: PollsStore;
  pollId: string;
  choices: TChoice[];
}) {
  return state.polls.map((poll) =>
    poll.id === pollId
      ? {
          ...poll,
          choices,
        }
      : poll
  );
}

export const usePollStore = create<PollsStore>()((set) => ({
  polls: [
    {
      id: Date.now().toString(),
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
    },
  ],
  setPolls: (polls: TPoll[]) =>
    set(() => ({
      polls,
    })),
  addPoll: (poll: TPoll) =>
    set((state) => ({
      polls: [...state.polls, poll],
    })),
  removePoll: (pollId: string) =>
    set((state) => ({
      polls: state.polls.filter((poll) => poll.id !== pollId),
    })),
  updateChoices: (pollId: string, choices: TChoice[]) =>
    set((state) => ({
      polls: setChoices({ state, pollId, choices }),
    })),
}));
