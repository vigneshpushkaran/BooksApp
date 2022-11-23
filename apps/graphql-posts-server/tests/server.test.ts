// For clarity in this example we included our typeDefs and resolvers above our test,
// but in a real world situation you'd be importing these in from different files
import { resolvers } from '../src/resolvers/resolver';
import { ApolloServer } from '@apollo/server';
import * as path from 'path';
import * as fs from 'fs';
it('returns world with the provided name', async () => {

    const typeDefs = fs.readFileSync(path.resolve(__dirname, '../src/schema.graphql')).toString();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const response = await server.executeOperation({
        query: `query helloFromPosts{
            helloFromPosts
          }`,
        variables: {
        }
        ,
    });

    expect(response.body.kind === 'single');
});

it('creates post', async () => {

    const typeDefs = fs.readFileSync(path.resolve(__dirname, '../src/schema.graphql')).toString();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const response = await server.executeOperation({
        query: `mutation post($author: String!,$comment: String!){
            createPost(author: $author,comment: $comment){
              comment
              author
            }
          }`,
        variables: {
            "author": "V1P",
            "comment": "very good"
        }
    });

    expect(response.body.kind === 'single');
});