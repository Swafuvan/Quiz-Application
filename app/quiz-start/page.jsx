"use client"

import React, { useEffect, useState } from 'react'
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import QuizStartHeader from '../componenets/QuizStartPage/QuizStartHeader';
import QuizStartquestions from '../componenets/QuizStartPage/QuizStartQuestion';

function Page() {
    const { allQuizzes, quizToStartObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject
    const [parentTimer,setParentTimer] = useState(29);
    const router = useRouter();

    useEffect(() => {
        if (selectQuizToStart === null) {
            router.push('/')
        }
    }, [])

    function onUpdateTime(currentTime){
        setParentTimer(currentTime)
    }

    return (
        <div className='flex flex-col px-24 mt-[35px]'>
            {selectQuizToStart === null ? (
                <div className='h-svh flex flex-col gap-2 items-center justify-center'>
                    <Image src="/error-circle.png" alt='image' width={180} height={180}/>
                    <h2 className='text-xl font-bold'>Please Select Your quiz first...</h2>
                    <span className='font-light'>You will be redirected to the home page</span>
                </div>
            ) : (
                <>
                    <QuizStartHeader parentTimer={parentTimer}/>
                    <div className='mt-10 flex items-center justify-center'>
                        <QuizStartquestions onUpdateTime={onUpdateTime} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Page

