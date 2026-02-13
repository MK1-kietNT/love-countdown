"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRUTH_KEY = "love-countdown-truth";

interface TruthOrDareProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

const truthQuestions = [
    "Khoảnh khắc nào bạn biết mình đã yêu người kia? 💕",
    "Điều gì ở người kia khiến bạn thấy annoying nhất? 😤",
    "Bạn hay nhắn tin gì cho bạn thân về người kia? 📱",
    "Kỷ niệm nào của cả hai khiến bạn nhớ nhất? 💭",
    "Có bao giờ bạn ghen chưa? Kể đi! 😏",
    "Nếu được thay đổi 1 thứ ở người kia, đó là gì? 🤔",
    "Lần cuối bạn khóc vì người kia là khi nào? 😢",
    "Bạn có crush ai khác trước khi quen người kia không? 👀",
    "Điều gì khiến bạn yêu ngày càng nhiều? 🥰",
    "Secret mà bạn chưa bao giờ nói cho người kia? 🤫",
    "Bạn từng nằm mơ thấy người kia chưa? Mơ gì? 😴",
    "Rating người kia từ 1-10 về độ cute? 💖",
    "Bạn nhớ nhất mùi hương gì của người kia? 🌸",
    "Câu nói nào của người kia khiến bạn nhớ mãi? 💬",
    "Lần đầu gặp, bạn nghĩ gì về người kia? 🤭",
];

const dareActions = [
    "Gọi video cho người kia ngay bây giờ và nói 'yêu bồ!' 📞",
    "Đăng story tag người kia với caption dễ thương 📸",
    "Gửi voice message hát 1 câu hát yêu thích 🎤",
    "Nhắn tin 'Anh/Em nhớ bồ' cho người kia 💌",
    "Selfie biểu cảm xấu nhất gửi cho người kia 🤪",
    "Kể 5 điều yêu ở người kia trong 30 giây ⏱️",
    "Đổi avatar thành ảnh couple trong 24h 📷",
    "Viết 1 bài thơ ngắn tặng người kia (4 câu) ✍️",
    "Nhắn tin xin lỗi 1 lần đã làm người kia buồn 🥺",
    "Hứa 1 điều sẽ làm cho người kia trong tuần này 🤝",
    "Gửi playlist nhạc gợi nhớ đến người kia 🎵",
    "Vẽ portrait người kia bằng có 1 phút 🎨",
    "Kể 1 kỷ niệm embarrassing cho người kia nghe 😅",
    "Nhắn tin cho mẹ người kia hỏi thăm 👩",
    "Đặt tên gọi mới cho người kia ngay và luôn 🏷️",
];

interface HistoryItem {
    type: "truth" | "dare";
    text: string;
    answeredBy: string;
    timestamp: string;
}

export default function TruthOrDare({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: TruthOrDareProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [currentCard, setCurrentCard] = useState<{
        type: "truth" | "dare";
        text: string;
    } | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<"boy" | "girl">("boy");
    const [isRevealing, setIsRevealing] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(TRUTH_KEY);
            if (data) {
                try {
                    setHistory(JSON.parse(data));
                } catch { /* ignore */ }
            }
        }
    }, []);

    const pickCard = (type: "truth" | "dare") => {
        setIsRevealing(true);
        setCurrentCard(null);

        setTimeout(() => {
            const list = type === "truth" ? truthQuestions : dareActions;
            const text = list[Math.floor(Math.random() * list.length)];
            setCurrentCard({ type, text });
            setIsRevealing(false);

            // Save to history
            const newItem: HistoryItem = {
                type,
                text,
                answeredBy: currentPlayer === "boy" ? displayBoyName : displayGirlName,
                timestamp: new Date().toISOString(),
            };
            const updated = [newItem, ...history].slice(0, 30);
            setHistory(updated);
            if (typeof window !== "undefined") {
                localStorage.setItem(TRUTH_KEY, JSON.stringify(updated));
            }
        }, 800);
    };

    const nextTurn = () => {
        setCurrentCard(null);
        setCurrentPlayer((prev) => (prev === "boy" ? "girl" : "boy"));
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow">
            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                🎭 Thật Hay Thách
            </h3>

            {/* Current Player */}
            <div className="text-center mb-4">
                <motion.div
                    key={currentPlayer}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${currentPlayer === "boy"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-pink-100 text-pink-600"
                        }`}
                >
                    <span>{currentPlayer === "boy" ? "👦" : "👧"}</span>
                    <span>
                        Lượt của{" "}
                        {currentPlayer === "boy" ? displayBoyName : displayGirlName}
                    </span>
                </motion.div>
            </div>

            {/* Card Display Area */}
            <div className="min-h-[160px] flex items-center justify-center mb-4">
                <AnimatePresence mode="wait">
                    {isRevealing && (
                        <motion.div
                            key="revealing"
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl"
                        >
                            🃏
                        </motion.div>
                    )}

                    {!currentCard && !isRevealing && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="text-5xl mb-3"
                            >
                                🎭
                            </motion.div>
                            <p className="text-sm text-gray-400">
                                Chọn Thật hoặc Thách để bắt đầu!
                            </p>
                        </motion.div>
                    )}

                    {currentCard && !isRevealing && (
                        <motion.div
                            key="card"
                            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`w-full p-5 rounded-2xl text-center ${currentCard.type === "truth"
                                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200"
                                    : "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200"
                                }`}
                        >
                            <div className="text-3xl mb-2">
                                {currentCard.type === "truth" ? "💬" : "🔥"}
                            </div>
                            <span
                                className={`text-xs font-bold uppercase tracking-wider ${currentCard.type === "truth"
                                        ? "text-blue-400"
                                        : "text-orange-400"
                                    }`}
                            >
                                {currentCard.type === "truth" ? "THẬT" : "THÁCH"}
                            </span>
                            <p className="text-gray-700 mt-2 font-medium">
                                {currentCard.text}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            {!currentCard ? (
                <div className="grid grid-cols-2 gap-3">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => pickCard("truth")}
                        disabled={isRevealing}
                        className="py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold rounded-xl disabled:opacity-50"
                    >
                        💬 Thật
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => pickCard("dare")}
                        disabled={isRevealing}
                        className="py-3 px-4 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-xl disabled:opacity-50"
                    >
                        🔥 Thách
                    </motion.button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={nextTurn}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-xl"
                    >
                        ✅ Xong! Lượt tiếp
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => pickCard(currentCard.type)}
                        className="py-3 px-4 bg-white border-2 border-gray-200 text-gray-600 rounded-xl"
                    >
                        🔄
                    </motion.button>
                </div>
            )}

            {/* History Toggle */}
            {history.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="text-xs text-gray-400 hover:text-gray-600 w-full text-center"
                    >
                        {showHistory ? "Ẩn lịch sử ▲" : `Xem lịch sử (${history.length}) ▼`}
                    </button>
                    <AnimatePresence>
                        {showHistory && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-2 space-y-1 max-h-[150px] overflow-y-auto"
                            >
                                {history.map((item, i) => (
                                    <div
                                        key={i}
                                        className="text-xs p-2 bg-gray-50 rounded-lg flex gap-2"
                                    >
                                        <span>
                                            {item.type === "truth" ? "💬" : "🔥"}
                                        </span>
                                        <span className="text-gray-600 flex-1 truncate">
                                            {item.text}
                                        </span>
                                        <span className="text-gray-400">{item.answeredBy}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
