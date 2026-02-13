export interface CoupleData {
  boyName: string;
  girlName: string;
  boyAge: number;
  girlAge: number;
  meetingDate: string;
  meetingTime: string;
  boyNickname?: string;
  girlNickname?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export interface MoodData {
  date: string;
  boyMood: string;
  girlMood: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  author: "boy" | "girl";
}

export interface MissCount {
  date: string;
  boyCount: number;
  girlCount: number;
}

export interface TimeCapsule {
  message: string;
  createdAt: string;
  isOpened: boolean;
}

export interface LoveStats {
  totalDaysWaited: number;
  webOpenCount: number;
  challengesDone: number;
  missClicks: number;
}

export const STORAGE_KEY = "love-countdown-data";
export const MOOD_KEY = "love-countdown-mood";
export const DIARY_KEY = "love-countdown-diary";
export const MISS_KEY = "love-countdown-miss";
export const CAPSULE_KEY = "love-countdown-capsule";
export const STATS_KEY = "love-countdown-stats";
export const SILENT_KEY = "love-countdown-silent";

export const cuteMessages = [
  "Còn {days} ngày nữa là được gặp nhau rồi nè 🥹",
  "Nhớ nhau quá đi mất thôi 💕",
  "Ai đến trễ là bao trà sữa nha 😤",
  "Hẹn hò mà không thấy bồ là buồn lắm á 🥺",
  "Countdown từng giây để được ôm bồ 🤗",
  "Chờ đợi cũng là hạnh phúc mà nhỉ 💖",
  "Sắp gặp nhau rồi, hồi hộp quá đi 😍",
  "Bồ ơi, sắp được gặp rồi nè 🌸",
  "Mỗi giây trôi qua là gần bồ hơn một chút 💗",
  "Yêu bồ nhiều lắm, nhớ bồ nhiều hơn 💕",
];

export const dateChallenges = [
  "Người đến trước chọn quán ☕",
  "Hôm nay không được dùng điện thoại 30 phút 📵",
  "Chụp 1 ảnh không chỉnh sửa 📸",
  "Ai đến trễ mua nước 🧋",
  "Kể 3 điều yêu ở người kia 💕",
  "Đổi điện thoại cho nhau xem 10 phút 📱",
  "Đoán xem người kia đang muốn ăn gì 🍜",
  "Cùng chọn 1 bài hát chung 🎵",
  "Selfie với biểu cảm xấu nhất 🤪",
  "Ai cười trước thua, người thua bao dessert 🍰",
  "Kể 1 bí mật chưa từng nói 🤫",
  "Hôm nay gọi nhau bằng tên thật 😏",
  "Đi bộ 15 phút không nói chuyện, chỉ nắm tay 🚶",
  "Viết 1 câu tặng nhau lên giấy ✍️",
  "Cùng lập kế hoạch cho date tiếp theo 📅",
];

export const loveQuotes = [
  "Yêu là khi muốn gặp nhau mỗi ngày 💕",
  "Bên nhau là nhà 🏠",
  "You are my today and all of my tomorrows 🌈",
  "Tình yêu là bao trà sữa không cần trả 🧋",
  "Cùng nhau là đủ rồi 💖",
];

export const dailyQuotes = [
  "Không cần gặp nhiều, chỉ cần đúng người 💫",
  "Chờ đợi cũng là một dạng quan tâm 🌙",
  "Nhớ là nhớ, không cần lý do 🥹",
  "Có người để nghĩ đến là hạnh phúc 💭",
  "Yêu đúng người, mọi thứ đều có ý nghĩa ✨",
  "Khoảng cách không quan trọng bằng tấm lòng 💕",
  "Một ngày không gặp cũng dài như một năm 📅",
  "Người ta yêu vì cảm giác, ở lại vì lựa chọn 🌸",
  "Hạnh phúc đơn giản là có người để chờ 🎀",
  "Tình yêu không cần hoàn hảo, chỉ cần thật lòng 💖",
  "Nhớ ai đó mỗi ngày là một dạng may mắn 🍀",
  "Bên nhau không cần nói nhiều, hiểu là đủ 🫶",
  "Yêu là khi cả thế giới thu bé lại còn một người 🌍",
  "Đợi chờ có người chia sẻ là điều đáng giá 🎁",
];

export const moods = [
  { emoji: "😊", label: "vui" },
  { emoji: "🥹", label: "nhớ" },
  { emoji: "😴", label: "buồn ngủ" },
  { emoji: "😤", label: "hơi dỗi" },
  { emoji: "🥰", label: "yêu" },
  { emoji: "😢", label: "buồn" },
];

export function calculateLovePercentage(name1: string, name2: string): number {
  const combined = (name1 + name2).toLowerCase();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return 70 + Math.abs(hash % 30); // 70-99%
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function saveCoupleData(data: CoupleData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadCoupleData(): CoupleData | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearCoupleData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function clearAllData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MOOD_KEY);
    localStorage.removeItem(DIARY_KEY);
    localStorage.removeItem(MISS_KEY);
    localStorage.removeItem(CAPSULE_KEY);
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(SILENT_KEY);
    // New features
    localStorage.removeItem("love-countdown-bucket");
    localStorage.removeItem("love-countdown-promises");
    localStorage.removeItem("love-countdown-truth");
    localStorage.removeItem("love-countdown-memories");
  }
}

