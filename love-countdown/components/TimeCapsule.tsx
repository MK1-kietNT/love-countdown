"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TimeCapsule as TimeCapsuleType,
  saveTimeCapsule,
  loadTimeCapsule,
} from "@/lib/utils";

interface TimeCapsuleProps {
  isComplete: boolean;
  boyName: string;
  girlName: string;
}

export default function TimeCapsule({
  isComplete,
  boyName,
  girlName,
}: TimeCapsuleProps) {
  const [capsule, setCapsule] = useState<TimeCapsuleType | null>(null);
  const [message, setMessage] = useState("");
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setCapsule(loadTimeCapsule());
  }, []);

  const handleSave = () => {
    if (!message.trim()) return;

    const newCapsule: TimeCapsuleType = {
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isOpened: false,
    };

    saveTimeCapsule(newCapsule);
    setCapsule(newCapsule);
    setMessage("");
  };

  const handleOpen = () => {
    if (!capsule || !isComplete) return;

    setIsOpening(true);
    setTimeout(() => {
      const openedCapsule = { ...capsule, isOpened: true };
      saveTimeCapsule(openedCapsule);
      setCapsule(openedCapsule);
      setIsOpening(false);
      setShowContent(true);
    }, 1500);
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("love-countdown-capsule");
      setCapsule(null);
      setShowContent(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 love-shadow">
      <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
        ⏳ Hộp thời gian
      </h3>

      {/* No capsule yet - Create form */}
      {!capsule && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <p className="text-sm text-gray-500 text-center">
            Viết một lời nhắn, sẽ chỉ được mở khi gặp nhau 💌
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 200))}
            placeholder="Gửi đến người ấy khi countdown = 0..."
            className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none resize-none"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{message.length}/200</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={!message.trim()}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              💌 Gửi vào hộp
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Capsule exists but not opened */}
      {capsule && !capsule.isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <AnimatePresence mode="wait">
            {isOpening ? (
              <motion.div
                key="opening"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5 }}
                className="py-8"
              >
                <span className="text-6xl">🎁</span>
                <p className="text-gray-500 mt-2">Đang mở...</p>
              </motion.div>
            ) : (
              <motion.div key="locked" className="py-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-5xl mb-4"
                >
                  {isComplete ? "🎁" : "🔒"}
                </motion.div>
                <p className="text-sm text-gray-500 mb-2">
                  {isComplete
                    ? "Đã đến lúc mở hộp rồi! 🎉"
                    : "Hộp này sẽ mở khi gặp nhau..."}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Tạo lúc:{" "}
                  {new Date(capsule.createdAt).toLocaleDateString("vi-VN")}
                </p>
                {isComplete ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-medium"
                  >
                    ✨ Mở hộp thời gian
                  </motion.button>
                ) : (
                  <div className="text-xs text-pink-400">
                    🔐 Chờ đến ngày gặp nhau nhé!
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Capsule opened */}
      {capsule && capsule.isOpened && showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">💝</div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4">
            <p className="text-gray-700 italic">"{capsule.message}"</p>
            <p className="text-xs text-gray-400 mt-2">
              — Viết lúc {new Date(capsule.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Tạo hộp mới
          </button>
        </motion.div>
      )}

      {/* Show opened content on reload */}
      {capsule && capsule.isOpened && !showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">💝</div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4">
            <p className="text-gray-700 italic">"{capsule.message}"</p>
            <p className="text-xs text-gray-400 mt-2">
              — Viết lúc {new Date(capsule.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Tạo hộp mới
          </button>
        </motion.div>
      )}
    </div>
  );
}
