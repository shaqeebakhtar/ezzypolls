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
