"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BucketListItem {
    id: string;
    text: string;
    completed: boolean;
    addedAt: string;
    completedAt?: string;
    emoji: string;
}

const BUCKET_KEY = "love-countdown-bucket";
const BUCKET_SUGGESTIONS = [
    { text: "Cùng ngắm hoàng hôn", emoji: "🌅" },
    { text: "Nấu ăn cùng nhau", emoji: "👨‍🍳" },
    { text: "Đi du lịch biển", emoji: "🏖️" },
    { text: "Chụp ảnh couple", emoji: "📸" },
    { text: "Xem phim sao rơi", emoji: "🌠" },
    { text: "Đi xe đạp đôi", emoji: "🚲" },
    { text: "Viết thư tay cho nhau", emoji: "✉️" },
    { text: "Học nấu 1 món mới", emoji: "🍝" },
    { text: "Đi cắm trại", emoji: "⛺" },
    { text: "Cùng tô màu/vẽ tranh", emoji: "🎨" },
    { text: "Đi karaoke", emoji: "🎤" },
    { text: "Ngắm sao đêm", emoji: "🌟" },
    { text: "Đi thử quán mới", emoji: "🍽️" },
    { text: "Chơi boardgame cùng nhau", emoji: "🎲" },
    { text: "Đi dạo công viên buổi sáng", emoji: "🌸" },
];

function loadBucketList(): BucketListItem[] {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(BUCKET_KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch {
                return [];
            }
        }
    }
    return [];
}

function saveBucketList(items: BucketListItem[]): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(BUCKET_KEY, JSON.stringify(items));
    }
}

export default function BucketList() {
    const [items, setItems] = useState<BucketListItem[]>([]);
    const [newText, setNewText] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [completedAnimation, setCompletedAnimation] = useState<string | null>(null);

    useEffect(() => {
        setItems(loadBucketList());
    }, []);

    const addItem = (text: string, emoji: string = "💕") => {
        if (!text.trim()) return;
        const newItem: BucketListItem = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            addedAt: new Date().toISOString(),
            emoji,
        };
        const updated = [...items, newItem];
        setItems(updated);
        saveBucketList(updated);
        setNewText("");
        setShowAdd(false);
        setShowSuggestions(false);
    };

    const toggleComplete = (id: string) => {
        const updated = items.map((item) => {
            if (item.id === id) {
                const completed = !item.completed;
                if (completed) {
                    setCompletedAnimation(id);
                    setTimeout(() => setCompletedAnimation(null), 1500);
                }
                return {
                    ...item,
                    completed,
                    completedAt: completed ? new Date().toISOString() : undefined,
                };
            }
            return item;
        });
        setItems(updated);
        saveBucketList(updated);
    };

    const removeItem = (id: string) => {
        const updated = items.filter((item) => item.id !== id);
        setItems(updated);
        saveBucketList(updated);
    };

    const completedCount = items.filter((i) => i.completed).length;
    const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow">
            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                🪣 Bucket List Tình Yêu
            </h3>

            {/* Progress Bar */}
            {items.length > 0 && (
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Tiến độ yêu nhau 💕</span>
                        <span>
                            {completedCount}/{items.length} ({Math.round(progress)}%)
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                        />
                    </div>
                </div>
            )}

            {/* Items List */}
            <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence>
                    {items.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-6"
                        >
                            <div className="text-4xl mb-2">📝</div>
                            <p className="text-gray-400 text-sm">
                                Chưa có mục nào! Thêm những điều muốn làm cùng nhau nào 💕
                            </p>
                        </motion.div>
                    )}
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, height: 0 }}
                            className="relative"
                        >
                            {/* Completion celebration */}
                            {completedAnimation === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0 flex items-center justify-center z-10 text-3xl"
                                >
                                    🎉
                                </motion.div>
                            )}
                            <div
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.completed
                                        ? "bg-green-50 border-green-200"
                                        : "bg-white border-gray-100 hover:border-pink-200"
                                    }`}
                            >
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => toggleComplete(item.id)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.completed
                                            ? "bg-green-400 border-green-400 text-white"
                                            : "border-gray-300 hover:border-pink-400"
                                        }`}
                                >
                                    {item.completed && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-xs"
                                        >
                                            ✓
                                        </motion.span>
                                    )}
                                </motion.button>
                                <span className="text-lg">{item.emoji}</span>
                                <span
                                    className={`flex-1 text-sm ${item.completed
                                            ? "line-through text-gray-400"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {item.text}
                                </span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-gray-300 hover:text-red-400 text-xs transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add New Item */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-3"
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addItem(newText)}
                                placeholder="Muốn làm gì cùng nhau?..."
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none"
                                autoFocus
                            />
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addItem(newText)}
                                disabled={!newText.trim()}
                                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl text-sm font-medium disabled:opacity-50"
                            >
                                ➕
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {showSuggestions && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-3"
                    >
                        <p className="text-xs text-gray-400 mb-2">Gợi ý cho bạn:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {BUCKET_SUGGESTIONS.filter(
                                (s) => !items.some((i) => i.text === s.text)
                            )
                                .slice(0, 8)
                                .map((suggestion) => (
                                    <motion.button
                                        key={suggestion.text}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addItem(suggestion.text, suggestion.emoji)}
                                        className="text-xs px-2.5 py-1.5 bg-white border border-gray-200 rounded-full hover:border-pink-300 hover:bg-pink-50 text-gray-600 transition-all"
                                    >
                                        {suggestion.emoji} {suggestion.text}
                                    </motion.button>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                        setShowAdd(!showAdd);
                        setShowSuggestions(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${showAdd
                            ? "bg-gray-100 text-gray-600"
                            : "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                        }`}
                >
                    {showAdd ? "Đóng" : "✏️ Thêm mục"}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                        setShowSuggestions(!showSuggestions);
                        setShowAdd(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${showSuggestions
                            ? "bg-gray-100 text-gray-600"
                            : "bg-white border-2 border-pink-200 text-pink-500 hover:bg-pink-50"
                        }`}
                >
                    {showSuggestions ? "Đóng" : "💡 Gợi ý"}
                </motion.button>
            </div>
        </div>
    );
}
