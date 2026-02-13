"use client";

import { motion } from "framer-motion";

interface SilentModeProps {
  boyName: string;
  girlName: string;
  isSilent: boolean;
  onToggle: () => void;
}

export default function SilentMode({
  boyName,
  girlName,
  isSilent,
  onToggle,
}: SilentModeProps) {
  if (!isSilent) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="w-full glass-card rounded-xl p-3 love-shadow flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <span>🫶</span>
        <span className="text-sm">Bật chế độ im lặng</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-8 love-shadow text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-6xl mb-6"
      >
        🫶
      </motion.div>

      <h2 className="text-xl font-medium text-gray-600 mb-2">
        Hôm nay không cần đếm
      </h2>
      <p className="text-gray-500 italic mb-6">Cứ nhớ thôi... 💭</p>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600">
          {boyName} & {girlName}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Khoảng cách không quan trọng bằng tấm lòng
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="text-sm text-purple-500 hover:text-purple-700 transition-colors"
      >
        Tắt chế độ im lặng
      </motion.button>
    </motion.div>
  );
}
