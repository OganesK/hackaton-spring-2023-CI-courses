import { arg, extendType, inputObjectType, nonNull } from 'nexus';
import { Context } from '../../graphql/context';
import { DEFAULT_IMAGE } from '../../config';

export const CourseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneCourse', {
      type: 'Course',
      args: { data: nonNull(arg({ type: createCourseInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        return ctx.prisma.course.create({
          data: {
            name: data.name,
            shortDescription: data.shortDescription,
            owner: {
              connect: {
                id: data.ownerID,
              },
            },
            poster: {
              connect: {
                url: DEFAULT_IMAGE,
              },
            },
          },
        });
      },
    });

    t.field('updateCourse', {
      type: 'String',
      args: { data: nonNull(arg({ type: updateCourseInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const courseData = await ctx.prisma.course.findUnique({
          where: {
            id: data.courseId,
          },
        });

        await ctx.prisma.course.update({
          where: {
            id: data.courseId,
          },
          data: {
            name: data.name !== null ? data.name : courseData.name,
            shortDescription: data.shortDescription !== null ? data.shortDescription : courseData.shortDescription,
          },
        });

        return 'Success!';
      },
    });

    t.crud.deleteOneCourse();
  },
});

export const updateCourseInput = inputObjectType({
  name: 'updateCourseInput',
  definition (t) {
    t.nonNull.int('courseId');
    t.string('name');
    t.field('category', {
      type: 'filteringCategoies',
    });
    t.field('courseType', {
      type: 'courseType',
    });
    t.string('shortDescription');
  },
});

export const createCourseInput = inputObjectType({
  name: 'createCourseInput',
  definition (t) {
    t.nonNull.string('name');
    t.nonNull.field('category', {
      type: 'filteringCategoies',
    });
    t.nonNull.string('shortDescription');
    t.nonNull.int('ownerID');
    t.field('courseType', {
      type: 'courseType',
    });
  },
});

/* ===================================================================== */
