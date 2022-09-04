const express = require('express');
const schema = require('./schema');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const PORT = 4000;
const app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));
app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
});