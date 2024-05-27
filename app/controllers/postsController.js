const dataMapper = require('../data/dataMapper');

const postsController = {
  // get all posts
  getPostsList: async(req, res) => {
    try {
      const postsList = await dataMapper.getAllPosts();
      res.status(200).json(postsList);
    } catch (error) {
      console.error('Error fetching posts list:', error);
      res.status(500).send('Server Error: Unable to fetch posts list');
    };
  },

  // get one post by its slug
  getOnePost: async(req, res) => {
    const { postSlug } = req.params;
    try {
      const selectedPost = await dataMapper.getOnePost(postSlug);
      if (selectedPost) {
        res.status(200).json(selectedPost);
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      console.error(`Error fetching post with slug ${postSlug}:`, error);
      res.status(500).send(`Server Error: Unable to fetch post with slug ${postSlug}`);
    };
  },

  // get posts by category slug
  getPostsByCategory: async(req, res) => {
    const { categorySlug } = req.params;
    try {
      const postsListByCategory = await dataMapper.getPostsByCategory(categorySlug)
      if (postsListByCategory.length > 0) {
        res.status(200).json(postsListByCategory);
      } else {
        res.status(404).send('No posts found for this category');
      }
    } catch (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      res.status(500).send(`Server Error: Unable to fetch posts for category ${categorySlug}`);
    };
  },

  // create new post
  addNewPost: async(req, res) => {
    const postDetails = req.body;
    try {
      const rowCount = await dataMapper.createPost(postDetails);
      if (rowCount !== 1 ) {
        response.status(500).send('No post created');
      } else {
        res.status(201).send('Post has been created');
      };
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('Server Error');
    };
  }
};

module.exports = postsController;
