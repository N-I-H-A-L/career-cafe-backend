import mongoose from "mongoose";
import { USER_MODEL } from "./user.model";
import { QUIZ_MODEL } from "./quiz.model";
import { QUESTION_MODEL } from "./question.model";

export const ANSWER_COLLECTION = "answers";
export const ANSWER_MODEL = "Answer";

//SKIPPED
const answerSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: QUIZ_MODEL,
      required: true,
      autopopulate: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL,
      required: true,
      autopopulate: true,
    },
    answers: {
      type: [
        {
          question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: QUESTION_MODEL,
            required: true,
            autopopulate: true,
          },
          selectedAnswer: [Number], // List of selected answers (for multiple correct answers)
          isCorrect: Boolean,
        },
      ],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["not_visited", "answered", "reviewed"],
      default: "not_visited",
    },
  },
  { timestamps: true }
);

export const Answer = mongoose.model(ANSWER_MODEL, answerSchema);
