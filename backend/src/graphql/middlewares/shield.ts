import { rule, shield as Shield, and, or } from 'graphql-shield';

import { Context } from '../context';

const isAuthenticated = rule({ cache: 'contextual' })(
  (parent, args, ctx: Context) => {
    return ctx.user !== null;
  },
);

const isAdministrator = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    return ctx?.user?.role === 'administrator';
  });

const isModerator = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    return ctx?.user?.role === 'moderator';
  });

const isResident = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    return ctx?.user?.role === 'resident';
  });
// const isAuthMeForAvatarUpload = rule({ cache: 'contextual' })(
//   async (parent, args, ctx: Context) => {
//     const currentUser = await ctx.prisma.user.findUnique({
//       where: {
//         id: args?.data?.entityId,
//       },
//     });

//     return ctx?.user?.id === currentUser?.id;
//   });

const isAuthMeForAvatarUpload = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: {
        id: args?.data?.entityId,
      },
    });

    return ctx?.user?.id === currentUser?.id;
  });

const isAuthMe = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: {
        id: args?.data?.userId,
      },
    });

    return ctx?.user?.id === currentUser?.id;
  });

// const isOwnerOfCompany = rule({ cache: 'contextual' })(
//   async (parent, args, ctx: Context) => {
//     console.log(args);
//     return ctx?.user?.id === args?.data?.owner?.connect?.id;
//   },
// );

const isCompanyOwner = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyOwner = await ctx.prisma.company.findUnique({
      where: {
        id: args.data.companyId,
      },
    });

    return ctx?.user?.id === companyOwner?.ownerID;
  },
);

const isCompanyOwnerProject = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyOwner = await ctx.prisma.company.findUnique({
      where: {
        id: args?.data?.ownerCompany,
      },
    });

    return ctx?.user?.id === companyOwner.ownerID;
  },
);

const isCompanyOwnerForUpdateCompany = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyOwner = await ctx.prisma.company.findUnique({
      where: {
        id: args?.data?.companyId,
      },
      include: {
        owner: true,
      },
    });

    return ctx?.user?.id === companyOwner?.owner?.id;
  },
);

const isCompanyOwnerForUpdateContact = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyContactOwner = await ctx.prisma.contact.findUnique({
      where: {
        id: args?.data?.contactId,
      },
      include: {
        ownerCompany: true,
      },
    });

    return ctx?.user?.id === companyContactOwner?.ownerCompany?.ownerID;
  },
);

const isCompanyOwnerForUpdatePost = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyPostOwner = await ctx.prisma.post.findUnique({
      where: {
        id: args?.data?.postId,
      },
      include: {
        project: {
          include: {
            ownerCompany: true,
          },
        },
      },
    });

    return ctx?.user?.id === companyPostOwner?.project?.ownerCompany?.ownerID;
  },
);

const isPostWorkerForUpdatePost = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const workerPostOwner = await ctx.prisma.post.findUnique({
      where: {
        id: args?.data?.postId,
      },
      include: {
        author: true,
      },
    });

    return ctx?.user?.id === workerPostOwner?.author?.workerID;
  },
);

const isCompanyOwnerForUpdateProject = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyProjectOwner = await ctx.prisma.project.findUnique({
      where: {
        id: args?.data?.projectId,
      },
      include: {
        ownerCompany: true,
      },
    });

    return ctx?.user?.id === companyProjectOwner?.ownerCompany?.ownerID;
  },
);

const isCompanyOwnerForUpdateWorker = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyWorkerProject = await ctx.prisma.worker.findUnique({
      where: {
        id: args?.where?.id,
      },
      include: {
        project: true,
      },
    });

    const companyWorkerOwner = await ctx.prisma.project.findUnique({
      where: {
        id: companyWorkerProject?.project?.id,
      },
      include: {
        ownerCompany: true,
      },
    });

    return ctx?.user?.id === companyWorkerOwner?.ownerCompany?.ownerID;
  },
);

const isCompanyOwnerPutSignURL = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const companyOwner = await ctx.prisma.company.findUnique({
      where: {
        id: args?.data?.entityId,
      },
    });

    return ctx?.user?.id === companyOwner?.ownerID;
  },
);

const isProjectOwnerPutSignURL = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const projectOwner = await ctx.prisma.project.findUnique({
      where: {
        id: args?.data?.entityId,
      },
      include: {
        ownerCompany: true,
      },
    });

    return ctx?.user?.id === projectOwner?.ownerCompany?.ownerID;
  },
);

const isProjectOwnerDeletePresentationMedia = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const media = await ctx.prisma.media.findUnique({
      where: {
        url: args.data.mediaUrl,
      },
      include: {
        projectMedia: {
          include: {
            ownerCompany: true,
          },
        },
      },
    });

    return ctx?.user?.id === media?.projectMedia?.ownerCompany?.ownerID;
  },
);

const isPostOwnerOrCreator = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const currentData = await ctx.prisma.post.findUnique({
      where: {
        id: args?.data?.entityId,
      },
      include: {
        author: true,
        project: {
          include: {
            ownerCompany: true,
          },
        },
      },
    });

    return ctx?.user?.id === currentData?.author?.id || ctx?.user?.id === currentData?.project?.ownerCompany?.ownerID;
  },
);

const isProjectOwnerForWorker = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const workerData = await ctx.prisma.worker.findUnique({
      where: {
        id: args.where.id,
      },
      include: {
        project: {
          include: {
            ownerCompany: true,
          },
        },
      },
    });

    return ctx?.user?.id === workerData?.project?.ownerCompany?.ownerID;
  },
);

const isProjectOwner = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const projectOwner = await ctx.prisma.project.findUnique({
      where: {
        id: args?.data?.projectId,
      },
      include: {
        ownerCompany: true,
      },
    });

    return ctx?.user?.id === projectOwner?.ownerCompany?.ownerID;
  },
);

