const client = require('../database/client');

const dataMapper = {

  async getAllPosts() {
    const query = `
    SELECT posts.*, categories.name AS categoryName, categories.slug AS categorySlug
    FROM posts
    JOIN categories ON posts.categoryId = categories.id
  `;
    const results = await client.query(query);
    return results.rows;
  },

  async getOnePost(postSlug) {
    const query = `
      SELECT posts.*, categories.name AS categoryName, categories.slug AS categorySlug
      FROM posts
      JOIN categories ON posts.categoryId = categories.id
      WHERE posts.slug = $1
    `;
    const values = [postSlug]
    const results = await client.query(query, values);
    return results.rows[0];
  },

  async getAllCategories() {
    const query = 'SELECT * from "categories"';
    const results = await client.query(query);
    return results.rows;
  },

  async getOneCategory(categorySlug) {
    const query = 'SELECT * FROM "categories" WHERE "slug"=$1';
    const values = [categorySlug]
    const results = await client.query(query, values);
    return results.rows[Ø];
  },

  async getPostsByCategory(categorySlug) {
    const query = `
      SELECT posts.* 
      FROM posts 
      JOIN categories ON posts.categoryId = categories.id 
      WHERE categories.slug = $1
    `;
    const values = [categorySlug]
    const results = await client.query(query, values);
    return results.rows;
  },

  async createPost(postData) {
    const { categoryId, slug, title, author, excerpt, content } = postData;
    const query = `
      INSERT INTO posts (categoryId, slug, title, author, excerpt, content)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const dataValues = [categoryId, slug, title, author, excerpt, content]
    const newPost = await client.query(query, dataValues);
    return newPost.rowCount;
  },

  async updatePost(postId, newData) {
    const { categoryId, slug, title, author, excerpt, content } = newData;
    const query = `
        UPDATE posts 
        SET categoryId = $1, slug = $2, title = $3, author = $4, excerpt = $5, content = $6
        WHERE id = $7
    `;
    const dataValues = [categoryId, slug, title, author, excerpt, content, postId];
    const updatedPost = await client.query(query, dataValues);
    return updatedPost.rowCount;
}
};

module.exports = dataMapper;