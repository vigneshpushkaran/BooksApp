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
    signUp: (_parent, args, _ctx) => {
      if(args.userName){
        return {
          __typename: "signUp",
          userName: args.userName,
          id: faker.random.alphaNumeric(10),
          status: "Created",
          message: `Welcome ${args.userName} !`
        };
      }
      return{
        __typename: "error",
        message: "username can't be empty",
        code: "400"
      }

    },
  }
};
