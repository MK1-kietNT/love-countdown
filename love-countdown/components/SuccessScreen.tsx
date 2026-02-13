"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface SuccessScreenProps {
  boyName: string;
  girlName: string;
  onReset: () => void;
}

export default function SuccessScreen({
  boyName,
  girlName,
  onReset,
}: SuccessScreenProps) {
  useEffect(() => {
    // Launch confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Launch from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ec4899", "#a855f7", "#f472b6", "#c084fc"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ec4899", "#a855f7", "#f472b6", "#c084fc"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-love-gradient">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center love-shadow"
      >
        {/* Heart Animation */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-6xl md:text-8xl mb-6"
        >
          💕
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gradient mb-4"
        >
          Đã đến lúc rồi! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 mb-6"
        >
          {boyName} và {girlName} được gặp nhau rồi nè! 🥹💖
        </motion.p>

        {/* Cute messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-2 mb-8"
        >
          <p className="text-pink-500">✨ Chúc hai bạn hẹn hò vui vẻ ✨</p>
          <p className="text-purple-500">💕 Yêu nhau nhiều nha 💕</p>
          <p className="text-pink-400">🧋 Đừng quên uống trà sữa 🧋</p>
        </motion.div>

        {/* Floating emojis */}
        <div className="flex justify-center gap-4 mb-8">
          {["💖", "🌸", "✨", "💕", "🎀"].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: index * 0.2,
              }}
              className="text-2xl"
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="py-3 px-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Lên lịch hẹn tiếp theo 📅
        </motion.button>
      </motion.div>
    </div>
  );
}
