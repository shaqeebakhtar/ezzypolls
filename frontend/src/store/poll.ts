import { TQuestion } from '@/types/poll';
import { create } from 'zustand';

type PollsStore = {
  questions: TQuestion[];
  setQuestions: (questions: TQuestion[]) => void;

  addQuestion: (question: TQuestion) => void;
  // removeQuestion: (questionId: string) => void;
};

export const usePollStore = create<PollsStore>()((set) => ({
  questions: [],
  setQuestions: (questions: TQuestion[]) =>
    set(() => ({
      questions,
    })),
  addQuestion: (question: TQuestion) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),
  // removeQuestion: (questionId: string) =>
  //   set((state) => ({
  //     questions: state.questions.filter(
  //       (question) => question.id !== questionId
  //     ),
  //   })),
}));
