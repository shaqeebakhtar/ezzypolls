export async function createPoll({
  name,
  email,
}: {
  name: string;
  email: string | undefined;
}) {
  const res = await fetch('http://localhost:3000/api/poll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create poll');
  }

  const { id } = await res.json();

  return id;
}

export async function getPollById(pollId: string) {
  const res = await fetch(`http://localhost:3000/api/poll/${pollId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch polls');
  }

  const { poll } = await res.json();

  return poll;
}

export async function addQuestionByPollId({
  pollId,
  questionTxt,
  choices,
  order,
}: {
  pollId: string;
  questionTxt: string;
  choices: string;
  order: number;
}) {
  const res = await fetch(`http://localhost:3000/api/poll/${pollId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionTxt, choices, order }),
  });

  if (!res.ok) {
    throw new Error('Failed to add question');
  }

  const { question } = await res.json();

  return question;
}

export async function updateQuestionById({
  pollId,
  questionId,
  questionTxt,
  choices,
  order,
}: {
  pollId: string;
  questionId: string;
  questionTxt: string;
  choices: string;
  order: number;
}) {
  const res = await fetch(
    `http://localhost:3000/api/poll/${pollId}/question/${questionId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionTxt, choices, order }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to add question');
  }

  const { question } = await res.json();

  return question;
}
