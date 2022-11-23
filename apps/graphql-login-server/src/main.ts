import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from './resolvers/resolver';
import typeDefs from './utils/schema';

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
});

app.get('/health', (_req, res) => {
    res.status(200);
})

const PORT = 5001;
const start = async () => {
    await server.start();
    app.use('/graphql',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server),
    );
    await httpServer.listen({ port: PORT });
    console.log(`🚀 Login server ready at http://localhost:${PORT}/graphql`);
};

start();