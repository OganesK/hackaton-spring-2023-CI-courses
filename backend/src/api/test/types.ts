import { enumType, objectType } from 'nexus';
import { Context } from '../../graphql/context';

export * from './query';
export * from './mutation';

export const Test = objectType({
    name: 'Test',
    definition(t) {
        t.model.id,
        t.model.name,
        t.model.tasks
    }
})
