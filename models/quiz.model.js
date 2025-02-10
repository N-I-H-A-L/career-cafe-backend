import mongoose from "mongoose";
import { USER_MODEL } from "./user.model";
import { QUESTION_MODEL } from "./question.model";

export const QUIZ_COLLECTION = "quizzes";
export const QUIZ_MODEL = "Quiz";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL,
      required: true,
      autopopulate: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: QUESTION_MODEL,
        autopopulate: false,
      },
    ],
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    timer: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number, //time in minutes
      default: 0,
    },
    // shortcode or url
    //model for registered users of a quiz
    //type for quiz: standard or scheduled
  },
  { timestamps: true }
);

export const Quiz = mongoose.model(QUIZ_MODEL, quizSchema);
