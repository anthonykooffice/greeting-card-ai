import { 
  Playfair_Display, 
  Great_Vibes, 
  Dancing_Script, 
  Cinzel_Decorative, 
  Montserrat 
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: "swap"
});

const greatVibes = Great_Vibes({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-script",
  display: "swap"
});

const dancing = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-hand",
  display: "swap"
});

const cinzel = Cinzel_Decorative({ 
  weight: ["400", "700"], 
  subsets: ["latin"], 
  variable: "--font-display",
  display: "swap"
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap"
});

export const metadata = {
  title: "GreetingAI Studio",
  description: "Craft personalized AI greeting cards and videos",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${greatVibes.variable} ${dancing.variable} ${cinzel.variable} ${montserrat.variable}`}
    >
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}