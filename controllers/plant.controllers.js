const Plant = require("../models/plant.model");

const plantControllers = {
  async createPlant(req, res) {
    try {
      const {
        name,
        status,
        isSeasonal,
        category,
        price,
        waterFrequencyInDays,
      } = req.body;

      if (
        !name ||
        !status ||
        isSeasonal === undefined ||
        !category ||
        price === undefined ||
        waterFrequencyInDays === undefined
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const plant = await Plant.create({
        name,
        status,
        isSeasonal,
        category,
        price,
        waterFrequencyInDays,
      });

      return res.status(201).json({
        msg: "Plant created successfully",
        plant: {
          id: plant._id,
          name: plant.name,
          status: plant.status,
          category: plant.category,
          price: plant.price,
        },
      });
    } catch (error) {
      return res.status(500).json({msg:error.message});
    }
  },
};

module.exports = plantControllers;
