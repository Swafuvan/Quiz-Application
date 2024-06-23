import { faCode } from "@fortawesome/free-solid-svg-icons";


const quizzesData = [
    {
        id: 1,
        icon: faCode,
        quizTitle: "javaScript Quiz",
        quizQuestions: [{
            id: 1,
            mainQuestion: 'what is the purpose of javaScript',
            choices: [
                "A. To style HTML elements",
                "B. To add interactivity to web pages",
                "C. To define the structure of a page",
                "D. To perform server-side operations",
            ],
            correctAnswer: 1,
            answerResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 2,
            mainQuestion: 'which keyword is used to declare variables in javaScript',
            choices: [
                "A. var",
                "B. let",
                "C. const",
                "D. variable",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 3,
            mainQuestion: 'what does "this" keyword refer to in javaScript',
            choices: [
                "A. The current function",
                "B. The global object",
                "C. The object that invoked the function",
                "D. None of the above",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 4,
            mainQuestion: 'what is the use of the Array method "map" in javaScript',
            choices: [
                "A. To loop over the array",
                "B. To modify each item in the array and create a new array",
                "C. To check if a particular element exists in the array",
                "D. To add a new element to the array",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 5,
            mainQuestion: 'How do you declare a function in javaScript',
            choices: [
                "A. function = myFunction()",
                "B. function myFunction()",
                "C. var myFunction = function()",
                "D. Both B and C",
            ],
            correctAnswer: 0,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }
        ]
    },{
        id: 2,
        icon: faCode,
        quizTitle: "Node Quiz",
        quizQuestions: [{
            id: 1,
            mainQuestion: 'what is the purpose of javaScript',
            choices: [
                "A. To style HTML elements",
                "B. To add interactivity to web pages",
                "C. To define the structure of a page",
                "D. To perform server-side operations",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 2,
            mainQuestion: 'which keyword is used to declare variables in javaScript',
            choices: [
                "A. var",
                "B. let",
                "C. const",
                "D. variable",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }, {
            id: 3,
            mainQuestion: 'what does "this" keyword refer to in javaScript',
            choices: [
                "A. The current function",
                "B. The global object",
                "C. The object that invoked the function",
                "D. None of the above",
            ],
            correctAnswer: 1,
            answeredResult: -1,
            statistics: {
                totalAttempts: 3,
                correctAttempts: 2,
                incorrectAttempts: 1,
            }
        }]
    }]

export const QuizzesData = JSON.stringify(quizzesData)
