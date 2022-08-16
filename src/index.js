// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer,gql } = require('apollo-server-express');

const app = express();


const port = process.env.PORT || 4000;

//construct a schema using graphql schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for schema fields
const resolvers = {
  Query:{
    hello: ()=>'Hello World'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

//apply the graphql middleware and set the path to /api
server.applyMiddleware({ app, path:"/api" });

app.listen({port},()=>{console.log(`GraphQL server running at https://localhost:${port}${server.graphqlPath}`)})