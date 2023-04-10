'use client';

import { FC, useState } from 'react';
import Paragraph from './ui/Paragraph';
import { Input } from './ui/Input';
import TextArea from './ui/TextArea';
import { Button } from './ui/Button';
import { getSimilarity } from '@/helpers/get-similarity';
import { toast } from './ui/Toast';
import Code from './Code';

interface ITryitProps {
  apiKeyId: string;
}

const TryIt: FC<ITryitProps> = ({ apiKeyId }) => {
  const [apiKey, setApiKey] = useState<string>(apiKeyId);
  const [text1, setText1] = useState<string>('text1');
  const [text2, setText2] = useState<string>('text2');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [similarity, setSimilarity] = useState<{
    similarity: number;
    success: boolean;
    text1: string;
    text2: string;
  } | null>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text1 || !text2)
      return toast({
        title: 'Error',
        message: 'Please enter text',
        type: 'error'
      });
    try {
      setIsCreating(true);
      const res = await getSimilarity({
        apiKey,
        text1,
        text2
      });
      setSimilarity(res);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Error',
          message: err.message,
          type: 'error'
        });

        return;
      }

      toast({
        title: 'Error',
        message: 'Something went wrong',
        type: 'error'
      });
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <form action="#" onSubmit={onSubmitHandler}>
      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center mb-4">
          <Paragraph className="w-fill">Enter Your API key:</Paragraph>
          <Input
            className="truncate w-fit"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4 justify-start md:justify-start items-start">
            <Paragraph className="w-fill">Enter Your Text 1:</Paragraph>
            <TextArea
              rows={3}
              cols={3}
              maxLength={1000}
              value={text1}
              required
              onChange={(e) => setText1(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 justify-start md:justify-start items-start">
            <Paragraph className="w-fill">Enter Your Text 2:</Paragraph>
            <TextArea
              maxLength={1000}
              rows={3}
              cols={3}
              value={text2}
              required
              onChange={(e) => setText2(e.target.value)}
            />
          </div>
        </div>
        <Button isLoading={isCreating} className="w-full">
          Get Similarity
        </Button>
        {similarity?.success && (
          <div className="flex flex-col gap-4 items-center md:items-start mt-4">
            <Paragraph className="w-fit">Response</Paragraph>
            <Code
              show
              animated
              language="json"
              code={JSON.stringify(similarity)}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default TryIt;
