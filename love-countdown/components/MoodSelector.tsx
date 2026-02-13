"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { moods, saveMood, loadTodayMood, MoodData } from "@/lib/utils";

interface MoodSelectorProps {
  boyName: string;
  girlName: string;
  boyNickname?: string;
  girlNickname?: string;
}

export default function MoodSelector({
  boyName,
  girlName,
  boyNickname,
  girlNickname,
}: MoodSelectorProps) {
  const [todayMood, setTodayMood] = useState<MoodData | null>(null);
  const [selecting, setSelecting] = useState<"boy" | "girl" | null>(null);

  const displayBoyName = boyNickname || boyName;
  const displayGirlName = girlNickname || girlName;

  useEffect(() => {
    const mood = loadTodayMood();
    setTodayMood(mood);
  }, []);

  const handleSelectMood = (emoji: string) => {
    if (!selecting) return;
    
    const today = new Date().toISOString().split("T")[0];
    const newMood: MoodData = {
      date: today,
      boyMood: selecting === "boy" ? emoji : (todayMood?.boyMood || ""),
      girlMood: selecting === "girl" ? emoji : (todayMood?.girlMood || ""),
    };
    
    saveMood(newMood);
    setTodayMood(newMood);
    setSelecting(null);
  };

  const getMoodLabel = (emoji: string) => {
    return moods.find((m) => m.emoji === emoji)?.label || "";
  };

  return (
    <div className="glass-card rounded-2xl p-5 love-shadow">
      <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
        💭 Tâm trạng hôm nay
      </h3>

      {/* Current Mood Display */}
      {todayMood && (todayMood.boyMood || todayMood.girlMood) ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4 text-center"
        >
          <p className="text-gray-700">
            Hôm nay{" "}
            <span className="font-semibold text-pink-500">{displayGirlName}</span>
            {" "}đang{" "}
            <span className="text-xl">{todayMood.girlMood || "❓"}</span>
            {" "}{getMoodLabel(todayMood.girlMood)}, còn{" "}
            <span className="font-semibold text-purple-500">{displayBoyName}</span>
            {" "}thì{" "}
            <span className="text-xl">{todayMood.boyMood || "❓"}</span>
            {" "}{getMoodLabel(todayMood.boyMood)}
          </p>
        </motion.div>
      ) : (
        <p className="text-gray-400 text-sm text-center mb-4">
          Chọn tâm trạng của cả hai hôm nay nha 💕
        </p>
      )}

      {/* Selection Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelecting("girl")}
          className={`p-3 rounded-xl border-2 transition-all ${
            selecting === "girl"
              ? "border-pink-400 bg-pink-50"
              : "border-gray-200 bg-white hover:border-pink-200"
          }`}
        >
          <span className="text-2xl block mb-1">
            {todayMood?.girlMood || "😊"}
          </span>
          <span className="text-sm text-gray-600">{displayGirlName}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelecting("boy")}
          className={`p-3 rounded-xl border-2 transition-all ${
            selecting === "boy"
              ? "border-purple-400 bg-purple-50"
              : "border-gray-200 bg-white hover:border-purple-200"
          }`}
        >
          <span className="text-2xl block mb-1">
            {todayMood?.boyMood || "😊"}
          </span>
          <span className="text-sm text-gray-600">{displayBoyName}</span>
        </motion.button>
      </div>

      {/* Mood Picker */}
      <AnimatePresence>
        {selecting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-sm text-gray-500 text-center mb-3">
                Chọn mood cho {selecting === "boy" ? displayBoyName : displayGirlName}:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelectMood(mood.emoji)}
                    className="text-3xl p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    title={mood.label}
                  >
                    {mood.emoji}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setSelecting(null)}
                className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600"
              >
                Huỷ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
