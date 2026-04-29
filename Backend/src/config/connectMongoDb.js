import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Conectado a MongoDB con éxito");
  } catch (error) {
    console.log("❌ Error MongoDB:", error.message);
  }
};

export { connectMongoDb };
