"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoveQuizProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

interface QuizQuestion {
    question: string;
    options: string[];
    // no "correct" answer — it's about knowing each other
}

const quizTemplates = [
    {
        question: "Món ăn yêu thích của {partner} là gì?",
        options: ["Phở 🍜", "Bún bò 🥢", "Cơm tấm 🍚", "Lẩu 🍲"],
    },
    {
        question: "{partner} thích làm gì khi buồn?",
        options: ["Nghe nhạc 🎵", "Xem phim 🎬", "Ngủ 😴", "Ăn vặt 🍫"],
    },
    {
        question: "Màu sắc yêu thích của {partner}?",
        options: ["Hồng 💗", "Xanh dương 💙", "Tím 💜", "Đen 🖤"],
    },
    {
        question: "{partner} sợ nhất điều gì?",
        options: ["Gián 🪳", "Ma 👻", "Mất điện thoại 📱", "Bị bơ 🥶"],
    },
    {
        question: "Khi hẹn hò, {partner} muốn đi đâu nhất?",
        options: ["Cafe ☕", "Rạp phim 🎬", "Công viên 🌳", "Shopping 🛍️"],
    },
    {
        question: "{partner} thường ngủ lúc mấy giờ?",
        options: ["Trước 10h 😴", "10-11h 🌙", "11h-12h 🦉", "Sau 12h 🌌"],
    },
    {
        question: "Kiểu dáng {partner} thích mặc nhất?",
        options: ["Năng động 🏃", "Dễ thương 🎀", "Cool ngầu 😎", "Đơn giản 👕"],
    },
    {
        question: "{partner} thích loại nhạc nào?",
        options: ["Ballad 🎶", "K-Pop 🇰🇷", "US-UK 🎤", "Rap 🎧"],
    },
    {
        question: "Biểu cảm nào giống {partner} nhất khi giận?",
        options: ["Cold 🥶", "Hờn dỗi 😤", "Im lặng 😶", "Nói nhiều 🗣️"],
    },
    {
        question: "{partner} thích pet nào nhất?",
        options: ["Chó 🐕", "Mèo 🐱", "Hamster 🐹", "Cá 🐟"],
    },
];

export default function LoveQuiz({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: LoveQuizProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [gameState, setGameState] = useState<"idle" | "playing" | "result">("idle");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [answeredBy, setAnsweredBy] = useState<"boy" | "girl">("boy");
    const [showConfetti, setShowConfetti] = useState(false);

    const startQuiz = (who: "boy" | "girl") => {
        setAnsweredBy(who);
        const partnerName = who === "boy" ? displayGirlName : displayBoyName;
        // Shuffle and pick 5 questions
        const shuffled = [...quizTemplates]
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map((q) => ({
                ...q,
                question: q.question.replace("{partner}", partnerName),
                options: [...q.options].sort(() => Math.random() - 0.5),
            }));
        setQuestions(shuffled);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setGameState("playing");
    };

    const selectAnswer = (answer: string) => {
        const newAnswers = [...selectedAnswers, answer];
        setSelectedAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 400);
        } else {
            setTimeout(() => {
                setGameState("result");
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }, 400);
        }
    };

    const getResultMessage = () => {
        const messages = [
            "Hai đứa hiểu nhau quá đi! 💕",
            "Trả lời xong rồi, hỏi người kia xem đúng không nha! 😍",
            "Perfect couple! Hỏi bồ kiểm tra kết quả nè 🥰",
            "Wow, biết nhau rõ lắm nha! 💖",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow relative overflow-hidden">
            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: "50%",
                                y: "50%",
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                                scale: [0, 1, 0.5],
                                opacity: [1, 1, 0],
                                rotate: Math.random() * 720,
                            }}
                            transition={{ duration: 2, delay: i * 0.05 }}
                            className="absolute text-lg"
                        >
                            {["💕", "✨", "🎉", "💖", "🌸", "⭐"][i % 6]}
                        </motion.div>
                    ))}
                </div>
            )}

            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                🎯 Quiz Tình Yêu
            </h3>

            <AnimatePresence mode="wait">
                {/* Idle State */}
                {gameState === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-4xl"
                        >
                            🎯
                        </motion.div>
                        <p className="text-sm text-gray-500">
                            Bạn hiểu người kia đến mức nào? Hãy thử nào! 💕
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => startQuiz("boy")}
                                className="py-3 px-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-xl text-sm"
                            >
                                👦 {displayBoyName} trả lời
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => startQuiz("girl")}
                                className="py-3 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl text-sm"
                            >
                                👧 {displayGirlName} trả lời
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Playing State */}
                {gameState === "playing" && questions.length > 0 && (
                    <motion.div
                        key={`question-${currentQuestion}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        {/* Progress */}
                        <div className="flex gap-1">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 h-1.5 rounded-full transition-all ${i <= currentQuestion
                                            ? "bg-gradient-to-r from-pink-400 to-purple-400"
                                            : "bg-gray-200"
                                        }`}
                                />
                            ))}
                        </div>

                        <p className="text-sm text-gray-400">
                            Câu {currentQuestion + 1}/{questions.length}
                        </p>
                        <p className="font-semibold text-gray-700">
                            {questions[currentQuestion].question}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {questions[currentQuestion].options.map((option, i) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => selectAnswer(option)}
                                    className={`p-3 text-sm rounded-xl border-2 transition-all ${selectedAnswers[currentQuestion] === option
                                            ? "border-pink-400 bg-pink-50 text-pink-600"
                                            : "border-gray-200 bg-white hover:border-pink-200 text-gray-700"
                                        }`}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Result State */}
                {gameState === "result" && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-5xl"
                        >
                            🏆
                        </motion.div>
                        <h4 className="font-bold text-gradient text-lg">
                            Hoàn thành! 🎉
                        </h4>
                        <p className="text-gray-500 text-sm">{getResultMessage()}</p>

                        {/* Show answers */}
                        <div className="space-y-2 text-left">
                            {questions.map((q, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-2 text-xs">
                                    <p className="text-gray-500">{q.question}</p>
                                    <p className="text-pink-500 font-semibold mt-1">
                                        → {selectedAnswers[i]}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setGameState("idle")}
                            className="py-2 px-6 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl text-sm"
                        >
                            🔄 Chơi lại
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
