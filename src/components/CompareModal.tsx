import React, { useState } from "react";
import {
  GitCompare,
  X,
  Sparkles,
  Star,
  Clock,
  Swords,
  CheckCircle,
  AlertCircle,
  Plus,
  Loader2,
  Trash2
} from "lucide-react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: string[]; // game IDs
  onRemoveFromCompare: (gameId: string) => void;
  onSelectGame: (game: Game) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onSelectGame,
}) => {
  const [selectedGameId1, setSelectedGameId1] = useState<string>(
    compareList[0] || GAMES_DATA[0]?.id || ""
  );
  const [selectedGameId2, setSelectedGameId2] = useState<string>(
    compareList[1] || GAMES_DATA[1]?.id || ""
  );

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const game1 = GAMES_DATA.find((g) => g.id === selectedGameId1);
  const game2 = GAMES_DATA.find((g) => g.id === selectedGameId2);

  const handleAskAiCompare = async () => {
    if (!game1 || !game2) return;
    setIsAiLoading(true);
    setAiAnalysis(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game1: `${game1.title} (${game1.category})`,
          game2: `${game2.title} (${game2.category})`,
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        setAiAnalysis(data.text);
      } else {
        setAiAnalysis("ขออภัย ไม่สามารถสร้างการเปรียบเทียบได้ในขณะนี้");
      }
    } catch (err: any) {
      setAiAnalysis("เกิดข้อผิดพลาด: " + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <GitCompare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                ตารางเปรียบเทียบเกม (Game Comparison)
              </h3>
              <p className="text-xs text-slate-400">
                วิเคราะห์จุดเด่น ความยาก ความคุ้มค่าเทียบกันแบบหมัดต่อหมัด
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          {/* Game Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-cyan-400 block">เลือกเกมที่ 1:</label>
              <select
                value={selectedGameId1}
                onChange={(e) => {
                  setSelectedGameId1(e.target.value);
                  setAiAnalysis(null);
                }}
                className="w-full bg-[#08080c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {GAMES_DATA.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-indigo-400 block">เลือกเกมที่ 2:</label>
              <select
                value={selectedGameId2}
                onChange={(e) => {
                  setSelectedGameId2(e.target.value);
                  setAiAnalysis(null);
                }}
                className="w-full bg-[#08080c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {GAMES_DATA.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side Comparison Cards */}
          {game1 && game2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-cyan-500/30 space-y-3 shadow-md">
                <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10">
                  <img
                    src={game1.thumbnailImage}
                    alt={game1.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-600 text-slate-950 text-[10px] font-black uppercase shadow">
                    {game1.category}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-white">{game1.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{game1.tagline}</p>
                </div>

                <div className="space-y-2 text-xs divide-y divide-white/5">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">คะแนนรีวิว:</span>
                    <span className="font-bold text-amber-400">★ {game1.rating}/10</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">ระดับความยาก:</span>
                    <span className="font-bold text-rose-400">{game1.difficulty}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">เวลาเล่นจบเฉลี่ย:</span>
                    <span className="font-bold text-slate-200">~{game1.averagePlaytimeHours} ชม.</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">ราคาโดยประมาณ:</span>
                    <span className="font-bold text-emerald-400">฿{game1.priceEstimateThb}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSelectGame(game1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-xs font-bold text-slate-200 border border-white/10 transition-colors"
                >
                  ดูรายละเอียด {game1.title}
                </button>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-indigo-500/30 space-y-3 shadow-md">
                <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10">
                  <img
                    src={game2.thumbnailImage}
                    alt={game2.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-black uppercase shadow">
                    {game2.category}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-white">{game2.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{game2.tagline}</p>
                </div>

                <div className="space-y-2 text-xs divide-y divide-white/5">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">คะแนนรีวิว:</span>
                    <span className="font-bold text-amber-400">★ {game2.rating}/10</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">ระดับความยาก:</span>
                    <span className="font-bold text-rose-400">{game2.difficulty}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">เวลาเล่นจบเฉลี่ย:</span>
                    <span className="font-bold text-slate-200">~{game2.averagePlaytimeHours} ชม.</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">ราคาโดยประมาณ:</span>
                    <span className="font-bold text-emerald-400">฿{game2.priceEstimateThb}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSelectGame(game2);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-xs font-bold text-slate-200 border border-white/10 transition-colors"
                >
                  ดูรายละเอียด {game2.title}
                </button>
              </div>
            </div>
          )}

          {/* Ask AI Comparison Button */}
          <div className="p-4 rounded-2xl bg-[#08080c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">ต้องการมุมมองเจาะลึกเพื่อตัดสินใจ?</span>
              ให้ AI ช่วยเปรียบเทียบเกมเพลย์ ความคุ้มค่า และสรุปว่าคุณควรซื้อเกมไหนก่อน
            </div>

            <button
              id="btn-ask-ai-compare"
              onClick={handleAskAiCompare}
              disabled={isAiLoading || !game1 || !game2}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 whitespace-nowrap transition-all"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>กำลังวิเคราะห์...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>ให้ AI เปรียบเทียบเชิงลึก</span>
                </>
              )}
            </button>
          </div>

          {/* AI Analysis Result */}
          {aiAnalysis && (
            <div className="p-5 rounded-2xl bg-[#08080c] border border-cyan-500/30 space-y-3 shadow-lg animate-fadeIn">
              <h5 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                บทวิเคราะห์เปรียบเทียบจาก AI:
              </h5>
              <div className="whitespace-pre-line text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {aiAnalysis}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08080c] border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
