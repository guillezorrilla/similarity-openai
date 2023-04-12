'use client';

import { FC, useState } from 'react';
import { Input } from './ui/Input';
import { getMessages } from '@/helpers/get-messages';
import { ApiKey } from '@prisma/client';
import { toast } from './ui/Toast';
import { Button } from './ui/Button';
import Paragraph from './ui/Paragraph';
import { nanoid } from 'nanoid';
import { ISelectOptions, Select } from '@/ui/Select';
import Icons from './Icons';
import { ButtonBase } from '@mui/material';

interface IAssistantProps {
  apiKeyKey: ApiKey;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const selectOptions: ISelectOptions[] = [
  {
    label: 'Assistant',
    value: 'assistant'
  },
  {
    label: 'Marketing',
    value: 'marketing'
  },
  {
    value: 'advertising',
    label: 'Advertising'
  }
];

const Assistant: FC<IAssistantProps> = ({ apiKeyKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(apiKeyKey.key);
  const [selectedOption, setSelectedOption] = useState<string>(
    selectOptions[0].value
  );
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data: any = await getMessages({
        apiKey: apiKeyKey.key,
        messages,
        assistantType: selectedOption
      });
      const newId = nanoid();
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: currentMessage
        },
        {
          role: data.role,
          content: data.content
        }
      ]);
      setCurrentMessage('');
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
      setIsLoading(false);
    }
  };
  const resetMessagesHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessages([]);
  };
  return (
    <div>
      <div className="max-h-[550px] overflow-y-auto flex flex-col">
        {/* <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center mb-4">
          <Paragraph className="w-fill">Enter Your API key:</Paragraph>
          <Input
            className="truncate w-fit"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
        </div> */}
        {messages.map(({ role, content }) => {
          if (role === 'user') {
            return (
              <Paragraph className="w-fit font-bold max-w-full" key={nanoid()}>
                {content}
              </Paragraph>
            );
          }
          return (
            <div key={nanoid()} className="w-full dark:text-white mb-2">
              {content}
            </div>
          );
        })}
      </div>
      <form
        action="#"
        onSubmit={onSubmitHandler}
        className="absolute bottom-10 left-0 right-0 px-3">
        <div className="flex flex-row gap-4">
          <Select
            options={selectOptions}
            value={selectedOption}
            disabled={isLoading}
            onChange={(event) => setSelectedOption(event?.target.value)}
          />
          <Button
            disabled={messages.length === 0 || isLoading}
            type="button"
            onClick={resetMessagesHandler}>
            <Icons.Eraser />
          </Button>
          <Input
            className="w-full"
            placeholder="Send a message to the Assistant..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button isLoading={isLoading} className="w-fit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Assistant;
