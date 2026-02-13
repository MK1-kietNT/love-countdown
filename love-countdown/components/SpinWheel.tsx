"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpinWheelProps {
    title?: string;
    category?: "food" | "date";
}

const DEFAULT_FOOD_OPTIONS = [
    "Phở 🍜",
    "Bún bò 🥢",
    "Cơm tấm 🍚",
    "Pizza 🍕",
    "Sushi 🍣",
    "Lẩu 🍲",
    "BBQ 🥩",
    "Gà rán 🍗",
];

const DEFAULT_DATE_OPTIONS = [
    "Xem phim 🎬",
    "Cafe ☕",
    "Công viên 🌳",
    "Shopping 🛍️",
    "Karaoke 🎤",
    "Arcade 🎮",
    "Bảo tàng 🏛️",
    "Đi dạo 🚶",
];

const COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFE66D",
    "#95E1D3",
    "#F38181",
    "#AA96DA",
    "#FCB96F",
    "#A8E6CF",
    "#DCD6F7",
    "#F7D6E0",
    "#B5EAD7",
    "#C7CEEA",
];

export default function SpinWheel({ title, category = "food" }: SpinWheelProps) {
    const [options, setOptions] = useState<string[]>([]);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newOption, setNewOption] = useState("");
    const [showResult, setShowResult] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    const storageKey = category === "food" ? "spinWheel_food" : "spinWheel_date";
    const defaultOptions = category === "food" ? DEFAULT_FOOD_OPTIONS : DEFAULT_DATE_OPTIONS;
    const displayTitle = title || (category === "food" ? "Hôm nay ăn gì? 🍽️" : "Hẹn hò ở đâu? 💕");

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setOptions(JSON.parse(saved));
        } else {
            setOptions(defaultOptions);
        }
    }, [storageKey]);

    const saveOptions = (newOptions: string[]) => {
        setOptions(newOptions);
        localStorage.setItem(storageKey, JSON.stringify(newOptions));
        // Reset rotation to 0 when options change to ensure correct calculation
        setRotation(0);
    };

    const handleAddOption = () => {
        if (newOption.trim() && !options.includes(newOption.trim())) {
            saveOptions([...options, newOption.trim()]);
            setNewOption("");
            setShowAddForm(false);
        }
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        saveOptions(newOptions);
    };

    const handleResetOptions = () => {
        saveOptions(defaultOptions);
    };

    const spinWheel = () => {
        if (isSpinning || options.length < 2) return;

        setIsSpinning(true);
        setShowResult(false);
        setResult(null);

        // Random rotation: 5-10 full rotations + random position
        const extraRotations = (5 + Math.random() * 5) * 360;
        const randomIndex = Math.floor(Math.random() * options.length);
        const segmentAngle = 360 / options.length;
        const targetAngle = segmentAngle * randomIndex + segmentAngle / 2;
        const finalRotation = rotation + extraRotations + (360 - targetAngle);

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setResult(options[randomIndex]);
            setShowResult(true);
        }, 4000);
    };

    const getSegmentPath = (index: number, total: number, radius: number) => {
        const angle = 360 / total;
        const startAngle = (index * angle - 90) * (Math.PI / 180);
        const endAngle = ((index + 1) * angle - 90) * (Math.PI / 180);

        const x1 = radius + radius * Math.cos(startAngle);
        const y1 = radius + radius * Math.sin(startAngle);
        const x2 = radius + radius * Math.cos(endAngle);
        const y2 = radius + radius * Math.sin(endAngle);

        const largeArc = angle > 180 ? 1 : 0;

        return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    const getTextPosition = (index: number, total: number, radius: number) => {
        const angle = 360 / total;
        const midAngle = ((index + 0.5) * angle - 90) * (Math.PI / 180);
        const textRadius = radius * 0.65;

        return {
            x: radius + textRadius * Math.cos(midAngle),
            y: radius + textRadius * Math.sin(midAngle),
            rotation: (index + 0.5) * angle,
        };
    };

    const wheelSize = 300;
    const radius = wheelSize / 2;

    return (
        <div className="glass-card rounded-3xl p-6 love-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gradient flex items-center gap-2">
                    🎯 {displayTitle}
                </h3>
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full flex items-center justify-center text-lg shadow-md"
                        title="Thêm lựa chọn"
                    >
                        +
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleResetOptions}
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm shadow-md"
                        title="Reset về mặc định"
                    >
                        🔄
                    </motion.button>
                </div>
            </div>

            {/* Add Option Form */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                                placeholder="Nhập lựa chọn mới..."
                                className="flex-1 px-4 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddOption}
                                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-medium"
                            >
                                Thêm
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Options List - Editable */}
            <div className="mb-4 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                    {options.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        >
                            <span>{option}</span>
                            <button
                                onClick={() => handleRemoveOption(index)}
                                className="ml-1 w-4 h-4 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center text-xs transition-colors"
                            >
                                ×
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Wheel Container */}
            <div className="flex flex-col items-center">
                {/* Pointer */}
                <div className="relative z-10 -mb-4">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-pink-500 drop-shadow-lg" />
                </div>

                {/* Wheel */}
                <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
                    <motion.div
                        ref={wheelRef}
                        animate={{ rotate: rotation }}
                        transition={{
                            duration: 4,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="w-full h-full rounded-full shadow-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                            boxShadow: "0 0 30px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.5)",
                        }}
                    >
                        <svg
                            width={wheelSize}
                            height={wheelSize}
                            className="w-full h-full"
                        >
                            {options.map((option, index) => {
                                const textPos = getTextPosition(index, options.length, radius);
                                return (
                                    <g key={index}>
                                        <path
                                            d={getSegmentPath(index, options.length, radius)}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x={textPos.x}
                                            y={textPos.y}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="white"
                                            fontSize={options.length > 8 ? "10" : "12"}
                                            fontWeight="bold"
                                            transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                                        >
                                            {option.length > 10 ? option.substring(0, 10) + "..." : option}
                                        </text>
                                    </g>
                                );
                            })}
                            {/* Center circle */}
                            <circle
                                cx={radius}
                                cy={radius}
                                r={30}
                                fill="white"
                                stroke="#f0f0f0"
                                strokeWidth="3"
                            />
                            <text
                                x={radius}
                                y={radius}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="20"
                            >
                                {category === "food" ? "🍽️" : "💕"}
                            </text>
                        </svg>
                    </motion.div>
                </div>

                {/* Spin Button */}
                <motion.button
                    whileHover={{ scale: isSpinning ? 1 : 1.05 }}
                    whileTap={{ scale: isSpinning ? 1 : 0.95 }}
                    onClick={spinWheel}
                    disabled={isSpinning || options.length < 2}
                    className={`mt-6 px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all ${isSpinning || options.length < 2
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:shadow-xl"
                        }`}
                >
                    {isSpinning ? (
                        <span className="flex items-center gap-2">
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                🎰
                            </motion.span>
                            Đang quay...
                        </span>
                    ) : (
                        <span>🎯 Quay ngay!</span>
                    )}
                </motion.button>

                {options.length < 2 && (
                    <p className="text-sm text-gray-400 mt-2">Cần ít nhất 2 lựa chọn để quay</p>
                )}
            </div>

            {/* Result Modal */}
            <AnimatePresence>
                {showResult && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowResult(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-6xl mb-4"
                            >
                                🎉
                            </motion.div>
                            <h4 className="text-xl font-bold text-gray-700 mb-2">
                                {category === "food" ? "Hôm nay ăn:" : "Hẹn hò tại:"}
                            </h4>
                            <p className="text-3xl font-bold text-gradient mb-6">{result}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowResult(false)}
                                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-medium"
                            >
                                Tuyệt vời! 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
