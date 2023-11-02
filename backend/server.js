const  express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const nodeRoute = require("./routes/nodeRoute");
const bookingRoute = require("./routes/bookingRoute")
const cabRoute = require("./routes/cabRoute");
const cors=require('cors');
const morgan=require('morgan');
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Method", 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  next();  
})


app.use("/api/node",nodeRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/cab", cabRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
