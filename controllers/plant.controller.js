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
      return res.status(500).json({ msg: error.message });
    }
  },

  async getPlants(req, res) {
    try {
      const { page, limit } = req.query;
      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 10;
      const skip = (pageNum - 1) * limitNum;

      // HOW PAGINATION WORKS FLOW OF SKIP AND LIMIT
      // 1. SKIP: It tells the database to skip the first 'n' documents.
      // 2. LIMIT: It tells the database to return only 'n' documents after skipping.
      // 3. SORT: It tells the database to sort the documents in ascending or descending order.

      // EXAMPLE
      // page = 1, limit = 10, skip = (1 - 1) * 10 = 0
      // page = 2, limit = 10, skip = (2 - 1) * 10 = 10
      // page = 3, limit = 10, skip = (3 - 1) * 10 = 20
      // page = 4, limit = 10, skip = (4 - 1) * 10 = 30

      // WHY THIS FORMULA WHAT IS THE LOGIC BEHIND IT?
      // (page - 1) = This gives us the number of pages to skip.
      // * limit = This gives us the number of documents to skip.

      const plants = await Plant.find({ status: "AVAILABLE", isDeleted: false })
        .sort({ price: 1 })
        .skip(skip)
        .limit(limitNum);

      if (!plants) {
        return res.status(404).json({ msg: "No plants found." });
      }

      const totalPlants = await Plant.countDocuments({ status: "AVAILABLE", isDeleted: false });

      return res
        .status(200)
        .json({ msg: "Plants found successfully", totalPlants, plants });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  async deletePlant(req, res) {
    try {
      const plantId = req.params.id;

      const plant = await Plant.findByIdAndUpdate(plantId, {
        isDeleted: true,
        deletedAt: Date.now(),
      });
      if (!plant) {
        return res.status(404).json({ msg: "Plant not found" });
      }
      return res.status(200).json({ msg: "Plant deleted successfully." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = plantControllers;
