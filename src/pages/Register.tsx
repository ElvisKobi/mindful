import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

   const seedUserData = async (userId: string) => {

     let profile = null
  let attempts = 0

  while (!profile && attempts < 5) {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    profile = data
    if (!profile) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      attempts++
    }
  }

  if (!profile) {
    console.error('Profile not created after 5 attempts')
    return
  }
    // Seed app limits
    const {error: limitsError} = await supabase.from("app_limits").upsert([
      {
        user_id: userId,
        app_id: "instagram",
        app_name: "Instagram",
        app_icon: "📸",
        daily_limit: 30,
      },
      {
        user_id: userId,
        app_id: "tiktok",
        app_name: "TikTok",
        app_icon: "🎵",
        daily_limit: 20,
      },
      {
        user_id: userId,
        app_id: "youtube",
        app_name: "YouTube",
        app_icon: "▶️",
        daily_limit: 60,
      },
      {
        user_id: userId,
        app_id: "twitter",
        app_name: "Twitter/X",
        app_icon: "🐦",
        daily_limit: 45,
      },
    ]);


      if (limitsError) console.error('App limits error:', limitsError)


    // Seed starting streak
    const {error: streakError} = await supabase.from("streaks").upsert({
      user_id: userId,
      current_streak: 0,
      longest_streak: 0,
      last_goal_met: null,
    });

    if (streakError) console.error('Streak error:', streakError)
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await seedUserData(data.user.id);
    }

    navigate("/today");
  };


  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-green-100 mb-2">
            🌿 mindful
          </h1>
          <p className="text-sm text-gray-400 italic">start your journey</p>
        </div>

        {/* Form */}
        <div className="bg-green-900 border border-green-700 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-green-950 border border-green-700 rounded-xl px-4 py-3 text-sm text-green-100 placeholder-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-green-950 border border-green-700 rounded-xl px-4 py-3 text-sm text-green-100 placeholder-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-green-950 border border-green-700 rounded-xl px-4 py-3 text-sm text-green-100 placeholder-gray-600 outline-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950 border border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-400 text-green-950 font-medium text-sm py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-xs text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-400 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
