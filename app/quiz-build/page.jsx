"use client"
import React, { useEffect, useState } from 'react'
import QuizBuildTitle from '../componenets/QuizBuildPage/QuizBuildTitle'
import QuizBuilNav from '../componenets/QuizBuildPage/QuizBuildNav'
import QuizBuildQuestion from '../componenets/QuizBuildPage/QuizBuildQuestion';
import { v4 as uuidv4 } from 'uuid'
import { faCode } from '@fortawesome/free-solid-svg-icons';

import useGlobalContextProvider from '../ContextApi';

function page(props) {
    const prefixes = ['A', 'B', 'C', 'D'];
    const { selectedIconObject, selectedQuizObject } = useGlobalContextProvider();
    const { selectedIcon } = selectedIconObject;
    const { selectedQuiz } = selectedQuizObject;
    const [focusFirst, setFocusFirst] = useState(true);
    const [quizQuestions, setQuizQuestions] = useState(() => {
        if (selectedQuiz) {
            return selectedQuiz.quizQuestions;
        } else {
            return [{
                id: uuidv4(),
                mainQuestion: '',
                choices: prefixes.slice(0, 2).map((prefix) => prefix + '. '),
                correctAnswer: '',
                answeredResult: -1,
                statistics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0
                }
            }];
        }
    })

    const [newQuiz, setNewQuiz] = useState(() => {
        if (selectedQuiz) {
            return selectedQuiz;
        } else {
            return {
                id: uuidv4(),
                icon: selectedIcon.faIcon,
                quizTitle: '',
                quizQuestions: quizQuestions,
            }
        }
    })

    useEffect(() => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            icon: selectedIcon.faIcon,
            quizQuestions: quizQuestions,
        }));
    }, [quizQuestions, selectedIcon.faIcon]);

    function onChangeQuizTitle(text) {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            quizTitle: text,
        }));
    }

    const quizNavbarProps = {
        quizQuestions,
        newQuiz,
    }

    const quizTitleProps = {
        focusProp: { focus: focusFirst, setFocusFirst },
        onChangeQuizTitle,
    }

    const quizQuestionProps = {
        focusProp: { focus: !focusFirst, setFocusFirst },
        quizQuestions,
        setQuizQuestions,
    }
    return (
        <div className='mx-16'>
            <QuizBuilNav {...quizNavbarProps} />
            <QuizBuildTitle {...quizTitleProps} />
            <QuizBuildQuestion {...quizQuestionProps} />
        </div>
    )
}

export default page
