import { objectType, enumType } from 'nexus';

export * from './mutation';

export const Article = objectType({
  name: 'Article',
  definition (t) {
    t.model.id();
    t.model.createdAt();
    t.model.post();
    t.model.crowdfunding();
    t.model.project();
    t.model.sections({
      ordering: {
        number: true,
      },
    });
  },
});

export const Section = objectType({
  name: 'Section',
  definition (t) {
    t.model.id();
    t.model.article();
    t.model.number();
    t.model.type();
    t.model.text();
    t.model.media();
  },
});

export const enumSectionType = enumType({
  name: 'enumSectionType',
  members: ['text', 'image', 'video'],
});
