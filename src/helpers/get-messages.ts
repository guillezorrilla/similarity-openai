import { nanoid } from 'nanoid';

export async function getMessages({
  messages,
  apiKey,
  assistantType
}: {
  messages: any[];
  apiKey: string;
  assistantType: string;
}) {
  const res = await fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey
    },
    body: JSON.stringify({ messages, assistantType })
  });

  const data = (await res.json()) as { error?: string };
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
