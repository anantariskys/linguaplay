/* eslint-disable */
import { animals } from "@/data/animal";
import { useModalStore } from "@/store/useModalStore";
import { useWordStore } from "@/store/useWordStore";
import { DraggableLetterProps, LetterItem, Question, WordCharacterProps } from "@/types/type";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import {  useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";



const getRandomAnimal = (): { name: string; image: StaticImageData } => {
  return animals[Math.floor(Math.random() * animals.length)];
};

const createBlankWord = (word: string) => {
  const wordArray = word.split("");
  const blankIndexes = new Set<number>();
  while (blankIndexes.size < Math.ceil(word.length / 2)) {
    blankIndexes.add(Math.floor(Math.random() * word.length));
  }
  const missingIndexes = Array.from(blankIndexes);
  const missingLetters = missingIndexes.map((index) => wordArray[index]);

  return {
    word,
    characters: wordArray.map((letter, index) => ({
      letter,
      isMissing: blankIndexes.has(index),
      index,
    })),
    missingLetters,
    missingIndexes,
  };
};

const WordCharacter: FC<WordCharacterProps> = ({
  character,
  onDrop,
  droppedLetter,
  onRevert,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "LETTER",
    drop: (item: { id: string; letter: string; originalIndex: number }) => {
      if (!droppedLetter) {
        onDrop(character.index, item.id, item.letter, item.originalIndex);
      }
    },
    // Hanya izinkan hover effect jika tidak ada huruf yang sudah di-drop
    canDrop: () => character.isMissing && !droppedLetter,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleClick = () => {
    if (droppedLetter) {
      onRevert();
    }
  };

  if (!character.isMissing) {
    return (
      <div className=" p-2 inline-flex items-center justify-center text-sm lg:text-lg font-medium">
        {character.letter}
      </div>
    );
  }

  drop(ref);

  return (
    <div
      ref={ref}
      className={`p-2 border-2 
        ${isOver && canDrop ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${droppedLetter ? "bg-gray-100 cursor-pointer" : "bg-white"} 
        inline-flex items-center justify-center mx-1 rounded transition-colors text-sm lg:text-lg font-medium
        ${!droppedLetter ? "hover:border-blue-300" : ""}`}
      onClick={handleClick}
    >
      {droppedLetter || "_"}
    </div>
  );
};

const DraggableLetter: FC<DraggableLetterProps> = ({
  id,
  letter,
  isUsed,
  originalIndex,
  onRevert,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LETTER",
    item: { id, letter, originalIndex },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    canDrag: !isUsed,  // Tetap tidak bisa di-drag jika sudah digunakan
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={` p-2 
        ${isUsed ? "bg-gray-300" : "bg-blue-500"} 
        text-white rounded 
        ${!isUsed ? "cursor-pointer hover:bg-blue-600" : "cursor-not-allowed"} 
        m-1 ${isDragging ? "opacity-50" : "opacity-100"} 
        transition-all text-sm lg:text-lg`}
      onClick={onRevert}
    >
      {letter}
    </div>
  );
};
const CompleteTheWord: FC = () => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  const { onOpen,onClose} = useModalStore();
  const { resetGame } = useWordStore();
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [animalImage, setAnimalImage] = useState<StaticImageData>();

  const [droppedLetters, setDroppedLetters] = useState<
    Record<number, { letter: string; originalIndex: number }>
  >({});
  const [availableLetters, setAvailableLetters] = useState<LetterItem[]>([]);

  useEffect(() => {
    backgroundMusicRef.current = new Audio("/audio/backsound.mp3");
    backgroundMusicRef.current.loop = true;

    return () => {
      // Pastikan audio berhenti saat komponen di-unmount
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    };
  }, []);
  useEffect(() => {
    if (started) {
      // Memainkan musik saat game dimulai
      backgroundMusicRef.current?.play().catch((error) => console.error("Error playing audio:", error));

      const animal = getRandomAnimal();
      const newQuestion = createBlankWord(animal.name);
      setQuestion(newQuestion);
      setAnimalImage(animal.image);
      resetGame();
      setDroppedLetters({});

      setAvailableLetters(
        newQuestion.missingLetters.map((letter, index) => ({
          id: `letter-${index}`,
          letter,
          isUsed: false,
          originalIndex: index,
        }))
      );
    } else {
      // Menghentikan musik saat game berhenti
      backgroundMusicRef.current?.pause();
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.currentTime = 0;
        
      }
    }
  }, [started, resetGame]);

  const handleDrop = (
    index: number,
    letterId: string,
    letterValue: string,
    originalIndex: number
  ) => {
    setDroppedLetters((prev) => ({
      ...prev,
      [index]: { letter: letterValue, originalIndex },
    }));

    setAvailableLetters((prev) =>
      prev.map((letter) =>
        letter.id === letterId
          ? { ...letter, isUsed: true }
          : letter
      )
    );
  };

  useEffect(()=>{

  },[availableLetters])

  const handleRevert = (letterId: string) => {
    // Find the dropped letter entry we want to remove
    const entryToRemove = Object.entries(droppedLetters).find(
      ([, value]) => value.letter === letterId
    );

    if (entryToRemove) {
      const [indexToRemove] = entryToRemove;
      
      // Remove the letter from droppedLetters
      setDroppedLetters((prev) => {
        const newDroppedLetters = { ...prev };
        delete newDroppedLetters[Number(indexToRemove)];
        return newDroppedLetters;
      });

      // Make the letter available again in availableLetters
      setAvailableLetters((prev) =>
        prev.map((letter) => {
          if (letter.letter === letterId || letter.id === letterId) {
            return { ...letter, isUsed: false };
          }
          return letter;
        })
      );
    }
  };

  const handleSubmit = () => {
    if (!question) return;

    const isAllLettersPlaced = question.missingIndexes.every(
      (index) => droppedLetters[index]?.letter
    );
  
    if (!isAllLettersPlaced) {
      
      alert('silahkan taruh semua huruf sebelum submit.')
     
      return;
    }

    const isCorrect = question.missingLetters.every(
      (letter, index) =>
        droppedLetters[question.missingIndexes[index]]?.letter === letter
    );

    if (isCorrect) {
      const audio = new Audio("/audio/correct.wav");
      audio.volume = 0.7;
      audio.play()
    }else{
      const audio = new Audio("/audio/wrong.wav");
      audio.volume = 0.7;
      audio.play()
    }
    
    
    const resultMessage = isCorrect ? "Jawaban benar !!!" : `Jawaban salah  !!! susunan yang benar adalah : ${question.word}`;
    onOpen(0,"notif",resultMessage,isCorrect ? "correct" : "wrong")


    setTimeout(() => {
      setStarted(false);
     
      resetGame();
      setDroppedLetters({});
    }, 1000);
  };
  const handleClose = () => {
    // Pastikan musik berhenti saat game di-close
    backgroundMusicRef.current?.pause();
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.currentTime = 0;
    }    
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col relative items-center justify-center min-h-screen bg-white2 bg-opacity-40 p-4"
    >
      <div onClick={()=>handleClose()} className="absolute cursor-pointer top-2 md:top-8 right-2 md:right-8 p-4 rounded-md text-xl bg-primary1 text-white2">
        <Icon  icon={'material-symbols:cancel-rounded'}  />
      </div>
   

      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1"
        >
          Start Game
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-fit text-center">
          <p className="text-lg text-gray-600 mb-2">Guess the animal:</p>

          {animalImage&& ( 
            <div className="w-80 md:max-w-xs mb-4 aspect-square relative">
              <div className="size-full bg-gray-300 animate-pulse"></div>
            <Image
              src={animalImage}
              alt="Animal"
              
              className="size-full object-cover absolute top-0 left-0"/>
              </div>
             )
            }

          <div className="flex justify-center items-center space-x-1 mb-4">
            {question?.characters.map((char, idx) => (
              <WordCharacter
                key={idx}
                character={char}
                onDrop={handleDrop}
                droppedLetter={droppedLetters[char.index]?.letter}
                isDropped={droppedLetters[char.index]?.letter ? true : false}
                onRevert={() => handleRevert(droppedLetters[char.index]?.letter || '')}
              />
            ))}
          </div>

          <div className="flex justify-center flex-wrap mb-4">
           {availableLetters
          .filter((item) => !item.isUsed) // Filter huruf yang sudah digunakan
          .map((item) => (
            <DraggableLetter
              key={item.id}
              id={item.id}
              letter={item.letter}
              isUsed={item.isUsed}
              originalIndex={item.originalIndex}
              onRevert={() => handleRevert(item.id)}
            />
          ))}
          </div>

          <button
            onClick={handleSubmit}
            className="px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CompleteTheWord;
