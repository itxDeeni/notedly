// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

//run our server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//construct a schema using graphql schema language
const typeDefs = gql`
  type Note {
    id: ID
    content:String
    author:String
  },
  type Query{
    hello:String
    notes:[Note!]
    note(id:ID):Note
  },
  type Mutation {
    newNote(content:String!):Note!
  }
`;


// Provide resolver functions for schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create(
        {
          content: args.content,
          author: 'Adam Scott'
        }
      )
    }
  }

};

const app = express();

db.connect(DB_HOST);

const server = new ApolloServer({ typeDefs, resolvers });

//apply the graphql middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () => { console.log(`GraphQL server running at https://localhost:${port}${server.graphqlPath}`) })