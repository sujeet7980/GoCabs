const express = require("express");
const router = express.Router();
const Node=require("../models/nodeModel");
const {
  calculateMinimumTime,
  createNode,
  getAllNodes,
} = require("../controllers/nodeController");


router.get("/calculate_minimum_time", async (req, res) => {
  
  const data=req.query;
  const {source,destination} = req.query;
  try {
    const minimumTime = await calculateMinimumTime(source, destination);
    res.status(200).json({"minTime":minimumTime});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the minimum time." });
  }
});


router.post("/", createNode);
router.get("/", getAllNodes);

module.exports = router;