import { Button } from '@/components/ui/button';
import { PresentationIcon, Share2Icon, VoteIcon } from 'lucide-react';

const PollsHeader = ({ pollName }: { pollName: string }) => {
  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-4 items-center justify-between px-4">
        <div className="flex items-center py-2">
          <VoteIcon className="mr-2 text-gray-500 dark:text-gray-400" />
          <p className="text-sm font-medium">{pollName}</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <Button
            variant="secondary"
            className="rounded-full w-8 h-8 sm:w-auto"
          >
            <Share2Icon className="w-4 h-4" />
            <span className="hidden sm:block">Share</span>
          </Button>
          <Button className="h-8 rounded-full">
            <PresentationIcon className="w-4 h-4" />
            Present
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PollsHeader;
