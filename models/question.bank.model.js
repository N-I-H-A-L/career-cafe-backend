import mongoose from "mongoose";
import { QUESTION_MODEL } from "./question.model";

export const QUESTION_BANK_COLLECTION = "question_banks";
export const QUESTION_BANK_MODEL = "QuestionBank";

//SKIPPED
const questionBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    }, // Category of the question bank (e.g., Aptitude, Coding)
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: QUESTION_MODEL, 
        autopopulate: false,
      },
    ],
  },
  { timestamps: true }
);

export const QuestionBank = mongoose.model(QUESTION_BANK_MODEL, questionBankSchema);
