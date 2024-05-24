"use client"
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';


function Choices({
    singleQuestion,
    questionIndex,
    quizQuestions,
    setQuizQuestions,
    onChangeChoice,
    prefixes,
    
}) {

    const { choices } = singleQuestion;
    const alphabets = ['A', 'B', 'C', 'D'];
    const positions = ['First', 'Second', 'Third', 'Fourth'];

    function addANewChoice() {
        const quizQuestionsCopy = [...quizQuestions];
        const lastChoicesPosition = quizQuestionsCopy[questionIndex].choices.length;
        if (lastChoicesPosition < 4) {
            const newChoice = `${alphabets[lastChoicesPosition]}`;
            quizQuestionsCopy[questionIndex].choices.push(newChoice);
            setQuizQuestions(quizQuestionsCopy);
        }
    }

    function deleteChoiceFunction(choiceIndex) {
        const quizQuestionsCopy = [...quizQuestions];
        quizQuestionsCopy[questionIndex].choices.splice(choiceIndex, 1);
        setQuizQuestions(quizQuestionsCopy);
    }

    function handleChoiceChangeInput(text, choiceIndex, questionIndex) {
        onChangeChoice(text, choiceIndex, questionIndex)
    }

    return (
        <div className='flex gap-[39px] items-center mt-3'>
            <div className='text-[15px]'>Choices</div>
            <div className='border border-gray-200 rounded-md p-2 w-full'>
                {choices.map((singleChoice, choiceIndex) => {
                    return (
                        <div key={choiceIndex} className='flex gap-2 items-center mt-3'>
                            <span>{alphabets[choiceIndex]}:</span>
                            <input value={singleChoice.substring(prefixes[choiceIndex].length+2)} onChange={(e) => handleChoiceChangeInput(e.target.value, choiceIndex, questionIndex)}
                                className='border text-[13px] border-gray-200 p-2 w-full rounded-md outline-none pr-10'
                                placeholder={`Add Your ${positions[choiceIndex]} Choice`}
                            />
                            {choiceIndex >= 2 && (
                                <FontAwesomeIcon
                                    onClick={() => {
                                        deleteChoiceFunction(choiceIndex);
                                    }}
                                    icon={faXmarkCircle}
                                    width={10}
                                    height={10}
                                    className="text-red-600 top-2 right-3 cursor-pointer"
                                />
                            )}
                        </div>
                    )
                })}
                <div className='w-full flex justify-center mt-3'>
                    <button onClick={() => addANewChoice()}
                        className='p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]'>
                        Add a New Choice
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Choices