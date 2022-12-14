import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
  Subscription: {
    postCreated: {
      subscribe: withFilter( () => pubsub.asyncIterator(['POST_CREATED']),
      (payload,_variable)=>{
        return payload.postCreated.author !== "VP";
      }),
    },
    postCreatedWithId: {
      subscribe: (_,args) => pubsub.asyncIterator([`POST_CREATED_${args.id}`])
    },
  },
  Query: {
    helloFromPosts: () => 'world',
  },
  Mutation: {
    createPost: (_parent, args, _ctx) => {
      console.log({ args });
      pubsub.publish('POST_CREATED', { postCreated: args });
      return args;
    },
    createPostWithId: (_parent, args, _ctx) => {
      console.log({ args });
      pubsub.publish(`POST_CREATED_${args.id}`, { postCreatedWithId: args });
      return args;
    }
  }
};
