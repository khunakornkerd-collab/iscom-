import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Flame,
  Zap,
  Smile,
  Skull,
  Sword,
  Palette,
  Cpu,
  Monitor,
  Gamepad2,
  Smartphone,
  Info
} from "lucide-react";
import { QUIZ_QUESTIONS, ARCHETYPES, ArchetypeResult } from "../data/quiz";
import { GAMES_DATA } from "../data/games";
import { Game } from "../types";

interface GameQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
}

export const GameQuizModal: React.FC<GameQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectGame,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ArchetypeResult | null>(null);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate archetype result
      calculateResult(updated);
    }
  };

  const calculateResult = (answers: number[]) => {
    // Determine archetype based on selected answers
    // Question 1: 0 = roguelike/quick, 1 = action 1-2h, 2 = open world/long
    // Question 2: 0 = easy/cozy, 1 = medium, 2 = soulslike/hard
    // Question 3: 0 = combat, 1 = art/music, 2 = build craft
    const q1 = answers[0] ?? 0;
    const q2 = answers[1] ?? 1;
    const q3 = answers[2] ?? 0;

    let archetypeKey = "combo_rogue";

    if (q2 === 2) {
      // Hardcore
      archetypeKey = "hardcore_duelist";
    } else if (q2 === 0) {
      // Cozy
      archetypeKey = "cozy_diver";
    } else if (q3 === 1) {
      // Art & Music
      archetypeKey = "indie_explorer";
    } else if (q3 === 0 && (q1 === 1 || q1 === 2)) {
      // Combat & Fast Action
      archetypeKey = "adrenaline_rusher";
    } else {
      archetypeKey = "combo_rogue";
    }

    const calculatedArchetype = ARCHETYPES[archetypeKey] || ARCHETYPES.combo_rogue;
    setResult(calculatedArchetype);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b"],
      });
    } catch (e) {
      // Ignore if not supported
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResult(null);
  };

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-rose-400" />;
      case "Globe":
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case "Smile":
        return <Smile className="w-5 h-5 text-emerald-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "Skull":
        return <Skull className="w-5 h-5 text-rose-500" />;
      case "Sword":
        return <Sword className="w-5 h-5 text-cyan-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-pink-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-indigo-400" />;
    }
  };

  const recommendedGames = result
    ? result.recommendedGameIds
        .map((id) => GAMES_DATA.find((g) => g.id === id))
        .filter((g): g is Game => !!g)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                แบบทดสอบ: ค้นหาเกมอินดี้ & แอคชั่นที่ใช่สำหรับคุณ
              </h3>
              <p className="text-xs text-slate-400">
                ตอบคำถามสั้นๆ 4 ข้อ เพื่อค้นหาเกมเมอร์สไตล์คุณ พร้อมเกมแนะนำที่ตรงใจ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#08080c]/80 hover:bg-[#161826] text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Progress Bar */}
        {!result && (
          <div className="w-full bg-[#08080c] h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{
                width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          {!result ? (
            /* QUESTIONS FLOW */
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-cyan-400">
                  คำถามข้อที่ {currentStep + 1} จาก {QUIZ_QUESTIONS.length}
                </span>
                <span>เลือกคำตอบที่ตรงกับตัวคุณที่สุด</span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-black text-white mb-1">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs text-slate-400">{currentQuestion.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 group ${
                        isSelected
                          ? "bg-[#141829] border-cyan-500/80 text-white shadow-lg shadow-cyan-500/20 scale-[1.01]"
                          : "bg-[#08080c] hover:bg-[#141624] border-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-[#0e101a] border border-white/10 group-hover:scale-110 transition-transform shrink-0">
                        {getOptionIcon(option.icon)}
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-bold block">{option.label}</span>
                        <span className="text-xs text-slate-400 block leading-relaxed">
                          {option.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* RESULT SCREEN */
            <div className="space-y-6 animate-fadeIn">
              {/* Result Hero Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-indigo-950/40 to-[#08080c] border border-cyan-500/30 text-center space-y-3 shadow-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
                  {result.badge}
                </span>

                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  {result.title}
                </h4>

                <p className="text-sm font-bold text-rose-400">
                  {result.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  {result.descriptionTh}
                </p>

                {/* Traits chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {result.traitsTh.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#08080c] text-slate-200 text-xs border border-white/10 font-medium"
                    >
                      ✓ {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top 3-4 Recommended Games */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  เกมที่เราคัดสรรให้ตรงกับสไตล์คุณที่สุด (คลิกดูรายละเอียด):
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => {
                        onClose();
                        onSelectGame(game);
                      }}
                      className="p-3.5 rounded-2xl bg-[#08080c] hover:bg-[#141624] border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center gap-3.5 group shadow-sm"
                    >
                      <img
                        src={game.thumbnailImage}
                        alt={game.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                            {game.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-cyan-400 block truncate">
                          {game.category === "indie" ? "เกมอินดี้" : "เกมแอคชั่น"} • {game.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          ~{game.averagePlaytimeHours} ชม. • ฿{game.priceEstimateThb}
                        </span>
                      </div>
                      <Info className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08080c] border-t border-white/10 flex items-center justify-between">
          {result ? (
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ทำแบบทดสอบใหม่</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500">
              ข้อ {currentStep + 1} จาก {QUIZ_QUESTIONS.length}
            </span>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
          >
            {result ? "เสร็จสิ้น" : "ยกเลิก"}
          </button>
        </div>
      </div>
    </div>
  );
};
