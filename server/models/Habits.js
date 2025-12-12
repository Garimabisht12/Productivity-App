import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  type: { type: String },
  entries: [{ type: Array }]
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
