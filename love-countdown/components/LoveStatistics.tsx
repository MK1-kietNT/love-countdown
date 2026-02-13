"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  loadStats,
  loadAllMoods,
  loadDiaryEntries,
  countMissMoods,
  incrementStat,
  LoveStats,
} from "@/lib/utils";

interface LoveStatisticsProps {
  meetingDate: string;
}

export default function LoveStatistics({ meetingDate }: LoveStatisticsProps) {
  const [stats, setStats] = useState<LoveStats>({
    totalDaysWaited: 0,
    webOpenCount: 0,
    challengesDone: 0,
    missClicks: 0,
  });
  const [diaryCount, setDiaryCount] = useState(0);
  const [missMoodCount, setMissMoodCount] = useState(0);

  useEffect(() => {
    // Increment web open count
    incrementStat("webOpenCount");

    const currentStats = loadStats();
    
    // Calculate days waited
    const meeting = new Date(meetingDate);
    const now = new Date();
    const daysWaited = Math.max(
      0,
      Math.floor((meeting.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );
    currentStats.totalDaysWaited = daysWaited;

    setStats(currentStats);
    setDiaryCount(loadDiaryEntries().length);
    setMissMoodCount(countMissMoods());
  }, [meetingDate]);

  const statItems = [
    {
      emoji: "📅",
      label: "Ngày đang chờ",
      value: stats.totalDaysWaited,
      color: "from-pink-400 to-pink-500",
    },
    {
      emoji: "👀",
      label: "Lần mở web",
      value: stats.webOpenCount,
      color: "from-purple-400 to-purple-500",
    },
    {
      emoji: "🎯",
      label: "Thử thách đã bốc",
      value: stats.challengesDone,
      color: "from-pink-400 to-purple-400",
    },
    {
      emoji: "💗",
      label: "Lần bấm 'nhớ'",
      value: stats.missClicks,
      color: "from-red-400 to-pink-400",
    },
    {
      emoji: "📝",
      label: "Ghi chép nhật ký",
      value: diaryCount,
      color: "from-amber-400 to-orange-400",
    },
    {
      emoji: "🥹",
      label: "Ngày mood 'nhớ'",
      value: missMoodCount,
      color: "from-blue-400 to-purple-400",
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 love-shadow">
      <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
        📊 Thống kê yêu thương
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`
              relative overflow-hidden rounded-xl p-3
              bg-gradient-to-br ${item.color}
              text-white text-center
            `}
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10">
              <span className="text-2xl block mb-1">{item.emoji}</span>
              <span className="text-2xl font-bold block">{item.value}</span>
              <span className="text-xs opacity-90">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
