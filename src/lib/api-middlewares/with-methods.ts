import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !methods.includes(req.method)) {
      res.setHeader('Allow', methods);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    return handler(req, res);
  };
}
