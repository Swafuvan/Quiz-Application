
import { faCode, faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link";
import useGlobalContextProvider from '../ContextApi'

function successRate(singleQuiz) {
    let correctQuestions = 0;
    let totalAttempts = 0;
    let successRate = 0;

    singleQuiz.quizQuestions.forEach((question) => {
        totalAttempts += question.statistics.totalAttempts;
        correctQuestions += question.statistics.correctAnswer;
    })

    successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
    return successRate;
}

function QuizCard({ singleQuiz }) {
    const {
        quizToStartObject,selectedQuizObject,
        dropDownToggleObject,threeDotsPositionsObject
    } = useGlobalContextProvider();
    const {setDropDownToggle} = dropDownToggleObject;
    const {setSelectQuizToStart} = quizToStartObject;
    const {setThreeDotsPositions} = threeDotsPositionsObject;
    const {selectedQuiz,setSelectedQuiz} = selectedQuizObject;
    const { quizTitle, quizQuestions, icon } = singleQuiz;
    const totalQuestion = quizQuestions.length;
    const globalSuccessRate = successRate(singleQuiz);

    function openDropDownMenu(event){
        const xPos = event.clientX;
        const yPos = event.clientY;
        setThreeDotsPositions({x:xPos,y:yPos});
        if(event){
            event.stopPropagination();
        }
        setDropDownToggle(true);
        setSelectedQuiz(singleQuiz);
    }
    return (
        <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
            <div className="relative bg-gray-600 w-full h-32 flex justify-center items-center rounded">
                <div className="absolute cursor-pointer top-3 right-3">
                    <FontAwesomeIcon
                        className="text-white"
                        height={13}
                        width={13}
                        icon={faEllipsis}
                        onClick={()=>openDropDownMenu}
                    />
                </div>
                <FontAwesomeIcon
                    className="text-white"
                    width={80}
                    height={80}
                    icon={icon}
                />
            </div>
            <h3 className="font-bold">{quizTitle}</h3>
            <p className="text-sm font-light">{totalQuestion} question(s)</p>
            <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                    <Image src="/target-12197.png"
                        width={20} height={10} alt="image" />
                    <span className="text-[12px]">Success rate: {globalSuccessRate}%</span>
                </div>
                <div onClick={() => setSelectQuizToStart(singleQuiz)}
                    className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer">
                    <Link href="/quiz-start">
                        <FontAwesomeIcon
                            className="text-white"
                            width={15}
                            height={15}
                            icon={faPlay}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuizCard
