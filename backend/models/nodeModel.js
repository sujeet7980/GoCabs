const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  name: String,
  neighbors: [
    {
      neighborNodeId: mongoose.Schema.Types.ObjectId,
      timeToReach: Number,
    },
  ],
});

const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
