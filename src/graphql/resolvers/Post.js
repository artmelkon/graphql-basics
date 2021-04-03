import _ from 'lodash';

const Post = {
  author(parent, args, { db }, info) {
    return _.find(db.users, user => { return user.id = parent.author })
  },
  comments(parent, arsg, { db }, info) {
    return _.filter(db.comments, comment => { return comment.post === parent.id })
  }
}

export { Post as default };