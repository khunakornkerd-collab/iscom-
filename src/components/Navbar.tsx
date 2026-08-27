import React from "react";
import {
  Gamepad2,
  Sparkles,
  HelpCircle,
  Dices,
  GitCompare,
  Heart,
  Search,
  Swords,
  Layers,
  X,
  Users
} from "lucide-react";
import { GameCategory } from "../types";

interface NavbarProps {
  currentCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAiAdvisor: () => void;
  onOpenQuiz: () => void;
  onOpenRandomizer: () => void;
  onOpenCompare: () => void;
  compareCount: number;
  onOpenCreators: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  onOpenWishlist,
  onOpenAiAdvisor,
  onOpenQuiz,
  onOpenRandomizer,
  onOpenCompare,
  compareCount,
  onOpenCreators,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080c]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => onSelectCategory("all")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#08080c] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-rose-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans">
                  Game<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400">Match</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest hidden sm:inline-block shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  Indie & Action
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">ศูนย์รวมแนะนำเกมอินดี้ & แอคชั่นยอดเยี่ยม</p>
            </div>
          </div>

          {/* Search Input in Navbar */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ค้นหาชื่อเกม, บอส, Roguelike, Cyberpunk, Soulslike..."
                className="w-full bg-[#0f1017]/90 border border-white/10 focus:border-cyan-500/60 rounded-2xl pl-10 pr-9 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Action Badges & Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* AI Advisor Button */}
            <button
              id="nav-ai-advisor-btn"
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20"
              title="ผู้ช่วย AI แนะนำเกม"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI แนะนำเกม</span>
              <span className="sm:hidden font-bold">AI</span>
            </button>

            {/* Quiz Button */}
            <button
              id="nav-quiz-btn"
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#11121a] hover:bg-[#181a26] text-slate-200 hover:text-white text-xs sm:text-sm font-medium border border-white/10 hover:border-rose-500/40 transition-all"
              title="แบบทดสอบค้นหาเกมที่เหมาะกับคุณ"
            >
              <HelpCircle className="w-4 h-4 text-rose-400" />
              <span className="hidden lg:inline">ค้นหาเกมที่ใช่ (Quiz)</span>
              <span className="lg:hidden hidden sm:inline">แบบทดสอบ</span>
            </button>

            {/* Randomizer Button */}
            <button
              id="nav-randomizer-btn"
              onClick={onOpenRandomizer}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#11121a] hover:bg-[#181a26] text-slate-200 hover:text-white text-xs sm:text-sm font-medium border border-white/10 hover:border-emerald-500/40 transition-all"
              title="สุ่มเกมเล่นวันนี้"
            >
              <Dices className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline">สุ่มเกมให้ฉันที</span>
            </button>

            {/* Compare Tool Button */}
            <button
              id="nav-compare-btn"
              onClick={onOpenCompare}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                compareCount > 0
                  ? "bg-purple-950/60 border-purple-500/50 text-purple-200 hover:bg-purple-900/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  : "bg-[#11121a] hover:bg-[#181a26] text-slate-200 hover:text-white border-white/10 hover:border-cyan-500/40"
              }`}
              title="เปรียบเทียบเกม 2 เกม"
            >
              <GitCompare className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">เปรียบเทียบ</span>
              {compareCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-cyan-400 text-black">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-[#11121a] hover:bg-[#181a26] text-slate-200 hover:text-white text-xs sm:text-sm font-medium border border-white/10 hover:border-rose-500/40 transition-all flex items-center gap-1.5"
              title="เกมที่บันทึกไว้ (Wishlist)"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
              <span className="hidden sm:inline">คลังที่สนใจ</span>
              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-bounce shadow-md shadow-rose-500/40">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Project Creators Button */}
            <button
              id="nav-creators-btn"
              onClick={onOpenCreators}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#11121a] hover:bg-[#181a26] text-slate-200 hover:text-white text-xs sm:text-sm font-medium border border-white/10 hover:border-cyan-500/40 transition-all"
              title="คณะผู้จัดทำโครงงาน (ม.4/13)"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">ผู้จัดทำ</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาชื่อเกม, บอส, Metroidvania, Action..."
              className="w-full bg-[#0f1017] border border-white/10 rounded-xl pl-10 pr-9 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
