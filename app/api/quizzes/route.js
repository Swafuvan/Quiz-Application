import Quiz from "../../models/QuizSchema";
import { connectDB } from "../../../libs/mongoDB";
import {NextResponse} from 'next/server';

export async function POST(req) {
    await connectDB();
    const {quizTitle,icon,quizQuestions} = await req.json();
    await Quiz.create({quizTitle,icon,quizQuestions});

    try {
        return NextResponse.json({
            message: "the Quiz has been created successfully.",
        })
    } catch (error) {
        return NextResponse.json({message:error});
    }
}

export async function GET(){
    await connectDB();
    const quizzes = await Quiz.find();
    try {
        return NextResponse.json({quizzes});
    } catch (error) {
        return NextResponse.json({message:error});
    }
}
