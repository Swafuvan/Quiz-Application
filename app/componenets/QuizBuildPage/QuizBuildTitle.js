"use client"
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import useGlobalContextProvider from '../../ContextApi';

function QuizBuildTitle({ focusProp,onChangeQuizTitle }) {
    const { focus } = focusProp;
    const quizTitleRef = useRef(null);
    const {openBoxToggle, selectedIconObject,selectedQuizObject} = useGlobalContextProvider();
    const {selectedQuiz} = selectedQuizObject;
    const [quizTitle,setQuizTitle] = useState(()=>{
        return selectedQuiz ? selectedQuiz.quizTitle : ''
    })
    const {setOpenIconBox} = openBoxToggle;
    const {selectedIcon} = selectedIconObject; 

    function handleTextInputChange(text) {
        setQuizTitle(text);
        onChangeQuizTitle(text);
    }

    useEffect(() => {
        if (focus) {
            quizTitleRef.current.focus();
        }
    }, []);
    return (
        <div className='p-3 flex justify-between border border-green-700 rounded-md'>
            <div className='flex gap-2'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-green-700 px-4 py-1 rounded-md text-white'>1</div>
                    <span className='font-bold'>Quiz Name:</span>
                </div>
                <input onChange={(e) => {
                    handleTextInputChange(e.target.value);
                }} value={quizTitle} ref={quizTitleRef}
                    className="outline-none border-b-2 pt-1 w-[360px] text-[13px]"
                    placeholder='Enter the Name of The Quiz...'
                />
            </div>
            <FontAwesomeIcon onClick={()=>{
                setOpenIconBox(true);
            }}
             icon={selectedIcon.faIcon} height={40} width={40}
                className='text-white p-2 rounded-md bg-green-700 cursor-pointer' />
        </div>
    )
}

export default QuizBuildTitle
