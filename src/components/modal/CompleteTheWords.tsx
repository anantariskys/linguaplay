import { animal } from "@/data/animal";
import { useModalStore } from "@/store/useModalStore";
import { useWordStore } from "@/store/useWordStore";
import { FC, useEffect, useState } from "react";
import {  useDrag, useDrop } from "react-dnd";


// Types
type Question = {
  word: string;
  // blankWord: string;
  missingLetters: string[];
  missingIndexes: number[];
  characters: { letter: string; isMissing: boolean; index: number }[];
};

interface LetterItem {
  id: string;
  letter: string;
  isUsed: boolean;
  originalIndex: number;
}

interface DraggableLetterProps {
  id: string;
  letter: string;
  isUsed: boolean;
  originalIndex: number;
  onRevert: () => void;
}

const getRandomAnimal = (): string => {
  return animal[Math.floor(Math.random() * animal.length)];
};

const createBlankWord = (word: string) => {
  let wordArray = word.split("");
  let blankIndexes = new Set<number>();
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

const DraggableLetter: FC<DraggableLetterProps> = ({
  id,
  letter,
  isUsed,
  originalIndex,
  onRevert,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LETTER",
    item: { id, letter, originalIndex },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    canDrag: !isUsed, 
  }));

  return (
    <div
    ref={(node) => drag(node)}
      className={`lg:p-4 p-2 ${
        isUsed ? "bg-gray-300" : "bg-blue-500"
      } text-white rounded ${
        !isUsed ? "cursor-pointer" : "cursor-not-allowed"
      } m-1 ${isDragging ? "opacity-50" : "opacity-100"} transition-all text-sm lg:text-4xl`}
      onClick={onRevert}
    >
      {letter}
    </div>
  );
};

interface WordCharacterProps {
  character: {
    letter: string;
    isMissing: boolean;
    index: number;
  };
  onDrop: (
    index: number,
    letterId: string,
    letterValue: string,
    originalIndex: number
  ) => void;
  droppedLetter?: string;
  isDropped: boolean;
  onRevert: () => void;
}

const WordCharacter: FC<WordCharacterProps> = ({
  character,
  onDrop,
  droppedLetter,
  isDropped,
  onRevert,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "LETTER",
    drop: (item: { id: string; letter: string; originalIndex: number }) =>
      onDrop(character.index, item.id, item.letter, item.originalIndex),
    canDrop: () => character.isMissing && !droppedLetter,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleClick = () => {
    // Jika sudah ada huruf yang ditempatkan, panggil `onRevert`
    if (droppedLetter) {
      onRevert();
    }
  };

  if (!character.isMissing) {
    return (
      <div
        className="lg:p-4 p-2 inline-flex items-center justify-center text-sm lg:text-4xl font-medium"
        onClick={handleClick} // Tambahkan event click untuk mengembalikan huruf
      >
        {character.letter}
      </div>
    );
  }

  return (
    <div
      ref={drop}
      className={`lg:p-4 p-2 border-2 ${
        isOver && canDrop ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } ${!canDrop && droppedLetter ? "bg-gray-100" : "bg-white"} inline-flex items-center justify-center mx-1 rounded transition-colors text-sm lg:text-4xl font-medium`}
      onClick={handleClick} 
    >
      {droppedLetter || "_"}
    </div>
  );
};

const CompleteTheWord: FC = () => {
  const { onOpen} = useModalStore();
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
      ([_, value]) => value.letter === letterId
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