// Mood functions
export function saveMood(mood: MoodData): void {
  if (typeof window !== "undefined") {
    const moods = loadAllMoods();
    const existingIndex = moods.findIndex((m) => m.date === mood.date);
    if (existingIndex >= 0) {
      moods[existingIndex] = mood;
    } else {
      moods.push(mood);
    }
    localStorage.setItem(MOOD_KEY, JSON.stringify(moods));
  }
}

export function loadTodayMood(): MoodData | null {
  if (typeof window !== "undefined") {
    const today = new Date().toISOString().split("T")[0];
    const moods = loadAllMoods();
    return moods.find((m) => m.date === today) || null;
  }
  return null;
}

export function loadAllMoods(): MoodData[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(MOOD_KEY);
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

// Diary functions
export function saveDiaryEntry(entry: DiaryEntry): void {
  if (typeof window !== "undefined") {
    const entries = loadDiaryEntries();
    entries.unshift(entry);
    localStorage.setItem(DIARY_KEY, JSON.stringify(entries.slice(0, 50))); // Keep last 50
  }
}

export function loadDiaryEntries(): DiaryEntry[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(DIARY_KEY);
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

// Miss counter functions
export function incrementMiss(who: "boy" | "girl"): MissCount {
  if (typeof window !== "undefined") {
    const today = new Date().toISOString().split("T")[0];
    let missData = loadTodayMiss();
    if (!missData) {
      missData = { date: today, boyCount: 0, girlCount: 0 };
    }
    if (who === "boy") {
      missData.boyCount++;
    } else {
      missData.girlCount++;
    }
    const allMiss = loadAllMiss();
    const existingIndex = allMiss.findIndex((m) => m.date === today);
    if (existingIndex >= 0) {
      allMiss[existingIndex] = missData;
    } else {
      allMiss.push(missData);
    }
    localStorage.setItem(MISS_KEY, JSON.stringify(allMiss));
    return missData;
  }
  return { date: "", boyCount: 0, girlCount: 0 };
}

export function loadTodayMiss(): MissCount | null {
  if (typeof window !== "undefined") {
    const today = new Date().toISOString().split("T")[0];
    const allMiss = loadAllMiss();
    return allMiss.find((m) => m.date === today) || null;
  }
  return null;
}

export function loadAllMiss(): MissCount[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(MISS_KEY);
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

// Time Capsule functions
export function saveTimeCapsule(capsule: TimeCapsule): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CAPSULE_KEY, JSON.stringify(capsule));
  }
}

export function loadTimeCapsule(): TimeCapsule | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(CAPSULE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
  }
  return null;
}

// Stats functions
export function loadStats(): LoveStats {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STATS_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return { totalDaysWaited: 0, webOpenCount: 0, challengesDone: 0, missClicks: 0 };
      }
    }
  }
  return { totalDaysWaited: 0, webOpenCount: 0, challengesDone: 0, missClicks: 0 };
}

export function updateStats(updates: Partial<LoveStats>): void {
  if (typeof window !== "undefined") {
    const current = loadStats();
    const updated = { ...current, ...updates };
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  }
}

export function incrementStat(key: keyof LoveStats): void {
  if (typeof window !== "undefined") {
    const current = loadStats();
    current[key]++;
    localStorage.setItem(STATS_KEY, JSON.stringify(current));
  }
}

// Silent mode
export function setSilentMode(enabled: boolean): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SILENT_KEY, JSON.stringify(enabled));
  }
}

export function isSilentMode(): boolean {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(SILENT_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return false;
      }
    }
  }
  return false;
}

// Get daily quote based on date
export function getDailyQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24)
  );
  return dailyQuotes[dayOfYear % dailyQuotes.length];
}

// Count miss moods
export function countMissMoods(): number {
  const moods = loadAllMoods();
  return moods.filter((m) => m.boyMood === "🥹" || m.girlMood === "🥹").length;
}
