"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cuteMessages, getRandomItem } from "@/lib/utils";

interface CuteMessageProps {
  daysLeft: number;
}

export default function CuteMessage({ daysLeft }: CuteMessageProps) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const generateMessage = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newMessage = getRandomItem(cuteMessages).replace(
        "{days}",
        String(daysLeft)
      );
      setMessage(newMessage);
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    generateMessage();
  }, [daysLeft]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 love-shadow text-center"
    >
      <h3 className="text-lg font-bold text-gradient mb-4">
        💌 Lời nhắn yêu thương
      </h3>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[60px] flex items-center justify-center"
          >
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateMessage}
        className="mt-4 py-2 px-6 bg-gradient-to-r from-pink-300 to-purple-300 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        Đổi lời nhắn 🔄
      </motion.button>
    </motion.div>
  );
}
