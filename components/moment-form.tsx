'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { submitMoment } from '@/lib/actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters.',
  }),
  message: z
    .string()
    .min(5, {
      message: 'Message must be at least 5 characters.',
    })
    .max(40, {
      message: 'Message must be less than 40 characters.',
    }),
});

export default function MomentForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitMoment(values);

      if (result.success) {
        form.reset();
        toast.success('Your moment has been submitted!');
      } else {
        toast.error('Failed to submit your moment. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to submit your moment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn('p-6 max-w-lg mx-auto', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <InputField placeholder='Share your moment here' {...field} />
                </FormControl>
                <FormMessage className='text-lg uppercase absolute -bottom-7' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <InputField placeholder='Your name' {...field} />
                </FormControl>
                <FormMessage className='text-lg uppercase absolute -bottom-7' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <InputField placeholder='Your country' {...field} />
                </FormControl>
                <FormMessage className='text-base sm:text-lg uppercase absolute -bottom-7' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-fit uppercase bg-accent font-bold text-lg sm:text-xl px-7 sm:px-8 py-6 font-trade-gothic-next cursor-pointer hover:bg-accent-dark transition-colors'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Submitting...
              </>
            ) : (
              'Share'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

const InputField = ({
  placeholder,
  className,
  ...props
}: {
  placeholder: string;
  className?: string;
  props?: React.ComponentProps<typeof Input>;
}) => {
  return (
    <Input
      placeholder={placeholder}
      className={cn(
        'uppercase border-none bg-white/30 text-white !text-2xl sm:!text-3xl h-16 placeholder:text-2xl sm:placeholder:text-3xl placeholder:text-center placeholder:text-white rounded-none',
        className
      )}
      {...props}
    />
  );
};
