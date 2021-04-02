const Query = {
  users(parent, args, { db }, info) {
    if(!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db }, info) {
    if(!args.query) return db.posts;
    return db.posts.filter(post => {
      const titleQueryMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
      const bodyQueryMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      return titleQueryMatch || bodyQueryMatch;
    })
  },
  me() {
    return {
      id: '123098',
      name: 'Arthur',
      email: 'art@art.com',
    }
  },
  post: () => {
    return {
      id: 'abc-123456',
      title: 'Days in Molodva',
      body: 'Days in moldova are boring and long',
      published: false
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
}

export { Query as default }