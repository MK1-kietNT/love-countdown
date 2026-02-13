# 💕 Love Countdown - Đếm Ngược Ngày Gặp Nhau

> Web app đếm ngược đến ngày hẹn hò - Dành cho các cặp đôi Gen Z 💖

![Love Countdown](https://img.shields.io/badge/Made%20with-❤️-pink)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Tính năng

### 🎯 Core Features
- **⏰ Countdown Timer**: Đếm ngược realtime đến ngày hẹn (ngày, giờ, phút, giây)
- **💕 Couple Info Card**: Hiển thị thông tin cặp đôi với UI cute
- **❤️ Love Meter**: Tính độ hợp đôi dựa trên tên (70-99%)
- **🎲 Date Challenges**: Bốc thăm thử thách cho buổi hẹn
- **💌 Cute Messages**: Random tin nhắn ngọt ngào tiếng Việt
- **🎵 Music Mode**: Bật/tắt nhạc nền romantic
- **🎉 Success Screen**: Confetti khi đếm ngược kết thúc

### 🌟 Tính năng khác
- 📱 Responsive (mobile-first design)
- 💾 Lưu dữ liệu vào localStorage
- 🎨 Giao diện pastel cute với animation mượt mà
- 🇻🇳 Hoàn toàn tiếng Việt

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Effects**: Canvas Confetti
- **Deploy**: Vercel Ready

## 🚀 Cài đặt & Chạy

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Clone hoặc download project

```bash
cd love-countdown
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả 💕

## 📁 Cấu trúc thư mục

```
love-countdown/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Setup page (/)
│   └── countdown/
│       └── page.tsx         # Countdown dashboard
├── components/
│   ├── CountdownTimer.tsx   # Đếm ngược
│   ├── CoupleCard.tsx       # Thông tin cặp đôi
│   ├── LoveMeter.tsx        # Tính độ hợp
│   ├── CuteMessage.tsx      # Random tin nhắn cute
│   ├── DateChallenge.tsx    # Bốc thăm thử thách
│   ├── MusicPlayer.tsx      # Nhạc nền
│   └── SuccessScreen.tsx    # Màn hình thành công
├── lib/
│   └── utils.ts             # Utilities & constants
├── tailwind.config.ts       # Tailwind config
├── tsconfig.json            # TypeScript config
├── next.config.mjs          # Next.js config
└── package.json
```

## 🌐 Deploy lên Vercel

### Cách 1: Deploy bằng Vercel CLI

```bash
# Cài Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Cách 2: Deploy qua GitHub

1. Push code lên GitHub repository
2. Đăng nhập [Vercel](https://vercel.com)
3. Click **"Add New Project"**
4. Import GitHub repository
5. Click **"Deploy"**

Vercel sẽ tự động detect Next.js và config mọi thứ! ✨

### Cách 3: Deploy manual

```bash
# Build production
npm run build

# Start production server
npm run start
```

## 🎨 Customization

### Đổi màu sắc
Edit file `tailwind.config.ts`:

```typescript
colors: {
  pink: { ... },
  purple: { ... },
  cream: { ... },
}
```

### Thêm tin nhắn cute
Edit file `lib/utils.ts`:

```typescript
export const cuteMessages = [
  "Thêm tin nhắn mới ở đây 💕",
  // ...
];
```

### Thêm thử thách hẹn hò
```typescript
export const dateChallenges = [
  "Thử thách mới 🎯",
  // ...
];
```

## 📱 Screenshots

### Trang Setup
- Form nhập thông tin cặp đôi
- Validation cute messages
- Floating hearts animation

### Trang Countdown  
- Live countdown timer
- Couple info card
- Love meter với progress bar
- Date challenges
- Music player

### Success Screen
- Confetti celebration
- Cute congratulations message
- Reset button

## 💡 Gợi ý mở rộng

Nếu muốn nâng cấp, có thể thêm:

- 💌 **Love Letter Generator**: AI tạo thư tình
- 📸 **Photo Gallery**: Upload ảnh kỷ niệm
- 🗺️ **Map Integration**: Địa điểm hẹn hò
- 🔔 **Notifications**: Nhắc nhở trước giờ hẹn
- 🎮 **Mini Games**: Trắc nghiệm hiểu nhau
- 🌙 **Dark Mode**: Chế độ tối
- 📤 **Share**: Chia sẻ link cho người yêu

## 🎯 Gợi ý tên web

- GapNhauDi.vercel.app
- HenHoNhe.vercel.app
- DemNguocGapNhau.vercel.app
- LoveCountdown.vercel.app
- YeuEmNhieu.vercel.app

## 📝 License

MIT License - Free to use for personal projects 💕

---

Made with 💖 for all the lovely couples out there!

*Yêu nhau là phải hẹn hò, hẹn hò là phải đếm ngược* 🥰
