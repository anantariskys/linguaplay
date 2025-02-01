"use client";
import { dictionary } from "@/data/dictionary";
import { useModalStore } from "@/store/useModalStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";

const DictionaryContent = () => {
  const { id } = useModalStore();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [voiceEng, setVoiceEng] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceIndo, setVoiceIndo] = useState<SpeechSynthesisVoice | null>(null);

  const filteredContent = dictionary.find((item) => item.id === id);

  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      const femaleEng =
        voices.find((v) => v.lang === "en-US" && v.name.includes("Female")) ||
        voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
        voices.find((v) => v.lang === "en-US");

      const femaleIndo =
        voices.find((v) => v.lang === "id-ID" && v.name.includes("Female")) ||
        voices.find((v) => v.lang === "id-ID");

      setVoiceEng(femaleEng || null);
      setVoiceIndo(femaleIndo || null);
    };

    getVoices();
    window.speechSynthesis.onvoiceschanged = getVoices; 
  }, []);

  const handlePlay = (englishText: string, indoText: string, index: number) => {
    window.speechSynthesis.cancel();

    if (playingId === index) {
      setPlayingId(null);
    } else {
      const utteranceEng = new SpeechSynthesisUtterance(englishText);
      const utteranceIndo = new SpeechSynthesisUtterance(indoText);

      utteranceEng.lang = "en-US";
      utteranceIndo.lang = "id-ID";
      
      utteranceEng.rate = 1;
      utteranceIndo.rate = 1;

      if (voiceEng) utteranceEng.voice = voiceEng;
      if (voiceIndo) utteranceIndo.voice = voiceIndo;

      utteranceEng.onend = () => {
        window.speechSynthesis.speak(utteranceIndo);
      };

      utteranceIndo.onend = () => setPlayingId(null);

      setPlayingId(index);
      window.speechSynthesis.speak(utteranceEng);
    }
  };

  return (
    <main className="max-w-7xl w-full bg-white2 space-y-2 p-4 rounded-2xl mx-auto xl:max-h-none max-h-96 overflow-y-auto">
      <h2 className="text-2xl font-bold">{filteredContent?.title}</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2">
        {filteredContent?.item.map((item, index) => (
          <div
            key={index}
            className="bg-primary1 flex rounded p-2 items-center justify-between text-white2"
          >
            <div>
              <p>{item.english}</p>
              <small>{item.indonesia}</small>
            </div>
            <button
              onClick={() => handlePlay(item.english, item.indonesia, index)}
              className="bg-white2 text-primary1 rounded-full p-1"
            >
              <Icon icon={playingId === index ? "mdi:stop" : "mdi:play"} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DictionaryContent;
