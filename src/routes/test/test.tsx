import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Coins,
  Dices,
  DollarSign,
  Dumbbell,
  Edit3,
  Globe,
  HandHeart,
  Heart,
  HeartHandshake,
  Home,
  Moon,
  Paintbrush,
  Plane,
  Settings,
  Skull,
  Smile,
  Sparkles,
  Sun,
  Syringe,
  TrendingUp,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- TYPESCRIPT DEFINITIONS ---

export type Relationship = {
  playerId: string;
  closeness: number;
  group: "PARENT" | "SIBLINGS" | "SPOUSE" | "CHILD";
  // Added for UI rendering purposes
  name?: string;
  age?: number;
  gender?: string;
  status?: string;
};

export type PlayerData = {
  id: string; // uuid
  age: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  country: string;
  relationship?: Relationship[];
  stat: {
    health: number; // 0 - 100
    happiness: number; // 0 - 100
    smarts: number; // 0 - 100
    looks: number; // 0 - 100
    fitness: number; // 0 - 100
    karma: number; // 0 - 100
    healthComplexity: number; // 0 - 100
  };
  life: {
    age: number;
    activity: string[];
  }[];

  // Extra fields to support the existing UI layout
  bankBalance: number;
  netWorth: number;
  assets: string[];
  education: string;
  job: string;
  maritalStatus: string;
};

interface GameState {
  player: PlayerData;
  ageUp: () => void;
  endLife: () => void;
  resetGame: () => void;
}

// --- ZUSTAND STORE (with LocalStorage Sync) ---

const initialPlayerState: PlayerData = {
  id: crypto.randomUUID(),
  age: 40,
  firstName: "Cody",
  middleName: "",
  lastName: "Lane",
  gender: "Male",
  country: "India",
  education: "Trade degree",
  job: "Senior Officer (Lv 3)",
  bankBalance: 24249509,
  netWorth: 49242065,
  assets: ["Studio Apartment"],
  maritalStatus: "Married to Penelope",
  relationship: [
    {
      playerId: crypto.randomUUID(),
      name: "Anna Lane",
      group: "PARENT",
      age: 65,
      gender: "Female",
      status: "Married",
      closeness: 100,
    },
    {
      playerId: crypto.randomUUID(),
      name: "Derek Lane",
      group: "PARENT",
      age: 65,
      gender: "Male",
      status: "Divorced",
      closeness: 100,
    },
    {
      playerId: crypto.randomUUID(),
      name: "Penelope Park",
      group: "SPOUSE",
      age: 41,
      gender: "Female",
      status: "",
      closeness: 100,
    },
  ],
  stat: {
    health: 98,
    happiness: 100,
    smarts: 100,
    looks: 100,
    fitness: 100,
    karma: 100,
    healthComplexity: 0,
  },
  life: [
    {
      age: 40,
      activity: [
        "The big 4-0! Life is just getting started.",
        "Salary: $143,728 (Senior Officer at Central Intelligence Agency)",
        "Tech Startup earned $14,721,751.",
        "Living expenses (Extravagant): -$64,020",
        "Total taxes paid this year: $7,801,020",
      ],
    },
    {
      age: 39,
      activity: [
        "You worked hard! Job performance improved. +100%",
        "Expanded Tech Startup! New revenue: $13,284,717/yr",
        "Expanded Mobile App! New revenue: $4,119,187/yr",
      ],
    },
  ],
};

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      player: initialPlayerState,

      ageUp: () =>
        set((state) => {
          const newAge = state.player.age + 1;
          const newBalance = state.player.bankBalance + 143728 - 64020; // Mock calculation

          return {
            player: {
              ...state.player,
              age: newAge,
              bankBalance: newBalance,
              netWorth: newBalance + 25000000,
              life: [
                {
                  age: newAge,
                  activity: [
                    `You are now ${newAge} years old.`,
                    `Salary deposited: $143,728`,
                    `Living expenses: -$64,020`,
                  ],
                },
                ...state.player.life,
              ],
            },
          };
        }),

      endLife: () =>
        set((state) => ({
          player: {
            ...state.player,
            stat: { ...state.player.stat, health: 0, happiness: 0 },
            life: [
              { age: state.player.age, activity: ["You have passed away."] },
              ...state.player.life,
            ],
          },
        })),

      resetGame: () =>
        set({ player: { ...initialPlayerState, id: crypto.randomUUID() } }),
    }),
    {
      name: "life-simulator-storage", // key in localStorage
    },
  ),
);

