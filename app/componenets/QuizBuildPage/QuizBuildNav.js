"use client"
import Image from 'next/image'
import React from 'react'
import useGlobalContextProvider from '../../ContextApi'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


function validateQuizQuestions(quizQuestions){
  for(let question of quizQuestions){
    if(!question.mainQuestion.trim()){
      return {valid : false, message : "Please fill in the main Question"};
    }

    if(question.choices.some((choice)=> !choice.trim().substring(2))){
      return {valid : false, message : "Please fill in the all choices"};
    }

    if(question.correctAnswer.length === 0){
      return {valid : false, message : "Please specify the correct answer"};
    }

    return {valid : true} ;
  }
}

function QuizBuilNav({newQuiz}) {
  const {allQuizzes,setAllQuizzes} = useGlobalContextProvider();
  const router = useRouter();

  function addNewQuiz(){
    if(newQuiz.quizTitle.trim(' ').length === 0){
      return toast.error('Please add a name for the quiz!');
    }

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
     if(isValid.valid === false){
      return toast.error(isValid.message);
    }
    // setAllQuizzes([...allQuizzes,newQuiz]);
    // router.push('/');
  }
  return (
    <div className='my-12 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
            <Image 
                src="/brain-logo.jpg"
                height={50}
                width={50}
                alt=''
            />
            <span className='text-2xl'>
                Quiz <span className=' bg-gray-300 font-bold'>Builder</span>
            </span>
        </div>
        <button onClick={()=>addNewQuiz()}
         className='p-2 px-4 bg-green-700 rounded-md text-white'>Save</button>
    </div>
  )
}

export default QuizBuilNav
