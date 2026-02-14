import express from "express";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);


sequelize.sync({ alter: false })
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });