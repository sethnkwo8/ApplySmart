import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import { Skill } from "../models/skills.model.js";
import { skillsData } from "../data/skills.js";

async function seedData() {
    try {
        // Connect to database
        await connectDB();
        console.log("🚀 Connected to MongoDB for seeding...");

        // Clear previous data to avoid duplicates
        const deleteResult = await Skill.deleteMany({});
        console.log(`🧹 Cleared existing data. Removed ${deleteResult.deletedCount} items.`);

        // Insert new comprehensive skills collection
        const insertResult = await Skill.insertMany(skillsData);
        console.log(`✅ Database successfully seeded with ${insertResult.length} skills!`);

        // Disconnect smoothly 
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB cleanly.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to complete database seeding pipeline:", err);
        try {
            await mongoose.disconnect();
        } catch {}
        process.exit(1);
    }
}

seedData();