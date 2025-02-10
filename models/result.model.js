import mongoose from "mongoose";
import { USER_MODEL } from "./user.model";
import { QUIZ_MODEL } from "./quiz.model";
import { ANSWER_MODEL } from "./answer.model";

export const RESULT_COLLECTION = "results";
export const RESULT_MODEL = "Result";

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_MODEL,
            required: true,
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: QUIZ_MODEL,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        },
        // totalMarks: {
        //     type: Number,
        //     required: true,
        // },
        //score obtained
        correctAnswers: {
            type: Number,
            required: true,
        },
        incorrectAnswers: {
            type: Number,
            required: true,
        },
        unanswered: {
            type: Number,
            required: true,
        },
        timeTaken: {
            type: Number, // time in seconds
            required: true,
        },  
        answers: [
            {
                type: Number
            },
        ],
    },
    { timestamps: true }
);

export const Result = mongoose.model(RESULT_MODEL, resultSchema);
