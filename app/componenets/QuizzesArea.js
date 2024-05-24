"use client"
import { useRouter } from "next/navigation";
import useGlobalContextProvider from "../ContextApi"
import PlaceHolder from "./PlaceHolder"
import QuizCard from "./QuizCard";
import DropDown from './DropDown';
import Image from "next/image";

function QuizzesArea({ props }) {
    const router = useRouter()
    const { allQuizzes, userObject } = useGlobalContextProvider();
    const { user, setUser } = userObject;
    return (
        <div className="poppins mx-12 mt-10">
        <div>
          {user.isLogged ? (
            <>
              {allQuizzes?.length === 0 ? (
                <PlaceHolder />
              ) : (
                <div className="">
                  <DropDown />
                  <h2 className="text-xl font-bold">My Quizzes</h2>
                  <div className="mt-6 flex gap-2 flex-wrap">
                  <div className="flex gap-2 flex-wrap">
                  {allQuizzes.map((singleQuiz, qizIndex) => (
                      <div key={qizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                      </div>
                    ))}
                  </div>
               
                  <div className="cursor-pointer justify-center items-center rounded-lg w-[230px] flex flex-col gap-2 border border-gray-200 bg-white p-4" onClick={()=> router.push("/quiz-build")}>
                    {/* <Image src={"/add-quiz.png"} width={160} height={160} alt="" /> */}+
                    <span className="select-none opacity-40 ">
                      Add new Quiz
                    </span>
                  </div>
                  </div>
                </div>
              )}
            </>
          ) : (
   
            <div className="h-96 flex flex-col gap-4 justify-center items-center">
              <h2 className="font-bold text-5xl">
                Learn <span className="text-green-700">Faster :)</span>
              </h2>
              <span className="text-xl font-light">
                Unlock Your Potential with Personal Quizzes
              </span>
              <button onClick={()=>{
                setUser((prevUser)=> ({...prevUser,isLogged:true}))
                // router.push('/signup')
              }} className="p-4 bg-green-700 text-white rounded-md">
                Get Started Now !
              </button>
            </div>
  
          )}
        </div>
      </div>
    )
}

export default QuizzesArea
