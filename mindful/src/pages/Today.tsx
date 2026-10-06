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

      <button onClick={handleLogout} className="text-xs text-red-400 mb-4">
        Sign Out
      </button>
    </div>
  );
};

export default Today;
