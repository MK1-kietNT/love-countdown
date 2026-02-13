"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoveLetterProps {
    boyName: string;
    girlName: string;
    boyNickname?: string;
    girlNickname?: string;
}

const letterTemplates = [
    {
        greeting: "Gửi {to} yêu dấu,",
        body: "Mỗi ngày trôi qua, {from} càng thêm nhận ra rằng {to} là điều tuyệt vời nhất đã đến trong cuộc đời {from}. Cảm ơn {to} vì luôn ở đây, vì nụ cười ấy, vì tất cả những khoảnh khắc bên nhau.",
        closing: "Yêu {to} nhiều lắm 💕",
        emoji: "💌",
    },
    {
        greeting: "Hey {to}!",
        body: "Biết không, mỗi khi nghĩ về {to}, {from} lại thấy tim đập nhanh hơn. {to} giống như ly trà sữa ngon nhất mà {from} từng uống vậy — ngọt ngào, khó quên, và luôn muốn thêm!",
        closing: "Nhớ {to} muốn xỉu! 🧋💗",
        emoji: "🧋",
    },
    {
        greeting: "Dear {to},",
        body: "Nếu mỗi lần {from} nhớ {to} là một ngôi sao, thì bầu trời sẽ sáng rực mỗi đêm. {to} không chỉ là người {from} yêu, mà còn là người bạn thân nhất, là nhà, là tất cả.",
        closing: "Mãi yêu {to} nha! ⭐💖",
        emoji: "⭐",
    },
    {
        greeting: "{to} ơi,",
        body: "Hôm nay {from} muốn nói với {to} rằng: cảm ơn {to} đã kiên nhẫn với {from}, đã chấp nhận những lúc {from} bực bội vô lý, và vẫn luôn nắm tay {from} đi qua mọi thứ.",
        closing: "Có {to} là có cả thế giới! 🌍💕",
        emoji: "🌍",
    },
    {
        greeting: "To: {to} 💕",
        body: "{from} không giỏi nói lời hoa mỹ, nhưng {from} muốn {to} biết: {to} là lý do {from} cười nhiều hơn, là lý do {from} muốn cố gắng mỗi ngày, và là người {from} muốn đi cùng đến cuối.",
        closing: "Love you 3000! 🫶",
        emoji: "🫶",
    },
    {
        greeting: "Bồ {to} à,",
        body: "Nếu được chọn lại, {from} vẫn sẽ chọn {to}. Một nghìn lần, một triệu lần, hay bao nhiêu lần cũng vậy. Vì {to} là định nghĩa của hạnh phúc trong cuộc đời {from}.",
        closing: "{from} sẽ luôn ở đây! 💗🏠",
        emoji: "🏠",
    },
    {
        greeting: "{to} nè!",
        body: "Lúc xa {to}, {from} nhớ {to} nhiều lắm. Nhớ cái cách {to} hay cười, nhớ vẻ mặt {to} khi giận dỗi, nhớ cả mùi hương quen thuộc khi ở bên {to}. Mau gặp nhau đi nha!",
        closing: "Nhớ {to} cả ngày! 🥺💕",
        emoji: "🥺",
    },
    {
        greeting: "Dear {to} yêu quý,",
        body: "Tình yêu không phải là hoàn hảo, nhưng với {to}, {from} học được cách yêu thương thật lòng. Cảm ơn {to} đã là chính mình, vì đó là phiên bản tuyệt vời nhất rồi.",
        closing: "Cùng nhau mãi nhé! 💖✨",
        emoji: "✨",
    },
];

export default function LoveLetter({
    boyName,
    girlName,
    boyNickname,
    girlNickname,
}: LoveLetterProps) {
    const displayBoyName = boyNickname || boyName;
    const displayGirlName = girlNickname || girlName;

    const [currentLetter, setCurrentLetter] = useState<{ greeting: string; body: string; closing: string; emoji: string } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [fromWho, setFromWho] = useState<"boy" | "girl">("boy");
    const [copied, setCopied] = useState(false);

    const generateLetter = (from: "boy" | "girl") => {
        setFromWho(from);
        setIsGenerating(true);
        setCopied(false);

        const fromName = from === "boy" ? displayBoyName : displayGirlName;
        const toName = from === "boy" ? displayGirlName : displayBoyName;

        // Pick a random template
        setTimeout(() => {
            const template = letterTemplates[Math.floor(Math.random() * letterTemplates.length)];
            setCurrentLetter({
                greeting: template.greeting.replace(/{to}/g, toName).replace(/{from}/g, fromName),
                body: template.body.replace(/{to}/g, toName).replace(/{from}/g, fromName),
                closing: template.closing.replace(/{to}/g, toName).replace(/{from}/g, fromName),
                emoji: template.emoji,
            });
            setIsGenerating(false);
        }, 1200);
    };

    const copyLetter = () => {
        if (!currentLetter) return;
        const text = `${currentLetter.greeting}\n\n${currentLetter.body}\n\n${currentLetter.closing}`;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="glass-card rounded-2xl p-5 love-shadow">
            <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
                💌 Thư Tình Ngẫu Nhiên
            </h3>

            {/* Sender Selection */}
            {!currentLetter && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-4xl"
                    >
                        💌
                    </motion.div>
                    <p className="text-sm text-gray-500">
                        Tạo một lá thư tình dễ thương gửi cho người ấy 💕
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => generateLetter("boy")}
                            className="py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-medium rounded-xl text-sm"
                        >
                            💙 {displayBoyName} gửi
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => generateLetter("girl")}
                            className="py-3 px-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium rounded-xl text-sm"
                        >
                            💗 {displayGirlName} gửi
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Generating Animation */}
            {isGenerating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 space-y-3"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-5xl"
                    >
                        ✍️
                    </motion.div>
                    <p className="text-gray-500 text-sm">Đang viết thư tình...</p>
                    <div className="flex justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-2 h-2 rounded-full bg-pink-400"
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Letter Display */}
            <AnimatePresence>
                {currentLetter && !isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-2xl p-5 border border-orange-100 shadow-inner">
                            {/* Letter decoration */}
                            <div className="absolute top-2 right-3 text-2xl opacity-30">
                                {currentLetter.emoji}
                            </div>

                            <p className="font-semibold text-gray-700 mb-3 italic">
                                {currentLetter.greeting}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {currentLetter.body}
                            </p>
                            <p className="text-right font-semibold text-pink-500 text-sm">
                                {currentLetter.closing}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={copyLetter}
                                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${copied
                                        ? "bg-green-100 text-green-600 border-2 border-green-200"
                                        : "bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-200"
                                    }`}
                            >
                                {copied ? "✅ Đã copy!" : "📋 Copy thư"}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => generateLetter(fromWho)}
                                className="flex-1 py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl text-sm font-medium"
                            >
                                🔄 Thư khác
                            </motion.button>
                        </div>

                        <button
                            onClick={() => setCurrentLetter(null)}
                            className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1"
                        >
                            ← Quay lại
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
