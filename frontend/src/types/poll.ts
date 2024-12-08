export type TQuestion = {
  id: string;
  question?: string;
  choices: TChoice[];
  settings: {
    showResponses: boolean;
    showResult: boolean;
  };
};

export type TChoice = {
  id: string;
  choice?: string;
};
