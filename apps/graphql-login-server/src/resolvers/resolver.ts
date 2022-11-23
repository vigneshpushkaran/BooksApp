import { faker } from '@faker-js/faker';

export const resolvers = {
  Query: {
    hello: () => 'world',
  },
  Mutation: {
    login: (_parent, _args, _ctx) => {
      console.log({_parent},'ghghg');
      return {
        userName: faker.name.fullName(),
        id: faker.random.alphaNumeric(10)
      };
    },
  }
};
