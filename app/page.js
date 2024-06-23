<<<<<<< HEAD
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>helllllooo</h1>
    </main>
>>>>>>> 0d1666f6efcd99b6a0679bfcd95c9c9d21fe0a72
  );
}
