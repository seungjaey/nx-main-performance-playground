// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const DEFAULT_RESPONSE_TIME = 10000;
let seq = 0;
export default function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  seq += 1;
  const ms = DEFAULT_RESPONSE_TIME - seq * 1000;
  const keyword = req.query.keyword;
  setTimeout(() => {
    res.status(200).json({ seq, keyword });
  }, ms);
}
