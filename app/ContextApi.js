"use client";
import React, { useContext, useState, createContext, useEffect } from 'react'
import { QuizzesData } from './Datas';
import {  faL, faQuestion } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export const GlobalContext = createContext();
export function ContextProvider({ children }) {
    const defaultUser = {
        id:1,
        name:"sottu",
        isLogged : true,
        experience :0
    }
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user, setUser] = useState(()=>{
        const saveUserData = localStorage.getItem('user');
        return saveUserData ? JSON.parse(saveUserData) : defaultUser;
    });
    const [opneIconBox,setOpeniconBox] = useState(false);
    const [selectedIcon,setSelectedIcon] = useState({faIcon:faQuestion});
    const [dropDownToggle,setDropDownToggle] = useState(false);
    const [threeDotsPositions,setThreeDotsPositions] = useState({x:0,y:0});
    const [selectedQuiz,setSelectedQuiz] = useState(null);

    const [userXP,setUserXP] = useState(()=>{
        const saveUserData = localStorage.getItem('user');
        return saveUserData? JSON.parse(saveUserData).experience : 0 ;  
    })

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user));
    },[user])

    useEffect(() => {
        setAllQuizzes(JSON.parse(QuizzesData))
    }, []);

    // useEffect(()=>{
    //     const fetchAllQuizzes = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3000/api/quizzes',{
    //                 cache:'no-cache',
    //             })
    //             if(!response.ok){
    //                 toast.error('Something Went wrong...');
    //                 throw new Error('fetching failed...');
    //             }
    //             const quizzesData = await response.json();
    //             setAllQuizzes(quizzesData.quizzes);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchAllQuizzes();
    // },[]);

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user',{
                    method: 'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({
                        name:"quizUser",
                        isLogged:false,
                        experience:0,
                    })
                })
                if(!response.ok){
                    toast.error('Something Went wrong...');
                    throw new Error('fetching failed...');
                }
                const userData = await response.json();
                if(userData.message === 'User already exists'){
                    setUser(userData.user);
                }else {
                    setUser(userData.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[]);

    useEffect(()=>{
        setUser((prevUser)=>({
            ...prevUser,
            experience:userXP,
        }))
    },[userXP]);

    useEffect(()=>{
        if(selectedQuiz){
            setSelectedIcon({faIcon:selectedQuiz.icon});
        }else{
            setSelectedIcon({faIcon:faQuestion});
        }
    },[selectedQuiz]);
    return (
        <GlobalContext.Provider value={{
            allQuizzes, setAllQuizzes,
            quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
            userObject: {user,setUser},
            openBoxToggle: {opneIconBox,setOpeniconBox},
            selectedIconObject:{selectedIcon,setSelectedIcon},
            dropDownToggleObject : {dropDownToggle,setDropDownToggle},
            threeDotsPositionsObject : {threeDotsPositions,setThreeDotsPositions},
            selectedQuizObject : {selectedQuiz,setSelectedQuiz},
            userXPObject : {userXP,setUserXP},
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default function useGlobalContextProvider() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContextProvider have a problem")
    }
    return context;
}


