import Quiz from "../../models/QuizSchema";
import { connectDB } from "../../../libs/mongoDB";
import {NextResponse} from 'next/server';

export async function POST(request) {
    await connectDB();
    const {quizTitle,icon,quizQuestions} = await request.json();
    const newQuiz = await Quiz.create({quizTitle,icon,quizQuestions});

    try {
        return NextResponse.json({
            id:newQuiz._id,
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

export async function PUT(request){
    try {
        const id = request.NextUrl.searchParam.get('id');
        const quizToUpdate = await Quiz.findById(id);

        const { updateQuiz,updateQuizQuestions } = await request.json();
        if(updateQuiz){
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizTitle = updateQuiz.quizTitle;
            quizToUpdate.quizQuestions = updateQuiz.quizQuestions;
        }
        if(updateQuizQuestions){
            quizToUpdate.quizQuestions = updateQuizQuestions;
        }
        
        await quizToUpdate.save();
        return NextResponse.json({message:'success'});
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(request){
    const id = request.NextUrl.searchParams.get('id');
    await connectDB();
    await Quiz.findByIdAndDelete(id);
    return NextResponse.json({message:'quiz deleted'});
}
