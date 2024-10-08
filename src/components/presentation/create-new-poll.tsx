'use client';
import { InfoIcon, PlusIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Hint from '@/components/ui/hint';

const CreateNewPoll = () => {
  const [question, setQuestion] = useState<string>();
  const [choices, setChoices] = useState<
    {
      id: number;
      placeholder: string;
    }[]
  >([]);

  function addChoice() {
    setChoices((prev) => [
      ...prev,
      {
        id: Math.random(),
        placeholder: `Choice ${prev.length + 3}`,
      },
    ]);
  }

  function removeChoice(choiceId: number) {
    setChoices((prev) => {
      return prev.filter((choice) => choice.id !== choiceId);
    });
  }

  return (
    <section className="bg-gray-100 dark:bg-background w-full min-h-[calc(100vh-56px)] py-6">
      <div className="max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg p-6 rounded-b-none">
        <div className="flex flex-col items-end space-y-2.5">
          <Textarea
            placeholder="Ask your question here..."
            className="overflow-hidden p-2 h-0 min-h-12 border-none shadow-none resize-none text-2xl font-medium placeholder:text-gray-500"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
          />
          <div className="w-full space-y-2.5">
            <Input
              className="h-10 text-base shadow-none placeholder:text-gray-500"
              placeholder="Choice 1"
            />
            <Input
              className="h-10 text-base shadow-none placeholder:text-gray-500"
              placeholder="Choice 2"
            />
            {choices.map((choice) => (
              <div key={choice.id} className="flex items-center gap-2">
                <Input
                  className="h-10 text-base shadow-none placeholder:text-gray-500"
                  placeholder={choice.placeholder}
                />
                <Button
                  variant={'secondary'}
                  size={'icon'}
                  className="w-10"
                  onClick={() => removeChoice(choice.id)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant={'ghost'}
            size={'sm'}
            className="text-primary hover:bg-primary/10 hover:text-primary h-auto px-2 py-1.5"
            onClick={addChoice}
          >
            <PlusIcon className="w-3 h-3 mr-1.5" />
            Add Choice
          </Button>
          <Button className="w-full h-auto py-2.5">Create Poll</Button>
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto bg-background dark:bg-gray-800/30 rounded-lg px-6 border-t rounded-t-none">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="hover:no-underline text-lg font-semibold">
              Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-3 mt-2">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="show-percentage"
                  className="flex items-center gap-2 w-full font-normal cursor-pointer"
                >
                  Show responses as percentage
                  <Hint label="You can swithc">
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
                  <Hint label="Show only voting bars">
                    <InfoIcon className="w-4 h-4 text-gray-500" />
                  </Hint>
                </Label>
                <Switch id="show-result" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default CreateNewPoll;
