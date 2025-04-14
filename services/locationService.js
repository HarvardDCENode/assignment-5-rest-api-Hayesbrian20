const Location = require('../models/Location');

module.exports = {
  getAll: async () => {
    return await Location.find();
  },

  getById: async (id) => {
    return await Location.findById(id);
  },

  create: async (data) => {
    data.isActive = data.isActive === 'on' || data.isActive === true;
    return await Location.create(data);
  },

  update: async (id, data) => {
    data.isActive = data.isActive === 'on' || data.isActive === true;
    return await Location.findByIdAndUpdate(id, data, { new: true });
  },

  remove: async (id) => {
    return await Location.findByIdAndDelete(id);
  }
};
