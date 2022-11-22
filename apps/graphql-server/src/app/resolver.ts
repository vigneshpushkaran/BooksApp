// A map of functions which return data for the schema.
export const resolvers = {
    Query: {
      hello: () => 'world',
    },
    Mutation:{
        hello: (_parent,args,_ctx) => {
            console.log({args});
            return `${args.text}mutate`;
        }
    }
  };
  