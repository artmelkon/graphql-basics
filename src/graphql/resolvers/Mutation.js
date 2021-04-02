import { v4 as uuidv4 } from 'uuid';

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
  }
}

export { Mutation as default }
