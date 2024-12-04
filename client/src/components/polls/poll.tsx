import { cn } from '@/lib/utils';
import { usePollStore } from '@/store/poll';
import { TChoice, TPoll } from '@/types/poll';
import { InfoIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
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

const Poll = ({ poll }: { poll: TPoll }) => {
  const editableQuestionRef = useRef(null);
  const [question, setQuestion] = useState('Ask your question here...');
  const [isEditable, setIsEditable] = useState(false);
  const [choices, setChoices] = useState<TChoice[]>(poll.choices);
  const { updateChoices } = usePollStore((state) => state);

  function addChoice() {
    setChoices((prev) => {
      const updatedChoices = [
        ...prev,
        {
          id: Date.now().toString(),
          placeholder: `Choice ${prev.length + 3}`,
        },
      ];
      updateChoices(poll.id, updatedChoices);
      return updatedChoices;
    });
  }

  function removeChoice(choiceId: string) {
    setChoices((prev) => {
      const updatedChoices = prev.filter((choice) => choice.id !== choiceId);

      updateChoices(poll.id, updatedChoices);
      return updatedChoices;
    });
  }

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
            'cursor-text w-full font-semibold text-lg bg-transparent px-3 py-1 rounded-md focus:outline-none',
            isEditable && 'outline-none ring-1 ring-ring'
          )}
          onFocus={() => setIsEditable(true)}
          onBlur={(e) => {
            setQuestion(e.currentTarget.innerText);
            setIsEditable(false);
          }}
        >
          <p>{question}</p>
        </div>
        <div className="w-full space-y-2.5">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center gap-2">
              <Input
                className="shadow-none placeholder:text-gray-500"
                placeholder={`Choice ${index + 1}`}
              />
              <Button
                type="button"
                variant="secondary"
                size={'icon'}
                className="w-10 bg-destructive/10 hover:bg-destructive/20"
                disabled={choices.length < 3}
                onClick={() => removeChoice(choice.id)}
              >
                <Trash2Icon className="w-4 h-4  text-destructive" />
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
                  <Hint label="Show votes as percentage">
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
                  Show result
                  <Hint label="Hide/Show result in presentor mode">
                    <InfoIcon className="w-4 h-4 text-gray-500" />
                  </Hint>
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

export default Poll;
