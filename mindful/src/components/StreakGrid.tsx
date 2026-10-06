import useStreakStore from "../store/useStreakStore";

const StreakGrid = () => {
  const streakDays = useStreakStore((state) => state.streakDays);
  const currentStreak = useStreakStore((state) => state.currentStreak);
  const longestStreak = useStreakStore((state) => state.longestStreak);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          this month's streak
        </p>
        <div className="flex gap-3">
          <span className="text-xs text-orange-400">
            🔥 {currentStreak} day streak
          </span>
          <span className="text-xs text-gray-500">best: {longestStreak}</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {streakDays.map((day) => {
          // ✅ parse date parts directly — timezone safe
          const [, , day2] = day.date.split("-");
          const dayNum = parseInt(day2);
          const isToday = day.date === new Date().toISOString().split("T")[0];
          const boxColor =
            day.status === "met"
              ? "bg-green-800 border-green-600 text-green-300"
              : day.status === "partial"
                ? "bg-yellow-900 border-yellow-700 text-yellow-400"
                : "bg-green-950 border-green-900 text-gray-600";

          return (
            <div
              key={day.date}
              className={`aspect-square rounded-md border flex items-center justify-center text-xs ${boxColor} ${isToday ? "ring-2 ring-green-400" : ""}`}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakGrid;
