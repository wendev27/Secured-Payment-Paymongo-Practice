import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response): void => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  res.json({
    status: 'ok',
    timestamp,
    uptime: `${Math.floor(uptime)}s`,
    requestId: req.id,
  });
};
