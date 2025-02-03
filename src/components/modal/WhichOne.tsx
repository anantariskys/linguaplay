import { useWhichOneStore } from '@/store/useWhichOneStore';
import { Animal } from '@/types/type';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the styles

const WhichOne = () => {
    const { question, options, generateQuestion, checkAnswer } = useWhichOneStore();
    const [isDebouncing, setIsDebouncing] = useState(false); // State to track debouncing
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID
  
    useEffect(() => {
      generateQuestion();
    }, []);
  
    const handleSelect = (selected: Animal) => {
      // If already debouncing, ignore further clicks
      if (isDebouncing) return;

      setIsDebouncing(true); // Set debouncing state to true
      
      // Clear any previous timeouts (in case user clicked multiple times rapidly)
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (checkAnswer(selected)) {
        toast.success("Jawaban benar!", { autoClose: 1500 });
      } else {
        toast.error("Salah! Ayo coba lagi.", { autoClose: 1500 });
      }

      
      debounceTimeoutRef.current = setTimeout(() => {
        generateQuestion();
        setIsDebouncing(false); 
      }, 1500);
    };
  
    return (
      <div onClick={(e) => e.stopPropagation()} className="p-6 max-w-4xl mx-auto bg-white text-center">
        {question && <h2 className="text-xl font-bold">Which one is {question.name}?</h2>}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {options.map((animal) => (
            <div
              key={animal.name}
              className="cursor-pointer bg-white2 border p-2 hover:bg-gray-100"
              onClick={() => handleSelect(animal)}
            >
              <Image src={animal.image} alt={animal.name} width={200} height={200} className="mx-auto" />
            </div>
          ))}
        </div>
        {/* ToastContainer to render toasts */}
        <ToastContainer />
      </div>
    )
}

export default WhichOne;
