export const loggerPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart() {
        return {
            // Fires whenever Apollo Server will parse a graphQL.
            async parsingDidStart(requestContext) {
                const { operationName, query } = requestContext.request;
                console.log('Parsing started!', { operationName, query });
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against graphQL schema.
            async validationDidStart(requestContext) {
                const response = requestContext.response;
                console.log('Validation started!', JSON.stringify(response));
            },
        };
    },
};