const isProjectWorker = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const workerProjects = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      include: {
        inWorks: true,
      },
    });

    const verdict = workerProjects.inWorks.find((element) => element.projectID === args.data.projectId).id;

    return Boolean(verdict);
  },
);

const isProjectOwnerForDeletePost = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const projectOwner = await ctx.prisma.post.findUnique({
      where: {
        id: args?.where?.id,
      },
      include: {
        project: {
          include: {
            ownerCompany: true,
          },
        },
      },
    });

    return ctx?.user?.id === projectOwner?.project?.ownerCompany?.ownerID;
  },
);

const isGroupAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => {
    const group = await ctx.prisma.messagerGroup.findUnique({
      where: {
        id: args?.data?.groupId,
      },
      include: {
        admins: true,
      },
    });

    if (group.admins.some((e) => e.id === ctx.user.id)) {
      return true;
    }

    return false;
  },
);

const permissions = {
  Query: {
    getAllNonVerificatedCompanies: and(isAuthenticated, or(isAdministrator, isModerator)),
    getAllNonVerificatedProjects: and(isAuthenticated, or(isAdministrator, isModerator)),
    getAllNonVerificatedContacts: and(isAuthenticated, or(isAdministrator, isModerator)),
    getAllNonVerificatedPosts: and(isAuthenticated, or(isAdministrator, isModerator)),
    getAllNonVerificatedEvents: and(isAuthenticated, or(isAdministrator, isModerator)),
  },
  Mutation: {
    switchToMessager: and(isAuthenticated),
    createGroup: isAuthenticated,
    updateGroup: and(isAuthenticated, isGroupAdmin),
    deleteGroup: and(isAuthenticated, isGroupAdmin),

    addMembersToGroup: and(isAuthenticated, isGroupAdmin),
    removeMembersFromGroup: and(isAuthenticated, isGroupAdmin),
    removeGroupAdmin: and(isAuthenticated, isGroupAdmin),
    setGroupAdmin: and(isAuthenticated, isGroupAdmin),
    leaveFromGroup: isAuthenticated,

    sendMessage: and(isAuthenticated),

    verificateCompany: and(isAuthenticated, or(isAdministrator, isModerator)),
    verificateProject: and(isAuthenticated, or(isAdministrator, isModerator)),
    verificateContact: and(isAuthenticated, or(isAdministrator, isModerator)),
    verificatePost: and(isAuthenticated, or(isAdministrator, isModerator)),
    verificateEvent: and(isAuthenticated, or(isAdministrator, isModerator)),

    putUserAvatar: and(isAuthenticated, or(isAuthMeForAvatarUpload, isAdministrator, isModerator)),
    updateUserData: and(isAuthenticated, or(isAuthMe, isAdministrator, isModerator)),

    createCompany: and(isAuthenticated, or(isResident, isAdministrator, isModerator)),
    updateMyCompany: and(isAuthenticated, or(isCompanyOwnerForUpdateCompany, isAdministrator, isModerator)),
    deleteOneCompany: and(isAuthenticated, or(isAdministrator, isModerator)),
    putCompanyAvatar: and(isAuthenticated, or(isCompanyOwnerPutSignURL, isAdministrator, isModerator)),

    createOneContact: and(isAuthenticated, or(isCompanyOwner, isAdministrator, isModerator)),
    updateContact: and(isAuthenticated, or(isCompanyOwnerForUpdateContact, isAdministrator, isModerator)),
    deleteOneContact: and(isAuthenticated, or(isCompanyOwner, isAdministrator, isModerator)),

    createOneEvent: and(isAuthenticated, or(isResident, isAdministrator, isModerator)),
    updateOneEvent: and(isAuthenticated, or(isResident, isAdministrator, isModerator)),
    deleteOneEvent: and(isAuthenticated, or(isResident, isAdministrator, isModerator)),
    putEventPoster: and(isAuthenticated, or(isResident, isAdministrator, isModerator)),

    createOnePost: and(isAuthenticated, or(isProjectWorker, isProjectOwner, isAdministrator, isModerator)),
    updatePost: and(isAuthenticated, or(isCompanyOwnerForUpdatePost, isPostWorkerForUpdatePost, isAdministrator, isModerator)),
    deleteOnePost: and(isAuthenticated, or(isProjectOwnerForDeletePost, isAdministrator, isModerator)),
    putPostPoster: and(isAuthenticated, or(isPostOwnerOrCreator, isAdministrator, isModerator)),
    putPostMedia: and(isAuthenticated, or(isPostOwnerOrCreator, isAdministrator, isModerator)),

    createOneProject: and(isAuthenticated, or(isCompanyOwnerProject, isAdministrator, isModerator)),
    updateProject: and(isAuthenticated, or(isCompanyOwnerForUpdateProject, isAdministrator, isModerator)),
    deleteOneProject: and(isAuthenticated, or(isAdministrator, isModerator)),
    putProjectPresentationMedia: and(isAuthenticated, or(isProjectOwnerPutSignURL, isAdministrator, isModerator)),
    deleteProjectPresentationMedia: and(isAuthenticated, or(isProjectOwnerDeletePresentationMedia, isAdministrator, isModerator)),

    setWorkerToProject: and(isAuthenticated, or(isProjectOwner, isAdministrator, isModerator)),
    updateOneWorker: and(isAuthenticated, or(isCompanyOwnerForUpdateWorker, isAdministrator, isModerator)),
    deleteOneWorker: and(isAuthenticated, or(isProjectOwnerForWorker, isAdministrator, isModerator)),
  },
};

export const shield = Shield(permissions, { allowExternalErrors: true });
