const router = require('express').Router()
const Blog = require('../models/blog')

// Create post
router.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      content: body.content,
      publicationDate: body.publicationDate,
      tags: body.tags
    })
  
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
});

// Get all posts
router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

// Get post by ID
router.get('/:id', async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
        
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
});

// Update post
router.put('/:id', async (req, res) => {
    const blogId = req.params.id;
    const { title, content, publicationDate, tags } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, content, publicationDate, tags },
        { new: true }
    );

    if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
});

// Delete post
router.delete('/:id', async (req, res) => {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndRemove(blogId);

    if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(deletedBlog);
});

// Get post by tags
router.get('/tags/:tag', async (request, response) => {
    const tag = request.params.tag;

    const blogs = await Blog.find({ tags: tag });
    response.json(blogs);
});

module.exports = router