import { TQuestion } from '@/types/poll';
import { create } from 'zustand';

type PollsStore = {
  questions: TQuestion[];
  setQuestions: (questions: TQuestion[]) => void;

  // addQuestion: (question: TQuestion) => void;
  // removeQuestion: (questionId: string) => void;

  // updateChoices: (questionId: string, choices: TChoice[]) => void;
};

// function setChoices({
//   state,
//   questionId,
//   choices,
// }: {
//   state: PollsStore;
//   questionId: string;
//   choices: TChoice[];
// }) {
//   return state.questions.map((question) =>
//     question.id === questionId
//       ? {
//           ...question,
//           choices,
//         }
//       : question
//   );
// }

export const usePollStore = create<PollsStore>()((set) => ({
  questions: [],
  setQuestions: (questions: TQuestion[]) =>
    set(() => ({
      questions,
    })),
  // addQuestion: (question: TQuestion) =>
  //   set((state) => ({
  //     questions: [...state.questions, question],
  //   })),
  // removeQuestion: (questionId: string) =>
  //   set((state) => ({
  //     questions: state.questions.filter(
  //       (question) => question.id !== questionId
  //     ),
  //   })),
  // updateChoices: (questionId: string, choices: TChoice[]) =>
  //   set((state) => ({
  //     questions: setChoices({ state, questionId, choices }),
  //   })),
}));
