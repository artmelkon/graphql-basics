import { GraphQLServer } from  'graphql-yoga';
import _ from 'lodash';
// import winston from 'winston';
import morgan from 'morgan';

import db from './utils/db';
import Query from './graphql/resolvers/Query';
import Mutation from './graphql/resolvers/Mutation';
import User from './graphql/resolvers/User';
import Post from './graphql/resolvers/Post';
import Comment from './graphql/resolvers/Comment';

console.log(morgan('tiny'));

const server = new GraphQLServer({
  typeDefs: './graphql/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});
server.start(() => console.log(`The server is up!`));