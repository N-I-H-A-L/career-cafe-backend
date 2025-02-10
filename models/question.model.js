import mongoose from "mongoose";
import { QUIZ_MODEL } from "./quiz.model";

export const QUESTION_COLLECTION = "questions";
export const QUESTION_MODEL = "Question";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        optionText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    correctAnswers: {
      //index of correct answer
      type: [
        {
          type: Number, // indices of the correct options
        },
      ],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    //difficultyLevel, topic, tag (array)
    // questionType: {
    //   type: String,
    //   enum: ["single", "multiple"],
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Question = mongoose.model(QUESTION_MODEL, questionSchema);
