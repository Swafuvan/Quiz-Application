"use client"

import useGlobalContextProvider from "../../ContextApi";
import { faStopwatch, faCode }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function QuizStartHeader({parentTimer}) {

    const {quizToStartObject} = useGlobalContextProvider()
    const {selectQuizToStart} = quizToStartObject;
    const {quizTitle} = selectQuizToStart;
    const {quizQuestions} = selectQuizToStart;

   

    return (
        <div className='flex justify-between'>
            <div className='flex justify-center gap-2' >
                <div className='w-12 h-12 bg-gray-300 flex items-center justify-center p-2 rounded-md'>
                    <FontAwesomeIcon
                        icon={faCode}
                        className='text-black'
                        width={25}
                        height={25}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='font-bold text-xl'>{quizTitle}</h2>
                    <span className='font-light text-sm'>{quizQuestions.length} Questions</span>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <FontAwesomeIcon
                    className='text-black'
                    width={20}
                    height={20}
                    icon={faStopwatch}
                />
                <span>00:00:{parentTimer}</span>
            </div>
        </div>
    )
}

export default QuizStartHeader