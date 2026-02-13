"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartSenderProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

interface FloatingHeart {
    id: number;
    x: number;
    y: number;
    emoji: string;
    size: number;
    rotation: number;
}

const heartEmojis = ["❤️", "💕", "💗", "💖", "💝", "💓", "💘", "💞", "🫶", "💌", "😘", "🥰"];

export default function HeartSender({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: HeartSenderProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [hearts, setHearts] = useState<FloatingHeart[]>([]);
    const [totalSent, setTotalSent] = useState(0);
    const [sender, setSender] = useState<"boy" | "girl">("boy");
    const [isHolding, setIsHolding] = useState(false);
    const [comboCount, setComboCount] = useState(0);
    const [showMilestone, setShowMilestone] = useState<string | null>(null);

    const spawnHeart = useCallback(() => {
        const newHeart: FloatingHeart = {
            id: Date.now() + Math.random(),
            x: 30 + Math.random() * 40,
            y: 80,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            size: 1 + Math.random() * 1.5,
            rotation: -30 + Math.random() * 60,
        };

        setHearts((prev) => [...prev.slice(-30), newHeart]);
        setTotalSent((prev) => {
            const newTotal = prev + 1;
            // Check milestones
            if (newTotal === 10) {
                setShowMilestone("Yêu 10 lần rồi! 🥰");
                setTimeout(() => setShowMilestone(null), 2000);
            } else if (newTotal === 50) {
                setShowMilestone("50 trái tim! Yêu quá đi 💖");
                setTimeout(() => setShowMilestone(null), 2000);
            } else if (newTotal === 100) {
                setShowMilestone("100 tim! True love! 💕🔥");
                setTimeout(() => setShowMilestone(null), 2000);
            }
            return newTotal;
        });
        setComboCount((prev) => prev + 1);

        // Remove heart after animation
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 2000);
    }, []);

    const handlePointerDown = () => {
        setIsHolding(true);
        setComboCount(0);
        spawnHeart();
    };

    const handlePointerUp = () => {
        setIsHolding(false);
        if (comboCount > 5) {
            setShowMilestone(`Combo x${comboCount}! 🔥`);
            setTimeout(() => setShowMilestone(null), 1500);
        }
        setComboCount(0);
    };

    // Continuous spawn while holding
    const handlePointerMove = () => {
        if (isHolding) {
            spawnHeart();
        }
    };

    const getMessage = () => {
        if (totalSent === 0) return "Nhấn hoặc giữ nút để gửi trái tim! 💕";
        if (totalSent < 10) return `Đã gửi ${totalSent} trái tim 💗`;
        if (totalSent < 50) return `${totalSent} trái tim! Dễ thương quá! 💖`;
        if (totalSent < 100) return `${totalSent} tim! Yêu nhau nhiều hen! 🥰`;
        return `${totalSent} trái tim! LOVE IS IN THE AIR! 💕🔥`;
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow relative overflow-hidden">
            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                💘 Gửi Tim Cho Bồ
            </h3>

            {/* Sender toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setSender("boy")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${sender === "boy"
                            ? "bg-blue-100 text-blue-600 font-semibold border-2 border-blue-200"
                            : "bg-gray-50 text-gray-500 border-2 border-transparent"
                        }`}
                >
                    👦 {displayBoyName}
                </button>
                <button
                    onClick={() => setSender("girl")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${sender === "girl"
                            ? "bg-pink-100 text-pink-600 font-semibold border-2 border-pink-200"
                            : "bg-gray-50 text-gray-500 border-2 border-transparent"
                        }`}
                >
                    👧 {displayGirlName}
                </button>
            </div>

            {/* Heart Area */}
            <div className="relative h-48 bg-gradient-to-t from-pink-50 to-transparent rounded-2xl mb-4 overflow-hidden">
                {/* Floating hearts */}
                <AnimatePresence>
                    {hearts.map((heart) => (
                        <motion.div
                            key={heart.id}
                            initial={{
                                x: `${heart.x}%`,
                                y: "100%",
                                opacity: 1,
                                scale: 0,
                            }}
                            animate={{
                                y: "-20%",
                                opacity: [1, 1, 0],
                                scale: [0, heart.size, heart.size * 0.8],
                                x: `${heart.x + (Math.random() - 0.5) * 30}%`,
                                rotate: heart.rotation,
                            }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute text-2xl pointer-events-none"
                            style={{ left: 0, transform: "translateX(-50%)" }}
                        >
                            {heart.emoji}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Milestone popup */}
                <AnimatePresence>
                    {showMilestone && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm font-bold text-gradient">
                                {showMilestone}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Combo indicator */}
                {isHolding && comboCount > 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                    >
                        x{comboCount} 🔥
                    </motion.div>
                )}

                {/* Center message */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-gray-400 text-xs text-center px-4">
                        {sender === "boy" ? displayBoyName : displayGirlName} gửi cho{" "}
                        {sender === "boy" ? displayGirlName : displayBoyName}
                    </p>
                </div>
            </div>

            {/* Big Heart Button */}
            <div className="flex flex-col items-center gap-3">
                <motion.button
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    whileTap={{ scale: 0.85 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-300/50 active:shadow-pink-400/70 transition-shadow select-none touch-none"
                >
                    <motion.span
                        animate={isHolding ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                        transition={{ repeat: isHolding ? Infinity : 0, duration: 0.3 }}
                        className="text-4xl"
                    >
                        💕
                    </motion.span>
                </motion.button>
                <p className="text-xs text-gray-500 text-center">{getMessage()}</p>
            </div>
        </div>
    );
}
