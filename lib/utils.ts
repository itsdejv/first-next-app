import mongoose from "mongoose";

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return true;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongodb connected");
    return true;
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;
