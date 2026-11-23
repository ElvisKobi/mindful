import { useState } from "react";

const INSIGHTS = [
  {
    icon: "📉",
    text: "You used Instagram 40% less than last week. Keep it up!",
  },
  {
    icon: "⏰",
    text: "Your peak doom-scroll time is 9–11 PM. Try wind-down mode.",
  },
  { icon: "🎯", text: "You hit your screen goal 5 out of 7 days this week." },
  { icon: "💡", text: "Tuesday was your best day — only 48 mins total." },
];

const WEEKLY_DATA = [72, 48, 95, 110, 68, 130, 102];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MOODS = ["😔", "😐", "🙂", "😊", "😄"];

const Reflect = () => {
  const [journalText, setJournalText] = useState("");
  const [mood, setMood] = useState(0);

  const maxMinutes = Math.max(...WEEKLY_DATA);

  return (
    <div className="max-w-md mx-auto px-6 py-4 pb-24">
      {/* Weekly Chart */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        weekly overview
      </p>
      <div className="bg-green-950 border border-green-800 rounded-2xl p-5 mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          {DAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="flex gap-1 items-end" style={{ height: "80px" }}>
          {WEEKLY_DATA.map((mins, i) => {
            const height = Math.round((mins / maxMinutes) * 80);
            const isOver = mins > 120;
            const barColor = isOver
              ? "#e07a5f"
              : mins > 96
                ? "#f2cc8f"
                : "#8fbe8a";
            return (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${height}px`,
                  backgroundColor: barColor,
                  minHeight: "4px",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        insights
      </p>
      <div className="flex flex-col gap-3 mb-5">
        {INSIGHTS.map((insight, i) => (
          <div
            key={i}
            className="bg-green-950 border border-green-800 rounded-2xl p-4 flex gap-3 items-start"
          >
            <span className="text-xl">{insight.icon}</span>
            <p className="text-sm text-green-100 leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      {/* Journal */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        journal
      </p>
      <div className="bg-green-950 border border-green-800 rounded-2xl p-5">
        <p className="text-xs text-gray-400 mb-3">
          How did your screen time affect you today?
        </p>
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Write freely..."
          rows={4}
          className="w-full bg-green-900 border border-green-700 rounded-xl p-3 text-sm text-green-100 placeholder-gray-600 outline-none resize-none"
        />
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-gray-400">Mood:</span>
          {MOODS.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setMood(i + 1)}
              className={`text-xl transition-all ${mood === i + 1 ? "scale-125" : "opacity-50"}`}
            >
              {emoji}
            </button>
          ))}
          <button className="ml-auto bg-green-400 text-green-950 text-xs font-medium px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reflect;
