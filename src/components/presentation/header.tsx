import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PresentationIcon, Share2Icon, VoteIcon } from 'lucide-react';
import Link from 'next/link';

const PresentationHeader = () => {
  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-4 items-center justify-between px-4">
        <div className="flex items-center py-2">
          <VoteIcon className="mr-2 text-gray-500 dark:text-gray-400" />
          <p className="text-sm font-medium">My First Poll</p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              'text-gray-500 dark:text-gray-400 text-sm font-semibold px-1 py-3 border-b-4 border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all',
              true &&
                'text-foreground border-primary hover:border-primary dark:hover:border-primary'
            )}
          >
            Create
          </Link>
          <Link
            href="/"
            className={cn(
              'text-gray-500 dark:text-gray-400 text-sm font-semibold px-1 py-3 border-b-4 border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all',
              false &&
                'text-foreground border-primary hover:border-primary dark:hover:border-primary'
            )}
          >
            Results
          </Link>
        </div>
        <div className="flex items-center gap-2 py-2">
          <Button variant="secondary" className="h-8 rounded-full">
            <Share2Icon className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="h-8 rounded-full">
            <PresentationIcon className="w-4 h-4 mr-2" />
            Present
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PresentationHeader;
