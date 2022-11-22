import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from './app/resolver';
import typeDefs from './utils/schema';

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const start = async () => {
  await server.start();
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );
  await httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000`);
};

start();