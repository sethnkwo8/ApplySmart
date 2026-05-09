// Seed skills
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import { Skill, SkillCategories } from "../models/skills.model.js";
import { skillsData } from "../data/skills.js";

async function seedData() {
    try {
        // Connect to database
        await connectDB();
        console.log("Connected to MongoDB for seeding...");

        // Clear previous data to avoid duplicates
        await Skill.deleteMany({});
        console.log("Cleared existing skills.");

        // Insert to database
        await Skill.insertMany(skillsData);
        console.log("Skills successfully seeded!");

        // 5. Close connection
        await mongoose.disconnect();
    } catch(err) {
        console.error("Failed to seed");
        process.exit(1);
    }
}

seedData()
