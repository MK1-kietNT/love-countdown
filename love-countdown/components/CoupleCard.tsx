"use client";

import { motion } from "framer-motion";
import { CoupleData, formatDate } from "@/lib/utils";

interface CoupleCardProps {
  data: CoupleData;
}

export default function CoupleCard({ data }: CoupleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-3xl p-6 md:p-8 love-shadow"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-4xl mb-2"
        >
          💕
        </motion.div>
        <h2 className="text-xl md:text-2xl font-bold text-gradient">
          Thông tin cặp đôi
        </h2>
      </div>

      {/* Couple Names */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="text-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl md:text-3xl shadow-lg">
            👦
          </div>
          <p className="mt-2 font-bold text-gray-700 text-sm md:text-base">
            {data.boyName}
          </p>
          <p className="text-xs text-pink-500">🎂 {data.boyAge} tuổi</p>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-3xl md:text-4xl"
        >
          ❤️
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="text-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-2xl md:text-3xl shadow-lg">
            👧
          </div>
          <p className="mt-2 font-bold text-gray-700 text-sm md:text-base">
            {data.girlName}
          </p>
          <p className="text-xs text-pink-500">🎂 {data.girlAge} tuổi</p>
        </motion.div>
      </div>

      {/* Meeting Date Info */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 text-center">
        <p className="text-sm text-gray-600 mb-1">📅 Ngày hẹn hò</p>
        <p className="font-bold text-pink-600 text-lg">
          {formatDate(data.meetingDate)}
        </p>
        <p className="text-purple-600 font-medium">⏰ {data.meetingTime}</p>
      </div>

      {/* Cute footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 mt-4"
      >
        💖 Yêu nhau là phải hẹn hò 💖
      </motion.p>
    </motion.div>
  );
}
