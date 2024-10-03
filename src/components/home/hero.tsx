import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';

const Hero = () => {
  return (
    <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-20 lg:px-16">
      <h1 className="text-center font-title font-bold text-4xl leading-[1.15] md:text-6xl md:leading-[1.15]">
        Engage Your Audience with{' '}
        <span className="bg-gradient-to-r from-amber-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
          Live Polls
        </span>
        , Instantly!
      </h1>
      <p className="text-center text-xl text-muted-foreground mx-auto max-w-[680px] mt-6">
        Create polls on the fly, get real-time responses, and make data-driven
        decisions effortlessly.
      </p>
      <div className="flex items-center gap-4 mt-8 justify-center">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'rounded-full px-6 h-10'
          )}
        >
          Create a Poll
        </Link>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'rounded-full px-6 h-10'
          )}
        >
          Join a Poll
        </Link>
      </div>
    </section>
  );
};

export default Hero;
