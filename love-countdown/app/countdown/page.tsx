"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CoupleData, loadCoupleData, clearCoupleData, clearAllData, isSilentMode, setSilentMode } from "@/lib/utils";
import CountdownTimer from "@/components/CountdownTimer";
import CoupleCard from "@/components/CoupleCard";
import LoveMeter from "@/components/LoveMeter";
import CuteMessage from "@/components/CuteMessage";
import DateChallenge from "@/components/DateChallenge";
import MusicPlayer from "@/components/MusicPlayer";
import SuccessScreen from "@/components/SuccessScreen";
import MoodSelector from "@/components/MoodSelector";
import MiniDiary from "@/components/MiniDiary";
import MissCounter from "@/components/MissCounter";
import TimeCapsule from "@/components/TimeCapsule";
import LoveStatistics from "@/components/LoveStatistics";
import DailyQuote from "@/components/DailyQuote";
import SilentMode from "@/components/SilentMode";
import SpinWheel from "@/components/SpinWheel";

export default function CountdownPage() {
  const router = useRouter();
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [silentMode, setSilentModeState] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const data = loadCoupleData();
    if (!data) {
      router.push("/");
      return;
    }
    setCoupleData(data);
    setSilentModeState(isSilentMode());

    // Calculate days left
    const targetDate = new Date(data.meetingDate + "T" + data.meetingTime);
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));

    // Check if already complete
    if (diff <= 0) {
      setIsComplete(true);
    }

    setIsLoading(false);
  }, [router]);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    clearAllData();
    setShowResetModal(false);
    router.push("/");
  };

  const handleEdit = () => {
    router.push("/");
  };

  const toggleSilentMode = () => {
    const newValue = !silentMode;
    setSilentModeState(newValue);
    setSilentMode(newValue);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-love-gradient">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-4xl"
        >
          💕
        </motion.div>
      </div>
    );
  }

  if (!coupleData) {
    return null;
  }

  if (isComplete) {
    return (
      <SuccessScreen
        boyName={coupleData.boyName}
        girlName={coupleData.girlName}
        onReset={handleReset}
      />
    );
  }

  const targetDate = new Date(
    coupleData.meetingDate + "T" + coupleData.meetingTime
  );

  // Silent Mode View
  if (silentMode) {
    return (
      <main className="min-h-screen bg-love-gradient flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <SilentMode
            boyName={coupleData.boyNickname || coupleData.boyName}
            girlName={coupleData.girlNickname || coupleData.girlName}
            isSilent={silentMode}
            onToggle={toggleSilentMode}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-love-gradient pb-8">
      {/* Floating hearts background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: `${10 + i * 12}%`, opacity: 0 }}
            animate={{ y: "-100vh", opacity: [0, 0.2, 0] }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="absolute text-2xl"
          >
            {["💕", "💖", "💗", "✨", "🌸", "🎀", "💐", "🦋"][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl mb-2"
          >
            💕
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient">
            {coupleData.boyNickname || coupleData.boyName} & {coupleData.girlNickname || coupleData.girlName}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Đếm ngược đến ngày hẹn hò 💖</p>
        </motion.header>

        {/* Silent Mode Toggle & Music Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <MusicPlayer />
          <SilentMode
            boyName={coupleData.boyName}
            girlName={coupleData.girlName}
            isSilent={silentMode}
            onToggle={toggleSilentMode}
          />
        </motion.div>

        {/* Daily Quote */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <DailyQuote />
        </motion.section>

        {/* Countdown Timer */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-6 love-shadow mb-6"
        >
          <CountdownTimer targetDate={targetDate} onComplete={handleComplete} />
        </motion.section>

        {/* Cute Message */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <CuteMessage daysLeft={daysLeft} />
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Couple Card */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CoupleCard data={coupleData} />
          </motion.section>

          {/* Love Meter */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LoveMeter name1={coupleData.boyName} name2={coupleData.girlName} />
          </motion.section>
        </div>

        {/* Mood Selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <MoodSelector
            boyName={coupleData.boyName}
            girlName={coupleData.girlName}
            boyNickname={coupleData.boyNickname}
            girlNickname={coupleData.girlNickname}
          />
        </motion.section>

        {/* Miss Counter & Time Capsule */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MissCounter
              boyName={coupleData.boyName}
              girlName={coupleData.girlName}
              boyNickname={coupleData.boyNickname}
              girlNickname={coupleData.girlNickname}
            />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
          >
            <TimeCapsule
              isComplete={isComplete}
              boyName={coupleData.boyName}
              girlName={coupleData.girlName}
            />
          </motion.section>
        </div>

        {/* Date Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <DateChallenge />
        </motion.section>

        {/* Mini Diary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mb-6"
        >
          <MiniDiary
            boyName={coupleData.boyName}
            girlName={coupleData.girlName}
            boyNickname={coupleData.boyNickname}
            girlNickname={coupleData.girlNickname}
          />
        </motion.section>

        {/* Love Statistics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <LoveStatistics meetingDate={coupleData.meetingDate} />
        </motion.section>

        {/* Spin Wheels - Food & Date Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
          >
            <SpinWheel category="food" />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <SpinWheel category="date" />
          </motion.section>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="py-3 px-6 bg-white/80 text-purple-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            ✏️ Chỉnh sửa thông tin
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="py-3 px-6 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            🔄 Tạo lịch hẹn mới
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          <p>Made with 💕 for {coupleData.boyName} & {coupleData.girlName}</p>
          <p className="text-xs mt-1">© 2025 Love Countdown | Dành cho các cặp đôi Gen Z 💖</p>
        </motion.footer>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="glass-card rounded-3xl p-6 md:p-8 love-shadow max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-5xl mb-4"
              >
                🥺
              </motion.div>
              <h2 className="text-xl font-bold text-gradient mb-2">
                Reset tất cả dữ liệu?
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Tất cả thông tin sẽ bị xoá, bao gồm: nhật ký, tâm trạng, số lần nhớ, hộp thời gian, thống kê... Bạn chắc chắn chứ? 💔
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-3 px-4 bg-white/80 text-gray-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Huỷ bỏ 🙅
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmReset}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-400 to-pink-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Xoá hết 💔
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
