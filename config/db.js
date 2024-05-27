import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongo db ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error in connection`, err);
  }
};

export default connectDB;
