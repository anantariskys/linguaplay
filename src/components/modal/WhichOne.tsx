import { useModalStore } from '@/store/useModalStore';
import { useWhichOneStore } from '@/store/useWhichOneStore';
import { Animal } from '@/types/type';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhichOne = () => {
    const { question, options, generateQuestion, checkAnswer } = useWhichOneStore();
    const {onClose} = useModalStore()
    const [isDebouncing, setIsDebouncing] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (gameStarted) {
            generateQuestion();
        }
      
    }, [gameStarted]);

    const handleStart = () => {
        if (!backgroundMusicRef.current) {
            backgroundMusicRef.current = new Audio("/audio/backsound.mp3");
            backgroundMusicRef.current.loop = true;
            backgroundMusicRef.current.volume = 0.5;
        }

        // Coba memainkan audio setelah klik
        backgroundMusicRef.current.play().catch((error) => {
            console.log("Autoplay tidak diperbolehkan oleh browser", error);
        });

        setGameStarted(true);
    };

    const handleSelect = (selected: Animal) => {
        if (isDebouncing) return;

        setIsDebouncing(true);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (checkAnswer(selected)) {
          const audio = new Audio("/audio/correct_2.mp3");
          audio.volume = 0.5;
          audio.play();
          toast.success("Jawaban benar!", { autoClose: 1500 });
        } else {
          const audio = new Audio("/audio/wrong_2.mp3");
          audio.volume = 0.5;
          audio.play();
            toast.error("Salah! Ayo coba lagi.", { autoClose: 1500 });
        }

        debounceTimeoutRef.current = setTimeout(() => {
            generateQuestion();
            setIsDebouncing(false);
        }, 1500);
    };

    const handleClose = () => {
        if (backgroundMusicRef.current) {
            backgroundMusicRef.current.pause();
            backgroundMusicRef.current.currentTime = 0;
        }
  onClose()
    }

    return (
      <div onClick={(e) => e.stopPropagation()} className=' h-screen relative flex flex-col items-center justify-center w-full'>
           <div onClick={()=>handleClose()} className="absolute cursor-pointer top-2 md:top-8 right-2 md:right-8 p-4 rounded-md text-xl bg-primary1 text-white2">
                <Icon  icon={'material-symbols:cancel-rounded'}  />
              </div>
        <div  className="p-6 max-w-4xl mx-auto bg-white rounded text-center">
            {!gameStarted ? (
              <button onClick={handleStart} className="px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1">
                    Start Game
                </button>
            ) : (
              <>
                    {question && <h2 className="text-xl font-bold">Which one is {question.name}?</h2>}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {options.map((animal) => (
                          <div
                          key={animal.name}
                          className="cursor-pointer bg-white2 border p-2 hover:bg-gray-100"
                          onClick={() => handleSelect(animal)}
                          >
                                <Image src={animal.image} draggable={false} alt={animal.name} width={200} height={200} className="mx-auto" />
                            </div>
                        ))}
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
            </div>
    );
};

export default WhichOne;
