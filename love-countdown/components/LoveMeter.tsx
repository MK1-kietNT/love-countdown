"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calculateLovePercentage } from "@/lib/utils";

interface LoveMeterProps {
  name1: string;
  name2: string;
}

export default function LoveMeter({ name1, name2 }: LoveMeterProps) {
  const [percentage, setPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const targetPercentage = calculateLovePercentage(name1, name2);

  const calculateLove = () => {
    setIsAnimating(true);
    setPercentage(0);

    // Animate counting up
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= targetPercentage) {
        setPercentage(targetPercentage);
        setIsAnimating(false);
        clearInterval(interval);
      } else {
        setPercentage(current);
      }
    }, 30);
  };

  useEffect(() => {
    setPercentage(targetPercentage);
  }, [targetPercentage]);

  const getHeartEmoji = () => {
    if (percentage >= 95) return "💖💖💖";
    if (percentage >= 85) return "💕💕";
    if (percentage >= 75) return "❤️";
    return "💗";
  };

  const getMessage = () => {
    if (percentage >= 95) return "OMG! Đôi này sinh ra là để yêu nhau! 🥹";
    if (percentage >= 85) return "Trời sinh 1 cặp quá xứng đôi! 💕";
    if (percentage >= 75) return "Tình yêu này bền vững lắm nè! 😍";
    return "Yêu nhau nhiều lên nha! 💗";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 love-shadow"
    >
      <h3 className="text-xl font-bold text-center text-gradient mb-4">
        ❤️ Love Meter ❤️
      </h3>

      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm mb-2">
          {name1} 💕 {name2}
        </p>
      </div>

      {/* Percentage Display */}
      <motion.div
        key={percentage}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center mb-4"
      >
        <span className="text-5xl md:text-6xl font-bold text-gradient">
          {percentage}%
        </span>
        <p className="text-2xl mt-2">{getHeartEmoji()}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-pink-100 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 rounded-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-pink-600 font-medium text-sm"
      >
        {getMessage()}
      </motion.p>

      {/* Recalculate Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={calculateLove}
        disabled={isAnimating}
        className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
      >
        {isAnimating ? "Đang tính... 💕" : "Tính lại độ hợp 🔮"}
      </motion.button>
    </motion.div>
  );
}
