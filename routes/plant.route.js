const express = require("express");
const plantControllers = require("../controllers/plant.controllers");

const plantRouter = express.Router();

/* 
 * POST /api/plants/create-plant
 * Create's a new plant
 */
plantRouter.post("/create-plant", plantControllers.createPlant);

/*
 * GET /api/plants/get-plants
 * Get's all available plants
 */
plantRouter.get("/", plantControllers.getPlants);

module.exports = plantRouter;
