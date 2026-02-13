"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemoryTimelineProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

interface MemoryEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    emoji: string;
    addedBy: "boy" | "girl";
}

const MEMORY_KEY = "love-countdown-memories";
const EMOJI_OPTIONS = ["💕", "🎉", "🥰", "😍", "🌸", "🎂", "✈️", "🎵", "📸", "🌅", "🏠", "💍", "🍽️", "🎬", "🎁", "🌈"];

function loadMemories(): MemoryEvent[] {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(MEMORY_KEY);
        if (data) {
            try { return JSON.parse(data); } catch { return []; }
        }
    }
    return [];
}

function saveMemories(memories: MemoryEvent[]): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(memories));
    }
}

export default function MemoryTimeline({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: MemoryTimelineProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [memories, setMemories] = useState<MemoryEvent[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [addedBy, setAddedBy] = useState<"boy" | "girl">("boy");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("💕");

    useEffect(() => {
        setMemories(loadMemories());
    }, []);

    const addMemory = () => {
        if (!title.trim() || !date) return;

        const newMemory: MemoryEvent = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            date,
            emoji: selectedEmoji,
            addedBy,
        };

        const updated = [...memories, newMemory].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setMemories(updated);
        saveMemories(updated);
        setTitle("");
        setDescription("");
        setDate("");
        setSelectedEmoji("💕");
        setShowAdd(false);
    };

    const removeMemory = (id: string) => {
        const updated = memories.filter((m) => m.id !== id);
        setMemories(updated);
        saveMemories(updated);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow">
            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                📅 Dòng Thời Gian Tình Yêu
            </h3>

            {/* Timeline */}
            <div className="relative mb-4">
                {memories.length === 0 ? (
                    <div className="text-center py-6">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-4xl mb-2"
                        >
                            📅
                        </motion.div>
                        <p className="text-gray-400 text-sm">
                            Thêm các mốc kỷ niệm quan trọng 💕
                        </p>
                    </div>
                ) : (
                    <div className="space-y-0 max-h-[350px] overflow-y-auto pr-2">
                        {/* Timeline line */}
                        <div className="relative">
                            {memories.map((memory, index) => (
                                <motion.div
                                    key={memory.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8 pb-6 last:pb-0"
                                >
                                    {/* Timeline connector */}
                                    {index < memories.length - 1 && (
                                        <div className="absolute left-[13px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-purple-300" />
                                    )}

                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-sm shadow-md">
                                        {memory.emoji}
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`p-3 rounded-xl border ${memory.addedBy === "boy"
                                                ? "bg-blue-50/50 border-blue-100"
                                                : "bg-pink-50/50 border-pink-100"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-400">
                                                    {formatDate(memory.date)}
                                                </p>
                                                <p className="font-semibold text-gray-700 text-sm mt-0.5">
                                                    {memory.title}
                                                </p>
                                                {memory.description && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {memory.description}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-1">
                                                    — {memory.addedBy === "boy" ? displayBoyName : displayGirlName}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeMemory(memory.id)}
                                                className="text-gray-300 hover:text-red-400 text-xs"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Memory Form */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-3 space-y-3"
                    >
                        {/* Added by */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setAddedBy("boy")}
                                className={`flex-1 py-1.5 text-xs rounded-lg transition-all ${addedBy === "boy"
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "bg-gray-50 text-gray-500"
                                    }`}
                            >
                                👦 {displayBoyName}
                            </button>
                            <button
                                onClick={() => setAddedBy("girl")}
                                className={`flex-1 py-1.5 text-xs rounded-lg transition-all ${addedBy === "girl"
                                        ? "bg-pink-100 text-pink-600 font-semibold"
                                        : "bg-gray-50 text-gray-500"
                                    }`}
                            >
                                👧 {displayGirlName}
                            </button>
                        </div>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                            placeholder="Sự kiện gì? (VD: Ngày đầu quen nhau)"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none"
                        />

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, 150))}
                            placeholder="Mô tả thêm... (tuỳ chọn)"
                            className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none resize-none"
                            rows={2}
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none"
                        />

                        {/* Emoji picker */}
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Chọn icon:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {EMOJI_OPTIONS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => setSelectedEmoji(emoji)}
                                        className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-all ${selectedEmoji === emoji
                                                ? "bg-pink-100 border-2 border-pink-400 scale-110"
                                                : "bg-gray-50 border border-gray-200 hover:border-pink-200"
                                            }`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={addMemory}
                            disabled={!title.trim() || !date}
                            className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl text-sm font-medium disabled:opacity-50"
                        >
                            💕 Thêm kỷ niệm
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAdd(!showAdd)}
                className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-all ${showAdd
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                    }`}
            >
                {showAdd ? "Đóng" : "📌 Thêm kỷ niệm mới"}
            </motion.button>
        </div>
    );
}
