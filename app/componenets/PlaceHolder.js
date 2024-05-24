"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function PlaceHolder() {
  const router = useRouter()
  return (
    <div className='flex-col gap-3 p-4 flex justify-center items-center'>
        <Image 
            width={130} alt='image'
            height={130}
            src="/empty-box.png"
        />
        <h2 className='text-2xl font-bold'>Quizzes Await! Make one.</h2>
        <span className='text-[13px] font-light'>Click below to begin your journey here...</span>
        <button className='p-3 px-4 text-white text-[12px] bg-green-700 rounded-md'
         onClick={() => router.push('/quiz-build')}>
            Create my first Quiz
        </button>
    </div>
  )
}

export default PlaceHolder
