import { TQuestion } from '@/types/poll';
import { create } from 'zustand';

type VoteStore = {
  questions: TQuestion[];
  setQuestions: (questions: TQuestion[]) => void;
};

export const useVoteStore = create<VoteStore>()((set) => ({
  questions: [],
  setQuestions: (questions: TQuestion[]) =>
    set(() => ({
      questions,
    })),
}));
