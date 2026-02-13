"use client";

import { motion } from "framer-motion";
import { getDailyQuote } from "@/lib/utils";

export default function DailyQuote() {
  const quote = getDailyQuote();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 love-shadow"
    >
      <div className="flex items-start gap-3">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-2xl"
        >
          📝
        </motion.span>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Câu nói hôm nay</p>
          <p className="text-gray-700 font-medium italic">&quot;{quote}&quot;</p>
        </div>
      </div>
    </motion.div>
  );
}
