import { Request, Response } from 'express';
import { pollSchema } from '../models/poll';
import { db } from '../utils/db';
import { tokenService } from '../services/token';

class PollController {
  async createPoll(req: Request, res: Response) {
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

    const adminToken = tokenService.generateToken({
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
}

export const pollController = new PollController();
