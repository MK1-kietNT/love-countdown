"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TimeLeft } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export default function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        onComplete?.();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days, color: "from-pink-400 to-pink-600" },
    { label: "Giờ", value: timeLeft.hours, color: "from-purple-400 to-purple-600" },
    { label: "Phút", value: timeLeft.minutes, color: "from-pink-300 to-purple-400" },
    { label: "Giây", value: timeLeft.seconds, color: "from-purple-300 to-pink-400" },
  ];

  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center text-gradient mb-6"
      >
        ⏰ Đếm ngược đến ngày gặp nhau
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`
              relative overflow-hidden rounded-2xl p-4 md:p-6
              bg-gradient-to-br ${unit.color}
              shadow-lg love-shadow
            `}
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
            <div className="relative z-10 text-center">
              <motion.span
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="block text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="block text-sm md:text-base text-white/90 font-medium mt-1">
                {unit.label}
              </span>
            </div>
            
            {/* Decorative sparkles */}
            <div className="absolute top-2 right-2 text-white/50 text-xs">✨</div>
            <div className="absolute bottom-2 left-2 text-white/50 text-xs">💕</div>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-pink-600 font-medium">
          💖 Chỉ còn {timeLeft.days} ngày {timeLeft.hours} giờ nữa thôi! 💖
        </p>
      </motion.div>
    </div>
  );
}
