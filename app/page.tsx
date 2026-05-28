"use client";

import { useRef, useState } from "react";

const playlist = [
  {
    title: "Good luck, babe",
    artist: "Sabrina Carpenter (cover) ",
    src: "/audio/musica.mp3",
    cover: "/images/capa.jpg",
  },
  {
    title: "Girl Crush",
    artist: "Harry Styles",
    src: "/audio/musica2.mp3",
    cover: "/images/capa1.jpg",
  },
  {
    title: "Silver Springs",
    artist: "Fleetwood mac",
    src: "/audio/musica3.mp3",
    cover: "/images/capa2.jpg",
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentMusic = playlist[currentMusicIndex];

  async function playAudio() {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao executar o áudio:", error);
    }
  }

  function pauseAudio() {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }

  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }

  function updateCurrentTime() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  function updateDuration() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  }

  function nextMusic() {
    const nextIndex =
      currentMusicIndex === playlist.length - 1 ? 0 : currentMusicIndex + 1;

    setCurrentMusicIndex(nextIndex);
    setCurrentTime(0);

    setTimeout(() => {
      if (isPlaying) {
        playAudio();
      }
    }, 100);
  }

  function previousMusic() {
    const previousIndex =
      currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1;

    setCurrentMusicIndex(previousIndex);
    setCurrentTime(0);

    setTimeout(() => {
      if (isPlaying) {
        playAudio();
      }
    }, 100);
  }

  function forwardTime() {
    if (!audioRef.current) return;

    audioRef.current.currentTime += 10;
    setCurrentTime(audioRef.current.currentTime);
  }

  function backwardTime() {
    if (!audioRef.current) return;

    audioRef.current.currentTime -= 10;
    setCurrentTime(audioRef.current.currentTime);
  }

  function selectMusic(index: number) {
    setCurrentMusicIndex(index);
    setCurrentTime(0);

    setTimeout(() => {
      playAudio();
    }, 100);
  }

  function formatTime(time: number) {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <div className="w-full max-w-md bg-neutral-900 rounded-3xl p-6 shadow-2xl">
        <img
          src={currentMusic.cover}
          alt="Capa da música"
          className="w-full h-72 object-cover rounded-2xl mb-6 shadow-lg"
        />

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{currentMusic.title}</h1>
          <p className="text-neutral-400 mt-1">{currentMusic.artist}</p>
        </div>

        <audio
          ref={audioRef}
          src={currentMusic.src}
          onTimeUpdate={updateCurrentTime}
          onLoadedMetadata={updateDuration}
          onEnded={nextMusic}
        />

        <div className="mb-5">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="1"
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full accent-green-500 cursor-pointer"
          />

          <div className="flex justify-between text-sm text-neutral-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mb-6">
          <button
            onClick={previousMusic}
            className="text-neutral-400 hover:text-white transition text-3xl"
            title="Música anterior"
          >
            ⏮
          </button>

          <button
            onClick={backwardTime}
            className="text-neutral-400 hover:text-white transition text-2xl"
            title="Voltar 10 segundos"
          >
            ↺
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center text-3xl font-bold transition hover:scale-105"
            title="Play/Pause"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={forwardTime}
            className="text-neutral-400 hover:text-white transition text-2xl"
            title="Avançar 10 segundos"
          >
            ↻
          </button>

          <button
            onClick={nextMusic}
            className="text-neutral-400 hover:text-white transition text-3xl"
            title="Próxima música"
          >
            ⏭
          </button>
        </div>

        <div className="mb-6">
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

        <div className="border-t border-neutral-800 pt-4">
          <h2 className="text-sm font-semibold text-neutral-300 mb-3">
            Playlist
          </h2>

          <div className="space-y-2">
            {playlist.map((music, index) => (
              <button
                key={music.title}
                onClick={() => selectMusic(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left ${
                  index === currentMusicIndex
                    ? "bg-green-500 text-black"
                    : "bg-neutral-800 hover:bg-neutral-700 text-white"
                }`}
              >
                <img
                  src={music.cover}
                  alt={music.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />

                <div>
                  <p className="font-semibold">{music.title}</p>
                  <p
                    className={`text-sm ${
                      index === currentMusicIndex
                        ? "text-black/70"
                        : "text-neutral-400"
                    }`}
                  >
                    {music.artist}
                  </p>
                </div>

                {index === currentMusicIndex && (
                  <span className="ml-auto text-sm font-bold">Tocando</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}