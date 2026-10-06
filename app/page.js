/* ============================================================================
   FILE PATH: app/page.js
   DESCRIPTION: GreetingAI Studio with Dynamic Native Media Formatting.
                Stops spoofing WebM as MP4 on Android to prevent WhatsApp 
                audio stripping and OS-level "Cannot process video" crashes.
   ============================================================================ */

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
  Type, 
  Share2, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  CheckCircle2, 
  FileVideo 
} from "lucide-react";

const createPlaceholder = (title, bgColor = "%231e293b", textColor = "%23ffd700") => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="${bgColor}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="36" font-weight="bold" fill="${textColor}">${encodeURIComponent(title)}</text></svg>`;

const ORDERED_CATEGORIES = [
  "Happy Birthday",
  "Happy Valentine's Day",
  "Happy Easter",
  "Happy Mother's Day",
  "Happy Father's Day",
  "Happy Mid-Autumn Festival",
  "Merry Christmas",
  "Happy New Year",
  "Happy Chinese New Year"
];

const FONT_OPTIONS = [
  { id: "serif", label: "Classic Serif (典雅報刊)", cssVar: "var(--font-serif), serif", family: "'Playfair Display', serif" },
  { id: "script", label: "Cursive Script (浪漫情書)", cssVar: "var(--font-script), cursive", family: "'Great Vibes', cursive" },
  { id: "hand", label: "Playful Brush (歡樂手寫)", cssVar: "var(--font-hand), cursive", family: "'Dancing Script', cursive" },
  { id: "display", label: "Luxury Display (尊貴奢華)", cssVar: "var(--font-display), serif", family: "'Cinzel Decorative', serif" },
  { id: "sans", label: "Modern Sans (現代清晰)", cssVar: "var(--font-sans), sans-serif", family: "'Montserrat', sans-serif" }
];

const FESTIVE_DATA = {
  "Happy Birthday": {
    zhTitle: "祝生日快樂",
    heroImage: "/assets/Happy-Birthday/Happy-Birthday-1-1.mp4",
    heroFallback: createPlaceholder("Happy Birthday Celebration", "%233b82f6"),
    themeColor: "from-amber-500/40 via-purple-600/30 to-pink-500/40",
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
    ideas: [
      { en: "Wishing you a year filled with joy, laughter, and endless success!", zh: "願新的一年充滿歡樂、笑聲與無限成功！" },
      { en: "May all your dreams come true on this special day. Happy Birthday!", zh: "願你在這特別的日子裡美夢成真，生日快樂！" },
      { en: "Cheers to another year of amazing memories and fantastic adventures!", zh: "為又一年的精彩回憶與美好冒險乾杯！" },
      { en: "Sending you oceans of love and happiness on your birthday!", zh: "送上無盡的愛與幸福，祝你生日快樂！" },
      { en: "May your day be as bright and wonderful as your beautiful smile!", zh: "願你的心情如你燦爛的笑容般明亮美好！" }
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
    heroDesc: "Transform festive moments into personalized cards & video greetings. Tap an event, pick a style, enter custom names and greetings, and stage your card onto the Canvas.",
    categoryTitle: "1. EVENT SELECTION (Presets per Category)",
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
    downloadBtn: "Download Imprinted Video Card",
    shareBtn: "Direct Share via WhatsApp / WeChat",
    creditsLeft: "Free Trial Credits",
    sessionExpired: "0/5 Free Trial Credits Expired",
    recentTitle: "TEMPORARY CANVAS MINI TV TRAYS (Imprinted Holdings)",
    disclaimer: "Legal Guardrail: Uploaded reference media are processed in browser memory and temporary runtime only. No local device folders are accessed.",
    categories: ORDERED_CATEGORIES,
    styles: [
      { key: "Photo", label: "4K Photorealistic", badge: "📷 4K Photo Style Active", cssFilter: "contrast(110%) brightness(105%) saturate(110%)" },
      { key: "Paint", label: "Hand-Painted Oil Art", badge: "🎨 Hand-Painted Oil Style Active", cssFilter: "saturate(180%) sepia(40%) contrast(135%) brightness(105%)" },
      { key: "Picasso", label: "Picasso Pop-Art", badge: "🖼️ Picasso Pop-Art Active", cssFilter: "hue-rotate(90deg) saturate(220%) contrast(145%)" },
      { key: "Motion5s", label: "5-Sec AI Motion Video", badge: "🎬 5-Sec AI Motion Loop Active", cssFilter: "brightness(115%) contrast(125%) saturate(135%)" }
    ]
  },
  zh: {
    title: "GreetingAI 賀卡工作室",
    heroTitle: "用 AI 為每一張賀卡注入魔力",
    heroDesc: "將節日時刻轉化為個性化賀卡與動態影片。點擊主題、選擇視覺風格、填入收件人與自訂祝福語，並即時將印製賀卡暫存至畫布。",
    categoryTitle: "1. 選擇賀卡主題 (每類含預設設計)",
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
    downloadBtn: "下載已印製文字之影片至本機",
    shareBtn: "一鍵分享至 WhatsApp / 微信",
    creditsLeft: "免費試用額度",
    sessionExpired: "5次免費試用額度已用完",
    recentTitle: "暫存迷你電視畫布 (已印製文字紀錄區)",
    disclaimer: "安全與法律聲明：您選擇上傳的參考媒體僅在瀏覽器內存與臨時 AI 雲端傳輸處理，本系統絕不會存取或洩漏您個人裝置中的檔案。",
    categories: ORDERED_CATEGORIES,
    styles: [
      { key: "Photo", label: "4K 寫實相片 (Photo)", badge: "📷 4K 寫實風格已套用", cssFilter: "contrast(110%) brightness(105%) saturate(110%)" },
      { key: "Paint", label: "油畫手繪 (Hand-Paint)", badge: "🎨 復古油畫風格已套用", cssFilter: "saturate(180%) sepia(40%) contrast(135%) brightness(105%)" },
      { key: "Picasso", label: "畢加索普普風 (Picasso)", badge: "🖼 畢加索風格已套用", cssFilter: "hue-rotate(90deg) saturate(220%) contrast(145%)" },
      { key: "Motion5s", label: "5秒 AI 動態影片 (5s Motion)", badge: "🎬 5秒 AI 動態影片增強已套用", cssFilter: "brightness(115%) contrast(125%) saturate(135%)" }
    ]
  }
};

const drawCanvasFrame = (ctx, canvas, video, card, selectedFont, textColor, activeStyleObj) => {
  const w = canvas.width;
  const h = canvas.height;

  ctx.save();
  if (activeStyleObj && activeStyleObj.cssFilter) {
    ctx.filter = activeStyleObj.cssFilter;
  }
  ctx.drawImage(video, 0, 0, w, h);
  ctx.restore();

  const overlayH = h * 0.30;
  const overlayY = h - overlayH;
  const grad = ctx.createLinearGradient(0, overlayY, 0, h);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.35, "rgba(0,0,0,0.80)");
  grad.addColorStop(1, "rgba(0,0,0,0.95)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, overlayY, w, overlayH);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontFamily = "serif";
  if (selectedFont.id === "serif") fontFamily = "'Playfair Display', serif";
  else if (selectedFont.id === "script") fontFamily = "'Great Vibes', cursive, serif";
  else if (selectedFont.id === "hand") fontFamily = "'Dancing Script', cursive";
  else if (selectedFont.id === "display") fontFamily = "'Cinzel Decorative', serif";
  else if (selectedFont.id === "sans") fontFamily = "'Montserrat', sans-serif";

  const maxTextWidth = w * 0.88;
  const centerX = w / 2;
  const contentCenterY = overlayY + (overlayH * 0.50);

  const baseFontSize = Math.min(Math.round(w * 0.021), Math.round(overlayH * 0.16));
  const toFontSize = Math.round(baseFontSize * 0.95);
  const msgFontSize = baseFontSize;
  const fromFontSize = Math.round(baseFontSize * 0.90);

  const activeTextColor = textColor || "#ffd700";

  if (card.to) {
    ctx.font = `italic bold ${toFontSize}px ${fontFamily}`;
    ctx.fillStyle = activeTextColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
    ctx.shadowBlur = 5;
    ctx.fillText(`To: ${card.to}`, centerX, contentCenterY - msgFontSize * 1.45, maxTextWidth);
  }

  ctx.font = `bold ${msgFontSize}px ${fontFamily}`;
  ctx.fillStyle = activeTextColor;
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 6;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";

  const words = card.text ? card.text.split(" ") : ["Happy", "Birthday!"];
  let lines = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxTextWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  if (lines.length > 2) lines = lines.slice(0, 2);

  const lineHeight = msgFontSize * 1.20;
  const startY = contentCenterY - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, idx) => {
    ctx.strokeText(`"${line}"`, centerX, startY + idx * lineHeight);
    ctx.fillText(`"${line}"`, centerX, startY + idx * lineHeight);
  });

  if (card.from) {
    ctx.font = `bold ${fromFontSize}px ${fontFamily}`;
    ctx.fillStyle = activeTextColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
    ctx.shadowBlur = 5;
    ctx.fillText(`— ${card.from}`, centerX, contentCenterY + msgFontSize * 1.45, maxTextWidth);
  }
};

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  const [selectedCategory, setSelectedCategory] = useState("Happy Birthday");
  const [selectedRelationship, setSelectedRelationship] = useState("couples");
  const [selectedPreset, setSelectedPreset] = useState(FESTIVE_DATA["Happy Birthday"].relationshipPresets.couples[0]);
  const [selectedStyle, setSelectedStyle] = useState("Photo");
  
  const [toName, setToName] = useState("Dearest [Recipient Name]");
  const [fromName, setFromName] = useState("With Love [Sender Name]");
  const [customText, setCustomText] = useState(FESTIVE_DATA["Happy Birthday"].ideas[0].en);

  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [fontSize, setFontSize] = useState("text-xs sm:text-sm");
  const [textColor, setTextColor] = useState("#ffd700");

  const [credits, setCredits] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [styleNotification, setStyleNotification] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState(null);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [preparedShareData, setPreparedShareData] = useState(null);

  const initialStaged = {
    id: 1,
    category: "Happy Birthday",
    style: "Photo",
    to: toName,
    from: fromName,
    text: customText,
    fontCss: FONT_OPTIONS[0].cssVar,
    url: FESTIVE_DATA["Happy Birthday"].relationshipPresets.couples[0].url,
    fallback: FESTIVE_DATA["Happy Birthday"].relationshipPresets.couples[0].fallback,
    media: null
  };

  const [activeCard, setActiveCard] = useState(initialStaged);
  const [history, setHistory] = useState([initialStaged]);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const ensureAudioContext = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        if (!window._sharedAudioCtx) {
          window._sharedAudioCtx = new AudioContextClass();
        }
        if (window._sharedAudioCtx.state === "suspended") {
          window._sharedAudioCtx.resume();
        }
      }
    } catch (e) {
      console.warn("AudioContext wake-up exception:", e);
    }
  };

  useEffect(() => {
    setActiveCard((prev) => ({
      ...prev,
      category: selectedCategory,
      style: selectedStyle,
      to: toName,
      from: fromName,
      text: customText,
      fontCss: selectedFont.cssVar,
      url: attachedMedia ? attachedMedia.url : selectedPreset.url,
      fallback: selectedPreset.fallback,
      media: attachedMedia
    }));
  }, [selectedCategory, selectedPreset, selectedStyle, toName, fromName, customText, selectedFont, attachedMedia]);

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
    setAttachedMedia(null);

    let defaultPreset;
    if (cat === "Happy Birthday") {
      defaultPreset = FESTIVE_DATA["Happy Birthday"].relationshipPresets[selectedRelationship][0];
    } else {
      defaultPreset = FESTIVE_DATA[cat].presets[0];
    }
    
    setSelectedPreset(defaultPreset);
    setActiveCard((prev) => ({
      ...prev,
      category: cat,
      url: defaultPreset.url,
      fallback: defaultPreset.fallback
    }));

    if (FESTIVE_DATA[cat]?.ideas.length > 0) {
      setCustomText(FESTIVE_DATA[cat].ideas[0][lang]);
    }
  };

  const handleRelationshipChange = (rel) => {
    setSelectedRelationship(rel);
    const newPreset = FESTIVE_DATA["Happy Birthday"].relationshipPresets[rel][0];
    setSelectedPreset(newPreset);
    setAttachedMedia(null);
    setActiveCard((prev) => ({
      ...prev,
      url: newPreset.url,
      fallback: newPreset.fallback
    }));
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    setAttachedMedia(null);
    setActiveCard((prev) => ({
      ...prev,
      url: preset.url,
      fallback: preset.fallback
    }));
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
    const currentIdeas = FESTIVE_DATA[selectedCategory].ideas;
    const randomIndex = Math.floor(Math.random() * currentIdeas.length);
    setCustomText(currentIdeas[randomIndex][lang]);
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
        setActiveCard((prev) => ({ ...prev, media: uploadedMediaObj, url: event.target.result }));
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
      style: selectedStyle,
      to: toName,
      from: fromName,
      text: customText || (lang === "zh" ? selectedPreset.zhTitle : selectedPreset.title),
      fontCss: selectedFont.cssVar,
      url: attachedMedia ? attachedMedia.url : selectedPreset.url,
      fallback: selectedPreset.fallback,
      media: attachedMedia
    };
    setActiveCard(stagedCard);
    setHistory((prev) => [stagedCard, ...prev.slice(0, 4)]);
  };

  const generateImprintedFile = async () => {
    const video = videoRef.current;
    if (!video) throw new Error("Video stream reference not ready.");

    video.currentTime = 0;
    const previousMuteState = video.muted;
    video.muted = false;
    video.volume = 1.0;

    if (video.paused) {
      await video.play().catch(() => {});
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;
    const ctx = canvas.getContext("2d");

    const canvasStream = canvas.captureStream(30);

    let audioTrack = null;
    
    try {
      if (typeof video.captureStream === "function") {
        const vStream = video.captureStream();
        if (vStream && vStream.getAudioTracks().length > 0) {
          audioTrack = vStream.getAudioTracks()[0];
          audioTrack.enabled = true; 
        }
      }
    } catch (e) {
      console.warn("Direct video captureStream audio notice:", e);
    }

    if (!audioTrack) {
      try {
        if (window._sharedAudioCtx) {
          const audioCtx = window._sharedAudioCtx;
          
          if (!video._mediaElementSource) {
            video.crossOrigin = "anonymous";
            video._mediaElementSource = audioCtx.createMediaElementSource(video);
          }
          
          const audioDest = audioCtx.createMediaStreamDestination();
          video._mediaElementSource.disconnect();
          video._mediaElementSource.connect(audioDest);
          video._mediaElementSource.connect(audioCtx.destination);
          
          if (audioDest.stream.getAudioTracks().length > 0) {
            audioTrack = audioDest.stream.getAudioTracks()[0];
            audioTrack.enabled = true;
          }
        }
      } catch (webAudioErr) {
        console.warn("WebAudio capture fallback notice:", webAudioErr);
      }
    }

    if (audioTrack) {
      canvasStream.addTrack(audioTrack);
    }

    // Dynamic Native Formatting: Check true browser support instead of spoofing
    const getMimeType = () => {
      if (typeof window !== "undefined" && window.MediaRecorder) {
        // iOS Safari Native Support
        if (MediaRecorder.isTypeSupported("video/mp4")) {
          return "video/mp4";
        }
        // Android Chrome Native Support
        const webmTypes = [
          "video/webm;codecs=vp8,opus",
          "video/webm;codecs=vp9,opus",
          "video/webm"
        ];
        for (const type of webmTypes) {
          if (MediaRecorder.isTypeSupported(type)) return type;
        }
      }
      return "video/webm";
    };

    const mimeType = getMimeType();
    
    // Assign proper extension based on ACTUAL native capabilities
    const isMp4 = mimeType.includes("mp4");
    const ext = isMp4 ? "mp4" : "webm";
    const baseMimeType = isMp4 ? "video/mp4" : "video/webm";

    const recorder = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: 2500000 });
    const chunks = [];

    return new Promise((resolve) => {
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        video.muted = previousMuteState;
        
        const blob = new Blob(chunks, { type: mimeType });
        
        // CRITICAL FIX: The file extension and File MIME type MUST match the blob.
        // Android will output a true `.webm` file here instead of a disguised `.mp4`,
        // preventing the media scanner crash and preserving the audio track in WhatsApp.
        const fileName = `GreetingAI_${activeCard.category.replace(/\s+/g, "_")}_${Date.now()}.${ext}`;
        const file = new File([blob], fileName, { type: baseMimeType });
        
        resolve({ blob, file, fileName });
      };

      recorder.start();

      const recDuration = (video.duration && isFinite(video.duration) && video.duration > 0) 
        ? video.duration * 1000 
        : 15000;

      const startTime = Date.now();

      const loop = () => {
        const elapsed = Date.now() - startTime;
        setDownloadProgress(Math.min(99, Math.round((elapsed / recDuration) * 100)));

        if (elapsed >= recDuration) {
          recorder.stop();
        } else {
          drawCanvasFrame(ctx, canvas, video, activeCard, selectedFont, textColor, activeStyleObj);
          requestAnimationFrame(loop);
        }
      };

      requestAnimationFrame(loop);
    });
  };

  const handleDirectDownload = async () => {
    if (!activeCard) return;
    ensureAudioContext(); 
    
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const { blob, fileName } = await generateImprintedFile();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.log("Canvas fallback trigger:", err);
      const link = document.createElement("a");
      link.href = activeCard.url;
      link.download = `GreetingAI_Card.mp4`;
      link.click();
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const buildShareCaption = (card, lang) => {
    const dateStr = new Date().toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const catTitle = lang === "zh" ? (FESTIVE_DATA[card.category]?.zhTitle || card.category) : card.category;
    const toText = card.to ? (lang === "zh" ? `致 ${card.to}` : `to ${card.to}`) : "";
    const fromText = card.from ? (lang === "zh" ? `祝福來自：${card.from}` : `Greeting from ${card.from}`) : "";
    const dateText = lang === "zh" ? `日期：${dateStr}` : `Date: ${dateStr}`;

    const line1 = "GreetingAI Studio";
    const line2 = `${catTitle} ${toText}`.trim();
    const line3 = fromText;
    const line4 = dateText;

    return `${line1}\n${line2}\n${line3}\n${line4}`.trim();
  };

  const handleShare = async () => {
    if (!activeCard) return;
    ensureAudioContext(); 

    setIsSharing(true);
    setDownloadProgress(0);

    try {
      const { file, blob, fileName } = await generateImprintedFile();
      const shareCaption = buildShareCaption(activeCard, lang);
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareCaption)}`;

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareCaption).catch(() => {});
      }

      setPreparedShareData({
        file,
        blob,
        fileName,
        shareCaption,
        whatsappUrl
      });
      setShareModalOpen(true);
    } catch (err) {
      console.log("Share sheet unhandled:", err);
    } finally {
      setIsSharing(false);
      setDownloadProgress(0);
    }
  };

  const handleGenerateCard = async () => {
    if (credits <= 0) {
      alert(t.sessionExpired);
      return;
    }
    
    ensureAudioContext(); 
    setIsGenerating(true);

    setTimeout(() => {
      const generatedCard = {
        id: Date.now(),
        category: selectedCategory,
        style: selectedStyle,
        to: toName,
        from: fromName,
        text: customText || (lang === "zh" ? selectedPreset.zhTitle : selectedPreset.title),
        fontCss: selectedFont.cssVar,
        url: attachedMedia ? attachedMedia.url : selectedPreset.url,
        fallback: selectedPreset.fallback,
        media: attachedMedia
      };

      setActiveCard(generatedCard);
      setHistory((prev) => [generatedCard, ...prev.slice(0, 4)]);
      setCredits((prev) => Math.max(0, prev - 1));
      setIsGenerating(false);

      setTimeout(() => handleDirectDownload(), 300);
    }, 1200);
  };

  const activeStyleObj = t.styles.find((s) => s.key === selectedStyle);

  const getDisplayCatName = (catKey) => {
    return lang === "zh" ? FESTIVE_DATA[catKey]?.zhTitle || catKey : catKey;
  };

  const currentPresets = selectedCategory === "Happy Birthday" 
    ? FESTIVE_DATA["Happy Birthday"].relationshipPresets[selectedRelationship]
    : FESTIVE_DATA[selectedCategory].presets;

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

      {/* SHARE ACTION MODAL */}
      {shareModalOpen && preparedShareData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 text-emerald-400">
              <CheckCircle2 className="h-8 w-8 shrink-0" />
              <div>
                <h3 className="text-lg font-extrabold text-white">E-Card Video Ready to Share!</h3>
                <p className="text-xs text-slate-300">Video downloaded & caption copied.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-amber-300 flex items-center space-x-1">
                <FileVideo className="h-4 w-4 text-amber-400" />
                <span>Downloaded File: {preparedShareData.fileName}</span>
              </p>
              <div className="bg-slate-900 p-2.5 rounded-lg whitespace-pre-wrap font-sans text-slate-200 border border-slate-800">
                {preparedShareData.shareCaption}
              </div>
            </div>

            <div className="bg-emerald-900/30 border border-emerald-600/50 rounded-xl p-3 flex items-start space-x-2 text-emerald-400 text-sm font-bold">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <span>✓ Video saved to device & caption copied! Tap green button below to send to WhatsApp.</span>
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={async () => {
                  try {
                    if (navigator.canShare && navigator.canShare({ files: [preparedShareData.file] })) {
                      await navigator.share({
                        title: `GreetingAI Studio - ${activeCard.category}`,
                        text: preparedShareData.shareCaption,
                        files: [preparedShareData.file]
                      });
                    } else {
                      window.open(preparedShareData.whatsappUrl, "_blank");
                    }
                  } catch (e) {
                    console.log("Native share cancelled or failed:", e);
                  }
                }}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg text-sm"
              >
                <Share2 className="h-5 w-5 shrink-0" />
                <span>Share Video File (WhatsApp / WeChat / Apps)</span>
              </button>

              <button
                onClick={() => {
                  window.open(preparedShareData.whatsappUrl, "_blank");
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition text-xs"
              >
                <MessageCircle className="h-4 w-4 text-green-400 shrink-0" />
                <span>Open WhatsApp Text Link</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-snug">
              Tip: Tap "Share Video File" above to open WhatsApp directly with the video attached!
            </p>
          </div>
        </div>
      )}

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
                setCustomText(FESTIVE_DATA[selectedCategory].ideas[0][newLang]);
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
              src="https://www.youtube.com/embed/rdF2RL8JHDc?controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3"
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
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {ORDERED_CATEGORIES.map((cat) => (
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

              {selectedCategory === "Happy Birthday" && (
                <div className="mb-5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-sm font-bold text-amber-300 mb-3">
                    Relationship Sector (for "Happy Birthday" Category) / 人際關係選擇 (適用於「祝生日快樂」類別)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "couples", en: "Couples", zh: "情侶" },
                      { id: "friends", en: "Friends", zh: "朋友" },
                      { id: "family", en: "Family", zh: "家人" },
                      { id: "colleagues", en: "Colleagues", zh: "同事" },
                      { id: "schoolmates", en: "Schoolmates", zh: "同學" }
                    ].map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => handleRelationshipChange(rel.id)}
                        className={`p-2 text-xs font-bold rounded-lg border text-center transition ${
                          selectedRelationship === rel.id
                            ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow"
                            : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        {lang === "zh" ? rel.zh : rel.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className="block text-sm font-bold text-slate-300 mb-3">
                {lang === "zh" ? "選擇 5 個主題預設設計之一：" : "Select 1 of 5 Relevant Event Presets:"}
              </label>

              <div className="grid grid-cols-5 gap-3">
                {currentPresets?.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition relative ${
                      selectedPreset.id === preset.id && !attachedMedia ? "border-amber-400 ring-4 ring-amber-400/30 scale-105" : "border-slate-800 opacity-80 hover:opacity-100"
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

              <button
                onClick={handleStageToCanvas}
                className="w-full py-3.5 border border-indigo-500/60 bg-indigo-950/60 hover:bg-indigo-900/80 text-amber-300 rounded-xl font-bold text-base flex items-center justify-center space-x-2 transition shadow-md"
              >
                <Layers className="h-5 w-5 text-amber-400" />
                <span>{t.stageBtn}</span>
              </button>
            </div>

            {/* 3. MULTI-FIELD PERSONALIZATION INPUTS & TYPOGRAPHY STUDIO */}
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
                  {FESTIVE_DATA[selectedCategory].ideas.map((ideaObj, idx) => (
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

              {/* TYPOGRAPHY STUDIO */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <span className="block text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                  <Type className="h-4 w-4" />
                  <span>Typography Studio / 精選 5 大藝術字體</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Font / 藝術字體</label>
                    <select
                      value={selectedFont.id}
                      onChange={(e) => {
                        const fontObj = FONT_OPTIONS.find(f => f.id === e.target.value);
                        if (fontObj) setSelectedFont(fontObj);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-amber-400"
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f.id} value={f.id}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Size / 大小</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-amber-400"
                    >
                      <option value="text-xs sm:text-sm">Small (精細)</option>
                      <option value="text-sm sm:text-base">Medium (標準)</option>
                      <option value="text-base sm:text-lg">Large (清晰)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Color / 顏色</label>
                    <select
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-amber-400"
                    >
                      <option value="#ffd700">Classic Gold (尊爵金)</option>
                      <option value="#ffffff">Pure White (純白)</option>
                      <option value="#f43f5e">Rose Pink (浪漫粉)</option>
                      <option value="#67e8f9">Cyan Blue (璀璨藍)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MEDIA UPLOAD */}
              <div className="bg-slate-950 border border-slate-700 hover:border-slate-600 p-3.5 rounded-xl text-sm font-semibold text-slate-300 flex items-center justify-between">
                <label className="flex items-center space-x-3 truncate cursor-pointer flex-1">
                  <Upload className="h-5 w-5 text-indigo-400 shrink-0" />
                  <span className="truncate">{attachedMedia ? `Attached: ${attachedMedia.name}` : "Upload Optional Reference Image / MP4 (Max 15MB)"}</span>
                  <input type="file" accept="image/*,video/mp4" onChange={handleMediaUpload} className="hidden" />
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
                    <p className="text-base font-bold tracking-widest uppercase">Synthesizing AI Card & Imprinting Text...</p>
                  </div>
                ) : activeCard ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
                    
                    {activeCard.url?.endsWith(".mp4") || (activeCard.media && activeCard.media.type === "video") ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video 
                          ref={videoRef}
                          src={activeCard.media ? activeCard.media.url : activeCard.url} 
                          autoPlay 
                          muted={isMuted}
                          playsInline 
                          crossOrigin="anonymous" 
                          onEnded={() => setIsVideoPlaying(false)}
                          onLoadedData={(e) => e.currentTarget.play()} 
                          style={{ filter: activeStyleObj ? activeStyleObj.cssFilter : "none" }}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            activeCard.style === "Motion5s" ? "ai-motion-video" : ""
                          }`} 
                        />
                        <div className="absolute top-4 left-4 flex items-center space-x-2 z-30">
                          <button
                            onClick={toggleVideoPlayback}
                            className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur transition border border-white/30"
                            title={isVideoPlaying ? "Pause Video" : "Play Video"}
                          >
                            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </button>
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur transition border border-white/30"
                            title={isMuted ? "Unmute Sound" : "Mute Sound"}
                          >
                            {isMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5 text-emerald-400" />}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={activeCard.media ? activeCard.media.url : activeCard.url} 
                        onError={(e) => { e.target.src = activeCard.fallback || createPlaceholder(activeCard.category); }}
                        alt="Composed Greeting Card" 
                        style={{ filter: activeStyleObj ? activeStyleObj.cssFilter : "none" }}
                        className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                          activeCard.style === "Motion5s" ? "ai-motion-video" : ""
                        }`} 
                      />
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end pb-3 px-4 pointer-events-none z-20">
                      <div className="text-center space-y-0.5 max-w-[90%] mx-auto drop-shadow-md">
                        {activeCard.to && (
                          <p 
                            style={{ 
                              fontFamily: activeCard.fontCss || selectedFont.cssVar,
                              color: textColor || "#ffd700"
                            }}
                            className={`${fontSize} font-bold italic truncate`}
                          >
                            To: {activeCard.to}
                          </p>
                        )}
                        <p 
                          style={{ 
                            color: textColor || "#ffd700",
                            fontFamily: activeCard.fontCss || selectedFont.cssVar
                          }} 
                          className={`${fontSize} font-bold tracking-tight leading-snug line-clamp-2`}
                        >
                          "{activeCard.text}"
                        </p>
                        {activeCard.from && (
                          <p 
                            style={{ 
                              fontFamily: activeCard.fontCss || selectedFont.cssVar,
                              color: textColor || "#ffd700"
                            }}
                            className={`${fontSize} font-bold truncate`}
                          >
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

            {/* DUAL ACTION BUTTONS (IMPRINTED FILE EXPORTS) */}
            {activeCard && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <button
                  onClick={handleDirectDownload}
                  disabled={isDownloading || isSharing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-3 rounded-xl flex items-center justify-center space-x-2 transition shadow-xl text-sm md:text-base w-full"
                >
                  {isDownloading ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Imprinting Text ({downloadProgress}%)</span>
                    </div>
                  ) : (
                    <>
                      <Download className="h-5 w-5 shrink-0" />
                      <span>{t.downloadBtn}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  disabled={isDownloading || isSharing}
                  className="bg-green-600 hover:bg-green-500 text-white font-extrabold py-4 px-3 rounded-xl flex items-center justify-center space-x-2 transition shadow-xl text-sm md:text-base w-full border border-green-400/30"
                >
                  {isSharing ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Preparing E-Card ({downloadProgress}%)</span>
                    </div>
                  ) : (
                    <>
                      <Share2 className="h-5 w-5 shrink-0" />
                      <span>{t.shareBtn}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* MINI TV TRAYS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">{t.recentTitle}</h3>
              <div className="grid grid-cols-5 gap-3">
                {[...Array(5)].map((_, index) => {
                  const card = history[index];
                  const isCardVideo = card?.url?.endsWith(".mp4") || (card?.media && card.media.type === "video");
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
                              src={card.media ? card.media.url : card.url} 
                              autoPlay 
                              muted 
                              playsInline 
                              crossOrigin="anonymous" 
                              onLoadedData={(e) => e.currentTarget.play()} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <img 
                              src={card.media ? card.media.url : card.url} 
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