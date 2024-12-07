import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { createPoll } from '@/api/poll';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const pollSchema = z.object({
  name: z.string().min(2, {
    message: 'Poll name must be at least 2 characters.',
  }),
  email: z.string().email().optional(),
});

function CreatePollDialog() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pollSchema>>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createPoll,
    onSuccess: (data) => {
      toast.success('Your poll has been created');
      navigate(`/poll/${data}/create`);
    },
  });

  async function onSubmit(data: z.infer<typeof pollSchema>) {
    mutation.mutate({ name: data.name, email: data.email });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6 h-10">Create Poll</Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Poll</DialogTitle>
          <DialogDescription>Enter the name of the poll</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poll name</FormLabel>
                  <FormControl>
                    <Input placeholder="My poll" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email{' '}
                    <span className="text-muted-foreground font-normal">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@domain.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex-col gap-2 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={'secondary'}
                  className="shadow-none"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="shadow-none"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePollDialog;
