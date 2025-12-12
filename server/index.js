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
const __dirname = path.resolve();

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

  // app.use(express.static(clientPath));
  console.log("In production mode");
try{
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "index.html"));
  });

} catch(e){
  console.log(path.resolve(__dirname, '../client/dist/index.html'))
console.log('error unknown what!! \n', e)
console.log(e.message? e.message : 'boooo', '\n')
console.log('shhhhh')
}
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
