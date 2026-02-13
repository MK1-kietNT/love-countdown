"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMISE_KEY = "love-countdown-promises";

interface LovePromise {
    id: string;
    from: "boy" | "girl";
    text: string;
    createdAt: string;
    pinky: boolean; // pinky promise (extra important)
}

interface PromiseWallProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

function loadPromises(): LovePromise[] {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(PROMISE_KEY);
        if (data) {
            try { return JSON.parse(data); } catch { return []; }
        }
    }
    return [];
}

function savePromises(promises: LovePromise[]): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(PROMISE_KEY, JSON.stringify(promises));
    }
}

const promiseSuggestions = [
    "Luôn lắng nghe khi bồ buồn 🫶",
    "Không bao giờ đi ngủ khi còn giận nhau 🌙",
    "Mỗi tuần ít nhất 1 lần date 📅",
    "Luôn trung thực với nhau 💎",
    "Nói yêu nhau mỗi ngày 💕",
    "Cùng đi du lịch mỗi năm ✈️",
    "Cùng nấu ăn ít nhất 1 lần/tháng 👨‍🍳",
    "Support giấc mơ của nhau 🌟",
];

export default function PromiseWall({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: PromiseWallProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [promises, setPromises] = useState<LovePromise[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newText, setNewText] = useState("");
    const [addFrom, setAddFrom] = useState<"boy" | "girl">("boy");
    const [isPinky, setIsPinky] = useState(false);
    const [showPinkyAnimation, setShowPinkyAnimation] = useState(false);

    useEffect(() => {
        setPromises(loadPromises());
    }, []);

    const addPromise = (text?: string) => {
        const promiseText = text || newText;
        if (!promiseText.trim()) return;

        const newPromise: LovePromise = {
            id: Date.now().toString(),
            from: addFrom,
            text: promiseText.trim(),
            createdAt: new Date().toISOString(),
            pinky: isPinky,
        };

        if (isPinky) {
            setShowPinkyAnimation(true);
            setTimeout(() => setShowPinkyAnimation(false), 2000);
        }

        const updated = [newPromise, ...promises];
        setPromises(updated);
        savePromises(updated);
        setNewText("");
        setIsPinky(false);
        setShowAdd(false);
    };

    const removePromise = (id: string) => {
        const updated = promises.filter((p) => p.id !== id);
        setPromises(updated);
        savePromises(updated);
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow relative overflow-hidden">
            {/* Pinky Promise Animation */}
            <AnimatePresence>
                {showPinkyAnimation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.3, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 1.5 }}
                            className="text-center"
                        >
                            <div className="text-6xl mb-2">🤙</div>
                            <p className="font-bold text-gradient text-lg">Pinky Promise!</p>
                            <p className="text-gray-500 text-sm">Lời hứa ngón út, thiêng liêng lắm 💕</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                🤝 Bức Tường Lời Hứa
            </h3>

            {/* Promises Display */}
            <div className="space-y-2 mb-4 max-h-[280px] overflow-y-auto pr-1">
                {promises.length === 0 && (
                    <div className="text-center py-6">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-4xl mb-2"
                        >
                            🤙
                        </motion.div>
                        <p className="text-gray-400 text-sm">
                            Viết lời hứa cho nhau nha! 💕
                        </p>
                    </div>
                )}

                <AnimatePresence>
                    {promises.map((promise) => (
                        <motion.div
                            key={promise.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`relative p-3 rounded-xl border-2 ${promise.pinky
                                    ? "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200"
                                    : promise.from === "boy"
                                        ? "bg-blue-50 border-blue-100"
                                        : "bg-pink-50 border-pink-100"
                                }`}
                        >
                            {promise.pinky && (
                                <span className="absolute -top-2 -right-1 text-lg">🤙</span>
                            )}
                            <div className="flex items-start gap-2">
                                <span className="text-sm mt-0.5">
                                    {promise.from === "boy" ? "👦" : "👧"}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{promise.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        — {promise.from === "boy" ? displayBoyName : displayGirlName},{" "}
                                        {new Date(promise.createdAt).toLocaleDateString("vi-VN")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removePromise(promise.id)}
                                    className="text-gray-300 hover:text-red-400 text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Promise */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-3 space-y-3"
                    >
                        {/* From selector */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setAddFrom("boy")}
                                className={`flex-1 py-1.5 text-xs rounded-lg transition-all ${addFrom === "boy"
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "bg-gray-50 text-gray-500"
                                    }`}
                            >
                                👦 {displayBoyName}
                            </button>
                            <button
                                onClick={() => setAddFrom("girl")}
                                className={`flex-1 py-1.5 text-xs rounded-lg transition-all ${addFrom === "girl"
                                        ? "bg-pink-100 text-pink-600 font-semibold"
                                        : "bg-gray-50 text-gray-500"
                                    }`}
                            >
                                👧 {displayGirlName}
                            </button>
                        </div>

                        <textarea
                            value={newText}
                            onChange={(e) => setNewText(e.target.value.slice(0, 150))}
                            placeholder="Viết lời hứa..."
                            className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none resize-none"
                            rows={2}
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isPinky}
                                    onChange={(e) => setIsPinky(e.target.checked)}
                                    className="w-4 h-4 accent-pink-500"
                                />
                                <span className="text-xs text-gray-500">🤙 Pinky promise</span>
                            </label>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addPromise()}
                                disabled={!newText.trim()}
                                className="px-4 py-1.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                            >
                                Hứa! 💕
                            </motion.button>
                        </div>

                        {/* Quick suggestions */}
                        <div className="flex flex-wrap gap-1">
                            {promiseSuggestions
                                .filter((s) => !promises.some((p) => p.text === s))
                                .slice(0, 4)
                                .map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => addPromise(s)}
                                        className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-full hover:border-pink-300 text-gray-500 transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                        </div>
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
                {showAdd ? "Đóng" : "✍️ Viết lời hứa"}
            </motion.button>
        </div>
    );
}
