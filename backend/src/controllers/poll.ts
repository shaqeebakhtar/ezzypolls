import { Request, Response } from 'express';
import { pollSchema } from '../models/poll';
import { db } from '../utils/db';
import { generateToken } from '../services/token';

export async function createPoll(req: Request, res: Response) {
  const body = req.body;

  const { name, email } = pollSchema.parse(body);

  let poll = null;

  try {
    poll = await db.poll.create({
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create a poll',
    });
  }

  const adminToken = generateToken({
    id: poll?.id as string,
    createdAt: poll?.createdAt.toDateString() as string,
  });

  res.cookie('adminToken', adminToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.status(200).json({
    id: poll?.id,
  });
}
