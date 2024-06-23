"use client"
import Image from "next/image";
import QuizzesArea from "./componenets/QuizzesArea";
import Navbar from "./componenets/Navbar";
import useGlobalContextProvider from "./ContextApi";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { quizToStartObject } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;

  useEffect(() => {
    setSelectQuizToStart(null);
  }, [])

  return (
    <div>
      <Toaster />
      <header>
        <Navbar />
      </header>
      <QuizzesArea />
    </div>
  );
}
