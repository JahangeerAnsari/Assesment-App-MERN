const { Router } = require("express");
const express = require("express");
const route = express.Router();
const { requiredSignin ,userMiddleWare} = require("../common-middleware");
const {
  writeAssesment,
  getUserAssesments,
} = require("../controllers/user.assesment.controller");

route.post("/writeAseesment", requiredSignin,userMiddleWare, writeAssesment);

// (req, res,next) =>{

//   console.log(  "REQ BODY",JSON.stringify(req.body));
//   next();
// },

route.get("/getAssements", requiredSignin,userMiddleWare , getUserAssesments);

module.exports = route;
