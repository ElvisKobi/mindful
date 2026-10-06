import { useState } from "react";
import TodaySummary from "../components/TodaySummary";
import PromptCard from "../components/PromptCard";
import AppList from "../components/AppList";
import StreakGrid from "../components/StreakGrid";
import BlockScreen from "../components/BlockScreen";
import { supabase } from "../lib/supabase";

const Today = () => {
  const [blockedApp, setBlockedApp] = useState("");
  const [isBlockVisible, setIsBlockVisible] = useState(false);

  const handleAppBlocked = (appName: string) => {
    setBlockedApp(appName);
    setIsBlockVisible(true);
  };

  // Inside the component add:
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-md mx-auto px-6 py-4 pb-24">
      <TodaySummary />
      <PromptCard />
      <AppList onAppBlocked={handleAppBlocked} />
      <StreakGrid />
      <BlockScreen
        appName={blockedApp}
        isVisible={isBlockVisible}
        onDismiss={() => setIsBlockVisible(false)}
      />

      <button onClick={handleLogout} className="text-xs text-green-400 border border-green-700 bg-green-950 px-3 py-1 rounded-lg hover:bg-green-800 hover:border-green-500 hover:text-green-300 transition-all">
        Sign Out
      </button>
    </div>
  );
};

export default Today;
