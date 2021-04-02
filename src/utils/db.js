// SCALAR TYPES: String, Int, Float, Boolean, ID

// Demo user data
const users = [
  { id: '1', name: 'Arthur', email: 'art@art.com', age: 47 },
  { id: '2', name: 'Smith', email: 'sm@smith.me', age: 27 },
  { id: '3', name: 'Jessica', email: 'jsca@graphwl.me' }
]

const posts = [
  { id: '11', title: 'King Arthur', body: 'Dorem ipsum dolor sit amet.', published: false, author: '1' },
  { id: '12', title: 'Bird of Paradise', body: 'Lorem ipsum dolor sit amet.', published: true, author: '2' },
  { id: '13', title: 'Pigs on the horizon', body: 'Lorem ipsum dolor sit amet.', published: true, author: '3' }
];

const comments = [
  { id: '21', text: 'Dorem 21 ipsum dolor sit amet.', author: '3', post: '11' },
  { id: '22', text: 'Lorem 22 ipsum dolor sit amet.', author: '2', post: '12' },
  { id: '23', text: 'Lorem 23 ipsum dolor sit amet.', author: '2', post: '12' },
  { id: '24', text: 'Lorem 24 ipsum dolor sit amet.', author: '1', post: '11' }
];

const db = {
  users,
  posts,
  comments
}

export { db as default };

