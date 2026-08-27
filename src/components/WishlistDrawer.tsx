import React, { useState } from "react";
import {
  Heart,
  X,
  Trash2,
  ExternalLink,
  Clock,
  DollarSign,
  Share2,
  Copy,
  Check,
  Sparkles,
  Info
} from "lucide-react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (gameId: string) => void;
  onClearWishlist: () => void;
  onSelectGame: (game: Game) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onClearWishlist,
  onSelectGame,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const wishlistedGames = wishlistIds
    .map((id) => GAMES_DATA.find((g) => g.id === id))
    .filter((g): g is Game => !!g);

  const totalHours = wishlistedGames.reduce(
    (acc, cur) => acc + cur.averagePlaytimeHours,
    0
  );

  const totalPrice = wishlistedGames.reduce((acc, cur) => {
    if (typeof cur.priceEstimateThb === "number") {
      return acc + cur.priceEstimateThb;
    }
    return acc;
  }, 0);

  const handleCopyWishlistText = () => {
    const text = wishlistedGames
      .map(
        (g, i) =>
          `${i + 1}. ${g.title} (${g.category}) - ความยาก: ${g.difficulty} | เวลาเล่น ~${g.averagePlaytimeHours} ชม.`
      )
      .join("\n");

    navigator.clipboard.writeText(`คลังเกมที่อยากเล่น (My Game Wishlist):\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#050507]/80 backdrop-blur-2xl flex justify-end animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#0c0d15]/95 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col h-full animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Heart className="w-5 h-5 fill-rose-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">คลังเกมที่สนใจ (Wishlist)</h3>
              <p className="text-xs text-slate-400">{wishlistedGames.length} เกมที่บันทึกไว้</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#08080c]/80 hover:bg-[#161826] text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        {wishlistedGames.length > 0 && (
          <div className="p-4 bg-[#08080c] border-b border-white/5 grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-[#0e101a] border border-white/10">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                เวลารวมที่ต้องใช้เล่น
              </span>
              <span className="text-sm font-bold text-white">~{totalHours} ชั่วโมง</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0e101a] border border-white/10">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                งบประมาณรวมโดยประมาณ
              </span>
              <span className="text-sm font-bold text-emerald-400">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Game List Items */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 text-slate-200">
          {wishlistedGames.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#08080c] border border-white/10 flex items-center justify-center mx-auto text-slate-600">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-300">ยังไม่มีเกมในคลังที่บันทึกไว้</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                กดไอคอนหัวใจ ❤️ บนการ์ดเกมที่คุณสนใจเพื่อบันทึกเก็บไว้ดูย้อนหลังได้ตลอดเวลา
              </p>
            </div>
          ) : (
            wishlistedGames.map((game) => (
              <div
                key={game.id}
                className="p-3 rounded-2xl bg-[#08080c] border border-white/5 hover:border-white/20 transition-all flex items-center gap-3 group"
              >
                <img
                  src={game.thumbnailImage}
                  alt={game.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer border border-white/10 group-hover:scale-105 transition-transform"
                  onClick={() => {
                    onClose();
                    onSelectGame(game);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectGame(game);
                    }}
                    className="text-xs font-bold text-white hover:text-cyan-400 truncate cursor-pointer"
                  >
                    {game.title}
                  </h4>
                  <span className="text-[11px] text-cyan-400 block truncate">
                    {game.category === "indie" ? "เกมอินดี้" : "เกมแอคชั่น"} • {game.difficulty}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>~{game.averagePlaytimeHours} ชม.</span>
                    <span>•</span>
                    <span className="font-bold text-emerald-400">
                      ฿{game.priceEstimateThb}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectGame(game);
                    }}
                    title="ดูรายละเอียด"
                    className="p-2 rounded-lg bg-[#141624] hover:bg-[#1e2236] text-slate-400 hover:text-cyan-400 transition-colors border border-white/5"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(game.id)}
                    title="ลบออก"
                    className="p-2 rounded-lg bg-[#141624] hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors border border-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlistedGames.length > 0 && (
          <div className="p-4 bg-[#08080c] border-t border-white/10 space-y-2">
            <button
              onClick={handleCopyWishlistText}
              className="w-full py-2.5 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "คัดลอกรายชื่อเกมแล้ว!" : "คัดลอกรายชื่อเกมทั้งหมด"}</span>
            </button>

            <button
              onClick={onClearWishlist}
              className="w-full py-2 text-rose-400 hover:text-rose-300 text-xs font-medium transition-colors"
            >
              ล้างรายการทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
