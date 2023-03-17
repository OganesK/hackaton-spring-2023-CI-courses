import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer, GRAPHQL_WS } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { JWT_REFRESH_SECRET, PORT } from './config';
import prisma from './prisma-client';
import { createToken, createRefreshToken } from './integrations/jwt';
import schema from './graphql/schema';
import routes from './api/routes';
import apolloServer from './graphql/server';

const app = express();

const server = createServer(app);

const whitelist = [
  'http://localhost:5000',
  'http://localhost:4000',
  'http://localhost:3000',
  'https://dev-platform-frontend.herokuapp.com',
  'https://dev-platform-backend.herokuapp.com',
  'https://staging-platform-frontend.herokuapp.com',
  'https://staging-platform-backend.herokuapp.com',
  'https://staging-platform-backend.herokuapp.com/graphql',
  'https://dev-platform-backend.herokuapp.com/graphql',
  'http://37.140.198.225:4000/graphql',
  'http://stage.accelerator.geryon.space/graphql',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin) || process.env.ENV_NAME !== 'production') {
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
    payload = jwt.verify(token, JWT_REFRESH_SECRET!);
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

routes(app);

const startServer = async () => {
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const graphqlWs = new WebSocketServer({ noServer: true });

  useServer({ schema }, graphqlWs);

  const subTransWs = new WebSocketServer({ noServer: true });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    subTransWs,
  );

  server.on('upgrade', (req, socket, head) => {
    const protocol = req.headers['sec-websocket-protocol'];
    const protocols = Array.isArray(protocol)
      ? protocol
      : protocol?.split(',').map((prot) => prot.trim());

    const wss =
      protocols?.includes(GRAPHQL_WS) &&
        !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL)
        ? subTransWs
        : graphqlWs;

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server start at port 4000!');
  });
};

export default startServer;

// startServer();
