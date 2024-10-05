import CreateNewPoll from '@/components/presentation/create-new-poll';
import PresentationHeader from '@/components/presentation/header';
import React from 'react';

const Presentation = () => {
  return (
    <>
      <PresentationHeader />
      <CreateNewPoll />
    </>
  );
};

export default Presentation;
