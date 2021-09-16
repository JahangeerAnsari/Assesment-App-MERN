const { Router } = require("express");
const express = require("express");
const {
  addAssesments,
  getAllAssements,
  getAssementsById,
} = require("../controllers/assesment.controller");

const route = express.Router();

route.post("/addAssesment", addAssesments);
route.get("/getAllAssesment", getAllAssements);
route.get("/getAssessmentById/:assesmentId", getAssementsById);

module.exports = route;
