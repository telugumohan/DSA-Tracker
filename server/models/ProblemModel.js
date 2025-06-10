import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true, // for faster filtering/searching by topic
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
      index: true, // for sorting/filtering
    },
    resource: {
      type: String,
      default: '',
      trim: true,
    },
    problem: {
      type: String,
      required: true,
      trim: true,
    },
    practice: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional compound index (e.g., if searching by topic + difficulty)
//problemSchema.index({ topic: 1, difficulty: 1 });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
