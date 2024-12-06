import { useState } from 'react';
import { Button } from '../ui/button';

function Vote() {
  const [selected, setSelected] = useState('');

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
    { id: 'option5', label: 'Option 5' },
  ];

  return (
    <section className="min-h-screen grid gap-6 place-items-center">
      <span className="text-3xl font-bold">ezzyPolls</span>
      <div className="space-y-4 h-full">
        <h1>Question</h1>
        <div className="space-y-4">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="options"
                value={option.id}
                checked={selected === option.id}
                onChange={(e) => setSelected(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
        <Button>Submit</Button>
      </div>
    </section>
  );
}

export default Vote;
