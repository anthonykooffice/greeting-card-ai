import './globals.css';

export const metadata = {
  title: 'GreetingAI Studio',
  description: 'AI-Powered Personalized Greeting Cards',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="antialiased bg-slate-100 text-slate-800">
        {children}
      </body>
    </html>
  );
}