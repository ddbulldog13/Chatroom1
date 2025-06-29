
import React, { useState } from 'react';
import { BusterGuard } from './bots/busterGuard';

const getBubbleClass = user =>
  user === 'You'
    ? 'bg-blue-500 text-white self-end'
    : user === 'Guard'
      ? 'bg-yellow-200 text-yellow-900 border border-yellow-400 self-start'
      : 'bg-gray-200 text-gray-900 self-start';

export default function App() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [dark, setDark] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const buster = new BusterGuard();

  const handleSend = () => {
    if (!message.trim()) return;
    const warning = buster.scanMessage(message);
    const newChat = [...chat, { user: 'You', text: message }];
    if (warning) {
      newChat.push({ user: 'Guard', text: warning.message });
    }
    setChat(newChat);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors bg-gray-100 dark:bg-gray-900`}>
      <div className="w-full max-w-md shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AI Community Hub Chat</h1>
          <button
            aria-label="Toggle theme"
            className="ml-2 text-xl px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700"
            onClick={() => setDark(!dark)}
          >
            {dark ? '🌞' : '🌙'}
          </button>
        </div>
        <div className="flex flex-col gap-2 min-h-[240px] max-h-72 overflow-y-auto px-1 py-2 mb-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition">
          {chat.length === 0 && (
            <div className="text-gray-400 text-center">Say something to start the chat!</div>
          )}
          {chat.map((entry, i) => (
            <div
              key={i}
              className={`flex flex-col ${entry.user === 'You' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm max-w-[80%] mb-0.5 ${getBubbleClass(entry.user)}`}
              >
                <span className="text-xs font-semibold mr-2">{entry.user}:</span>
                <span>{entry.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            Send
          </button>
        </div>
      </div>
      <footer className="text-xs text-gray-400 mb-3">
        Powered by Vite + React + Tailwind. <a href="https://f614.short.gy/Code" className="underline">Try a new GPT!</a>
      </footer>
    </div>
  );
}
