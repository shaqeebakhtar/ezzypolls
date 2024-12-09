import { addQuestionByPollId } from '@/api/poll';
import { TChoice, TQuestion } from '@/types/poll';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { InfoIcon, Loader2, PlusIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
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
import { Textarea } from '../ui/textarea';

const Question = ({ question }: { question: TQuestion }) => {
  const { pollId } = useParams() as {
    pollId: string;
  };
  const [questionTxt, setQuestionTxt] = useState(question.question || '');
  const [choices, setChoices] = useState<TChoice[]>(
    JSON.parse(question.choices) || []
  );
  const debouncedQuestionTxt = useDebounce(questionTxt, 2500);
  const debouncedChoices = useDebounce(choices, 2500);

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

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addQuestionByPollId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poll', pollId] });
    },

    onError: () => {
      toast.error('Failed to add question');
    },
  });

  useEffect(() => {
    if (
      debouncedQuestionTxt.trim() !== '' &&
      !debouncedChoices.some((choice) => choice.choice.trim() === '')
    ) {
      // mutate here
      mutate({
        pollId,
        questionTxt: questionTxt,
        choices: JSON.stringify(choices),
      });
      console.log('mutating...');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedChoices, debouncedQuestionTxt]);

  return (
    <div className="max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg">
      <div className="flex flex-col items-end space-y-4 p-6 pb-4">
        <Textarea
          className="shadow-none overflow-hidden min-h-9 h-9 resize-none font-semibold"
          placeholder="Ask your question here..."
          value={questionTxt}
          onChange={(e) => setQuestionTxt(e.currentTarget.value)}
          ref={(textarea) => {
            if (textarea) {
              textarea.style.height = '0px';
              textarea.style.height = textarea.scrollHeight + 'px';
            }
          }}
        />
        <div className="w-full space-y-2.5">
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="shadow-none text-sm placeholder:text-gray-500"
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
        <div className="w-full flex items-center justify-between">
          {isPending && (
            <div className="flex items-center gap-1.5 text-xs text-green-500">
              <Loader2 className="size-4 animate-spin" />
              Saving..
            </div>
          )}
          <Button
            type="button"
            variant={'ghost'}
            size={'sm'}
            className="text-primary hover:bg-primary/10 hover:text-primary h-auto px-2 py-1.5 ml-auto"
            onClick={addChoice}
          >
            <PlusIcon className="w-3 h-3 mr-1.5" />
            Add Choice
          </Button>
        </div>
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
