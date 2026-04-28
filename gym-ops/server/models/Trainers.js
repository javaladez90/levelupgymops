const mongoose = require('mongoose');

/*
This schema repressents one trainer in gymops

status: 
-Active = can be scheduled
-Inactive = cannot be scheduled
*/

const trainerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        specialty: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trainers", trainerSchema);