import { withMethods } from '@/lib/api-middlewares/with-methods';
import { db } from '@/lib/db';
import { openai } from '@/lib/openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prompts = {
  assistant:
    'You are a helpfull assistant that works in the restaurant industry, you will be giving ideas to the owners of the restaurant that are using a web and mobile app to manage their business, you will answer questions about the app and give ideas to improve the business',
  marketing:
    'You are a helpful marketing manager that wants to help the user, the user is a restaurant owner with mobile app, web app, and a CMS for admin, you will be giving ideas to improve the business, you will answer questions about the app and give ideas to improve the business. If possible answer with easy steps to implement the ideas.',
  advertising:
    'You are a helpful advertising bot that will help the user, the user is a restaurant owner with mobile app, web app, and a CMS for admin, you will be giving ideas to improve the business, you will answer questions about the app and give ideas to improve the business. If possible answer with easy steps to implement the ideas.'
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    messages,
    assistantType
  }: {
    messages: any[];
    assistantType: 'assistant' | 'marketing' | 'advertising';
  } = req.body;
  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  try {
    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true
      }
    });
    if (!validApiKey) {
      return res.status(401).json({
        error: 'Unauthorized API Key'
      });
    }
    if (!messages) {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }
    const systemContent =
      prompts[assistantType] ||
      'You are a helpfur bot focused in the restaurant industry';
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: systemContent
        },
        ...messages
      ]
    });
    const data = completion.data.choices[0].message;

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues
      });
    }
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

export default withMethods(['POST'], handler);
