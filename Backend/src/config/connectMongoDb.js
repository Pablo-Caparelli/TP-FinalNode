import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    //conectarme a la base de datos
    await mongoose.connect("mongodb://127.0.0.1:27017/db_tpfinal_node");
    console.log("✅ Conectado a MongoDB con éxito");
  } catch (error) {
    //atrapar el error para saber que es lo que sucede
    console.log(error.message);
  }
};

export { connectMongoDb };
