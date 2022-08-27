// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer,gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');

const app = express();


const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST)

let notes = [
  {id:'1',content:'This is a note',author:'Adam Scott'},
  {id:'2',content:'This is another note',author:'Harlow Everly'},
  {id:'3',content:'Oh hey, look, another note',author:'Riley Harrison'},
];

//construct a schema using graphql schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content:String!
    author:String!
  },
  type Query{
    hello:String
    notes:[Note!]!
    note(id:ID):Note!
  }
  type Mutation {
    newNote(content:String!):Note!
  }
`;


// Provide resolver functions for schema fields
const resolvers = {
  Query:{
    hello: ()=>'Hello World',
    notes:()=>notes,
    note:(parent,args)=>{
      return notes.find(note=> note.id === args.id);
    }
  },
  Mutation:{
    newNote:(parent, args)=>{
      let noteValue = {
        id:String(notes.length + 1),
        content : args.content,
        author:'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue
    }
  }

};

const server = new ApolloServer({ typeDefs, resolvers });

//apply the graphql middleware and set the path to /api
server.applyMiddleware({ app, path:"/api" });

app.listen({port},()=>{console.log(`GraphQL server running at https://localhost:${port}${server.graphqlPath}`)})