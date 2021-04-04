import { GraphQLServer } from  'graphql-yoga';
import winston, { loggers } from 'winston';
import morgan from 'morgan';

import db from './utils/db';
import Query from './graphql/resolvers/Query';
import Mutation from './graphql/resolvers/Mutation';
import User from './graphql/resolvers/User';
import Post from './graphql/resolvers/Post';
import Comment from './graphql/resolvers/Comment';

console.log(morgan('tiny'));

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
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
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/logs.log'})
  ]
})

if(process.env.NODE_ENV === 'development') {
  console.log('NODE ENV ', process.env.NODE_ENV)
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  }))
}
server.start(() => logger.log('info', `The server is up!`));