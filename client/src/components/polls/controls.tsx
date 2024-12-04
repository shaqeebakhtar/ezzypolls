import { Button } from '../ui/button';

function PresentationControls() {
  return (
    <div className="max-w-screen-sm mx-auto mt-6 flex justify-end">
      <Button type="button" className="rounded-full shadow-none px-6">
        Start Poll
      </Button>
    </div>
  );
}

export default PresentationControls;
