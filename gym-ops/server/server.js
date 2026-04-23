const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

mongoose   
    .connect("mongodb://127.0.0.1:L27017/levelupfitness")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server running on http://localhose:5000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });