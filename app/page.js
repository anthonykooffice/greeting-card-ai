"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause,
  Download, 
  Globe, 
  Sparkles, 
  RefreshCw, 
  Upload, 
  ShieldCheck, 
  Layers,
  Smartphone,
  Wand2,
  Check,
  Film,
  X,
  UserCheck,
  Users
} from "lucide-react";

// Reliable SVG Fallback Data Generator for safety
const createPlaceholder = (title, bgColor = "%231e293b", textColor = "%23fde68a") => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="${bgColor}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="36" font-weight="bold" fill="${textColor}">${encodeURIComponent(title)}</text></svg>`;

const FESTIVE_DATA = {
  "Happy Birthday": {
    zhTitle: "祝生日快樂",
    heroImage: "/assets/Happy-Birthday/Happy-Birthday-1-1.mp4",
    heroFallback: createPlaceholder("Happy Birthday Celebration", "%233b82f6"),
    themeColor: "from-amber-500/40 via-purple-600/30 to-pink-500/40",
    
    // 25 Video Database divided into 5 Relationship Sectors (5 videos each)
    relationshipPresets: {
      couples: [
        { id: "b1_1", title: "Romantic Candlelight & Champagne", zhTitle: "浪漫燭光與香檳 (情侶)", url: "/assets/Happy-Birthday/Happy-Birthday-1-1.mp4", fallback: createPlaceholder("Candlelight Champagne", "%23d97706") },
        { id: "b1_2", title: "Sunset Beach Toast", zhTitle: "日落海灘乾杯 (情侶)", url: "/assets/Happy-Birthday/Happy-Birthday-1-2.mp4", fallback: createPlaceholder("Sunset Beach Toast", "%232563eb") },
        { id: "b1_3", title: "Starlight Rose Dinner", zhTitle: "星空玫瑰晚宴 (情侶)", url: "/assets/Happy-Birthday/Happy-Birthday-1-3.mp4", fallback: createPlaceholder("Rose Dinner", "%237c3aed") },
        { id: "b1_4", title: "Sweet Couples Cake Kiss", zhTitle: "甜蜜切蛋糕時光 (情侶)", url: "/assets/Happy-Birthday/Happy-Birthday-1-4.mp4", fallback: createPlaceholder("Couples Cake", "%23db2777") },
        { id: "b1_5", title: "Golden Heart Sparklers", zhTitle: "金光愛心仙女棒 (情侶)", url: "/assets/Happy-Birthday/Happy-Birthday-1-5.mp4", fallback: createPlaceholder("Heart Sparklers", "%23ca8a04") }
      ],
      friends: [
        { id: "b2_1", title: "Fun Confetti & Neon Party", zhTitle: "彩帶狂歡派對 (朋友)", url: "/assets/Happy-Birthday/Happy-Birthday-2-1.mp4", fallback: createPlaceholder("Confetti Party", "%23d97706") },
        { id: "b2_2", title: "Vibrant Outdoor BBQ Cheer", zhTitle: "熱鬧戶外聚會 (朋友)", url: "/assets/Happy-Birthday/Happy-Birthday-2-2.mp4", fallback: createPlaceholder("Outdoor Cheer", "%232563eb") },
        { id: "b2_3", title: "Balloons Burst Celebration", zhTitle: "繽紛氣球派對 (朋友)", url: "/assets/Happy-Birthday/Happy-Birthday-2-3.mp4", fallback: createPlaceholder("Balloons Burst", "%237c3aed") },
        { id: "b2_4", title: "Funny Dessert High Five", zhTitle: "歡樂甜品擊掌 (朋友)", url: "/assets/Happy-Birthday/Happy-Birthday-2-4.mp4", fallback: createPlaceholder("Dessert High Five", "%23db2777") },
        { id: "b2_5", title: "Karaoke Spotlight Cheers", zhTitle: "K歌燈光聚會 (朋友)", url: "/assets/Happy-Birthday/Happy-Birthday-2-5.mp4", fallback: createPlaceholder("Karaoke Cheers", "%23ca8a04") }
      ],
      family: [
        { id: "b3_1", title: "Warm Cozy Home Cake", zhTitle: "溫馨家庭燭光蛋糕 (家人)", url: "/assets/Happy-Birthday/Happy-Birthday-3-1.mp4", fallback: createPlaceholder("Home Cake", "%23d97706") },
        { id: "b3_2", title: "Family Living Room Celebration", zhTitle: "客廳閤家歡聚 (家人)", url: "/assets/Happy-Birthday/Happy-Birthday-3-2.mp4", fallback: createPlaceholder("Living Room Party", "%232563eb") },
        { id: "b3_3", title: "Generations Reunion Feast", zhTitle: "三代同堂賀壽宴 (家人)", url: "/assets/Happy-Birthday/Happy-Birthday-3-3.mp4", fallback: createPlaceholder("Reunion Feast", "%237c3aed") },
        { id: "b3_4", title: "Fairy Light Warm Gifts", zhTitle: "暖光溫馨生日禮物 (家人)", url: "/assets/Happy-Birthday/Happy-Birthday-3-4.mp4", fallback: createPlaceholder("Warm Gifts", "%23db2777") },
        { id: "b3_5", title: "Peaceful Garden Family Tea", zhTitle: "花園溫馨茶會 (家人)", url: "/assets/Happy-Birthday/Happy-Birthday-3-5.mp4", fallback: createPlaceholder("Garden Tea", "%23ca8a04") }
      ],
      colleagues: [
        { id: "b4_1", title: "Corporate Elegance & Champagne", zhTitle: "高雅商務尊尚慶典 (同事老闆)", url: "/assets/Happy-Birthday/Happy-Birthday-4-1.mp4", fallback: createPlaceholder("Corporate Elegance", "%23d97706") },
        { id: "b4_2", title: "Executive Lounge Gift Box", zhTitle: "行政套房精緻禮盒 (同事老闆)", url: "/assets/Happy-Birthday/Happy-Birthday-4-2.mp4", fallback: createPlaceholder("Executive Lounge", "%232563eb") },
        { id: "b4_3", title: "Office Team Surprise Cake", zhTitle: "辦公室團隊驚喜蛋糕 (同事老闆)", url: "/assets/Happy-Birthday/Happy-Birthday-4-3.mp4", fallback: createPlaceholder("Office Surprise", "%237c3aed") },
        { id: "b4_4", title: "Sleek Marble Toast", zhTitle: "大理石尊爵乾杯 (同事老闆)", url: "/assets/Happy-Birthday/Happy-Birthday-4-4.mp4", fallback: createPlaceholder("Marble Toast", "%23db2777") },
        { id: "b4_5", title: "Modern Skyline Celebration", zhTitle: "現代都市天際賀壽 (同事老闆)", url: "/assets/Happy-Birthday/Happy-Birthday-4-5.mp4", fallback: createPlaceholder("Skyline Celebration", "%23ca8a04") }
      ],
      schoolmates: [
        { id: "b5_1", title: "Youthful Campus Memories", zhTitle: "青春校園草地回憶 (同學校友)", url: "/assets/Happy-Birthday/Happy-Birthday-5-1.mp4", fallback: createPlaceholder("Campus Memories", "%23d97706") },
        { id: "b5_2", title: "Classroom Blackboard Party", zhTitle: "教室黑板派對 (同學校友)", url: "/assets/Happy-Birthday/Happy-Birthday-5-2.mp4", fallback: createPlaceholder("Classroom Party", "%232563eb") },
        { id: "b5_3", title: "Cafe Study Group Cake", zhTitle: "咖啡館同窗切蛋糕 (同學校友)", url: "/assets/Happy-Birthday/Happy-Birthday-5-3.mp4", fallback: createPlaceholder("Cafe Cake", "%237c3aed") },
        { id: "b5_4", title: "Graduation Memory Polaroids", zhTitle: "拍立得相片青春回憶 (同學校友)", url: "/assets/Happy-Birthday/Happy-Birthday-5-4.mp4", fallback: createPlaceholder("Memory Polaroids", "%23db2777") },
        { id: "b5_5", title: "Sports Field Sunset Toast", zhTitle: "操場夕陽歡慶 (同學校友)", url: "/assets/Happy-Birthday/Happy-Birthday-5-5.mp4", fallback: createPlaceholder("Sports Field Sunset", "%23ca8a04") }
      ]
    },

    // AI Prompt Ideas mapped per relationship
    ideas: {
      couples: [
        { en: "To my soulmate: Wishing you a birthday filled with oceans of love, romance, and joy!", zh: "致我的靈魂伴侶：願你的生日充滿無盡的愛、浪漫與歡喜！" },
        { en: "You hold the key to my heart today, tomorrow, and forever. Happy Birthday my love!", zh: "你掌握著我心門的鑰匙，祝我最親愛的你生日快樂！" },
        { en: "Cheers to another year of creating beautiful memories together. I love you!", zh: "為我們又一年共同創造的美好回憶乾杯，我愛你！" },
        { en: "May your birthday be as sweet and magical as the happiness you bring into my life!", zh: "願你的生日如你帶給我生活的幸福般甜美神奇！" },
        { en: "Sending you tight hugs and sweet kisses on your special day. Happy Birthday!", zh: "在這特別的日子送上最深情的擁抱與甜蜜祝福，生日快樂！" }
      ],
      friends: [
        { en: "Happy Birthday! Cheers to another year of crazy adventures and endless laughter!", zh: "生日快樂！為我們又一年的精彩冒險與歡笑乾杯！" },
        { en: "May your day be filled with good vibes, fantastic food, and memorable moments!", zh: "願你今天充滿好心情、美食與超棒的回憶！" },
        { en: "To my best friend: Thanks for being awesome. Have a truly epic birthday!", zh: "致我最棒的朋友：感謝你一路相伴，祝你度過超棒的生日！" },
        { en: "Wishing you 365 days of good luck, success, and pure happiness. Happy Birthday!", zh: "祝你未來 365 天好運連連、大獲成功、幸福滿滿！生日快樂！" },
        { en: "Age is just a number, but our friendship is timeless. Happy Birthday buddy!", zh: "年齡只是數字，我們的友誼歷久彌新。生日快樂好朋友！" }
      ],
      family: [
        { en: "Wishing you good health, warmth, and abundant joy always. Happy Birthday!", zh: "祝您身體健康、溫馨常伴、福氣滿門！生日快樂！" },
        { en: "Thank you for always being our family's pillar of strength, care, and cheer.", zh: "感謝您總是成為我們家庭最堅實的後盾與歡樂源泉。" },
        { en: "May your heart be filled with peace, warmth, and the sweet love of family!", zh: "願您的內心充滿平靜、溫暖與家庭的甜美關愛！" },
        { en: "Sending warmest birthday wishes from all of us! May all your wishes come true.", zh: "獻上我們全家最溫暖的生日祝福！願您心想事成。" },
        { en: "To our beloved family member: May your year ahead be blessed with health and success!", zh: "致我們最親愛的家人：願您新的一年平安健康、萬事勝意！" }
      ],
      colleagues: [
        { en: "Wishing you a very Happy Birthday! May the year ahead bring continued success.", zh: "祝您生日快樂！願新的一年事業順遂、宏圖大展。" },
        { en: "Happy Birthday! Wishing you a fantastic year ahead filled with great achievements.", zh: "生日快樂！願您新的一年成就非凡、平安喜樂。" },
        { en: "Thank you for being such an inspirational colleague and leader. Happy Birthday!", zh: "感謝您在工作中的卓越指導與支持，祝您生日快樂！" },
        { en: "May your special day bring you a well-deserved break and joyous moments!", zh: "願您在這特別的日子裡享有難得的輕鬆與愉悅時光！" },
        { en: "Wishing you good health, great fortune, and seamless progress in all endeavors!", zh: "祝您工作順利、身體健康、諸事亨通、生日快樂！" }
      ],
      schoolmates: [
        { en: "Happy Birthday! Here's to our golden campus memories and lifelong friendship!", zh: "生日快樂！致我們燦爛的校園回憶與永恆的同窗情誼！" },
        { en: "May your birthday bring back sweet school memories and point to a brilliant future!", zh: "願生日為你重現甜蜜校園記憶，並指引明亮輝煌的前程！" },
        { en: "To my dear schoolmate: Wishing you non-stop joy, high energy, and big achievements!", zh: "致我親愛的同學：祝你歡笑不斷、活力充沛、前程似錦！" },
        { en: "Cheers to the good old school days and the exciting journey ahead. Happy Birthday!", zh: "為那些美好的同窗歲月與未來興奮的旅程乾杯，生日快樂！" },
        { en: "Wishing my favorite classmate the happiest birthday ever! Keep shining bright!", zh: "祝我最棒的同學生日無比快樂！願你繼續熠熠生輝！" }
      ]
    }
  },
  "Happy Mother's Day": {
    zhTitle: "母親節快樂",
    heroImage: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-1.mp4",
    heroFallback: createPlaceholder("Happy Mother's Day", "%23ec4899"),
    themeColor: "from-rose-500/40 via-pink-600/30 to-red-400/40",
    presets: [
      { id: "m1", title: "Fresh Peony & Rose Bouquet", zhTitle: "新鮮牡丹玫瑰花束", url: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-1.mp4", fallback: createPlaceholder("Peony Bouquet", "%23e11d48") },
      { id: "m2", title: "Spring Tulip Bloom", zhTitle: "春日鬱金香花海", url: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-2.mp4", fallback: createPlaceholder("Spring Tulips", "%23be123c") },
      { id: "m3", title: "Warm Morning Floral Tea", zhTitle: "溫馨早晨花茶", url: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-3.mp4", fallback: createPlaceholder("Morning Floral Tea", "%239f1239") },
      { id: "m4", title: "Golden Hour Garden Blossoms", zhTitle: "金輝花園盛開", url: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-4.mp4", fallback: createPlaceholder("Garden Blossoms", "%23881337") },
      { id: "m5", title: "Soft Pink Carnation Arrangement", zhTitle: "粉嫩康乃馨花藝", url: "/assets/Happy-Mothers-Day/Happy-Mothers-Day-5.mp4", fallback: createPlaceholder("Pink Carnations", "%23f43f5e") }
    ],
    ideas: [
      { en: "Thank you for your unconditional love and infinite patience. Happy Mother's Day!", zh: "感謝您無私的愛與無窮的耐心，母親節快樂！" },
      { en: "To the world you are a mother, but to our family you are the world.", zh: "對世界而言您是一位母親，但對我們家而言您就是整個世界。" },
      { en: "Your strength and grace inspire me every single day. Love you Mom!", zh: "您的堅強與優雅每天都激勵著我，媽媽我愛您！" },
      { en: "Wishing the sweetest, most caring Mom a day filled with relaxation!", zh: "祝最親愛體貼的媽媽度過輕鬆愉快的一天！" },
      { en: "Thank you for always making our home the warmest place on Earth.", zh: "感謝您總是把我們的家變成世界上最溫暖的地方。" }
    ]
  },
  "Happy Father's Day": {
    zhTitle: "父親節快樂",
    heroImage: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-1.mp4",
    heroFallback: createPlaceholder("Happy Father's Day", "%231d4ed8"),
    themeColor: "from-blue-600/40 via-slate-700/30 to-indigo-500/40",
    presets: [
      { id: "f1", title: "Serene Dock & Ocean Sunset", zhTitle: "寧靜港灣夕陽", url: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-1.mp4", fallback: createPlaceholder("Ocean Sunset", "%231e40af") },
      { id: "f2", title: "Majestic Wilderness Mountain", zhTitle: "壯麗山川風光", url: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-2.mp4", fallback: createPlaceholder("Wilderness Mountain", "%231d4ed8") },
      { id: "f3", title: "Classic Vintage Timepiece", zhTitle: "經典復古腕錶", url: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-3.mp4", fallback: createPlaceholder("Vintage Timepiece", "%232563eb") },
      { id: "f4", title: "Peaceful Forest Dusk Path", zhTitle: "靜謐森林步道", url: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-4.mp4", fallback: createPlaceholder("Forest Dusk Path", "%233b82f6") },
      { id: "f5", title: "Modern Deep Blue Geometry", zhTitle: "深藍幾何美學", url: "/assets/Happy-Fathers-Day/Happy-Fathers-Day-5.mp4", fallback: createPlaceholder("Deep Blue Geometry", "%231e3a8a") }
    ],
    ideas: [
      { en: "Thank you for being my anchor, my mentor, and my hero. Happy Father's Day!", zh: "感謝您成為我的靠山、導師與英雄，父親節快樂！" },
      { en: "To the man who taught me how to stand tall and work hard—cheers Dad!", zh: "獻給教導我堅強與勤奮的男人，爸爸乾杯！" },
      { en: "Your wisdom and guidance mean more to me than words can ever say.", zh: "您的智慧與指引對我而言勝過千言萬語。" },
      { en: "Happy Father's Day to the coolest, kindest, and strongest Dad around!", zh: "祝世界上最帥氣、最善良、最堅強的爸爸父親節快樂！" },
      { en: "Thank you for all the sacrifices you make for our family every day.", zh: "感謝您每天為我們家庭默默付出的一切。" }
    ]
  },
  "Happy New Year": {
    zhTitle: "跨年元旦快樂",
    heroImage: "/assets/Happy-New-Year/Happy-New-Year-1.mp4",
    heroFallback: createPlaceholder("Happy New Year 2027", "%23d97706"),
    themeColor: "from-amber-400/40 via-yellow-600/30 to-orange-500/40",
    presets: [
      { id: "n1", title: "Midnight Fireworks Sky", zhTitle: "璀璨夜空煙花", url: "/assets/Happy-New-Year/Happy-New-Year-1.mp4", fallback: createPlaceholder("Fireworks Sky", "%23b45309") },
      { id: "n2", title: "Golden Champagne Celebration", zhTitle: "金色香檳慶典", url: "/assets/Happy-New-Year/Happy-New-Year-2.mp4", fallback: createPlaceholder("Champagne Celebration", "%23d97706") },
      { id: "n3", title: "City Skyline Sparkler Glow", zhTitle: "都市天際仙女棒", url: "/assets/Happy-New-Year/Happy-New-Year-3.mp4", fallback: createPlaceholder("City Sparkler Glow", "%23f59e0b") },
      { id: "n4", title: "Warm Festive Lantern Festival", zhTitle: "暖心節慶天燈", url: "/assets/Happy-New-Year/Happy-New-Year-4.mp4", fallback: createPlaceholder("Lantern Festival", "%23ea580c") },
      { id: "n5", title: "Glittering Countdown Lights", zhTitle: "倒數歡慶燈光", url: "/assets/Happy-New-Year/Happy-New-Year-5.mp4", fallback: createPlaceholder("Countdown Lights", "%23c2410c") }
    ],
    ideas: [
      { en: "May 2027 bring you health, wealth, prosperity, and endless joy!", zh: "願新的一年帶給你健康、財富與無限喜悅！" },
      { en: "New year, new opportunities! Here's to making every moment count.", zh: "新的一年，新的機遇！願我們珍惜每個精彩瞬間。" },
      { en: "Wishing you 365 days of peace, love, and brilliant achievements!", zh: "祝你擁有 365 天和平安、愛與輝煌成就！" },
      { en: "Cheers to fresh starts and bright new beginnings. Happy New Year!", zh: "為全新的開始與明亮的前程乾杯，新年快樂！" },
      { en: "May your year ahead be as glittering and hopeful as midnight fireworks!", zh: "願你新的一年如午夜煙花般絢麗璀璨！" }
    ]
  },
  "Happy Valentine's Day": {
    zhTitle: "情人節快樂",
    heroImage: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-1.mp4",
    heroFallback: createPlaceholder("Happy Valentine's Day", "%23be123c"),
    themeColor: "from-pink-600/40 via-rose-700/30 to-red-500/40",
    presets: [
      { id: "v1", title: "Crimson Red Velvet Hearts", zhTitle: "深紅絲絨愛心", url: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-1.mp4", fallback: createPlaceholder("Red Velvet Hearts", "%23be123c") },
      { id: "v2", title: "Red Rose Petal Shower", zhTitle: "浪漫玫瑰花瓣", url: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-2.mp4", fallback: createPlaceholder("Rose Petal Shower", "%239f1239") },
      { id: "v3", title: "Romantic Candlelight Ambiance", zhTitle: "浪漫燭光晚宴", url: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-3.mp4", fallback: createPlaceholder("Candlelight Ambiance", "%23881337") },
      { id: "v4", title: "Glowing Neon Heart Art", zhTitle: "霓虹愛心燈飾", url: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-4.mp4", fallback: createPlaceholder("Neon Heart Art", "%23e11d48") },
      { id: "v5", title: "Golden Love Infinity Symbol", zhTitle: "金色永恆摯愛", url: "/assets/Happy-Valentines-Day/Happy-Valentines-Day-5.mp4", fallback: createPlaceholder("Golden Love Infinity", "%23f43f5e") }
    ],
    ideas: [
      { en: "You hold the key to my heart today, tomorrow, and forever. Happy Valentine's Day!", zh: "你掌握著我心門的鑰匙，直到永遠。情人節快樂！" },
      { en: "Every love story is beautiful, but ours is my absolute favorite.", zh: "每個愛情故事都很美，但我們的故事是我最愛的。" },
      { en: "Life is sweeter, brighter, and better with you by my side. I love you!", zh: "有你在身旁，生活變得更加甜美絢麗。我愛你！" },
      { en: "To the love of my life—thank you for bringing so much happiness to my world.", zh: "致我的摯愛：感謝你為我的世界帶來如此多的幸福。" },
      { en: "Happy Valentine's Day to the person who still gives me butterflies!", zh: "祝那位依然讓我心動不已的人情人節快樂！" }
    ]
  },
  "Merry Christmas": {
    zhTitle: "聖誕節快樂",
    heroImage: "/assets/Merry-Christmas/Merry-Christmas-1.mp4",
    heroFallback: createPlaceholder("Merry Christmas", "%2315803d"),
    themeColor: "from-emerald-600/40 via-red-700/30 to-green-500/40",
    presets: [
      { id: "c1", title: "Glowing Christmas Tree Lights", zhTitle: "璀璨聖誕樹彩燈", url: "/assets/Merry-Christmas/Merry-Christmas-1.mp4", fallback: createPlaceholder("Christmas Tree Lights", "%2315803d") },
      { id: "c2", title: "Cozy Fireplace & Holiday Stockings", zhTitle: "壁爐與節慶聖誕襪", url: "/assets/Merry-Christmas/Merry-Christmas-2.mp4", fallback: createPlaceholder("Cozy Fireplace", "%23b91c1c") },
      { id: "c3", title: "Snowy Winter Pine Cones", zhTitle: "雪景松果美景", url: "/assets/Merry-Christmas/Merry-Christmas-3.mp4", fallback: createPlaceholder("Snowy Pine Cones", "%23047857") },
      { id: "c4", title: "Golden Christmas Tree Baubles", zhTitle: "金色聖誕裝飾球", url: "/assets/Merry-Christmas/Merry-Christmas-4.mp4", fallback: createPlaceholder("Golden Christmas Baubles", "%23b45309") },
      { id: "c5", title: "Nordic Winter Snowflake Branch", zhTitle: "北歐雪花冬日松枝", url: "/assets/Merry-Christmas/Merry-Christmas-5.mp4", fallback: createPlaceholder("Snowflake Branch", "%230f766e") }
    ],
    ideas: [
      { en: "May your holidays be wrapped in warmth, filled with love, and bright with joy!", zh: "願你的佳節充滿溫暖、愛與無盡喜悅！" },
      { en: "Wishing you a peaceful Christmas and a blessed New Year ahead.", zh: "祝你度過祥和的聖誕節與美好的新的一年。" },
      { en: "May the spirit of Christmas bring peace to your home and happiness to your heart.", zh: "願聖誕的精神為你的家庭帶來平安，為你的心靈帶來幸福。" },
      { en: "Warmest holiday wishes from our family to yours. Merry Christmas!", zh: "獻上我們全家最溫暖的祝福，聖誕快樂！" },
      { en: "Here is to good times, warm cocoa, and cherishable moments this Christmas!", zh: "為溫馨的熱可可與難忘的聖誕時光乾杯！" }
    ]
  },
  "Happy Easter": {
    zhTitle: "復活節快樂",
    heroImage: "/assets/Happy-Easter/Happy-Easter-1.mp4",
    heroFallback: createPlaceholder("Happy Easter", "%2310b981"),
    themeColor: "from-emerald-400/40 via-teal-500/30 to-yellow-400/40",
    presets: [
      { id: "e1", title: "Colorful Pastel Easter Eggs", zhTitle: "彩繪復活節彩蛋", url: "/assets/Happy-Easter/Happy-Easter-1.mp4", fallback: createPlaceholder("Pastel Easter Eggs", "%23059669") },
      { id: "e2", title: "Spring Blossom Bunny Garden", zhTitle: "春日花園可愛兔子", url: "/assets/Happy-Easter/Happy-Easter-2.mp4", fallback: createPlaceholder("Bunny Garden", "%2310b981") },
      { id: "e3", title: "Easter Egg Nest in Meadow", zhTitle: "草地彩蛋溫馨鳥巢", url: "/assets/Happy-Easter/Happy-Easter-3.mp4", fallback: createPlaceholder("Easter Egg Nest", "%2334d399") },
      { id: "e4", title: "Golden Morning Spring Tulips", zhTitle: "晨曦金色鬱金香", url: "/assets/Happy-Easter/Happy-Easter-4.mp4", fallback: createPlaceholder("Spring Tulips", "%23f59e0b") },
      { id: "e5", title: "Festive Chocolate Easter Treats", zhTitle: "復活節精緻巧克力", url: "/assets/Happy-Easter/Happy-Easter-5.mp4", fallback: createPlaceholder("Chocolate Easter Treats", "%23d97706") }
    ],
    ideas: [
      { en: "Wishing you a bright, joyful Easter filled with hope and sweet surprises!", zh: "祝你度過一個充滿希望與甜蜜驚喜的明媚復活節！" },
      { en: "May your Easter overflow with happiness, new beginnings, and warm sunshine!", zh: "願你的復活節充滿幸福、全新開始與溫暖陽光！" },
      { en: "Sending egg-stra special warm wishes to you and your loved ones!", zh: "向你和家人致以特別的節日溫暖祝福！" },
      { en: "May the spring season renew your spirit and fill your heart with joy!", zh: "願美好春季煥發你的身心，心中充滿歡喜！" },
      { en: "Happy Easter! Cheers to fresh beginnings and wonderful family moments.", zh: "復活節快樂！為新的開始與美好的家庭時光乾杯。" }
    ]
  },
  "Happy Mid-Autumn Festival": {
    zhTitle: "中秋節快樂",
    heroImage: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-1.mp4",
    heroFallback: createPlaceholder("Happy Mid-Autumn Festival", "%23d97706"),
    themeColor: "from-amber-600/40 via-yellow-700/30 to-orange-500/40",
    presets: [
      { id: "ma1", title: "Full Golden Moon & Lanterns", zhTitle: "金黃明月與節慶燈籠", url: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-1.mp4", fallback: createPlaceholder("Golden Moon & Lanterns", "%23d97706") },
      { id: "ma2", title: "Traditional Gourmet Mooncakes", zhTitle: "傳統精緻月餅美食", url: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-2.mp4", fallback: createPlaceholder("Gourmet Mooncakes", "%23b45309") },
      { id: "ma3", title: "Glowing Night Sky Lanterns", zhTitle: "夜空璀璨放飛天燈", url: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-3.mp4", fallback: createPlaceholder("Night Sky Lanterns", "%23ea580c") },
      { id: "ma4", title: "Serene Moonlight Lake Reflection", zhTitle: "靜謐湖畔月影搖曳", url: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-4.mp4", fallback: createPlaceholder("Moonlight Lake", "%231e3a8a") },
      { id: "ma5", title: "Warm Tea & Reunion Celebration", zhTitle: "中秋品茗歡聚一堂", url: "/assets/Happy-Mid-Autumn-Festival/Happy-Mid-Autumn-Festival-5.mp4", fallback: createPlaceholder("Tea & Reunion", "%2378350f") }
    ],
    ideas: [
      { en: "Wishing you and your family a blessed Mid-Autumn Festival of harmony and reunion!", zh: "祝您與家人中秋團圓，花好月圓，合家幸福！" },
      { en: "May the full moon bring warmth, health, and bright prosperity into your life!", zh: "願皎潔明月帶給您溫暖、健康與萬事興隆！" },
      { en: "Happy Mid-Autumn Festival! Enjoy sweet mooncakes and cherished family time.", zh: "中秋節快樂！享受美味月餅與珍貴的家人團聚時光。" },
      { en: "Though miles apart, we share the beauty of the same brilliant full moon.", zh: "天涯共此時，願明月寄去我最深切的思念與祝福。" },
      { en: "May your life be as sweet as mooncakes and bright as the harvest moon!", zh: "願您的生活如月餅般甜美，如秋月般明朗！" }
    ]
  },
  "Happy Chinese New Year": {
    zhTitle: "農曆新年快樂",
    heroImage: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-1.mp4",
    heroFallback: createPlaceholder("Happy Chinese New Year", "%23dc2626"),
    themeColor: "from-red-600/40 via-amber-600/30 to-red-500/40",
    presets: [
      { id: "cny1", title: "Red Lanterns & Spring Couplets", zhTitle: "喜慶紅燈籠與春聯", url: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-1.mp4", fallback: createPlaceholder("Red Lanterns & Couplets", "%23dc2626") },
      { id: "cny2", title: "Golden Fortune Coins & Red Packets", zhTitle: "金玉滿堂開運紅包", url: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-2.mp4", fallback: createPlaceholder("Fortune Coins & Red Packets", "%23b91c1c") },
      { id: "cny3", title: "Vibrant Lion Dance Celebration", zhTitle: "熱鬧非凡醒獅賀歲", url: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-3.mp4", fallback: createPlaceholder("Lion Dance Celebration", "%23991b1b") },
      { id: "cny4", title: "Blossoming Cherry Spring Flowers", zhTitle: "新春桃花報喜盛開", url: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-4.mp4", fallback: createPlaceholder("Blossoming Spring Flowers", "%23e11d48") },
      { id: "cny5", title: "Festive Fireworks & Temple Lights", zhTitle: "新春火樹銀花不夜天", url: "/assets/Happy-Chinese-New-Year/Happy-Chinese-New-Year-5.mp4", fallback: createPlaceholder("Fireworks & Temple Lights", "%23d97706") }
    ],
    ideas: [
      { en: "Wishing you immense prosperity, good health, and wealth in the New Year!", zh: "祝您新春吉星高照，大吉大利，歲歲平安！" },
      { en: "Gong Xi Fa Cai! May all your endeavors bring success and endless joy.", zh: "恭喜發財！願您新年事業駿發，萬事勝意。" },
      { en: "Happy Lunar New Year! Wishing your home warmth, peace, and good fortune.", zh: "農曆新年快樂！祝您的家庭溫馨祥和，福氣滿門。" },
      { en: "May the Spring Festival bring you health, happiness, and abundant luck!", zh: "願新春佳節帶給您健康、幸福與無盡的好運！" },
      { en: "Cheers to good fortune, sweet family moments, and brilliant achievements!", zh: "為好運連連、家庭美滿與璀璨成就乾杯！" }
    ]
  }
};

const TRANSLATIONS = {
  en: {
    title: "GreetingAI Studio",
    heroTitle: "Craft AI Magic in Every Card",
    heroDesc: "Follow the steps: (1) Tap an event, (2) Choose Recipient Relationship to filter presets, (3) Pick a visual style, (4) Enter names & apply prompts, (5) Tap photo input (Facial-Swap), (6) Tap \"Generate AI Synchronized Card\", (7) Tap \"Download Button\".",
    categoryTitle: "1. EVENT SELECTION (5 Presets per Category)",
    relationshipSelectorTitle: "Relationship Selector (Filtered Video Database):",
    relationships: {
      couples: "Couples / Spouse (情侶/伴侶)",
      friends: "Friends (朋友)",
      family: "Family (家人)",
      colleagues: "Colleagues / Boss (同事/老闆)",
      schoolmates: "Schoolmates (同學/校友)"
    },
    presetHeaderLabel: "Select 1 of 5 Relevant Event Presets:",
    styleTitle: "2. VISUAL STYLE SELECTION & AI ENHANCEMENTS",
    msgTitle: "3. PERSONALIZATION & GUARDED INPUTS",
    toLabel: "To (Recipient Name):",
    fromLabel: "From (Sender Name):",
    toPlaceholder: "e.g. Dearest [Recipient Name]",
    fromPlaceholder: "e.g. With Love [Sender Name]",
    msgPlaceholder: "Type custom greeting message...",
    ideasTitle: "Inspiration Prompts (Tap to Apply):",
    surpriseBtn: "Random Prompt Generator",
    generateBtn: "Generate AI Synchronized Card",
    stageBtn: "Stage Draft to Canvas",
    downloadBtn: "Download Imprinted High-Res Card / Video",
    creditsLeft: "Free Trial Credits",
    sessionExpired: "0/5 Free Trial Credits Expired",
    recentTitle: "TEMPORARY CANVAS MINI TV TRAYS (Imprinted Holdings)",
    faceSwapToggleLabel: "Enable AI Character Facial-Swap (Auto-Detect Faces in Photo)",
    faceSwapUploadLabel: "Upload Photo of Person / Couple / Family (Max 15MB)",
    disclaimer: "Legal Guardrail: Uploaded reference media are processed in browser memory and temporary runtime only. No local device folders are accessed.",
    categories: Object.keys(FESTIVE_DATA),
    styles: [
      { key: "Photo", label: "4K Photorealistic", badge: "📷 4K Photo Style Active", cssFilter: "contrast(110%) brightness(105%) saturate(110%)" },
      { key: "Paint", label: "Hand-Painted Oil Art", badge: "🎨 Hand-Painted Oil Style Active", cssFilter: "saturate(180%) sepia(40%) contrast(135%) brightness(105%)" },
      { key: "Portrait", label: "Portrait Drawing Style", badge: "✏️ Portrait Drawing Style Active", cssFilter: "grayscale(30%) contrast(125%) brightness(105%) sepia(15%)" },
      { key: "Motion5s", label: "5-Sec AI Motion Video", badge: "🎬 5-Sec AI Motion Loop Active", cssFilter: "brightness(115%) contrast(125%) saturate(135%)" }
    ]
  },
  zh: {
    title: "GreetingAI 賀卡工作室",
    heroTitle: "用 AI 為每一張賀卡注入魔力",
    heroDesc: "請按照以下步驟操作：(1) 點擊主題，(2) 點選「收卡人關係」過濾專屬短片，(3) 選擇風格，(4) 填入姓名與套用祝福語，(5) 上傳相片 (人臉替換)，(6) 點擊「生成 AI 同步賀卡」，(7) 點擊「下載按鈕」。",
    categoryTitle: "1. 選擇賀卡主題 (含專屬影片庫)",
    relationshipSelectorTitle: "收卡人關係選擇 (過濾過 5 個主題短片)：",
    relationships: {
      couples: "情侶 / 伴侶 (Couples)",
      friends: "朋友 (Friends)",
      family: "家人 (Family)",
      colleagues: "同事 / 老闆 (Colleagues & Boss)",
      schoolmates: "同學 / 校友 (Schoolmates)"
    },
    presetHeaderLabel: "選擇 5 個動態短片預設之一：",
    styleTitle: "2. 視覺風格選擇與 AI 動態增強",
    msgTitle: "3. 個性化內容與安全保護輸入",
    toLabel: "致 (收件人姓名)：",
    fromLabel: "來自 (寄件人署名)：",
    toPlaceholder: "例：親愛的 [收件人姓名]",
    fromPlaceholder: "例：愛你的 [寄件人署名]",
    msgPlaceholder: "在此輸入自訂祝福語...",
    ideasTitle: "靈感祝福語點子 (點擊自動填入)：",
    surpriseBtn: "隨機靈感點子",
    generateBtn: "生成 AI 同步個性化賀卡",
    stageBtn: "暫存預覽至畫布",
    downloadBtn: "下載已印製高清賀卡 / 動態影片",
    creditsLeft: "免費試用額度",
    sessionExpired: "5次免費試用額度已用完",
    recentTitle: "暫存迷你電視畫布 (已印製文字紀錄區)",
    faceSwapToggleLabel: "啟用 AI 角色人臉替換 (自動偵測相片中多個人臉)",
    faceSwapUploadLabel: "上傳個人 / 情侶 / 家庭合照 (最大 15MB)",
    disclaimer: "安全與法律聲明：您選擇上傳的參考媒體僅在瀏覽器內存與臨時 AI 雲端傳輸處理，本系統絕不會存取或洩漏您個人裝置中的檔案。",
    categories: Object.keys(FESTIVE_DATA),
    styles: [
      { key: "Photo", label: "4K 寫實相片 (Photo)", badge: "📷 4K 寫實風格已套用", cssFilter: "contrast(110%) brightness(105%) saturate(110%)" },
      { key: "Paint", label: "油畫手繪 (Hand-Paint)", badge: "🎨 復古油畫風格已套用", cssFilter: "saturate(180%) sepia(40%) contrast(135%) brightness(105%)" },
      { key: "Portrait", label: "人像素描繪畫 (Portrait Drawing)", badge: "✏️ 人像素描繪畫風格已套用", cssFilter: "grayscale(30%) contrast(125%) brightness(105%) sepia(15%)" },
      { key: "Motion5s", label: "5秒 AI 動態影片 (5s Motion)", badge: "🎬 5秒 AI 動態影片增強已套用", cssFilter: "brightness(115%) contrast(125%) saturate(135%)" }
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  const [selectedCategory, setSelectedCategory] = useState("Happy Birthday");
  const [selectedRelationship, setSelectedRelationship] = useState("couples");

  // Helper to extract active 5 presets dynamically based on Category & Relationship Selection
  const getActivePresetsForCategoryAndRelationship = (cat, relationship) => {
    const categoryData = FESTIVE_DATA[cat];
    if (!categoryData) return [];
    if (categoryData.relationshipPresets && categoryData.relationshipPresets[relationship]) {
      return categoryData.relationshipPresets[relationship];
    }
    return categoryData.presets || [];
  };

  // Helper to extract active ideas dynamically based on Category & Relationship Selection
  const getIdeasForCategoryAndRelationship = (cat, relationship) => {
    const categoryObj = FESTIVE_DATA[cat];
    if (!categoryObj) return [];
    if (categoryObj.ideas && typeof categoryObj.ideas === "object" && !Array.isArray(categoryObj.ideas)) {
      return categoryObj.ideas[relationship] || categoryObj.ideas["couples"] || [];
    }
    return categoryObj.ideas || [];
  };

  const initialPresets = getActivePresetsForCategoryAndRelationship("Happy Birthday", "couples");
  const [selectedPreset, setSelectedPreset] = useState(initialPresets[0]);
  const [selectedStyle, setSelectedStyle] = useState("Photo");
  
  const [toName, setToName] = useState("Dearest [Recipient Name]");
  const [fromName, setFromName] = useState("With Love [Sender Name]");

  const initialIdeas = getIdeasForCategoryAndRelationship("Happy Birthday", "couples");
  const [customText, setCustomText] = useState(initialIdeas.length > 0 ? initialIdeas[0][lang] : "");

  const [credits, setCredits] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [styleNotification, setStyleNotification] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [attachedMedia, setAttachedMedia] = useState(null);
  const [enableFaceSwap, setEnableFaceSwap] = useState(true);

  const initialStaged = {
    id: 1,
    category: "Happy Birthday",
    relationship: selectedRelationship,
    style: "Photo",
    to: toName,
    from: fromName,
    text: customText,
    url: initialPresets[0].url,
    fallback: initialPresets[0].fallback,
    media: null,
    faceSwapActive: enableFaceSwap
  };

  const [activeCard, setActiveCard] = useState(initialStaged);
  const [history, setHistory] = useState([initialStaged]);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setActiveCard((prev) => ({
      ...prev,
      category: selectedCategory,
      relationship: selectedRelationship,
      style: selectedStyle,
      to: toName,
      from: fromName,
      text: customText,
      url: selectedPreset.url,
      fallback: selectedPreset.fallback,
      media: attachedMedia,
      faceSwapActive: enableFaceSwap
    }));
  }, [selectedCategory, selectedRelationship, selectedPreset, selectedStyle, toName, fromName, customText, attachedMedia, enableFaceSwap]);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const activePresets = getActivePresetsForCategoryAndRelationship(cat, selectedRelationship);
    if (activePresets.length > 0) {
      setSelectedPreset(activePresets[0]);
    }
    setAttachedMedia(null);

    const currentIdeas = getIdeasForCategoryAndRelationship(cat, selectedRelationship);
    if (currentIdeas.length > 0) {
      setCustomText(currentIdeas[0][lang]);
    }
  };

  const handleRelationshipChange = (relKey) => {
    setSelectedRelationship(relKey);
    
    // Dynamically pop-up the 5 presets corresponding to the selected relationship
    const newPresets = getActivePresetsForCategoryAndRelationship(selectedCategory, relKey);
    if (newPresets.length > 0) {
      setSelectedPreset(newPresets[0]);
    }
    setAttachedMedia(null);

    const currentIdeas = getIdeasForCategoryAndRelationship(selectedCategory, relKey);
    if (currentIdeas.length > 0) {
      setCustomText(currentIdeas[0][lang]);
    }
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    setAttachedMedia(null);
  };

  const handleStyleSelect = (styleKey) => {
    setSelectedStyle(styleKey);
    const foundStyle = t.styles.find((s) => s.key === styleKey);
    if (foundStyle) {
      setStyleNotification(foundStyle.badge);
      setTimeout(() => setStyleNotification(""), 3000);
    }
  };

  const handleSurprisePrompt = () => {
    const currentIdeas = getIdeasForCategoryAndRelationship(selectedCategory, selectedRelationship);
    if (currentIdeas.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentIdeas.length);
      setCustomText(currentIdeas[randomIndex][lang]);
    }
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert("Security Guardrail: File size exceeds 15MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedMediaObj = {
          name: file.name,
          type: file.type.startsWith("video") ? "video" : "image",
          url: event.target.result
        };

        setAttachedMedia(uploadedMediaObj);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setAttachedMedia(null);
  };

  const handleStageToCanvas = () => {
    const stagedCard = {
      id: Date.now(),
      category: selectedCategory,
      relationship: selectedRelationship,
      style: selectedStyle,
      to: toName,
      from: fromName,
      text: customText || (lang === "zh" ? selectedPreset.zhTitle : selectedPreset.title),
      url: selectedPreset.url,
      fallback: selectedPreset.fallback,
      media: attachedMedia,
      faceSwapActive: enableFaceSwap
    };
    setActiveCard(stagedCard);
    setHistory((prev) => [stagedCard, ...prev.slice(0, 4)]);
  };

  const downloadImprintedCard = () => {
    if (!activeCard) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 900;

    const drawTextOverlays = () => {
      const gradient = ctx.createLinearGradient(0, 500, 0, 900);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 500, 1200, 400);

      if (activeCard.to) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "italic bold 36px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`To: ${activeCard.to}`, 600, 710);
      }

      ctx.fillStyle = "#fde68a";
      ctx.font = "bold 38px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`"${activeCard.text}"`, 600, 775);

      if (activeCard.from) {
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "semibold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`— ${activeCard.from}`, 600, 835);
      }
    };

    const isVideo = activeCard.url?.endsWith(".mp4");

    if (isVideo && videoRef.current) {
      const videoEl = videoRef.current;
      videoEl.currentTime = 0;
      videoEl.muted = false;
      videoEl.play();

      const canvasStream = canvas.captureStream(30);

      let combinedStream = canvasStream;
      try {
        let videoAudioTrack = null;
        if (videoEl.captureStream) {
          videoAudioTrack = videoEl.captureStream().getAudioTracks()[0];
        } else if (videoEl.mozCaptureStream) {
          videoAudioTrack = videoEl.mozCaptureStream().getAudioTracks()[0];
        }

        if (!videoAudioTrack) {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioCtx.createMediaElementSource(videoEl);
          const destination = audioCtx.createMediaStreamDestination();
          source.connect(destination);
          source.connect(audioCtx.destination);
          videoAudioTrack = destination.stream.getAudioTracks()[0];
        }

        if (videoAudioTrack) {
          combinedStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            videoAudioTrack
          ]);
        }
      } catch (err) {
        console.warn("Audio capture fallback triggered:", err);
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") 
        ? "video/webm;codecs=vp9,opus" 
        : "video/webm";

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType });
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const link = document.createElement("a");
        link.download = `GreetingAI_${activeCard.category.replace(/\s+/g, "_")}.webm`;
        link.href = URL.createObjectURL(blob);
        link.click();
      };

      mediaRecorder.start();

      let animId;
      const renderFrame = () => {
        if (!videoEl.paused && !videoEl.ended) {
          const styleObj = t.styles.find((s) => s.key === activeCard.style);
          if (styleObj) ctx.filter = styleObj.cssFilter;
          ctx.drawImage(videoEl, 0, 0, 1200, 900);
          ctx.filter = "none";
          drawTextOverlays();
          animId = requestAnimationFrame(renderFrame);
        }
      };

      renderFrame();

      const durationMs = videoEl.duration && !isNaN(videoEl.duration) ? videoEl.duration * 1000 : 15000;

      const stopRecording = () => {
        cancelAnimationFrame(animId);
        if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
        videoEl.removeEventListener("ended", stopRecording);
      };

      videoEl.addEventListener("ended", stopRecording);
      setTimeout(stopRecording, durationMs + 200);

      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = activeCard.url;
    img.onerror = () => {
      img.src = activeCard.fallback || createPlaceholder(activeCard.category);
    };

    img.onload = () => {
      const styleObj = t.styles.find((s) => s.key === activeCard.style);
      if (styleObj) ctx.filter = styleObj.cssFilter;

      ctx.drawImage(img, 0, 0, 1200, 900);
      ctx.filter = "none";
      drawTextOverlays();

      const link = document.createElement("a");
      link.download = `GreetingAI_${activeCard.category.replace(/\s+/g, "_")}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    };
  };

  const handleGenerateCard = async () => {
    if (credits <= 0) {
      alert(t.sessionExpired);
      return;
    }

    setIsGenerating(true);

    try {
      let finalVideoUrl = selectedPreset.url;

      // Execute AI Face Swap API call if enabled and photo is attached
      if (enableFaceSwap && attachedMedia) {
        const response = await fetch("/api/face-swap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceImage: attachedMedia.url,
            targetVideoUrl: selectedPreset.url,
          }),
        });

        const resData = await response.json();
        if (resData.swappedVideoUrl) {
          finalVideoUrl = resData.swappedVideoUrl;
        }
      }

      const generatedCard = {
        id: Date.now(),
        category: selectedCategory,
        relationship: selectedRelationship,
        style: selectedStyle,
        to: toName,
        from: fromName,
        text: customText || (lang === "zh" ? selectedPreset.zhTitle : selectedPreset.title),
        url: finalVideoUrl,
        fallback: selectedPreset.fallback,
        media: attachedMedia,
        faceSwapActive: enableFaceSwap
      };

      setActiveCard(generatedCard);
      setHistory((prev) => [generatedCard, ...prev.slice(0, 4)]);
      setCredits((prev) => Math.max(0, prev - 1));
      setIsGenerating(false);

      setTimeout(() => downloadImprintedCard(), 400);
    } catch (err) {
      console.error("Card generation error:", err);
      setIsGenerating(false);
    }
  };

  const activeStyleObj = t.styles.find((s) => s.key === selectedStyle);

  const getDisplayCatName = (catKey) => {
    return lang === "zh" ? FESTIVE_DATA[catKey]?.zhTitle || catKey : catKey;
  };

  // Get current active 5 preset videos corresponding to selected category & relationship
  const activePresets = getActivePresetsForCategoryAndRelationship(selectedCategory, selectedRelationship);

  // Get current active prompt suggestions corresponding to selected category & relationship
  const activeIdeas = getIdeasForCategoryAndRelationship(selectedCategory, selectedRelationship);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 md:pb-16 text-lg">
      <style jsx global>{`
        @keyframes aiMotionLoop {
          0% { transform: scale(1) translate(0px, 0px); filter: brightness(105%) contrast(110%); }
          25% { transform: scale(1.06) translate(-4px, -3px); filter: brightness(115%) contrast(115%); }
          50% { transform: scale(1.11) translate(4px, 2px); filter: brightness(120%) contrast(120%); }
          75% { transform: scale(1.05) translate(-2px, 3px); filter: brightness(110%) contrast(112%); }
          100% { transform: scale(1) translate(0px, 0px); filter: brightness(105%) contrast(110%); }
        }
        .ai-motion-video {
          animation: aiMotionLoop 5s ease-in-out infinite alternate;
        }
      `}</style>
      <canvas ref={canvasRef} className="hidden" />

      {/* APP HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-7 w-7 text-amber-400" />
            <span className="font-extrabold text-xl md:text-3xl tracking-tight text-white">{t.title}</span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-base font-bold flex items-center space-x-2">
              <span className="text-slate-300 hidden sm:inline">{t.creditsLeft}:</span>
              <span className={`px-3 py-1 rounded-full text-base font-mono font-bold ${credits > 0 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"}`}>
                {credits} / 5
              </span>
            </div>

            <button
              onClick={() => {
                const newLang = lang === "en" ? "zh" : "en";
                setLang(newLang);
                const currentIdeas = getIdeasForCategoryAndRelationship(selectedCategory, selectedRelationship);
                if (currentIdeas.length > 0) {
                  setCustomText(currentIdeas[0][newLang]);
                }
              }}
              className="flex items-center space-x-2 bg-indigo-900/50 border border-indigo-700/60 hover:bg-indigo-800/80 px-4 py-2 rounded-xl text-base font-bold text-indigo-200 transition"
            >
              <Globe className="h-5 w-5" />
              <span>{lang === "en" ? "繁體中文" : "English"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8 space-y-8 md:space-y-10">
        {/* HERO SHOWCASE REEL */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Mobile-Optimized Experience</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{t.heroDesc}</p>
          </div>

          <div className="lg:col-span-7 bg-black rounded-2xl border border-slate-800 overflow-hidden relative aspect-video flex items-center justify-center shadow-2xl">
            <iframe 
              src="https://www.youtube.com/embed/O0HdWMBXVVI?controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3" 
              title="GreetingAI Studio Official Introductory Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              className="w-full h-full border-0"
            />
          </div>
        </section>

        {/* WORKSPACE GRID */}
        <section className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-7">
            
            {/* 1. EVENT SELECTION */}
            <div>
              <label className="block text-base font-extrabold uppercase tracking-wider text-slate-200 mb-4">{t.categoryTitle}</label>
              
              {/* Event Category Swift Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {t.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`p-3.5 text-sm font-bold rounded-xl border text-left transition ${
                      selectedCategory === cat ? "border-indigo-500 bg-indigo-500/20 text-white shadow-lg ring-2 ring-indigo-500/40" : "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {getDisplayCatName(cat)}
                  </button>
                ))}
              </div>

              {/* STEP 1 ADD-ON: RELATIONSHIP SELECTOR SWIFT BAR */}
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2.5 mb-5">
                <label className="block text-xs font-bold text-amber-300 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{t.relationshipSelectorTitle}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(t.relationships).map((relKey) => (
                    <button
                      key={relKey}
                      onClick={() => handleRelationshipChange(relKey)}
                      className={`p-2.5 text-xs font-bold rounded-lg border text-center transition ${
                        selectedRelationship === relKey
                          ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow ring-1 ring-amber-400/40"
                          : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {t.relationships[relKey]}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: DYNAMIC 5-PRESET SLOT POP-UP WINDOWS */}
              <label className="block text-sm font-bold text-slate-300 mb-3">
                {t.presetHeaderLabel}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {activePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition relative ${
                      selectedPreset.id === preset.id ? "border-amber-400 ring-4 ring-amber-400/30 scale-105" : "border-slate-800 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <video 
                      src={preset.url} 
                      autoPlay 
                      muted 
                      playsInline 
                      crossOrigin="anonymous" 
                      onLoadedData={(e) => e.currentTarget.play()} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. STYLE SELECTION & AI ENHANCEMENTS */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-base font-extrabold uppercase tracking-wider text-slate-200">{t.styleTitle}</label>
                {styleNotification && (
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full animate-pulse">
                    {styleNotification}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {t.styles.map((styleObj) => (
                  <button
                    key={styleObj.key}
                    onClick={() => handleStyleSelect(styleObj.key)}
                    className={`p-3.5 text-sm font-bold rounded-xl border text-left transition flex items-center justify-between ${
                      selectedStyle === styleObj.key ? "border-indigo-500 bg-indigo-500/20 text-white shadow ring-2 ring-indigo-500/40" : "border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      {styleObj.key === "Motion5s" && <Film className="h-4 w-4 text-amber-400 shrink-0" />}
                      <span>{styleObj.label}</span>
                    </span>
                    {selectedStyle === styleObj.key && <Check className="h-5 w-5 text-amber-400" />}
                  </button>
                ))}
              </div>

              {/* STAGE DRAFT BUTTON */}
              <button
                onClick={handleStageToCanvas}
                className="w-full py-3.5 border border-indigo-500/60 bg-indigo-950/60 hover:bg-indigo-900/80 text-amber-300 rounded-xl font-bold text-base flex items-center justify-center space-x-2 transition shadow-md"
              >
                <Layers className="h-5 w-5 text-amber-400" />
                <span>{t.stageBtn}</span>
              </button>
            </div>

            {/* 3. MULTI-FIELD PERSONALIZATION INPUTS */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="block text-base font-extrabold uppercase tracking-wider text-slate-200">{t.msgTitle}</label>
                <button
                  onClick={handleSurprisePrompt}
                  className="text-xs font-bold text-indigo-300 hover:text-indigo-200 bg-indigo-950 border border-indigo-800 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition"
                >
                  <Wand2 className="h-4 w-4 text-amber-400" />
                  <span>{t.surpriseBtn}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t.toLabel}</label>
                  <input
                    type="text"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder={t.toPlaceholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-base font-semibold text-amber-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t.fromLabel}</label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder={t.fromPlaceholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-base font-semibold text-amber-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-indigo-300 mb-2">{t.ideasTitle}</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                  {activeIdeas.map((ideaObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomText(ideaObj[lang])}
                      className={`w-full text-left p-3 rounded-xl text-sm border transition truncate ${
                        customText === ideaObj[lang] ? "border-amber-400 bg-amber-500/10 text-white font-bold" : "bg-slate-950 border-slate-800 hover:border-indigo-500/50 text-slate-300"
                      }`}
                    >
                      💡 {ideaObj[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={t.msgPlaceholder}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-base font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />

              {/* FACE-SWAP TOGGLE & PHOTO UPLOAD */}
              <div className="space-y-3 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                    <UserCheck className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{t.faceSwapToggleLabel}</span>
                  </span>
                  <input 
                    type="checkbox"
                    checked={enableFaceSwap}
                    onChange={(e) => setEnableFaceSwap(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900 border border-slate-700 hover:border-slate-600 p-3.5 rounded-xl text-sm font-semibold text-slate-300 flex items-center justify-between">
                  <label className="flex items-center space-x-3 truncate cursor-pointer flex-1">
                    <Upload className="h-5 w-5 text-indigo-400 shrink-0" />
                    <span className="truncate">{attachedMedia ? `Attached: ${attachedMedia.name}` : t.faceSwapUploadLabel}</span>
                    <input type="file" accept="image/*" onChange={handleMediaUpload} className="hidden" />
                  </label>
                  {attachedMedia && (
                    <button
                      onClick={handleRemoveMedia}
                      title="Remove custom media"
                      className="ml-2 p-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/40 rounded-lg transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-start space-x-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.disclaimer}</span>
              </div>
            </div>

            {/* ACTION GENERATE BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleGenerateCard}
                disabled={isGenerating || credits <= 0}
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center space-x-2 transition ${
                  credits > 0 ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl" : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                {isGenerating ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5 text-yellow-300" />}
                <span>{isGenerating ? "Synthesizing AI..." : t.generateBtn}</span>
              </button>
            </div>
          </div>

          {/* MAIN CANVAS TV SCREEN */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative">
              <div className="w-full h-[460px] sm:h-[520px] bg-black rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-800">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center space-y-4 text-amber-300">
                    <RefreshCw className="h-12 w-12 animate-spin text-indigo-400" />
                    <p className="text-base font-bold tracking-widest uppercase text-center px-4">
                      {enableFaceSwap && attachedMedia 
                        ? "AI Detecting Faces & Synthesizing Facial-Swap Video..." 
                        : "Synthesizing AI Card & Imprinting Text..."}
                    </p>
                  </div>
                ) : activeCard ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
                    
                    {activeCard.url?.endsWith(".mp4") ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video 
                          ref={videoRef}
                          src={activeCard.url} 
                          autoPlay 
                          playsInline 
                          crossOrigin="anonymous" 
                          onLoadedData={(e) => e.currentTarget.play()} 
                          style={{ filter: activeStyleObj ? activeStyleObj.cssFilter : "none" }}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            activeCard.style === "Motion5s" ? "ai-motion-video" : ""
                          }`} 
                        />
                        <button
                          onClick={toggleVideoPlayback}
                          className="absolute top-4 left-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur z-30 transition border border-white/30"
                        >
                          {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                      </div>
                    ) : (
                      <img 
                        src={activeCard.url} 
                        onError={(e) => { e.target.src = activeCard.fallback || createPlaceholder(activeCard.category); }}
                        alt="Composed Greeting Card" 
                        style={{ filter: activeStyleObj ? activeStyleObj.cssFilter : "none" }}
                        className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                          activeCard.style === "Motion5s" ? "ai-motion-video" : ""
                        }`} 
                      />
                    )}

                    {/* Text Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                      <div className="text-center space-y-2 drop-shadow-lg pb-2">
                        {activeCard.to && (
                          <p className="text-base sm:text-xl font-bold text-white italic">
                            To: {activeCard.to}
                          </p>
                        )}
                        <p className="text-lg sm:text-3xl font-extrabold text-amber-200 tracking-wide leading-snug">
                          "{activeCard.text}"
                        </p>
                        {activeCard.from && (
                          <p className="text-base sm:text-lg font-bold text-slate-300">
                            — {activeCard.from}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-600 space-y-3">
                    <Play className="h-16 w-16 mx-auto opacity-40" />
                    <p className="text-base font-semibold">Your staged AI card will render on this main TV screen</p>
                  </div>
                )}
              </div>
            </div>

            {activeCard && (
              <button
                onClick={downloadImprintedCard}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 rounded-xl flex items-center justify-center space-x-3 transition shadow-xl text-base w-full"
              >
                <Download className="h-6 w-6" />
                <span>{t.downloadBtn}</span>
              </button>
            )}

            {/* MINI TV TRAYS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">{t.recentTitle}</h3>
              <div className="grid grid-cols-5 gap-3">
                {[...Array(5)].map((_, index) => {
                  const card = history[index];
                  const isCardVideo = card?.url?.endsWith(".mp4");
                  return (
                    <div
                      key={index}
                      onClick={() => card && setActiveCard(card)}
                      className={`aspect-video rounded-xl border-2 overflow-hidden bg-slate-900 transition relative flex items-center justify-center ${
                        card ? "border-indigo-500 hover:border-amber-400 cursor-pointer shadow-md" : "border-slate-800 opacity-30 cursor-default"
                      }`}
                    >
                      {card ? (
                        <div className="relative w-full h-full">
                          {isCardVideo ? (
                            <video 
                              src={card.url} 
                              autoPlay 
                              muted 
                              playsInline 
                              crossOrigin="anonymous" 
                              onLoadedData={(e) => e.currentTarget.play()} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <img 
                              src={card.url} 
                              onError={(e) => { e.target.src = card.fallback || createPlaceholder(card.category); }}
                              alt="Mini TV preview" 
                              className="w-full h-full object-cover" 
                            />
                          )}
                          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-1.5">
                            <p className="text-[10px] font-bold text-amber-300 truncate text-center leading-tight">
                              {card.to ? `To: ${card.to}` : card.text}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono font-bold">
                          TV #{index + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}