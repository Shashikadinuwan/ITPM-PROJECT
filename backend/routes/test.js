const express = require("express");
const router = express.Router();

//import controller
const { getTest } = require("../controller/test");

//api routes
router.get('/test', getTest);

module.exports = router;
