import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Play, 
  Trophy, 
  Clock, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  HelpCircle,
  Dices,
  Star
} from "lucide-react";
import { Game } from "../types";

interface HeroSectionProps {
  featuredGames: Game[];
  onSelectGame: (game: Game) => void;
  onOpenAiAdvisor: () => void;
  onOpenQuiz: () => void;
  onOpenRandomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredGames,
  onSelectGame,
  onOpenAiAdvisor,
  onOpenQuiz,
  onOpenRandomizer,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredGames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const currentGame = featuredGames[currentIndex] || featuredGames[0];
  if (!currentGame) return null;

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[#0c0d14]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] mb-8">
      {/* Background Graphic Backdrop with smooth gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentGame.bannerImage}
          alt={currentGame.title}
          className="w-full h-full object-cover object-center opacity-35 blur-[1px] scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-[#07070b]/90 to-[#07070b]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-12 max-w-4xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-[0_0_12px_rgba(244,63,94,0.2)]">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            เกมแนะนำห้ามพลาด (Spotlight)
          </span>

          {currentGame.awardWinning && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold backdrop-blur-xl shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              การันตีรางวัลยอดเยี่ยม
            </span>
          )}

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#141622]/90 text-slate-300 text-xs font-semibold border border-white/10 backdrop-blur-xl">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {currentGame.rating}/10 คะแนน
          </span>
        </div>

        {/* Game Title & Tagline */}
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            {currentGame.title}
          </h1>
          {currentGame.titleTh && (
            <h2 className="text-lg sm:text-xl font-medium text-cyan-300/90 font-sans">
              {currentGame.titleTh}
            </h2>
          )}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl line-clamp-2 leading-relaxed pt-1">
            {currentGame.tagline}
          </p>
        </div>

        {/* Quick Highlights & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-[#121420]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>ประมาณ {currentGame.averagePlaytimeHours} ชม.</span>
          </div>

          <div className="bg-[#121420]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-slate-300">
            ความยาก: <span className="font-bold text-rose-400">{currentGame.difficulty}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-[#121420]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-slate-300">
            <span>ผู้พัฒนา: {currentGame.developer}</span>
          </div>

          {currentGame.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-indigo-950/70 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-[11px] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Call to Actions & Carousel controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <button
              id={`hero-view-game-${currentGame.id}`}
              onClick={() => onSelectGame(currentGame)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-600 hover:from-cyan-400 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Info className="w-4 h-4" />
              ดูรายละเอียด & วิดีโอตัวอย่าง
            </button>

            <button
              id="hero-open-ai-advisor"
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151722]/90 hover:bg-[#1d2030] text-slate-100 font-semibold text-sm border border-white/10 hover:border-cyan-500/40 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              ให้ AI ช่วยเลือก
            </button>
          </div>

          {/* Carousel Slide Indicators */}
          {featuredGames.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? featuredGames.length - 1 : prev - 1
                  )
                }
                aria-label="Previous game"
                className="p-2 rounded-xl bg-[#141622] hover:bg-[#1e2133] text-slate-300 border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {featuredGames.map((game, idx) => (
                  <button
                    key={game.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-7 bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        : "w-2 bg-[#252838] hover:bg-[#34384d]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % featuredGames.length)
                }
                aria-label="Next game"
                className="p-2 rounded-xl bg-[#141622] hover:bg-[#1e2133] text-slate-300 border border-white/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
