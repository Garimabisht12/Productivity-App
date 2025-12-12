import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import todoRoutes from "./routes/todos.js";
import habitRoutes from "./routes/habits.js";
import financeRoutes from "./routes/finance.js";

dotenv.config();

const app = express();

// __dirname replacement in ES modules
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/finance", financeRoutes);











if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../client/dist");

  // Serve static files from the dist folder
  app.use(express.static(clientDistPath));

  // For all other routes, serve index.html
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}




const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONOGO_URI)
  .then(() => {
    console.log("MongoDB successfully connected!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err}`);
  });
