import { TChoice, TPoll } from '@/types/poll';
import { create } from 'zustand';

type PollsStore = {
  polls: TPoll[];

  addPoll: (poll: TPoll) => void;
  removePoll: (pollId: string) => void;

  addChoice: (pollId: string, choice: TChoice) => void;
};

const addChoice = (pollId: string, choice: TChoice) => {};

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
  addPoll: (poll: TPoll) =>
    set((state) => ({
      polls: [...state.polls, poll],
    })),
  removePoll: (pollId: string) =>
    set((state) => ({
      polls: state.polls.filter((poll) => poll.id !== pollId),
    })),
  addChoice: (pollId: string, choice: TChoice) =>
    set((state) => ({
      polls: state.polls.filter((poll) => poll.id !== pollId),
    })),
}));
