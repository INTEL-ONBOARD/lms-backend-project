const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://wenujasl:ZzH8aHTbvMvGDvvk@cluster0.cqn6a.mongodb.net/?retryWrites=true&w=majority");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
