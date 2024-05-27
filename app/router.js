const express = require('express');
const router = express.Router();

// Import controllers
const categoriesController = require('./controllers/categoriesController');
const postsController = require('./controllers/postsController');

// Import middlewares
const validateSlug = require('./middleware/validateSlug');

// Define routes for posts
router.get('/posts', postsController.getPostsList);
router.get('/posts/:postSlug', validateSlug, postsController.getOnePost);

// Define routes for categories
router.get('/categories', categoriesController.getCategoriesList);
router.get('/categories/:categorySlug/posts', validateSlug, postsController.getPostsByCategory);

module.exports = router;