import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Dices,
  X,
  Sparkles,
  RotateCcw,
  Star,
  Clock,
  Info,
  Flame,
  CheckCircle
} from "lucide-react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";

interface RandomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
}

export const RandomizerModal: React.FC<RandomizerModalProps> = ({
  isOpen,
  onClose,
  onSelectGame,
}) => {
  const [filterType, setFilterType] = useState<"all" | "indie" | "action">("all");
  const [maxHours, setMaxHours] = useState<number>(100);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickedGame, setPickedGame] = useState<Game | null>(null);

  if (!isOpen) return null;

  const eligibleGames = GAMES_DATA.filter((g) => {
    if (filterType === "indie" && g.category !== "indie" && g.category !== "indie-action") return false;
    if (filterType === "action" && g.category !== "action" && g.category !== "indie-action") return false;
    if (g.averagePlaytimeHours > maxHours) return false;
    return true;
  });

  const handleSpinWheel = () => {
    if (eligibleGames.length === 0) return;

    setIsSpinning(true);
    let counter = 0;
    const totalSpins = 20;
    const intervalTime = 60;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * eligibleGames.length);
      setPickedGame(eligibleGames[randomIndex]);
      counter++;

      if (counter >= totalSpins) {
        clearInterval(interval);
        setIsSpinning(false);

        // Confetti!
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      }
    }, intervalTime);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Dices className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                วงล้อสุ่มเกมอินดี้ & แอคชั่น (Game Roulette)
              </h3>
              <p className="text-xs text-slate-400">
                ลังเลไม่รู้จะเล่นเกมไหนดี? ให้ระบบสุ่มเกมที่คู่ควรให้คุณ!
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

        {/* Body */}
        <div className="p-6 space-y-6 text-slate-200">
          {/* Spin Filters */}
          <div className="p-3.5 rounded-2xl bg-[#08080c] border border-white/5 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">ประเภทเกมที่ต้องการสุ่ม</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full bg-[#0e101a] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="all">ทั้งหมด (อินดี้ + แอคชั่น)</option>
                  <option value="indie">เฉพาะเกมอินดี้</option>
                  <option value="action">เฉพาะเกมแอคชั่น</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">ความยาวการเล่นไม่เกิน</label>
                <select
                  value={maxHours}
                  onChange={(e) => setMaxHours(Number(e.target.value))}
                  className="w-full bg-[#0e101a] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value={100}>ไม่จำกัดเวลา (ทุกความยาว)</option>
                  <option value={15}>ไม่เกิน 15 ชั่วโมง (สั้นจบไว)</option>
                  <option value={30}>ไม่เกิน 30 ชั่วโมง (ปานกลาง)</option>
                  <option value={50}>ไม่เกิน 50 ชั่วโมง</option>
                </select>
              </div>
            </div>
          </div>

          {/* Slot Machine Display */}
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-[#08080c] border border-white/5 overflow-hidden flex flex-col items-center justify-center p-4 text-center shadow-inner">
            {pickedGame ? (
              <div className={`space-y-3 w-full max-w-sm ${isSpinning ? "blur-[1px] scale-95 opacity-80" : "scale-100 opacity-100"} transition-all duration-150`}>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-white/10 mx-auto">
                  <img
                    src={pickedGame.thumbnailImage}
                    alt={pickedGame.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                    <span className="font-bold bg-[#0c0d15]/80 px-2 py-0.5 rounded text-[10px] border border-white/10">
                      {pickedGame.difficulty}
                    </span>
                    <span className="font-bold text-amber-400 bg-[#0c0d15]/80 px-2 py-0.5 rounded text-[10px] border border-white/10">
                      ★ {pickedGame.rating}/10
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white">{pickedGame.title}</h4>
                  {pickedGame.titleTh && (
                    <p className="text-xs text-cyan-300 font-medium">{pickedGame.titleTh}</p>
                  )}
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{pickedGame.tagline}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#0e101a] border border-white/10 flex items-center justify-center mx-auto text-cyan-400 animate-pulse">
                  <Dices className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-300">
                  พร้อมสุ่มจากคลัง {eligibleGames.length} เกม
                </p>
                <p className="text-xs text-slate-500">กดปุ่มสุ่มเกมด้านล่างเพื่อเริ่มหมุนวงล้อ</p>
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              id="btn-spin-roulette"
              onClick={handleSpinWheel}
              disabled={isSpinning || eligibleGames.length === 0}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 text-white text-sm font-black shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Dices className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
              <span>{isSpinning ? "กำลังสุ่มเกม..." : pickedGame ? "สุ่มอีกครั้ง!" : "สุ่มเกมให้ฉันที!"}</span>
            </button>

            {pickedGame && !isSpinning && (
              <button
                onClick={() => {
                  onClose();
                  onSelectGame(pickedGame);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#141624] hover:bg-[#1e2236] text-white text-xs font-bold whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 border border-white/10 shadow"
              >
                <Info className="w-4 h-4 text-cyan-400" />
                <span>ดูรายละเอียดเกมนี้</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
