"use client"
import {  faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function DropDown() {
    const {dropDownToggleObject, threeDotsPositionsObject, selectedQuizObject} = useGlobalContextProvider();
    const {dropDownToggle,setDropDownToggle} = dropDownToggleObject;
    const {threeDotsPositions}=threeDotsPositionsObject;
    const {selectedQuiz,setSelectedQuiz} = selectedQuizObject;
    const [isDilogOpened,setIsDialogOpened] = useState(false);
    const dropDownRef = useRef(null);
    const router = useRouter();
    const menuItems =[
        {name:'Modify',icon:faPencil},
        {name:'Delete',icon:faTrash},
    ];

    useEffect(()=>{
        function handleOutiseClick(event){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
              if(!isDilogOpened){
                setSelectedQuiz(null);
              }
                setDropDownToggle(false);
            }
        }
        document.addEventListener('click',handleOutiseClick);
        return ()=>{
            document.removeEventListener('click',handleOutiseClick);
        }
    },[dropDownToggle]);

    function deleteTheQuiz(){
      const updateAllQuizzes = allQuizzes.filter((quiz)=>{
        if(quiz.id !== selectedQuiz.id){
          return quiz;
        }
      });
      setAllQuizzes(updateAllQuizzes);
      toast.success('The Quiz has been deleted successfully.');
      setIsDialogOpened(false);
      setSelectedQuiz(null);
    }

    function handleClickedItem(menuItem){
      if(menuItem.name === 'Modify'){
        router.push('/quiz-build');
      }
      if(menuItem.name === 'Delete'){
        setIsDialogOpened(true);
        toast((t)=>{
          <div className='flex flex-col gap-4'>
            <div>
               Do you really want to delete ({selectedQuiz.quizTitle}) Quiz?
            </div>
            <div className='w-full flex gap-3 justify-center'>
              <button onClick={()=>{ deleteTheQuiz();
              toast.dismiss(t.id);} }
              className='bg-green-700 text-white p-1 w-[100px] rounded-md'>
                Yes
              </button>
              <button className='bg-white text-green-700 p-1 w-[100px] border border-green-700
              rounded-md hover:text-white hover:bg-green-700'
              onClick={()=>{
                toast.dismiss(t.id);
              }}
              >
                No
              </button>
            </div>
          </div>
        })
        router.push('/');
      }
    }
  return ( 
    <div style={{left:threeDotsPositions.x,top:threeDotsPositions.y}}
     ref={dropDownRef} className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col 
    gap-3 bg-white text-[13px ${dropDownToggle?"visible":"invisible"}`}>
      {menuItems.map((menuItem,index)=>{
        return(
          <div onClick={()=>handleClickedItem(menuItem)}
           key={index} className='flex items-center border gap-2 cursor-pointer text-green-700 border-gray-200 rounded-md
          select-none hover:text-white hover:bg-green-700'>
            <FontAwesomeIcon className='size-4' icon={menuItem.icon}/>
            <div>{menuItem.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DropDown
