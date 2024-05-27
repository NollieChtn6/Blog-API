const client = require('../database/client');

const validateSlug = async (req, res, next) => {
  const { postSlug, categorySlug } = req.params;
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  // Check if post's slug format is valid
  if (postSlug && !slugPattern.test(postSlug)) {
    return res.status(400).send('Invalid post slug');
  };
  // Check if category's slug format is valid
  if (categorySlug && !slugPattern.test(categorySlug)) {
    return res.status(400).send('Invalid category slug');
  };

  // Check if post's slug exists in database
  if (postSlug) {
    const postQuery = 'SELECT * FROM posts WHERE slug = $1';
    const values = [postSlug];
    const postResult = await client.query(postQuery, values);
    if (postResult.rows.length === 0) {
      return res.status(404).send('No post found for this slug');
    };
  };

  // Check if category's slug exists in database
  if (categorySlug) {
    const categoryQuery = 'SELECT * FROM categories WHERE slug = $1';
    const values = [categorySlug];
    const categoryResult = await client.query(categoryQuery, values);
    if (categoryResult.rows.length === 0) {
      return res.status(404).send('No category found for this slug');
    };
  };

  next();
};

module.exports = validateSlug;