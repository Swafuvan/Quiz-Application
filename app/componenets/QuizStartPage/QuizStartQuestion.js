"use client"

import { useRouter } from "next/navigation";
import useGlobalContextProvider from "../../ContextApi";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function QuizStartquestions({ onUpdateTime }) {
    const { quizToStartObject, allQuizzes, setAllQuizzes ,userXPObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const { quizQuestions } = selectQuizToStart;
    const {setUserXP} = userXPObject
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(29);
    const time = 29;
    let interval;

    function startTimer() {
        clearInterval(interval);
        setTimer(time);
        interval = setInterval(() => {
            setTimer((currentTime) => {
                onUpdateTime(currentTime);
                if (currentTime === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            startTimer();
            return () => {
                clearInterval(interval)
            }
        }, [currentQuestionIndex])
    })

    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex((quiz) => quiz.id === selectQuizToStart.id);
        setIndexOfQuizSelected(quizIndexFound);
    }, []);

    useEffect(() => {
        if (timer === 0 && !isQuizEnded) {
            const currentQuizzes = [...allQuizzes];
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .statistics.totalAttempts += 1;
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .statistics.incorrectAttempts += 1;
            setAllQuizzes(currentQuizzes);

            if (currentQuestionIndex !== quizQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => {
                        return current + 1;
                    })
                }, 1000)
            } else {
                setIsQuizEnded(true);
                clearInterval(interval);
            }
        }
    }, [timer])

    useEffect(() => {
        if (isQuizEnded) {
            quizQuestions.forEach((quizQuestion) => {
                quizQuestion.answeredResult = -1
            })
        }
    }, [isQuizEnded])

    function moveToTheNextQuestion() {
        if (allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .answeredResult === -1) {
            toast.error('please select an Answer');
            return;
        }

        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .statistics.totalAttempts += 1;


        if (allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .answeredResult !== allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .correctAttempts) {
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .statistics.incorrectAttempts += 1;
            toast.error('Incorrect Answer');

            if (currentQuestionIndex !== quizQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => {
                        return current + 1;
                    })
                    setSelectedChoice(null);
                }, 1200)
            } else {
                setTimer(0);
                setIsQuizEnded(true);
                clearInterval(interval);
            }
            return
        }

        // update the correct attempt
        allQuizzes[indexOfQuizSelected].quizQuestions
        [currentQuestionIndex].statistics.correctAttempts += 1;
        setScore((prevState) => prevState + 1);

        toast.success("Awesome :)")
        setUserXP((prevState)=>prevState+1)

        // this will stop the timer and end the quiz
        if (currentQuestionIndex === quizQuestions.length - 1 &&
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult === allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .correctAttempts) {
            setTimer(0);
            clearInterval(interval);
            setIsQuizEnded(true);
            return;
        }

        setTimeout(() => {
            // increment the currentQuestion index by 1 to go to the next question 
            setCurrentQuestionIndex((curr) => curr + 1);
            setSelectedChoice(null);
        },2000);

    }

    function selectChoiceFunction(choiceIndexClicked) {
        setSelectedChoice(choiceIndexClicked);
        const currentAllQuizzes = [...allQuizzes];
        currentAllQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].
            answeredResult = choiceIndexClicked;
        setAllQuizzes(currentAllQuizzes);
    }

    return (
        <div className='relative rounded-sm m-9 w-9/12'>
            <Toaster
                toastOptions={{
                    className:"",
                    duration: 1500,
                    style: {
                        padding: '12px'
                    }
                }}
            />
            <div className='flex justify-center items-center gap-2'>
                <div className='bg-gray-400 flex justify-center items-center rounded-md w-11 h-11' >
                    {currentQuestionIndex + 1}
                </div>
                <p>
                    {quizQuestions[currentQuestionIndex].mainQuestion}
                </p>
            </div>
            <div className='mt-7 flex flex-col gap-2'>
                {quizQuestions[currentQuestionIndex].choices.map((choice, indexChoice) => {
                    return (
                        <div key={indexChoice} onClick={() => selectChoiceFunction(indexChoice)} className={`p-3 ml-12 w-10/12 border border-gray-600 rounded-md hover:bg-gray-400 hover:text-white transition-all select-none
                    ${selectedChoice === indexChoice ? 'bg-gray-600 text-white' : 'bg-gray-400'}`}>
                            {choice}
                        </div>
                    )
                })}

            </div>
            <div className='flex justify-end mt-7'>
                <button onClick={() => {
                    moveToTheNextQuestion()
                }} disabled={isQuizEnded ? true : false}
                    className={`p-2 px-5 text-[15px] text-white rounded-md bg-gray-700 mr-[70px]
                    ${isQuizEnded ? 'opacity-50' : 'opacity-100'}`}>
                    Submit
                </button>
            </div>
            {isQuizEnded && (
                <ScoreComponent
                    quizStartParentProps={{
                        setIsQuizEnded,
                        setIndexOfQuizSelected,
                        setCurrentQuestionIndex,
                        setSelectedChoice,
                        score,
                        setScore
                    }}
                />
            )}
        </div>
    )
}

export default QuizStartquestions;

function ScoreComponent({ quizStartParentProps }) {
    const { quizToStartObject, allQuizzes, } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const numberOfQuestions = selectQuizToStart.quizQuestions.length;
    const router = useRouter();

    const {
        setIsQuizEnded,
        setIndexOfQuizSelected,
        setCurrentQuestionIndex,
        setSelectedChoice,
        score,
        setScore } = quizStartParentProps;


    function emojiIconScore() {
        const emojiFaces = [
            'failed.png',
            'successed.png',
            'victory-medal.png',
        ];
        const result = (score / selectQuizToStart.quizQuestions.length) * 100;

        if (result < 25) {
            return emojiFaces[0];
        }
        if (result === 50) {
            return emojiFaces[1];
        }
        return emojiFaces[2];
    }

    function tryAgainFunction() {
        setIsQuizEnded(false);
        const newQuizIndex = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id)
        setIndexOfQuizSelected(newQuizIndex);
        setCurrentQuestionIndex(0);
        setSelectedChoice(null);
        setScore(0);

    }

    return (
        <div className="flex items-center justify-center rounded-md top-[-100px] border border-gray-300">
            <div className="flex gap-4 items-center justify-center flex-col">
                <Image src={`/${emojiIconScore()}`} alt="image" width={100} height={100} />
                <div className="flex gap-1 flex-col">
                    <span className="font-bold text-2xl">Your Score</span>
                    <div className="text-[22px] text-center">
                        {score}/{numberOfQuestions}
                    </div>
                </div>
                <button onClick={() => tryAgainFunction()}
                    className="p-2 bg-green-700 rounded-md text-white px-6">
                    Try Again
                </button>
                <div className="w-full flex gap-2 flex-col mt-3">
                    <div className="flex gap-1 items-center justify-center">
                        <Image src="/green-check.png" alt="image" width={20} height={20} />
                        <span className="text-[14px]">
                            Correct Answers:{score}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        <Image src="/error-10379.png" alt="image" width={20} height={20} />
                        <span className="text-[14px]">
                            Incorrect Answers:{selectQuizToStart.quizQuestions.length - score}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )

}