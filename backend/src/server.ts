import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import prisma from './prisma-client';
import GQLServer from './graphql/server';
import { createToken, createRefreshToken } from './integrations/jwt';
import { PORT } from './config';
import { logger } from './logger';

const app = express();

const whitelist = [
  'http://localhost:5000',
  'http://localhost:4000',
  'http://localhost:3000',
  'otherWhiteListURLs',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`Response from process ${process.pid}`);
});

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload: any = null;

  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (error) {
    return res.send({ ok: false, accessToken: '' });
  }

  const user = await prisma.user.findFirst({ where: { id: payload.userId } });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  res.cookie('jid', createRefreshToken(user), { httpOnly: true, path: '/refresh_token', secure: process.env.ENV_NAME === 'PRODUCTION' });

  return res.send({ ok: true, accessToken: createToken(user) });
});

app.post('/logout', async (req, res) => {
  res.clearCookie('jid');
  res.send();
});

const startServer = async () => {
  await GQLServer.start();

  GQLServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
};

export default startServer;
