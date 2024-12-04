import { Button } from '../ui/button';

function PresentationControls() {
  return (
    <div className="max-w-screen-sm mx-auto mt-6 flex justify-end">
      <Button type="button" className="rounded-full shadow-none">
        Start Poll
      </Button>
    </div>
  );
}

export default PresentationControls;
