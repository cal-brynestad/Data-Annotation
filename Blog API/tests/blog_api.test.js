// FOR DATA ANNOTATION GRADER:
// I forgot to to put in the submission that this project requires a .env file in the root of the project where you define MONGODB_URI and PORT
// In order to test you will need to set up a MongoDB databse using MongoDB Atlas
// Information about how to do this can be found here: https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    content: 'cal',
    publicationDate: Date.now(),
    tags: ['fun', 'happy']
  },
  {
    title: 'leetcode is easy',
    content: 'Marc',
    publicationDate: Date.now(),
    tags: ['exciting', 'happy']
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body[0]
  expect(contents.id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'yo wassssuppp',
    content: 'Marc',
    publicationDate: Date.now(),
    tags: ['wowza', 'happy']
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'yo wassssuppp'
  )
})

test('should return blog posts with the specified tag', async () => {
    const tagToSearch = 'happy'; 

    const response = await api.get(`/api/blogs/tags/${tagToSearch}`).expect(200).expect('Content-Type', /application\/json/);

    const blogs = response.body;

    // Assuming you have at least one blog with the specified tag in your test data
    expect(blogs).toHaveLength(initialBlogs.length)

    blogs.forEach(blog => {
      expect(blog.tags).toContain(tagToSearch);
    });
});

afterAll(async () => {
  await mongoose.connection.close()
})