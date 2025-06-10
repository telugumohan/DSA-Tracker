import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

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
const MONGODB_URL = `mongodb+srv://root:root@mydevelopment.rvw5y.mongodb.net/?retryWrites=true&w=majority&appName=MyDevelopment`;

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('App connected to DB.');
    app.listen(PORT, () => console.log(`App is listening to PORT: ${PORT}`));
  })
  .catch((error) => console.log(`DB connection failed. error: ${error}`));
