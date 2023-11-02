const Cab = require('../models/cabModel');

const createCab = async (req, res) => {
  try {
     const cabData = req.body; 
     const cab = new Cab({
      name : req.body.name,
      contactNo: req.body.contactNo,
      driverName: req.body.driverName,
      pricePerMinute: req.body.pricePerMinute,
      vehicleNumber: req.body.vehicleNumber
     });
     console.log("auch" , req.body)
     const savedCab = await cab.save();
     console.log(savedCab);
    res.status(201).json(savedCab);
  } catch (error) {
     res
       .status(500)
       .json({ error: "Something went wrong " });
  }
};
const deleteCab = async (req, res) => {
  try {
    await Cab.findByIdAndDelete(req.params.id);
    res.status(200).send("Cab has been deleted!");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong " });
  }
};
const updateCab = async (req, res) => {
  try {
    const cabId = req.params.id; 
    const cabData = req.body; 
    const updatedCab = await Cab.findByIdAndUpdate(cabId, cabData, {
      new: true,
    });
    if (updatedCab) {
      res.json(updatedCab);
    } else {
      res.status(404).json({ error: "Cab not found" });
    }
  } catch (error) {
     res.status(500).json({ error: "Something went wrong " });
  }
};
const getCabs = async (req, res) => {
  try {
    const cabs = await Cab.find();
     res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong " });
  }
};

const getActiveCabs = async (req, res) => {
  try {
    const cabs = await Cab.find({ isActive: true });
    res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong " });
  }
};



module.exports = { createCab, deleteCab, updateCab, getCabs, getActiveCabs };
