const Node = require("../models/nodeModel");

class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(id, time) {
    this.heap.push({
      id: id,
      time: time,
    });
    this.heapifyUp();
  }
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  heapifyUp() {
    let last = this.size() - 1;
    let par = Math.floor((last - 1)/2);
    while (last > 0 && this.heap[last].time < this.heap[par].time) {
      this.swap(last, par);
      last = par;
      par = Math.floor((last - 1) / 2);
    }
  }
  heapifyDown(i) {
    if (i >= this.size()) return;
    let smallest = i,
      left = 2 * i + 1,
      right = 2 * i + 2;
    if (left < this.size() && this.heap[left].time < this.heap[smallest].time)
      smallest = left;
    if (right < this.size() && this.heap[right].time < this.heap[smallest].time)
      smallest = right;
    if (i != smallest) {
      this.swap(i, smallest);
      this.heapifyDown(smallest);
    }
  }
  remove() {
    if (this.size() == 0) return NULL;
    let last = this.heap.length - 1;
    this.swap(0, last);
    this.heap.pop();
    this.heapifyDown(0);
  }
  top() {
    if (this.size() == 0) return NULL;
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
};

const calculateMinimumTime = async (startNodeName, endNodeName) => {
  const startNode = await Node.findOne({ name: startNodeName });
  const endNode = await Node.findOne({ name: endNodeName });

  if (!startNode || !endNode) {
    throw new Error("Start and/or end nodes not found in the database");
  }
  let visitedNodes = {};
  let minTimeToReach = {};
  minTimeToReach[startNode._id.toString()] = 0;
  // minTimeToReach[startNodeName] = 0;
  let pq = new MinHeap();
  pq.insert(startNode._id.toString(), 0);
  // pq.insert(startNodeName, 0);

  while (pq.size() > 0) {
    let node = pq.top();
    pq.remove();
    let nodeId = node.id,
      curTime = node.time;

    let currentNode = await Node.findById(nodeId);

    if (currentNode.name === endNodeName) {
      return minTimeToReach[currentNode._id.toString()];
    }

    visitedNodes[currentNode.name] = 1;
    let currentNeighbors = currentNode.neighbors;

    for (let neighbor of currentNeighbors) {
      let neighborNodeName = neighbor.neighborNodeId;
      let nb = await Node.findById(neighborNodeName);

      let timeToReachNeighbor = neighbor.timeToReach;

      let totalTime = minTimeToReach[nodeId] + timeToReachNeighbor;
      if (
        !visitedNodes.hasOwnProperty(nb.name) &&
        (!minTimeToReach[neighborNodeName.toString()] ||
          totalTime < minTimeToReach[neighborNodeName.toString()])
      ) {
        minTimeToReach[neighborNodeName.toString()] = totalTime;
        pq.insert(nb._id.toString(), totalTime);
      }
    }
  }

  return "No path found to the end node";
};

const createNode = async (req, res) => {
  try {
    const { name, neighbors } = req.body; 

    const newNode = new Node({
      name,
      neighbors,
    });

    await newNode.save();

    res
      .status(201)
      .json({ message: "Node created successfully", node: newNode });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the node." });
  }
};

const getAllNodes = async (req,res)=>{

 try {
   const nodes = await Node.find();
   res.status(200).json(nodes);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Internal server error" });
 }
}

module.exports = { calculateMinimumTime, createNode, getAllNodes };
