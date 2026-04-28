const Trainers = require("../models/Trainers");

/*
    GET /api/trainers
    Return all trainers sorted by name
*/

async function getTrainers(req, res) {
    try {
        const trainers = await Trainer.find().sort({ name: 1 });

        return res.status(200).json(trainers);
    } catch (error) {
        console.error("Error fetching trainers:", errors);

        return res.status(500).json({
            message: "Server error while fetching trainers.",
        });
    }
}

/**
 * POST /api/trainers
 * Create a new trainer
 */

async function createTrainer(req, res) {
    try {
        const { name, specialty, status, email } = req.body;

        if (!name || !specialty || !status || !email) {
            return res.status(400).json({
                message:"name, specialty, status, and email are required.",
            });
        }

        const existingTrainer = await Trainer.findOne({
            email: email.toLowerCase(),
        });

        if (existingTrainer) {
            return res.status(409).json({
                message: "A trainer with this email already exists.",
            });
        }

        const newTrainer = await Trainer.create({
            name, 
            specialty,
            status,
            email,
        });

        return res.status(201).json(newTrainer);
    } catch (error) {
        console.error("Error creating trainer:", error);

        return res.status(500).json({
            message: "Server error while creating trainer.",
        });
    }
}

module.exports = {
    getTrainers,
    createTrainer
};