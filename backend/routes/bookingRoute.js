const  express = require('express');
const {createBooking,getBooking} = require('../controllers/bookingController.js')

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBooking);

module.exports = router;



