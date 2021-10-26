import User from './models/user';
import Post from './models/posts';
import Comment from './models/comments';

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];
const comments = [];

async function userCreate() {
  const user = new User({ username: 'alex', password: '123' });
  await user.save();
  users.push(user);
  console.log(users);
}

async function postCreate(title, body, author) {
  var post = new Post({ title: title, body: body, author: author });

  await post.save();
  posts.push(post);
}

async function commentCreate(username, email, body, post) {
  let commentdetail = {
    username: username,
    email: email,
    body: body,
    post: post,
  };

  var comment = new Comment(commentdetail);

  await comment.save();
  comments.push(comment);
}

async function createPosts() {
  await postCreate('Reggae', 'sample body', users[0]);

  await postCreate('Jazz', 'sample content', users[0]);

  await postCreate('Soul', 'sample content', users[0]);
}

async function createComments() {
  await commentCreate('username1', 'o@m.c', 'love this!', posts[0]);

  await commentCreate('username2', 'o@m.c', 'love this!', posts[1]);

  await commentCreate('username3', 'o@m.c', 'love this!', posts[2]);
}

const populateDB = async () => {
  await userCreate();
  await createPosts();
  await createComments();
};

populateDB();
