const client = require('../database/client');

const dataMapper = {

  async getAllPosts() {
    const query = 'SELECT * FROM "posts"';
    const results = await client.query(query);
    return results.rows;
  },

  async getOnePost(postSlug) {
    const query = 'SELECT * FROM "posts" WHERE "slug"=$1';
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
  }
};

module.exports = dataMapper;