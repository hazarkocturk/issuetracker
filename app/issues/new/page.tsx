'use client';
import { Button, Callout, Text, TextField} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '../../validationSchemas';
import { z } from 'zod';
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
  const [error, setError] = useState('');
  const [ submitting, setSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form
      className='space-y-3'
      onSubmit={handleSubmit(async(data) => {
        try {
        setSubmitting(true);
        await axios.post('/api/issues', data);
        router.push('/issues');}
        catch (error) {
          setSubmitting(false);
          console.error(error);
          setError('An error occurred while submitting the form');
        }
      })} 
    >
       
        <TextField.Root {...register('title')}></TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder='Description' />
        )}
      />
      {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
      <Button disabled={submitting}type="submit">Submit New Issue {submitting&&<Spinner/>}</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
