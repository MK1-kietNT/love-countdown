"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DiaryEntry,
  saveDiaryEntry,
  loadDiaryEntries,
  formatDate,
} from "@/lib/utils";

interface MiniDiaryProps {
  boyName: string;
  girlName: string;
  boyNickname?: string;
  girlNickname?: string;
}

export default function MiniDiary({
  boyName,
  girlName,
  boyNickname,
  girlNickname,
}: MiniDiaryProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [author, setAuthor] = useState<"boy" | "girl">("girl");
  const [isExpanded, setIsExpanded] = useState(false);

  const displayBoyName = boyNickname || boyName;
  const displayGirlName = girlNickname || girlName;

  useEffect(() => {
    setEntries(loadDiaryEntries());
  }, []);

  const handleSubmit = () => {
    if (!newEntry.trim() || newEntry.length > 100) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: newEntry.trim(),
      author,
    };

    saveDiaryEntry(entry);
    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  const formatEntryDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hôm qua";
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
      });
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 love-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gradient flex items-center gap-2">
          📓 Nhật ký mini
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-purple-500 hover:text-purple-700"
        >
          {isExpanded ? "Thu gọn" : `Xem tất cả (${entries.length})`}
        </button>
      </div>

      {/* New Entry Form */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 mb-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setAuthor("girl")}
            className={`flex-1 py-1 px-2 rounded-lg text-sm transition-colors ${
              author === "girl"
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {displayGirlName}
          </button>
          <button
            onClick={() => setAuthor("boy")}
            className={`flex-1 py-1 px-2 rounded-lg text-sm transition-colors ${
              author === "boy"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {displayBoyName}
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value.slice(0, 100))}
            placeholder="Hôm nay có gì muốn ghi lại không? ✨"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-pink-300 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!newEntry.trim()}
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-sm font-medium disabled:opacity-50"
          >
            ✍️
          </motion.button>
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">
          {newEntry.length}/100
        </p>
      </div>

      {/* Entries Timeline */}
      <div className={`space-y-3 ${isExpanded ? "" : "max-h-48 overflow-hidden"}`}>
        <AnimatePresence>
          {entries.slice(0, isExpanded ? entries.length : 3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${
                entry.author === "girl" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 ${
                  entry.author === "girl"
                    ? "bg-gradient-to-br from-pink-400 to-pink-500"
                    : "bg-gradient-to-br from-purple-400 to-purple-500"
                }`}
              >
                {entry.author === "girl"
                  ? displayGirlName.charAt(0)
                  : displayBoyName.charAt(0)}
              </div>
              <div
                className={`flex-1 p-3 rounded-xl ${
                  entry.author === "girl"
                    ? "bg-pink-50 rounded-tl-none"
                    : "bg-purple-50 rounded-tr-none"
                }`}
              >
                <p className="text-sm text-gray-700">{entry.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatEntryDate(entry.date)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">
            Chưa có ghi chép nào 📝
            <br />
            Bắt đầu viết nhật ký cùng nhau nhé!
          </p>
        )}
      </div>
    </div>
  );
}
