/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { extendType, nonNull, arg, inputObjectType } from 'nexus';
import { Context } from '../../graphql/context';

export const VerificationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('verificateMutation', {
      args: { data: nonNull(arg({ type: VerificateMutationInput })) },
      type: 'RejectModerationMessage',
      resolve: async (_, { data }, ctx: Context) => {
        switch (data.entityType) {
          case 'company':
            const companyData = await ctx.prisma.company.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                owner: true,
              },
            });

            if (data.verdict === true) {
              await ctx.prisma.company.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  isApproved: true,
                  moderationChecked: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Вашей компании',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: companyData.owner.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: data.entityId,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.company.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Вашей компании',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: companyData.owner.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: data.entityId,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          case 'project':
            const projectData = await ctx.prisma.project.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                ownerCompany: {
                  include: {
                    owner: true,
                  },
                },
              },
            });

            if (data.verdict === true) {
              await ctx.prisma.project.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  isApproved: true,
                  moderationChecked: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Вашего проекта',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: projectData.ownerCompany.owner.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: data.entityId,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.project.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Вашего проекта',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: projectData.ownerCompany.owner.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: data.entityId,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          case 'post':
            const postData = await ctx.prisma.post.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                author: {
                  include: {
                    worker: true,
                  },
                },
              },
            });

            if (data?.verdict === true) {
              await ctx.prisma.post.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  isApproved: true,
                  moderationChecked: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Вашего поста',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: postData.author.worker.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: postData.id,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.post.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Вашего поста',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: postData.author.worker.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: postData.id,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          case 'event':
            const eventData = await ctx.prisma.event.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                user: true,
              },
            });

            if (data.verdict === true) {
              await ctx.prisma.event.update({
                where: {
                  id: eventData.id,
                },
                data: {
                  isApproved: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Вашего мероприятия',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: eventData.user.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: eventData.id,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.event.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Вашего мероприятия',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: eventData.user.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: eventData.id,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          case 'contact':
            const contactData = await ctx.prisma.contact.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                ownerCompany: {
                  include: {
                    owner: true,
                  },
                },
              },
            });

            if (data?.verdict === true) {
              await ctx.prisma.contact.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  isApproved: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Ваших контактов',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: contactData.ownerCompany.owner.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: contactData.id,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.contact.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Ваших контактов',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: contactData.ownerCompany.owner.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: contactData.id,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          case 'crowdFunding':
            const cfData = await ctx.prisma.crowdFunding.findUnique({
              where: {
                id: data.entityId,
              },
              include: {
                project: {
                  include: {
                    ownerCompany: {
                      include: {
                        owner: true,
                      },
                    },
                  },
                },
              },
            });

            if (data.verdict === true) {
              await ctx.prisma.crowdFunding.update({
                where: {
                  id: data.entityId,
                },
                data: {
                  isApproved: true,
                  moderationChecked: true,
                  moderate: {
                    create: {
                      auditor: {
                        connect: {
                          id: ctx.user.id,
                        },
                      },
                    },
                  },
                },
              });

              await ctx.prisma.notification.create({
                data: {
                  theme: 'Результат модерации Вашей краундфайндинговой компании',
                  body: data.rejectMessage,
                  toWhom: {
                    connect: {
                      id: cfData.project.ownerCompany.owner.id,
                    },
                  },
                  checked: false,
                },
              });

              return {
                entityId: data.entityId,
                rejectMessage: data.rejectMessage,
                verdict: true,
              };
            };

            await ctx.prisma.crowdFunding.update({
              where: {
                id: data.entityId,
              },
              data: {
                isApproved: false,
                moderationChecked: true,
                moderate: {
                  create: {
                    auditor: {
                      connect: {
                        id: ctx.user.id,
                      },
                    },
                  },
                },
              },
            });

            await ctx.prisma.notification.create({
              data: {
                theme: 'Результат модерации Вашей краундфайндинговой компании',
                body: data.rejectMessage,
                toWhom: {
                  connect: {
                    id: cfData.project.ownerCompany.owner.id,
                  },
                },
                checked: false,
              },
            });

            return {
              entityId: data.entityId,
              rejectMessage: data.rejectMessage,
              verdict: false,
            };
          default:
            throw new Error('Invalid entity type');
        };
      },
    });

    t.field('verificatePost', {
      type: 'RejectMessage',
      args: { data: nonNull(arg({ type: VerificateEntityInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const entityData = await ctx.prisma.post.findUnique({
          where: {
            id: data.entityId,
          },
          include: {
            author: {
              include: {
                worker: true,
              },
            },
          },
        });

        if (data?.verdict === true) {
          await ctx.prisma.post.update({
            where: {
              id: data.entityId,
            },
            data: {
              isApproved: true,
              moderationChecked: true,
              moderate: {
                create: {
                  auditor: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              },
            },
          });

          await ctx.prisma.notification.create({
            data: {
              theme: 'Post Verdict',
              body: data.rejectMessage,
              toWhom: {
                connect: {
                  id: entityData.author.worker.id,
                },
              },
              checked: false,
            },
          });

          return {
            entityId: entityData.id,
            entityType: entityData.isNews === true ? 'News' : entityData.isOffer === true ? 'Offer' : entityData.isResource === true ? 'Resource' : 'Error',
            rejectMessage: data.rejectMessage,
            verdict: true,
          };
        };

        await ctx.prisma.post.update({
          where: {
            id: data.entityId,
          },
          data: {
            isApproved: false,
            moderationChecked: true,
            moderate: {
              create: {
                auditor: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.notification.create({
          data: {
            theme: 'Post Verdict',
            body: data.rejectMessage,
            toWhom: {
              connect: {
                id: entityData.author.worker.id,
              },
            },
            checked: false,
          },
        });

        return {
          entityId: entityData.id,
          entityType: entityData.isNews === true ? 'News' : entityData.isOffer === true ? 'Offer' : entityData.isResource === true ? 'Resource' : 'Error',
          rejectMessage: data.rejectMessage,
          verdict: false,
        };
      },
    });
    t.field('verificateEvent', {
      type: 'RejectMessage',
      args: { data: nonNull(arg({ type: VerificateEntityInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const entityData = await ctx.prisma.event.findUnique({
          where: {
            id: data.entityId,
          },
          include: {
            user: true,
          },
        });

        if (data.verdict === true) {
          await ctx.prisma.event.update({
            where: {
              id: entityData.id,
            },
            data: {
              isApproved: true,
              moderate: {
                create: {
                  auditor: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              },
            },
          });

          await ctx.prisma.notification.create({
            data: {
              theme: 'Event Verdict',
              body: data.rejectMessage,
              toWhom: {
                connect: {
                  id: entityData.user.id,
                },
              },
              checked: false,
            },
          });

          return {
            entityId: entityData.id,
            entityType: 'Event',
            rejectMessage: data.rejectMessage,
            verdict: true,
          };
        };

        await ctx.prisma.event.update({
          where: {
            id: data.entityId,
          },
          data: {
            isApproved: false,
            moderationChecked: true,
            moderate: {
              create: {
                auditor: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.notification.create({
          data: {
            theme: 'Event Verdict',
            body: data.rejectMessage,
            toWhom: {
              connect: {
                id: entityData.user.id,
              },
            },
            checked: false,
          },
        });

        return {
          entityId: entityData.id,
          entityType: 'Event',
          rejectMessage: data.rejectMessage,
          verdict: false,
        };
      },
    });
    t.field('verificateCompany', {
      type: 'RejectMessage',
      args: { data: nonNull(arg({ type: VerificateEntityInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const entityData = await ctx.prisma.company.findUnique({
          where: {
            id: data.entityId,
          },
          include: {
            owner: true,
          },
        });

        if (data?.verdict === true) {
          await ctx.prisma.company.update({
            where: {
              id: entityData.id,
            },
            data: {
              isApproved: true,
              moderate: {
                create: {
                  auditor: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              },
            },
          });

          await ctx.prisma.notification.create({
            data: {
              theme: 'Company Verdict',
              body: data.rejectMessage,
              toWhom: {
                connect: {
                  id: entityData.owner.id,
                },
              },
              checked: false,
            },
          });

          return {
            entityId: entityData.id,
            entityType: 'Company',
            rejectMessage: data.rejectMessage,
            verdict: true,
          };
        };

        await ctx.prisma.company.update({
          where: {
            id: data.entityId,
          },
          data: {
            isApproved: false,
            moderationChecked: true,
            moderate: {
              create: {
                auditor: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.notification.create({
          data: {
            theme: 'Company Verdict',
            body: data.rejectMessage,
            toWhom: {
              connect: {
                id: entityData.owner.id,
              },
            },
            checked: false,
          },
        });

        return {
          entityId: entityData.id,
          entityType: 'Company',
          rejectMessage: data.rejectMessage,
          verdict: false,
        };
      },
    });
    t.field('verificateContact', {
      type: 'RejectMessage',
      args: { data: nonNull(arg({ type: VerificateEntityInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const entityData = await ctx.prisma.contact.findUnique({
          where: {
            id: data.entityId,
          },
          include: {
            ownerCompany: {
              include: {
                owner: true,
              },
            },
          },
        });

        if (data?.verdict === true) {
          await ctx.prisma.contact.update({
            where: {
              id: data.entityId,
            },
            data: {
              isApproved: true,
              moderate: {
                create: {
                  auditor: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              },
            },
          });

          await ctx.prisma.notification.create({
            data: {
              theme: 'Contact Verdict',
              body: data.rejectMessage,
              toWhom: {
                connect: {
                  id: entityData.ownerCompany.owner.id,
                },
              },
              checked: false,
            },
          });

          return {
            entityId: entityData.id,
            entityType: 'Contact',
            rejectMessage: data.rejectMessage,
            verdict: true,
          };
        };

        await ctx.prisma.contact.update({
          where: {
            id: data.entityId,
          },
          data: {
            isApproved: false,
            moderationChecked: true,
            moderate: {
              create: {
                auditor: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.notification.create({
          data: {
            theme: 'Contact Verdict',
            body: data.rejectMessage,
            toWhom: {
              connect: {
                id: entityData.ownerCompany.owner.id,
              },
            },
            checked: false,
          },
        });

        return {
          entityId: entityData.id,
          entityType: 'Contact',
          rejectMessage: data.rejectMessage,
          verdict: false,
        };
      },
    });
    t.field('verificateProject', {
      type: 'RejectMessage',
      args: { data: nonNull(arg({ type: VerificateEntityInput })) },
      resolve: async (_, { data }, ctx: Context) => {
        const entityData = await ctx.prisma.project.findUnique({
          where: {
            id: data.entityId,
          },
          include: {
            ownerCompany: {
              include: {
                owner: true,
              },
            },
          },
        });

        if (data?.verdict === true) {
          await ctx.prisma.project.update({
            where: {
              id: data.entityId,
            },
            data: {
              isApproved: true,
              moderate: {
                create: {
                  auditor: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              },
            },
          });

          await ctx.prisma.notification.create({
            data: {
              theme: 'Project Verdict',
              body: data.rejectMessage,
              toWhom: {
                connect: {
                  id: entityData.ownerCompany.owner.id,
                },
              },
              checked: false,
            },
          });

          return {
            entityId: entityData.id,
            entityType: 'Project',
            rejectMessage: data.rejectMessage,
            verdict: true,
          };
        };

        await ctx.prisma.project.update({
          where: {
            id: data.entityId,
          },
          data: {
            isApproved: false,
            moderationChecked: true,
            moderate: {
              create: {
                auditor: {
                  connect: {
                    id: ctx.user.id,
                  },
                },
              },
            },
          },
        });

        await ctx.prisma.notification.create({
          data: {
            theme: 'Project Verdict',
            body: data.rejectMessage,
            toWhom: {
              connect: {
                id: entityData.ownerCompany.owner.id,
              },
            },
            checked: false,
          },
        });

        return {
          entityId: entityData.id,
          entityType: 'Project',
          rejectMessage: data.rejectMessage,
          verdict: false,
        };
      },
    });
  },
});

export const VerificateEntityInput = inputObjectType({
  name: 'VerificateEntityInput',
  definition (t) {
    t.nonNull.int('entityId');
    t.nonNull.boolean('verdict');
    t.nonNull.string('rejectMessage');
  },
});

export const VerificateMutationInput = inputObjectType({
  name: 'VerificateMutationInput',
  definition (t) {
    t.nonNull.int('entityId');
    t.nonNull.field('entityType', {
      type: 'moderateEntityTypes',
    });
    t.nonNull.boolean('verdict');
    t.string('rejectMessage');
  },
});
