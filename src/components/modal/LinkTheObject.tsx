import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { animals } from "@/data/animal";
import { StaticImageData } from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useModalStore } from "@/store/useModalStore";

interface Animal {
  name: string;
  image: StaticImageData;
}

interface DropZoneProps {
  animal: Animal;
  onMatch: (name: string) => void;
  isMatched: boolean;
}

interface DraggableImageProps {
  animal: Animal;
  isMatched: boolean;
}

interface DragItem {
  name: string;
  type: string;
}

const GameOver = React.memo(({ onRestart }: { onRestart: () => void }) => (
  <div className="mt-6 text-center">
    <div className="md:text-2xl text-xs font-bold text-primary1 mb-2">
      Congratulations! You won! 🎉
    </div>
    <button
      onClick={onRestart}
      className="px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1"
    >
      Play Again
    </button>
  </div>
));

GameOver.displayName = "GameOver";

const DropZone = React.memo(({ animal, onMatch, isMatched }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "animal",
      drop: (item: DragItem) => {
        if (item.name === animal.name) {
          onMatch(animal.name);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [animal.name, onMatch]
  );

  const ref = useRef<HTMLDivElement | null>(null);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`md:p-4 p-2 border-2 w-full aspect-square rounded-lg transition-colors ${
        isMatched
          ? "border-green-500 bg-green-50 text-green-600"
          : isOver
          ? "border-blue-500 border-dashed bg-blue-50"
          : "border-gray-300 border-dashed"
      }`}
    >
      <div className="text-sm md:text-lg font-medium text-center">
        {animal.name}
      </div>
    </div>
  );
});

DropZone.displayName = "DropZone";

const DraggableImage = React.memo(
  ({ animal, isMatched }: DraggableImageProps) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "animal",
        item: { name: animal.name, type: "animal" },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        canDrag: !isMatched,
      }),
      [animal.name, isMatched]
    );

    const ref = useRef<HTMLDivElement | null>(null);
    drag(ref);
    return (
      <div
        ref={ref}
        className={`relative rounded-lg overflow-hidden w-full aspect-square transition-all ${
          isDragging ? "opacity-50" : ""
        } ${isMatched ? "cursor-not-allowed" : "cursor-grab hover:scale-105"}`}
      >
        <div className="aspect-square animate-pulse bg-gray-200 w-full object-cover rounded-lg" />

        <img
          src={animal.image.src}
          alt={animal.name}
          className="aspect-square absolute z-10 inset-0 w-full object-cover rounded-lg"
        />

        {isMatched && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <span className="text-white2 font-medium text-lg z-50">
              Matched!
            </span>
          </div>
        )}
      </div>
    );
  }
);

DraggableImage.displayName = "DraggableImage";

const LinkTheObject: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  const [shuffledImages, setShuffledImages] = useState<Animal[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const { onClose } = useModalStore();
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  const startGame = useCallback((): void => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5).slice(0, 4);

    setSelectedAnimals(shuffled);
    setShuffledImages([...shuffled].sort(() => Math.random() - 0.5));
    setMatchedPairs([]);

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
  }, []);

  const handleMatch = useCallback(
    (animalName: string): void => {
      if (!matchedPairs.includes(animalName)) {
        setMatchedPairs((prev) => [...prev, animalName]);
        const audio = new Audio("/audio/correct_2.mp3");
   
        audio.volume = 0.7;
        audio.play();
      }
    },
    [matchedPairs]
  );
  const isGameComplete = useMemo(
    () =>
      matchedPairs.length === selectedAnimals.length &&
    selectedAnimals.length > 0,
    
    
    
    [matchedPairs.length, selectedAnimals.length]
  );
  useEffect(() => {
    if (isGameComplete) {   
      if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }

      const audio = new Audio('/audio/correct.wav');
      audio.play();
    }
  }, [isGameComplete]);

  const handleClose = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" h-screen relative flex items-center justify-center w-full"
    >
      <div
        onClick={() => handleClose()}
        className="absolute cursor-pointer top-2 md:top-8 right-2 md:right-8 p-4 rounded-md text-xl bg-primary1 text-white2"
      >
        <Icon icon={"material-symbols:cancel-rounded"} />
      </div>

      <div className="max-w-3xl w-full mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!gameStarted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Animal Matching Game</h2>
              <button
                onClick={startGame}
                className="px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1"
              >
                Start Game
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <h3 className="text-lg font-semibold mb-4">Match Names</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAnimals.map((animal) => (
                      <DropZone
                        key={animal.name}
                        animal={animal}
                        onMatch={handleMatch}
                        isMatched={matchedPairs.includes(animal.name)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Drag Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {shuffledImages.map((animal) => (
                      <DraggableImage
                        key={animal.name}
                        animal={animal}
                        isMatched={matchedPairs.includes(animal.name)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {isGameComplete && <GameOver onRestart={startGame} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkTheObject;
