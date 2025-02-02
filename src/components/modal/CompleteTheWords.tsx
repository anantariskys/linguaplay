/* eslint-disable */
import { animal } from "@/data/animal";
import { useModalStore } from "@/store/useModalStore";
import { useWordStore } from "@/store/useWordStore";
import { DraggableLetterProps, LetterItem, Question, WordCharacterProps } from "@/types/type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useEffect, useRef, useState } from "react";
import {  useDrag, useDrop } from "react-dnd";




const getRandomAnimal = (): string => {
  return animal[Math.floor(Math.random() * animal.length)];
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
      <div className="lg:p-4 p-2 inline-flex items-center justify-center text-sm lg:text-4xl font-medium">
        {character.letter}
      </div>
    );
  }

  drop(ref);

  return (
    <div
      ref={ref}
      className={`lg:p-4 p-2 border-2 
        ${isOver && canDrop ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${droppedLetter ? "bg-gray-100 cursor-pointer" : "bg-white"} 
        inline-flex items-center justify-center mx-1 rounded transition-colors text-sm lg:text-4xl font-medium
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
      className={`lg:p-4 p-2 
        ${isUsed ? "bg-gray-300" : "bg-blue-500"} 
        text-white rounded 
        ${!isUsed ? "cursor-pointer hover:bg-blue-600" : "cursor-not-allowed"} 
        m-1 ${isDragging ? "opacity-50" : "opacity-100"} 
        transition-all text-sm lg:text-4xl`}
      onClick={onRevert}
    >
      {letter}
    </div>
  );
};
const CompleteTheWord: FC = () => {
  const { onOpen,onClose} = useModalStore();
  const { resetGame } = useWordStore();
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);

  const [droppedLetters, setDroppedLetters] = useState<
    Record<number, { letter: string; originalIndex: number }>
  >({});
  const [availableLetters, setAvailableLetters] = useState<LetterItem[]>([]);

  useEffect(() => {
    if (started) {
      const word = getRandomAnimal();
      const newQuestion = createBlankWord(word);
      setQuestion(newQuestion);
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
   

    const resultMessage = isCorrect ? "Jawaban benar !!!" : `Jawaban salah  !!! susunan yang benar adalah : ${question.word}`;

    onOpen(0,"notif",resultMessage,isCorrect ? "correct" : "wrong")

    setTimeout(() => {
      setStarted(false);
      resetGame();
      setDroppedLetters({});
    }, 1000);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col relative items-center justify-center min-h-screen bg-white2 bg-opacity-40 p-4"
    >
      <div className="absolute top-8 right-8 p-4 rounded-md text-xl bg-primary1 text-white2">
        <Icon onClick={()=>onClose()} icon={'material-symbols:cancel-rounded'}  />
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

          <div className="flex justify-center flex-wrap mb-6">
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
