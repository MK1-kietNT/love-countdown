"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CoupleData, saveCoupleData, loadCoupleData, clearAllData } from "@/lib/utils";

export default function SetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CoupleData>({
    boyName: "",
    girlName: "",
    boyAge: 18,
    girlAge: 18,
    meetingDate: "",
    meetingTime: "18:00",
    boyNickname: "",
    girlNickname: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CoupleData, string>>>({});
  const [hasExistingData, setHasExistingData] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    // Check if data exists in localStorage
    const savedData = loadCoupleData();
    if (savedData) {
      setFormData(savedData);
      setHasExistingData(true);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CoupleData, string>> = {};

    if (!formData.boyName.trim()) {
      newErrors.boyName = "Nhập tên anh ấy đi nào 💙";
    }
    if (!formData.girlName.trim()) {
      newErrors.girlName = "Nhập tên cô ấy đi nào 💕";
    }
    if (formData.boyAge < 1 || formData.boyAge > 100) {
      newErrors.boyAge = "Tuổi không hợp lệ 🤔";
    }
    if (formData.girlAge < 1 || formData.girlAge > 100) {
      newErrors.girlAge = "Tuổi không hợp lệ 🤔";
    }
    if (!formData.meetingDate) {
      newErrors.meetingDate = "Chọn ngày hẹn hò đi nào 📅";
    } else {
      const selectedDate = new Date(formData.meetingDate + "T" + formData.meetingTime);
      if (selectedDate <= new Date()) {
        newErrors.meetingDate = "Ngày hẹn phải ở tương lai nha 🕐";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      saveCoupleData(formData);
      router.push("/countdown");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
    // Clear error when user types
    if (errors[name as keyof CoupleData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleResetAll = () => {
    setShowResetModal(true);
  };

  const handleConfirmResetAll = () => {
    clearAllData();
    setFormData({
      boyName: "",
      girlName: "",
      boyAge: 18,
      girlAge: 18,
      meetingDate: "",
      meetingTime: "18:00",
      boyNickname: "",
      girlNickname: "",
    });
    setErrors({});
    setHasExistingData(false);
    setShowResetModal(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-love-gradient">
      {/* Floating hearts background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ y: "-100vh", opacity: [0, 0.3, 0] }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute text-2xl"
          >
            {["💕", "💖", "💗", "✨", "🌸"][i % 5]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            💕
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            Đếm Ngược Ngày Gặp Nhau
          </h1>
          <p className="text-gray-500">Điền thông tin để bắt đầu đếm ngược nào! 🥰</p>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6 md:p-8 love-shadow space-y-6"
        >
          {/* Boy Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-blue-500 flex items-center gap-2">
              👦 Thông tin anh ấy
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tên 💙</label>
              <input
                type="text"
                name="boyName"
                value={formData.boyName}
                onChange={handleChange}
                placeholder="Nhập tên anh ấy..."
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.boyName ? "border-red-300" : "border-pink-200"
                  }`}
              />
              {errors.boyName && (
                <p className="text-red-400 text-sm mt-1">{errors.boyName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tuổi 🎂</label>
              <input
                type="number"
                name="boyAge"
                value={formData.boyAge}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Biệt danh 🏷️ (tuỳ chọn)</label>
              <input
                type="text"
                name="boyNickname"
                value={formData.boyNickname || ""}
                onChange={handleChange}
                placeholder='VD: "Cục nợ", "Bé"...'
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Divider with heart */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-2xl"
            >
              ❤️
            </motion.span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>

          {/* Girl Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-pink-500 flex items-center gap-2">
              👧 Thông tin cô ấy
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tên 💕</label>
              <input
                type="text"
                name="girlName"
                value={formData.girlName}
                onChange={handleChange}
                placeholder="Nhập tên cô ấy..."
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.girlName ? "border-red-300" : "border-pink-200"
                  }`}
              />
              {errors.girlName && (
                <p className="text-red-400 text-sm mt-1">{errors.girlName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tuổi 🎂</label>
              <input
                type="number"
                name="girlAge"
                value={formData.girlAge}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Biệt danh 🏷️ (tuỳ chọn)</label>
              <input
                type="text"
                name="girlNickname"
                value={formData.girlNickname || ""}
                onChange={handleChange}
                placeholder='VD: "Người hay quên", "Bồ"...'
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {/* Meeting Date & Time */}
          <div className="space-y-4">
            <h3 className="font-bold text-purple-500 flex items-center gap-2">
              📅 Ngày hẹn hò
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ngày 🗓️</label>
                <input
                  type="date"
                  name="meetingDate"
                  value={formData.meetingDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.meetingDate ? "border-red-300" : "border-pink-200"
                    }`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Giờ ⏰</label>
                <input
                  type="time"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>
            {errors.meetingDate && (
              <p className="text-red-400 text-sm">{errors.meetingDate}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {hasExistingData ? "Cập nhật & đếm ngược 💕" : "Bắt đầu đếm ngược 💕"}
          </motion.button>

          {/* Reset Button - only show when data exists */}
          {hasExistingData && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResetAll}
              className="w-full py-3 bg-white/60 text-red-400 font-medium text-sm rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all flex items-center justify-center gap-2"
            >
              🗑️ Xoá tất cả dữ liệu đã lưu
            </motion.button>
          )}
        </motion.form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Made with 💕 for couples
        </p>

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
                Tất cả thông tin sẽ bị xoá sạch, bao gồm: thông tin cặp đôi, nhật ký, tâm trạng, số lần nhớ, hộp thời gian, thống kê... Không thể hoàn tác! 💔
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
                  onClick={handleConfirmResetAll}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-400 to-pink-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Xoá hết 💔
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
