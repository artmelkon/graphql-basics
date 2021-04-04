import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Mutation = {
  createUser(parent, args, { db }, inof) {
    const emailTaken = db.users.some(user => user.email === args.data.email);
    if(emailTaken) throw new Error('Email taken!');
    
    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(user);
    return user;
  },
  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex(user => user.id === args.id);
    if(userIndex ===  -1) throw new Error('401 - invalid user!');
    
    const deletedUser = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if(match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id)
      }
      return !match;
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUser[0];
  },
  updateUser(parent, { id, data }, { db }, info) {
    const user = _.find(db.users, user => user.id === id);
    if(!user) throw new Error('User not found!');
    if(typeof data.email === 'string') {
      const emailExists = _.some(db.users, user => user.email === data.email);
      if(emailExists) throw new Error('Email taken');
      user.email = data.email;
    }
    if(typeof data.name === 'string') user.name = data.name;
    if(typeof data.name !== 'undefined') user.age = data.age;

    return user;
  },
  createPost(parent, args, { db }, info) {
    const userExist = db.users.some(user => user.id === args.data.author);
    if(!userExist) throw new Error('401 - invalid user!');

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.push(post);
    return post;
  },
  deletePost: (parent, args, { db }, info) => {
    const postIndex = _.findIndex(db.posts, post => post.id === args.id);
    if(postIndex === -1) throw new Error('404 - post not found!');
    const deletedPost = db.posts.splice(postIndex, 1);
    db.comments = _.filter(db.comments, comment => comment.post !== args.id);
    return deletedPost[0]
  },
  updatePost(parent, { id, data }, { db }, info) {
    const post = _.find(db.posts, post => post.id === id);
    if(!post) throw new Error('404 - post not found!');
    if(typeof data.title === 'string') post.title = data.title;
    if(typeof data.body === 'string') post.body = data.body;
    if(typeof data.published === 'boolean') post.published = data.published;
    return post;
  },
  createComment: (parent, args, { db }, info) => {
    const userExist = db.users.some(user => user.id === args.data.author);
    const postExist = db.posts.some(post => post.id === args.data.post && post.published);
    if(!userExist || !postExist) throw new Error('Unable to process your request!');

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = _.findIndex(db.comments, comment => comment.id === args.id);
    if(commentIndex === -1) throw new Error('404 - comment not found!');
    const deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
  updateComment(parent, {id, data}, { db }, info) {
    const comment = _.find(db.comments, comment => comment.id == id);
    if(!comment) throw new Error('404 - comment not found');
    if(typeof data.text === 'string') comment.text = data.text;
    return comment;
  }
}

export { Mutation as default }
