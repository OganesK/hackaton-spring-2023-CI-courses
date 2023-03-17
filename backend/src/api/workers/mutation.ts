import { extendType, inputObjectType, nonNull, arg } from 'nexus';
import { GraphQLError } from 'graphql';
import { Context } from '../../graphql/context';

export const WorkerMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneWorker();

    t.field('setWorkerToProject', {
      type: 'Worker',
      args: { data: nonNull(arg({ type: setWorkerInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const project = await ctx.prisma.project.findUnique({
          where: {
            id: data.projectId,
          },
          include: {
            workers: true,
          },
        });

        const worker = await ctx.prisma.user.findUnique({
          where: {
            id: data.workerId,
          },
          include: {
            inWorks: true,
          },
        });

        if (project.workers.find((elem) => worker.inWorks.find((elem2) => JSON.stringify(elem) === JSON.stringify(elem2)))) {
          throw new GraphQLError('Worker is exist in project!');
        }

        return ctx.prisma.worker.create({
          data: {
            position: data.position,
            project: {
              connect: {
                id: data.projectId,
              },
            },
            worker: {
              connect: {
                id: data.workerId,
              },
            },
          },
        });
      },
    });

    t.crud.updateOneWorker();

    t.crud.upsertOneWorker();

    t.crud.deleteOneWorker();
  },
});

const setWorkerInput = inputObjectType({
  name: 'setWorkerInput',
  definition (t) {
    t.nonNull.int('workerId');
    t.nonNull.int('projectId');
    t.nonNull.string('position');
  },
});
