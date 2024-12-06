import dotenv from 'dotenv';
dotenv.config();

export const PORT = parseInt(process.env.PORT!);
export const tokenSecret = process.env.TOKEN_SECRET as string;
