"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dateChallenges, getRandomItem, incrementStat } from "@/lib/utils";

export default function DateChallenge() {
  const [challenge, setChallenge] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinChallenge = () => {
    setIsSpinning(true);
    incrementStat("challengesDone");

    // Simulate spinning effect
    let count = 0;
    const maxSpins = 10;
    const interval = setInterval(() => {
      setChallenge(getRandomItem(dateChallenges));
      count++;

      if (count >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        setChallenge(getRandomItem(dateChallenges));
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 love-shadow"
    >
      <h3 className="text-xl font-bold text-center text-gradient mb-4">
        🎯 Thử thách hẹn hò
      </h3>

      <p className="text-center text-gray-500 text-sm mb-4">
        Bốc thăm thử thách cho buổi hẹn nào! 🎲
      </p>

      {/* Challenge Display */}
      <div className="min-h-[100px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mb-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {challenge ? (
            <motion.div
              key={challenge}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              className="text-center"
            >
              <p className="text-lg md:text-xl font-bold text-purple-600">
                {challenge}
              </p>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-center"
            >
              Nhấn nút để bốc thăm thử thách! 🎁
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Spin Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={spinChallenge}
        disabled={isSpinning}
        className={`
          w-full py-3 px-6 
          bg-gradient-to-r from-purple-400 to-pink-400 
          text-white font-bold rounded-xl 
          shadow-lg hover:shadow-xl 
          transition-all
          disabled:opacity-70
          ${isSpinning ? "animate-pulse" : ""}
        `}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              🎲
            </motion.span>
            Đang quay...
          </span>
        ) : (
          "Bốc thăm thử thách 🎯"
        )}
      </motion.button>

      {/* Fun tip */}
      <p className="text-center text-xs text-gray-400 mt-3">
        💡 Ai thua phải thực hiện thử thách nha!
      </p>
    </motion.div>
  );
}
