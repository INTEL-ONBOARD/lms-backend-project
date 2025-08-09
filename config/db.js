const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://wenujasl:C1kaQe7wgsLYSrak@supercluster.bh12x63.mongodb.net/?retryWrites=true&w=majority&appName=superCLuster");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
