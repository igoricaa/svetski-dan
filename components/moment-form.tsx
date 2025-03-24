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
    message: 'Polje mora imati najmanje 2 slova.',
  }),
  city: z.string().min(2, {
    message: 'Polje mora imati najmanje 2 slova.',
  }),
  message: z
    .string()
    .min(5, {
      message: 'Polje mora imati najmanje 5 slova.',
    })
    .max(40, {
      message: 'Polje mora imati manje od 40 slova.',
    }),
});

export default function MomentForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitMoment(values);

      if (result.success) {
        form.reset();
        toast.success('Vaš trenutak je uspešno sačuvan!');
      } else {
        toast.error(
          'Greška prilikom pamćenja trenutka. Molimo pokušajte ponovo.'
        );
      }
    } catch (error) {
      toast.error(
        'Greška prilikom pamćenja trenutka. Molimo pokušajte ponovo.'
      );
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
                  <InputField
                    placeholder='Podeli svoj trenutak ovde'
                    {...field}
                  />
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
                  <InputField
                    placeholder='Upiši svoje ime i prezime'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-lg uppercase absolute -bottom-7' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <InputField placeholder='Upiši svoj grad' {...field} />
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
                Pamćenje trenutka...
              </>
            ) : (
              'Podeli'
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
