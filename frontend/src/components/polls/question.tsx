import { cn } from '@/lib/utils';
import { TChoice, TQuestion } from '@/types/poll';
import { InfoIcon, PlusIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import Hint from '../ui/hint';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useMutation } from '@tanstack/react-query';
import { updateQuestionById } from '@/api/poll';
import { useParams } from 'react-router';

const Question = ({ question }: { question: TQuestion }) => {
  const { pollId } = useParams() as {
    pollId: string;
  };
  const editableQuestionRef = useRef(null);
  const [questionTxt, setQuestionTxt] = useState(question.question);
  const [isEditable, setIsEditable] = useState(false);
  const [choices, setChoices] = useState<TChoice[]>(
    JSON.parse(question.choices)
  );

  function addChoice() {
    setChoices((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        choice: '',
      },
    ]);
  }

  function removeChoice(choiceId: string) {
    setChoices((prev) => prev.filter((choice) => choice.id !== choiceId));
  }

  function updateChoice(choiceId: string, newValue: string) {
    setChoices((prev) =>
      prev.map((choice) =>
        choice.id === choiceId ? { ...choice, choice: newValue } : choice
      )
    );
  }

  const mutation = useMutation({
    mutationFn: updateQuestionById,
    onSuccess: () => {
      console.log('Question updated successfully!');
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      mutation.mutate({
        pollId,
        questionId: question.id,
        questionTxt,
        choices: JSON.stringify(choices),
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, questionTxt]);

  return (
    <div className="max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg">
      <div className="flex flex-col items-end space-y-4 p-6 pb-4">
        <div
          tabIndex={0}
          contentEditable={isEditable}
          aria-multiline
          suppressContentEditableWarning
          ref={editableQuestionRef}
          className={cn(
            'min-h-9 border border-input cursor-text w-full font-semibold text-lg bg-transparent px-3 py-1 rounded-md focus:outline-none',
            isEditable && 'outline-none ring-1 ring-ring'
          )}
          onFocus={() => setIsEditable(true)}
          onBlur={(e) => {
            setQuestionTxt(e.currentTarget.innerText);
            setIsEditable(false);
          }}
        >
          <p>{questionTxt}</p>
        </div>
        <div className="w-full space-y-2.5">
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="shadow-none placeholder:text-gray-500"
                placeholder={`Choice ${index + 1}`}
                value={choice.choice}
                onChange={(e) => updateChoice(choice.id, e.currentTarget.value)}
              />
              <Button
                type="button"
                variant="secondary"
                size={'icon'}
                className="w-10"
                disabled={choices.length < 3}
                onClick={() => removeChoice(choice.id)}
              >
                <XIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant={'ghost'}
          size={'sm'}
          className="text-primary hover:bg-primary/10 hover:text-primary h-auto px-2 py-1.5"
          onClick={addChoice}
        >
          <PlusIcon className="w-3 h-3 mr-1.5" />
          Add Choice
        </Button>
      </div>
      <div className="w-full bg-background dark:bg-gray-800/30 px-6 border-t rounded-t-none rounded-lg">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="hover:no-underline text-base font-semibold">
              Poll Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-3 mt-2">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="show-percentage"
                  className="flex items-center gap-2 w-full font-normal cursor-pointer"
                >
                  Show responses as percentage
                  <Hint label="Responses are shown in numbers by default">
                    <InfoIcon className="w-4 h-4 text-gray-500" />
                  </Hint>
                </Label>
                <Switch id="show-percentage" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="show-result"
                  className="flex items-center gap-2 w-full font-normal cursor-pointer"
                >
                  Allow multiple selections
                </Label>
                <Switch id="show-result" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Question;