// --- UTILITY COMPONENTS ---

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary:
      "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700",
    danger:
      "bg-rose-600/10 text-rose-500 hover:bg-rose-600/20 border border-rose-600/20",
    ghost: "hover:bg-slate-800 text-slate-300 hover:text-slate-100",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ProgressBar: React.FC<{
  label: string;
  value: number;
  colorClass: string;
}> = ({ label, value, colorClass }) => (
  <div className="flex items-center gap-3 text-xs mb-2">
    <span className="w-20 text-slate-400">{label}</span>
    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="w-8 text-right font-medium text-slate-200">{value}</span>
  </div>
);

// --- MAIN APPLICATION COMPONENT ---
export default function Test() {
  const [activeTab, setActiveTab] = useState("activities");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Zustand State Connect
  const { player, ageUp, endLife, resetGame } = useGameStore();

  const tabs = [
    {
      id: "activities",
      label: "Activities",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <BookOpen className="w-4 h-4" />,
    },
    { id: "career", label: "Career", icon: <Briefcase className="w-4 h-4" /> },
    { id: "business", label: "Business", icon: <Coins className="w-4 h-4" /> },
    {
      id: "relationships",
      label: "Relationships",
      icon: <Heart className="w-4 h-4" />,
    },
    { id: "assets", label: "Assets", icon: <Home className="w-4 h-4" /> },
    {
      id: "finance",
      label: "Finance",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "rules",
      label: "Game Rules",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  const statBars = [
    { name: "Health", value: player.stat.health, color: "bg-emerald-500" },
    {
      name: "Happiness",
      value: player.stat.happiness,
      color: "bg-emerald-500",
    },
    { name: "Smarts", value: player.stat.smarts, color: "bg-emerald-500" },
    { name: "Looks", value: player.stat.looks, color: "bg-emerald-500" },
    { name: "Fitness", value: player.stat.fitness, color: "bg-emerald-500" },
    { name: "Karma", value: player.stat.karma, color: "bg-emerald-500" },
  ];

  return (
    <div
      className={`flex h-screen w-full overflow-hidden font-sans selection:bg-indigo-500/30 ${isDarkMode ? "dark bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-900"}`}
    >
      {/* --- LEFT SIDEBAR: Character Profile --- */}
      <aside className="w-72 flex flex-col border-r border-slate-800/50 bg-[#1e1e24]/80 backdrop-blur-sm z-10 shrink-0">
        {/* Scrollable Profile Info */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Header Info */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {player.firstName} {player.lastName}
            </h2>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
              <User className="w-3 h-3" /> {player.gender}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {player.country}
            </div>
          </div>

          {/* Age & Career Info */}
          <div className="mb-6">
            <div className="text-4xl font-black text-indigo-400 tracking-tighter mb-1">
              Age {player.age}
            </div>
            <div className="text-xs text-slate-400">{player.education}</div>
            <div className="text-sm font-medium text-slate-300 mt-0.5">
              {player.job}
            </div>
          </div>

          {/* Finances */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/50">
              <span className="text-xs text-slate-400 font-medium">
                Bank Balance
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {formatMoney(player.bankBalance)}
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5">
              <span className="text-xs text-slate-400 font-medium">
                Net Worth
              </span>
              <span className="text-sm font-bold text-white">
                {formatMoney(player.netWorth)}
              </span>
            </div>
          </div>

          {/* Life Status */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span>{player.assets[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>{player.maritalStatus}</span>
            </div>
          </div>

          {/* Stats Bars */}
          <div className="mb-4">
            {statBars.map((stat) => (
              <ProgressBar
                key={stat.name}
                label={stat.name}
                value={stat.value}
                colorClass={stat.color}
              />
            ))}
          </div>
        </div>

        {/* Bottom Sticky Action Buttons */}
        <div className="p-4 bg-[#1e1e24] border-t border-slate-800/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]">
          {player.stat.health > 0 ? (
            <>
              <Button
                onClick={ageUp}
                className="w-full h-12 text-base font-bold mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/20"
              >
                Age Up +1
              </Button>
              <Button
                onClick={endLife}
                variant="danger"
                className="w-full h-10 text-sm font-semibold"
              >
                <Skull className="w-4 h-4 mr-2" /> End Life
              </Button>
            </>
          ) : (
            <Button
              onClick={resetGame}
              className="w-full h-12 text-base font-bold bg-amber-600 hover:bg-amber-500 text-white border-none shadow-lg shadow-amber-500/20"
            >
              Start New Life
            </Button>
          )}
        </div>
      </aside>

      {/* --- CENTER AREA: Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#16161a]">
        {/* Top Header Navigation */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50 bg-[#1e1e24]/50 backdrop-blur-md sticky top-0 z-20">
          {/* Tabs */}
          <nav className="flex space-x-1 overflow-x-auto custom-scrollbar items-center h-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "text-indigo-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md"
                  }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-t-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Top Right Controls */}
          <div className="flex items-center gap-2 pl-4 shrink-0">
            <Button
              variant="ghost"
              className="w-9 h-9 p-0 rounded-full"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-9 h-9 p-0 rounded-full bg-slate-800/50 hover:bg-slate-700"
            >
              <Settings className="w-4 h-4 text-slate-300" />
            </Button>
          </div>
        </header>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {activeTab === "activities" && <ActivitiesView />}
            {activeTab === "career" && <CareerView />}
            {activeTab === "relationships" && (
              <RelationshipsView relationships={player.relationship || []} />
            )}
            {activeTab === "rules" && <RulesView />}
            {/* Fallback for empty tabs */}
            {!["activities", "career", "relationships", "rules"].includes(
              activeTab,
            ) && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <Settings className="w-12 h-12 mb-4 opacity-20 animate-spin-slow" />
                <p>This section is currently under construction.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- RIGHT SIDEBAR: Permanent Life Log --- */}
      <aside className="w-80 lg:w-96 flex flex-col border-l border-slate-800/50 bg-[#16161a] shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/50 bg-[#1e1e24]/50 font-bold text-slate-200 tracking-wide">
          Life Journal
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800/80 z-0" />

          <div className="space-y-8 relative z-10">
            {player.life.map((log) => (
              <div key={log.age} className="relative">
                {/* Age Marker */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#16161a] shadow-[0_0_0_2px_rgba(99,102,241,0.2)] flex items-center justify-center z-10" />
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Age {log.age}
                  </span>
                </div>

                {/* Events List */}
                <div className="pl-6 space-y-2">
                  {log.activity.map((eventText, idx) => {
                    // Simple heuristic to color code strings based on keywords for the UI
                    const isIncome =
                      eventText.includes("$") && !eventText.includes("-$");
                    const isExpense = eventText.includes("-$");
                    const isGood = eventText.includes("+");

                    return (
                      <div
                        key={idx}
                        className="flex gap-2 text-sm leading-relaxed"
                      >
                        {isIncome && (
                          <span className="text-emerald-400 shrink-0 mt-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {isExpense && (
                          <span className="text-rose-400/80 shrink-0 mt-1">
                            <Activity className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {isGood && (
                          <span className="text-amber-400 shrink-0 mt-1">
                            <Sparkles className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {!isIncome && !isExpense && !isGood && (
                          <span className="text-indigo-400 shrink-0 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-1 ml-1" />
                          </span>
                        )}

                        <span
                          className={`
                          ${isIncome ? "text-slate-300" : ""}
                          ${isExpense ? "text-slate-400" : ""}
                          ${isGood ? "text-slate-200 font-medium" : ""}
                          ${!isIncome && !isExpense && !isGood ? "text-slate-200 font-medium" : ""}
                        `}
                        >
                          {eventText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Global styles for custom scrollbar embedded */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}

// --- TAB CONTENT VIEWS ---

function ActivitiesView() {
  const categories = [
    {
      title: "MIND & BODY",
      items: [
        {
          icon: <Brain className="text-amber-400 w-6 h-6" />,
          name: "Meditate",
          desc: "+Happy, +Health",
        },
        {
          icon: <Dumbbell className="text-blue-400 w-6 h-6" />,
          name: "Go to Gym",
          desc: "+Fitness, +Health ($500)",
        },
        {
          icon: <BookOpen className="text-emerald-400 w-6 h-6" />,
          name: "Read Books",
          desc: "+Smarts, +Happy",
        },
        {
          icon: <Activity className="text-green-500 w-6 h-6" />,
          name: "Eat Healthy",
          desc: "+Health, +Fitness",
        },
        {
          icon: <Smile className="text-purple-400 w-6 h-6" />,
          name: "Therapy",
          desc: "+Happy (costs $150)",
        },
        {
          icon: <Syringe className="text-rose-400 w-6 h-6" />,
          name: "See Doctor",
          desc: "+Health",
        },
      ],
    },
    {
      title: "SOCIAL",
      items: [
        {
          icon: <Sparkles className="text-pink-400 w-6 h-6" />,
          name: "Party",
          desc: "+Happy, -Health",
        },
        {
          icon: <Plane className="text-sky-400 w-6 h-6" />,
          name: "Travel",
          desc: "Choose destination & budget",
        },
        {
          icon: <HandHeart className="text-amber-500 w-6 h-6" />,
          name: "Volunteer",
          desc: "+Happy, +Karma",
        },
        {
          icon: <Dices className="text-red-400 w-6 h-6" />,
          name: "Gamble",
          desc: "Win or lose money",
        },
        {
          icon: <AlertTriangle className="text-slate-400 w-6 h-6" />,
          name: "Petty Crime",
          desc: "Risk / reward",
        },
        {
          icon: <TrendingUp className="text-emerald-500 w-6 h-6" />,
          name: "Invest",
          desc: "Stock market risk",
        },
        {
          icon: <Globe className="text-blue-500 w-6 h-6" />,
          name: "Emigrate",
          desc: "Move to another country",
        },
      ],
    },
    {
      title: "SELF IMPROVEMENT",
      items: [
        {
          icon: <Syringe className="text-slate-300 w-6 h-6" />,
          name: "Cosmetic Surgery",
          desc: "+Looks (costs $5,000)",
        },
        {
          icon: <Paintbrush className="text-yellow-400 w-6 h-6" />,
          name: "Makeover",
          desc: "+Looks (costs $200)",
        },
        {
          icon: <Edit3 className="text-orange-400 w-6 h-6" />,
          name: "Change Name",
          desc: "Change your first or last name",
        },
        {
          icon: <Heart className="text-purple-500 w-6 h-6" />,
          name: "Sexual Orientation",
          desc: "Set or explore your orientation",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Independence Banner */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
          Independence
        </h3>
        <Card className="p-4 border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <CheckCircle2 className="w-5 h-5" /> You live independently
          </div>
          <p className="text-sm text-slate-400 ml-7">
            $18,000/yr in living expenses deducted each year.
          </p>
        </Card>
      </div>

      {categories.map((cat, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            {cat.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-start p-4 bg-[#1e1e24] hover:bg-[#25252d] border border-slate-800/80 rounded-xl text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-700 group"
              >
                <div className="mb-3 bg-slate-800/50 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="font-bold text-slate-200 mb-1">{item.name}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CareerView() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amber-500" />
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            FULL-TIME JOB
          </h3>
        </div>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">Senior Officer</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  Level 3
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Central Intelligence Agency · 8 years here
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Salary:</span>
              <span className="font-bold text-slate-200">$143,728/yr</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">
                  Performance: <strong className="text-slate-200">100%</strong>
                </span>
                <span className="text-slate-400">
                  Work Hard: <strong className="text-slate-200">0/2</strong>
                </span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="h-9 px-4">Work Hard (0/2)</Button>
            <Button className="h-9 px-4 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30">
              Ask for Promotion
            </Button>
            <Button className="h-9 px-4 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30">
              Ask for Raise
            </Button>
            <Button variant="danger" className="h-9 px-4">
              Quit Job
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-400" />
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            PART-TIME LISTINGS
          </h3>
        </div>

        <Button variant="secondary" className="h-8 text-xs mb-2">
          <Activity className="w-3.5 h-3.5 mr-2" /> Refresh listings
        </Button>

        <div className="space-y-3">
          {[
            { icon: "🛒", title: "Grocery Stocker", salary: "$4,365/yr" },
            { icon: "🌿", title: "Lawn Mowing", salary: "$2,909/yr" },
            { icon: "🍽️", title: "Waiter/Waitress", salary: "$7,984/yr" },
            { icon: "👕", title: "Retail Associate", salary: "$7,033/yr" },
          ].map((job, idx) => (
            <Card
              key={idx}
              className="p-4 flex items-center justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl">
                  {job.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">
                      {job.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      Part-Time
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Salary: {job.salary}
                  </div>
                </div>
              </div>
              <Button className="h-8 px-5 text-xs bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">
                Apply
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelationshipsView({
  relationships,
}: {
  relationships: Relationship[];
}) {
  // Group relationships by their designated groups for the UI
  const groups = Array.from(new Set(relationships.map((r) => r.group)));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {groups.length === 0 && (
        <p className="text-slate-500">
          You don't have any established relationships yet.
        </p>
      )}

      {groups.map((groupLabel, idx) => {
        const groupPeople = relationships.filter((r) => r.group === groupLabel);

        return (
          <div key={idx} className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              {groupLabel}
            </h3>

            <div className="space-y-3">
              {groupPeople.map((person, i) => (
                <Card key={i} className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg text-slate-200">
                          {person.name || "Unknown"}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                          {person.group === "PARENT" ? "Parent" : person.group}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>Age {person.age || "?"}</span>
                        <span>·</span>
                        <span>
                          {person.gender === "Male" ? "♂" : "♀"}{" "}
                          {person.gender || "Unknown"}
                        </span>
                        {person.status && (
                          <>
                            <span>·</span>
                            <span>{person.status}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Closeness: {person.closeness}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full"
                        style={{ width: `${person.closeness}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="h-8 px-4 text-xs font-semibold"
                    >
                      View
                    </Button>
                    <Button className="h-8 px-4 text-xs font-semibold">
                      Interact
                    </Button>
                    {person.group === "SPOUSE" && (
                      <>
                        <Button className="h-8 px-4 text-xs font-semibold bg-pink-500/20 text-pink-400 hover:bg-pink-500 hover:text-white">
                          <Heart className="w-3.5 h-3.5 mr-1.5 fill-current" />{" "}
                          Make Love
                        </Button>
                        <Button
                          variant="danger"
                          className="h-8 px-4 text-xs font-semibold"
                        >
                          Break up
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RulesView() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Game Rules & Mechanics
        </h2>
        <p className="text-slate-400 text-sm">
          Welcome to the simulation. Here's how to navigate your new life.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300">
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
            <Activity className="w-5 h-5" /> The Core Loop
          </h3>
          <p>
            Your goal is to live a fulfilling life. Every time you click the{" "}
            <strong className="text-indigo-300">"Age Up +1"</strong> button
            located at the bottom of the left panel, one year passes. Random
            events may occur, and your stats will adjust based on your lifestyle
            choices.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Brain className="w-5 h-5" /> Managing Stats
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-200">Health & Fitness:</strong> Go
              to the gym, eat healthy, and see doctors to maintain these. Low
              health can lead to early termination.
            </li>
            <li>
              <strong className="text-slate-200">Happiness:</strong> Spend time
              with family, take vacations, or engage in hobbies to keep spirits
              high.
            </li>
            <li>
              <strong className="text-slate-200">Smarts:</strong> Read books and
              pursue higher education to unlock better career opportunities.
            </li>
            <li>
              <strong className="text-slate-200">Looks:</strong> Can be improved
              via the gym or cosmetic procedures. Helps in social situations.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Finances & Career
          </h3>
          <p>
            You need money to survive. Get a job in the{" "}
            <strong className="text-amber-300">Career</strong> tab. Work hard to
            get promoted. Invest your surplus cash in Assets or Business
            ventures. Beware of annual living expenses and taxes, which are
            deducted automatically every year.
          </p>
        </section>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 mt-8">
          <p className="text-center text-slate-400 italic">
            "Life is what happens when you're busy making other plans."
          </p>
        </div>
      </div>
    </div>
  );
}
