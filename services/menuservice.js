const MenuItem = require('../models/MenuItem');

module.exports = {
  getAll: async () => {
    return await MenuItem.find();
  },

  getById: async (id) => {
    return await MenuItem.findById(id);
  },

  create: async (data) => {
    return await MenuItem.create(data);
  },

  update: async (id, data) => {
    return await MenuItem.findByIdAndUpdate(id, data, { new: true });
  },

  remove: async (id) => {
    return await MenuItem.findByIdAndDelete(id);
  }
};
