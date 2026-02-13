"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free romantic tune
    audioRef.current = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    );
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-4 love-shadow"
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            text-2xl shadow-lg transition-all
            ${isPlaying
              ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
              : "bg-white text-pink-500"
            }
          `}
        >
          {isPlaying ? (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              🎵
            </motion.span>
          ) : (
            "🎧"
          )}
        </motion.button>

        <div className="flex-1">
          <p className="font-medium text-gray-700 text-sm">
            {isPlaying ? "Đang phát nhạc tình..." : "Nhạc tình yêu 🎶"}
          </p>
          <p className="text-xs text-gray-400">
            {isPlaying ? "Nhấn để tắt" : "Nhấn để bật"}
          </p>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          <span className="text-sm">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <span className="text-sm">🔊</span>
        </div>
      </div>
    </motion.div>
  );
}
