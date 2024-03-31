import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        dbName: "booking",
      })
      .then((c) =>
        console.log(`connect to the mongodb database on ${c.connection.host}`)
      );
  } catch (error) {
    throw (err) => console.log(err);
  }
};
