const dataMapper = require('../data/dataMapper');

const categoriesController = {
  // get all lists
  getCategoriesList: async(req, res) => {
    try {
      const categoriesList = await dataMapper.getAllCategories();
      res.status(200).json(categoriesList);
    } catch (error) {
      console.error('Error fetching categories list:', error);
      res.status(500).send('Server Error');
    };
  },
};

module.exports = categoriesController;
