import { Request, Response } from 'express';
import { pollSchema } from '../models/poll';
import { db } from '../utils/db';
import { tokenService } from '../services/token';

class PollController {
  public async createPoll(req: Request, res: Response) {
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

  public async getPollById(req: Request, res: Response) {
    const { pollId } = req.params;

    let poll = null;

    try {
      poll = await db.poll.findFirst({
        where: {
          id: pollId,
        },
        include: {
          questions: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Unable to fetch polls',
      });
    }

    res.status(200).json({
      poll,
    });
  }

  public async addQuestionByPollId(req: Request, res: Response) {
    const { pollId } = req.params;

    let question = null;

    const tempChoices = [
      { id: Date.now().toString() + Math.random(), choice: '' },
      { id: Date.now().toString() + Math.random(), choice: '' },
    ];

    try {
      question = await db.question.create({
        data: {
          pollId,
          question: 'Ask your question here...',
          choices: JSON.stringify(tempChoices),
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Unable to add question',
      });
    }

    res.status(200).json({
      question,
    });
  }

  public async updateQuestionById(req: Request, res: Response) {
    const { questionId } = req.params;
    const { questionTxt, choices } = req.body;

    let question = null;

    try {
      question = await db.question.update({
        where: {
          id: questionId,
        },
        data: {
          question: questionTxt,
          choices: choices,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Unable to update question',
      });
    }

    res.status(200).json({
      question,
    });
  }
}

export const pollController = new PollController();
