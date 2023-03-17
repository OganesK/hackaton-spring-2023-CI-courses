/* eslint-disable no-magic-numbers */
import { Router } from 'express';
import { DataSourceConfig } from 'apollo-datasource';
import { BASE_URL } from '../../config';
import prisma from '../../prisma-client';
import { Context, InitialContext } from '../../graphql/context';
import { UsersAPI } from '../../datasources/users';
import pubsub from '../../pubsub';

const router = Router();

router
  .get('/groupinvite', async (req, res) => {
    const context: InitialContext = {
      prisma,
      response: res,
      user: null,
      pubsub,
    };

    const usersAPI = new UsersAPI();

    usersAPI.initialize({ context } as DataSourceConfig<Context>);

    const authorization = req?.headers?.authorization;

    const user = await usersAPI.findUserByToken(authorization);

    if (user) {
      const inviteURL = BASE_URL + req.url;
      const group = await prisma.messagerGroup.findUnique({
        where: {
          inviteURL,
        },
      });

      await prisma.messagerGroup.update({
        where: {
          id: group.id,
        },
        data: {
          members: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.send('Success invite').status(200);
    } else {
      res.send('Error, User is not Authorized').status(401);
    }
  });

export default router;
