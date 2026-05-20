"use client";

import { useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <div className="w-full max-w-sm bg-neutral-900 rounded-3xl p-6 shadow-2xl">
        <img
          src="/images/capa.jpg"
          alt="Capa da música"
          className="w-full h-72 object-cover rounded-2xl mb-6 shadow-lg"
        />

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Good luck, babe</h1>
          <p className="text-neutral-400 mt-1">Sabrina Carpenter (cover) </p>
        </div>

        <audio ref={audioRef} src="/audio/musica.mp3" />

        <div className="flex items-center justify-center gap-6 mb-8">
          <button className="text-neutral-400 hover:text-white transition text-3xl">
            ⏮
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center text-3xl font-bold transition scale-100 hover:scale-105"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button className="text-neutral-400 hover:text-white transition text-3xl">
            ⏭
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-neutral-300">Volume</label>
            <span className="text-sm text-neutral-400">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-green-500 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}