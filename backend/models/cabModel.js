const mongoose  = require('mongoose');
const { Schema } = mongoose;

const CabSchema = new Schema(
    {
        name:{
            type: String,
            required : true,
        },
        contactNo:{
            type: Number,
            required:true,
        },
        driverName:{
            type:String,
            required:true,
        },
        pricePerMinute:{
            type: Number,
            required:true,
        },
        vehicleNumber: {
           type:String,
           required: true,
        },
        isActive:{
           type:Boolean,
           default:true,
        }
    },
    {
        timestamps:true,
    }
);

const cab = mongoose.model("Cab", CabSchema);

module.exports = cab;
