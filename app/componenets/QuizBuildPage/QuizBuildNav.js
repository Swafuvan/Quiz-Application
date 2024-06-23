"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import useGlobalContextProvider from '../../ContextApi'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import convertFromFaToText from '../../convertFromFaToText'


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

function QuizBuilNav({newQuiz,setNewQuiz}) {
  const {allQuizzes,setAllQuizzes,selectedQuizObject} = useGlobalContextProvider();
  const {selectedQuiz,setSelectedQuiz} = selectedQuizObject;
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter();

  async function createNewQuiz(){
    try {
      setIsLoading(true);
      const textIcon = convertFromFaToText(newQuiz.icon);
      const quizWithTextIcon = {
        ...newQuiz,
        icon: textIcon,
      };

      const res = await fetch('http://localhost:3000/api/quizzes',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(quizWithTextIcon)
      })
      if(!res.ok){
        toast.error('Failed to create a new Quiz!');
        setIsLoading(false);
        return;
      }
      const {id} = await res.json();
      const updatedQuiz = {...newQuiz,_id:id,icon:textIcon};

      setAllQuizzes([...allQuizzes,updatedQuiz]);
      toast.success('The quiz has been created successfully');
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function saveQuiz(){
    if(newQuiz.quizTitle.trim(' ').length === 0){
      return toast.error('Please add a name for the quiz!');
    }
    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if(isValid.valid === false){
      toast.error(isValid.message);
      return;
    }
    if(selectedQuiz){
      
        const updatedQuiz = [...allQuizzes];
        const findIndexQuiz = updatedQuiz.findIndex((quiz)=>{
          return quiz.id === newQuiz.id;
        });
        if(findIndexQuiz !== -1){
          updatedQuiz[findIndexQuiz] = newQuiz;
        }
        const id = updatedQuiz[findIndexQuiz]._id;
        const convertIconText = convertFromFaToText(updatedQuiz[findIndexQuiz].icon);
        updatedQuiz[findIndexQuiz].icon = convertIconText;
        
        try {
          const res = await fetch(`http://localhost:3000/api/quizzes?${id}`,{
            method: 'PUT',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({updatedQuiz:updatedQuiz[findIndexQuiz]})
          })
          toast.success('The quiz has been modified successfully');
          setAllQuizzes(updatedQuiz);
        } catch (error) {}
    }else{
      createNewQuiz();
      router.push('/');
    }
  }

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
