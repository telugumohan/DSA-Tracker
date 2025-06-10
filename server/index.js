import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

// Import your routes
import problemRouter from "./routes/problemRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/problems', problemRouter);

// Config
const PORT = process.env.PORT || 5000;


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to DB.');
    app.listen(PORT, () => console.log(`App is listening to PORT: ${PORT}`));
  })
  .catch((error) => console.log(`DB connection failed. error: ${error}`));
