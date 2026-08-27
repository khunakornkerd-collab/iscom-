import React, { useState, useEffect, useMemo } from "react";
import {
  Gamepad2,
  Sparkles,
  Heart,
  GitCompare,
  HelpCircle,
  Dices,
  Flame,
  Trophy,
  Swords,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronUp
} from "lucide-react";
import { Game, GameCategory, FilterOptions } from "./types";
import { GAMES_DATA } from "./data/games";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal";
import { AiAdvisorModal } from "./components/AiAdvisorModal";
import { GameQuizModal } from "./components/GameQuizModal";
import { RandomizerModal } from "./components/RandomizerModal";
import { CompareModal } from "./components/CompareModal";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { CreatorsModal, CREATORS_LIST } from "./components/CreatorsModal";
import { Users, GraduationCap, CheckCircle2 } from "lucide-react";

export default function App() {
  // Navigation & Filter State
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "all",
    platform: "ทั้งหมด",
    difficulty: "ทั้งหมด",
    playtime: "all",
    priceRange: "all",
    tag: "ทั้งหมด",
    sortBy: "rating",
  });

  // Modal States
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isRandomizerOpen, setIsRandomizerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCreatorsOpen, setIsCreatorsOpen] = useState(false);

  // Local Storage Persistent Collections
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("gamematch_wishlist");
      return saved ? JSON.parse(saved) : ["hollow-knight", "hades"];
    } catch {
      return ["hollow-knight", "hades"];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("gamematch_compare");
      return saved ? JSON.parse(saved) : ["sekiro", "lies-of-p"];
    } catch {
      return ["sekiro", "lies-of-p"];
    }
  });

  useEffect(() => {
    localStorage.setItem("gamematch_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("gamematch_compare", JSON.stringify(compareList));
  }, [compareList]);

  // Wishlist Toggles
  const handleToggleWishlist = (gameId: string) => {
    setWishlist((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  // Compare Toggles
  const handleToggleCompare = (gameId: string) => {
    setCompareList((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      }
      if (prev.length >= 2) {
        // Replace oldest
        return [prev[1], gameId];
      }
      return [...prev, gameId];
    });
  };

  const handleRemoveFromCompare = (gameId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== gameId));
  };

  // Filter Updates
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      platform: "ทั้งหมด",
      difficulty: "ทั้งหมด",
      playtime: "all",
      priceRange: "all",
      tag: "ทั้งหมด",
      sortBy: "rating",
    });
  };

  // Filter and Sort Logic
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      // Search term
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchTitleTh = game.titleTh?.toLowerCase().includes(q);
        const matchTag = game.tags.some((t) => t.toLowerCase().includes(q));
        const matchSub = game.subGenres.some((sg) => sg.toLowerCase().includes(q));
        const matchDev = game.developer.toLowerCase().includes(q);
        if (!matchTitle && !matchTitleTh && !matchTag && !matchSub && !matchDev) {
          return false;
        }
      }

      // Category
      if (filters.category !== "all") {
        if (filters.category === "indie" && game.category !== "indie") return false;
        if (filters.category === "action" && game.category !== "action") return false;
        if (filters.category === "indie-action" && game.category !== "indie-action") return false;
        if (filters.category === "award-winner" && !game.awardWinning) return false;
        if (filters.category === "roguelike") {
          const isRogueOrSouls =
            game.subGenres.some((sg) => sg.includes("Rogue") || sg.includes("Souls")) ||
            game.tags.some((t) => t.includes("Roguelike") || t.includes("Souls"));
          if (!isRogueOrSouls) return false;
        }
        if (filters.category === "story") {
          const isStory =
            game.subGenres.some((sg) => sg.includes("Story") || sg.includes("RPG")) ||
            game.tags.some((t) => t.includes("เนื้อเรื่อง") || t.includes("โลกกว้าง"));
          if (!isStory) return false;
        }
      }

      // Platform
      if (filters.platform !== "ทั้งหมด") {
        if (!game.platforms.includes(filters.platform as any)) return false;
      }

      // Difficulty
      if (filters.difficulty !== "ทั้งหมด") {
        if (game.difficulty !== filters.difficulty) return false;
      }

      // Playtime
      if (filters.playtime === "short" && game.averagePlaytimeHours >= 15) return false;
      if (
        filters.playtime === "medium" &&
        (game.averagePlaytimeHours < 15 || game.averagePlaytimeHours > 40)
      )
        return false;
      if (filters.playtime === "long" && game.averagePlaytimeHours <= 40) return false;

      // Tag
      if (filters.tag !== "ทั้งหมด") {
        if (!game.tags.includes(filters.tag)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "releaseYear":
          return b.releaseYear - a.releaseYear;
        case "playtime":
          return a.averagePlaytimeHours - b.averagePlaytimeHours;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filters]);

  const featuredGames = useMemo(() => {
    return GAMES_DATA.filter((g) => g.featured);
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulseGlow" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <Navbar
        currentCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        searchQuery={filters.search}
        onSearchChange={(q) => handleFilterChange({ search: q })}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenRandomizer={() => setIsRandomizerOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        compareCount={compareList.length}
        onOpenCreators={() => setIsCreatorsOpen(true)}
      />

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Spotlight (Visible when not actively filtering heavily) */}
        {!filters.search && filters.category === "all" && (
          <HeroSection
            featuredGames={featuredGames}
            onSelectGame={setSelectedGame}
            onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenRandomizer={() => setIsRandomizerOpen(true)}
          />
        )}

        {/* Filter Toolbar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalGamesCount={GAMES_DATA.length}
          filteredCount={filteredGames.length}
        />

        {/* Games Grid Showcase */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelectGame={setSelectedGame}
                isWishlisted={wishlist.includes(game.id)}
                onToggleWishlist={handleToggleWishlist}
                isComparing={compareList.includes(game.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 px-4 text-center rounded-3xl bg-[#0e0f16]/80 border border-white/5 backdrop-blur-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#141622] border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">ไม่พบเกมที่ตรงกับเงื่อนไขการค้นหา</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              ลองเปลี่ยนคำค้นหา หรือปรับตัวกรองความยาก แพลตฟอร์ม และแนวเกมใหม่อีกครั้ง
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                ล้างตัวกรองทั้งหมด
              </button>
              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#151722] hover:bg-[#1c1f2e] text-slate-200 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>ถาม AI ให้ช่วยค้นหา</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Feature Banners */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: AI Matchmaker */}
          <div
            onClick={() => setIsAiAdvisorOpen(true)}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#121124] via-[#0d0e17] to-[#08080c] border border-indigo-500/20 hover:border-indigo-500/50 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
              ผู้ช่วย AI แนะนำเกมอัจฉริยะ
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              พิมพ์บอกความชอบ สไตล์การเล่น หรือบรรยากาศที่คุณอยากได้ แล้วให้ Gemini AI ช่วยจับคู่เกมที่เหมาะสมที่สุด
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>เริ่มใช้งาน AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Quiz */}
          <div
            onClick={() => setIsQuizOpen(true)}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#1f0e1a] via-[#0f0b14] to-[#08080c] border border-rose-500/20 hover:border-rose-500/50 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors mb-1">
              แบบทดสอบค้นหาเกมเมอร์ในตัวคุณ
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              ตอบคำถามสั้นๆ 4 ข้อ เพื่อค้นหา Gamer Archetype พร้อมเกมแนะนำ 3-4 เกมที่ออกแบบมาเพื่อคุณโดยเฉพาะ
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>เริ่มทำแบบทดสอบ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Roulette */}
          <div
            onClick={() => setIsRandomizerOpen(true)}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1c18] via-[#091211] to-[#08080c] border border-emerald-500/20 hover:border-emerald-500/50 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Dices className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
              วงล้อสุ่มเกม (Game Roulette)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              สำหรับวันที่คุณเปิดคลังเกมแล้วเลือกไม่ได้ ให้ระบบสุ่มเกมอินดี้หรือแอคชั่นยอดเยี่ยมให้คุณกดเล่นได้ทันที
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>หมุนวงล้อสุ่มเกม</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </section>

        {/* Project Creators Showcase Section */}
        <section className="mt-16 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-[#0a0c16]/90 via-[#08080c] to-[#050507] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-rose-500 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#08080c] rounded-[14px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    คณะผู้จัดทำโครงงาน
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    ชั้น ม.4/13
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  โครงงานพัฒนาเว็บแอปพลิเคชันคัดสรรและแนะนำเกมอินดี้ & แอคชั่น (GameMatch)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCreatorsOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-slate-200 hover:text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>ดูข้อมูลผู้จัดทำแบบละเอียด</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CREATORS_LIST.map((creator) => (
              <div
                key={creator.id}
                className="p-4 rounded-2xl bg-[#08080c]/90 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${creator.avatarGradient} p-0.5 shadow flex items-center justify-center font-black text-white text-sm shrink-0`}
                  >
                    <div className="w-full h-full bg-[#08080c]/50 backdrop-blur-xs rounded-[14px] flex items-center justify-center">
                      {creator.studentNo}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {creator.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      เลขที่ {creator.studentNo} • <span className="text-cyan-400 font-semibold">{creator.grade}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span
                    className={`inline-block text-[10px] px-2 py-0.5 rounded-lg border font-bold ${creator.badgeColor} truncate max-w-full`}
                  >
                    {creator.role}
                  </span>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {creator.roleDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/5 bg-[#08080c]/90 backdrop-blur-xl py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-rose-500 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-[#050507] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white text-base">
                GameMatch: Indie & Action Hub
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <button onClick={() => handleFilterChange({ category: "indie" })} className="hover:text-white transition-colors">
                เกมอินดี้ (Indie)
              </button>
              <button onClick={() => handleFilterChange({ category: "action" })} className="hover:text-white transition-colors">
                เกมแอคชั่น (Action)
              </button>
              <button onClick={() => handleFilterChange({ category: "award-winner" })} className="hover:text-white transition-colors">
                เกมการันตีรางวัล
              </button>
              <button onClick={() => setIsAiAdvisorOpen(true)} className="hover:text-cyan-400 transition-colors">
                AI ผู้ช่วยแนะนำเกม
              </button>
              <button onClick={() => setIsCreatorsOpen(true)} className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>คณะผู้จัดทำ (ม.4/13)</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© 2026 GameMatch. จัดทำโดยนักเรียนชั้น ม.4/13 (เลขที่ 1, 11, 32, 35)</p>
            <p>Immersive Gaming Hub UI & Powered by Gemini AI</p>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onSelectGame={setSelectedGame}
        isWishlisted={selectedGame ? wishlist.includes(selectedGame.id) : false}
        onToggleWishlist={handleToggleWishlist}
        isComparing={selectedGame ? compareList.includes(selectedGame.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      <AiAdvisorModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        onSearchGame={(name) => {
          handleFilterChange({ search: name });
          setIsAiAdvisorOpen(false);
        }}
      />

      <GameQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectGame={setSelectedGame}
      />

      <RandomizerModal
        isOpen={isRandomizerOpen}
        onClose={() => setIsRandomizerOpen(false)}
        onSelectGame={setSelectedGame}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onSelectGame={setSelectedGame}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onClearWishlist={handleClearWishlist}
        onSelectGame={setSelectedGame}
      />

      <CreatorsModal
        isOpen={isCreatorsOpen}
        onClose={() => setIsCreatorsOpen(false)}
      />
    </div>
  );
}
