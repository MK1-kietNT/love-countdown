"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { incrementMiss, loadTodayMiss, incrementStat, MissCount } from "@/lib/utils";

interface MissCounterProps {
  boyName: string;
  girlName: string;
  boyNickname?: string;
  girlNickname?: string;
}

export default function MissCounter({
  boyName,
  girlName,
  boyNickname,
  girlNickname,
}: MissCounterProps) {
  const [missData, setMissData] = useState<MissCount | null>(null);
  const [animatingBoy, setAnimatingBoy] = useState(false);
  const [animatingGirl, setAnimatingGirl] = useState(false);

  const displayBoyName = boyNickname || boyName;
  const displayGirlName = girlNickname || girlName;

  useEffect(() => {
    setMissData(loadTodayMiss());
  }, []);

  const handleMiss = (who: "boy" | "girl") => {
    const updated = incrementMiss(who);
    incrementStat("missClicks");
    setMissData(updated);

    if (who === "boy") {
      setAnimatingBoy(true);
      setTimeout(() => setAnimatingBoy(false), 500);
    } else {
      setAnimatingGirl(true);
      setTimeout(() => setAnimatingGirl(false), 500);
    }
  };

  const boyCount = missData?.boyCount || 0;
  const girlCount = missData?.girlCount || 0;
  const winner = boyCount > girlCount ? "boy" : girlCount > boyCount ? "girl" : null;

  return (
    <div className="glass-card rounded-2xl p-5 love-shadow">
      <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
        🤔 Ai nhớ ai nhiều hơn?
      </h3>

      {/* Result Display */}
      {(boyCount > 0 || girlCount > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 mb-4 text-center"
        >
          {winner ? (
            <p className="text-sm text-gray-700">
              Hôm nay{" "}
              <span
                className={`font-semibold ${
                  winner === "boy" ? "text-purple-500" : "text-pink-500"
                }`}
              >
                {winner === "boy" ? displayBoyName : displayGirlName}
              </span>{" "}
              nhớ{" "}
              <span
                className={`font-semibold ${
                  winner === "boy" ? "text-pink-500" : "text-purple-500"
                }`}
              >
                {winner === "boy" ? displayGirlName : displayBoyName}
              </span>{" "}
              nhiều hơn{" "}
              <span className="font-bold text-gradient">
                {Math.abs(boyCount - girlCount)} lần
              </span>{" "}
              🥹
            </p>
          ) : (
            <p className="text-sm text-gray-700">
              Cả hai nhớ nhau bằng nhau ({boyCount} lần) 💕
            </p>
          )}
        </motion.div>
      )}

      {/* Click Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={animatingGirl ? { scale: [1, 1.1, 1] } : {}}
          onClick={() => handleMiss("girl")}
          className="relative p-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl border-2 border-pink-300 hover:border-pink-400 transition-all"
        >
          <motion.span
            key={girlCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="block text-3xl mb-2"
          >
            💗
          </motion.span>
          <span className="text-sm font-medium text-pink-700 block">
            {displayGirlName} nhớ
          </span>
          <span className="text-2xl font-bold text-pink-600 mt-1 block">
            {girlCount}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={animatingBoy ? { scale: [1, 1.1, 1] } : {}}
          onClick={() => handleMiss("boy")}
          className="relative p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl border-2 border-purple-300 hover:border-purple-400 transition-all"
        >
          <motion.span
            key={boyCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="block text-3xl mb-2"
          >
            💜
          </motion.span>
          <span className="text-sm font-medium text-purple-700 block">
            {displayBoyName} nhớ
          </span>
          <span className="text-2xl font-bold text-purple-600 mt-1 block">
            {boyCount}
          </span>
        </motion.button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Bấm mỗi khi nhớ người kia 💭
      </p>
    </div>
  );
}
