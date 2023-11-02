const  express = require('express');
const router = express.Router();

const {
  createCab,
  deleteCab,
  updateCab,
  getCabs,
  getActiveCabs
} = require("../controllers/cabController.js");


router.post("/", createCab);
router.delete("/:id", deleteCab);
router.patch("/:id", updateCab);
router.get("/all", getCabs);
router.get("/activeCabs", getActiveCabs);

module.exports = router;