import React, { useState } from "react";
import {
  X,
  Star,
  Clock,
  Heart,
  GitCompare,
  ExternalLink,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Play,
  Share2,
  Layers,
  Swords,
  ShieldAlert,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Game } from "../types";
import { GAMES_DATA } from "../data/games";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
  isWishlisted: boolean;
  onToggleWishlist: (gameId: string) => void;
  isComparing: boolean;
  onToggleCompare: (gameId: string) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  game,
  onClose,
  onSelectGame,
  isWishlisted,
  onToggleWishlist,
  isComparing,
  onToggleCompare,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "combat" | "proscons" | "media">("overview");
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!game) return null;

  // Find similar games in same category or sharing tags
  const similarGames = GAMES_DATA.filter(
    (g) => g.id !== game.id && (g.category === game.category || g.tags.some((t) => game.tags.includes(t)))
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-game-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#08080c]/80 hover:bg-[#161826] text-slate-300 hover:text-white border border-white/10 backdrop-blur-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-[#050507] overflow-hidden shrink-0">
          <img
            src={activeScreenshot || game.bannerImage}
            alt={game.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d15] via-[#0c0d15]/60 to-transparent" />

          {/* Quick Header Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  {game.category.toUpperCase()}
                </span>
                {game.awardWinning && (
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-amber-400 text-black flex items-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    <Trophy className="w-3 h-3" />
                    Award Winner
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-[#08080c]/90 text-slate-300 border border-white/10 backdrop-blur-md">
                  {game.releaseYear}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                {game.title}
              </h2>
              {game.titleTh && (
                <p className="text-sm sm:text-base text-cyan-300 font-medium">
                  {game.titleTh}
                </p>
              )}
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleWishlist(game.id)}
                className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold backdrop-blur-xl transition-all ${
                  isWishlisted
                    ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30"
                    : "bg-[#08080c]/80 hover:bg-[#151726] text-slate-200 border-white/10"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                <span>{isWishlisted ? "บันทึกแล้ว" : "เพิ่มใน Wishlist"}</span>
              </button>

              <button
                onClick={() => onToggleCompare(game.id)}
                className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold backdrop-blur-xl transition-all ${
                  isComparing
                    ? "bg-cyan-400 text-black border-cyan-300 font-bold shadow-lg shadow-cyan-400/30"
                    : "bg-[#08080c]/80 hover:bg-[#151726] text-slate-200 border-white/10"
                }`}
              >
                <GitCompare className="w-4 h-4" />
                <span>{isComparing ? "อยู่ในเปรียบเทียบ" : "เปรียบเทียบ"}</span>
              </button>

              <button
                onClick={handleShare}
                title="คัดลอกลิงก์"
                className="p-2.5 rounded-xl bg-[#08080c]/80 hover:bg-[#151726] text-slate-300 border border-white/10 backdrop-blur-xl transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 border-b border-white/10 bg-[#08080c]/80 backdrop-blur-md overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-cyan-400 text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            ภาพรวม & จุดเด่น
          </button>

          <button
            onClick={() => setActiveTab("combat")}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "combat"
                ? "border-cyan-400 text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            ระบบการเล่น & การต่อสู้
          </button>

          <button
            onClick={() => setActiveTab("proscons")}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "proscons"
                ? "border-cyan-400 text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            ข้อดี & ข้อควรพิจารณา
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "media"
                ? "border-cyan-400 text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            ภาพสกรีนช็อต & วิดีโอ
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#08080c] border border-white/5 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 block">คะแนนความนิยม</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-white">{game.rating}/10</span>
                {game.metacriticScore && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Meta: {game.metacriticScore}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block">ความยาก (Difficulty)</span>
              <span className="text-sm font-bold text-rose-400">{game.difficulty}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block">เวลาเล่นเฉลี่ย</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-sm font-bold text-white">~{game.averagePlaytimeHours} ชม.</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block">ราคาโดยประมาณ</span>
              <span className="text-sm font-bold text-emerald-400">
                {typeof game.priceEstimateThb === "number"
                  ? `฿${game.priceEstimateThb.toLocaleString()}`
                  : game.priceEstimateThb}
              </span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-2">เรื่องย่อ & บรรยากาศของเกม</h3>
                <p className="text-slate-300 leading-relaxed">{game.overviewTh}</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-3">จุดเด่นที่ทำให้เกมนี้ยอดเยี่ยม</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {game.highlightsTh.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#08080c] border border-white/5 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-normal">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-indigo-950/30 to-purple-950/30 border border-cyan-500/20">
                <h3 className="text-sm font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  ทำไมคุณถึงควรเล่นเกมนี้ (Verdict)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{game.whyYouShouldPlayTh}</p>
              </div>

              {/* Supported Platforms */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  แพลตฟอร์มที่รองรับ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-xl bg-[#08080c] border border-white/10 text-xs font-medium text-slate-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMBAT & GAMEPLAY */}
          {activeTab === "combat" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#08080c] border border-white/5">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Swords className="w-5 h-5 text-rose-400" />
                  เจาะลึกระบบการต่อสู้ & เมคานิกหลัก
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">{game.combatAndGameplayTh}</p>
              </div>

              {/* Sub-genres & tags */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  ประเภทย่อย & แนวการเล่น
                </h4>
                <div className="flex flex-wrap gap-2">
                  {game.subGenres.map((sg) => (
                    <span
                      key={sg}
                      className="px-3 py-1.5 rounded-xl bg-indigo-950/50 text-indigo-300 border border-indigo-500/30 text-xs font-medium"
                    >
                      {sg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steam Rating Quote */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">บทวิจารณ์บน Steam</span>
                  <span className="text-sm font-bold text-cyan-300">{game.steamRating}</span>
                </div>
                {game.steamUrl && (
                  <a
                    href={game.steamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <span>ดูบนหน้าร้าน Steam</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROS & CONS */}
          {activeTab === "proscons" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    ข้อดีเด่น & สิ่งที่คุณจะประทับใจ
                  </h3>
                  <ul className="space-y-2">
                    {game.prosTh.map((pro, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    ข้อควรพิจารณาก่อนเล่น
                  </h3>
                  <ul className="space-y-2">
                    {game.consTh.map((con, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Developer & Publisher info */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-white/5 flex flex-wrap justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">ผู้พัฒนา (Developer)</span>
                  <span className="font-semibold text-white">{game.developer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">ผู้จัดจำหน่าย (Publisher)</span>
                  <span className="font-semibold text-white">{game.publisher}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">บรรยากาศและอารมณ์ (Vibe)</span>
                  <span className="font-semibold text-cyan-300">{game.vibe}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & TRAILER */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {game.trailerYoutubeId && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-rose-400" />
                    ตัวอย่างเกมเพลย์อย่างเป็นทางการ (Official Gameplay Trailer)
                  </h3>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#050507] border border-white/10">
                    <iframe
                      src={`https://www.youtube.com/embed/${game.trailerYoutubeId}?autoplay=0&rel=0`}
                      title={`${game.title} Gameplay Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Screenshot gallery */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2">แกลเลอรี่ภาพสกรีนช็อต</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {game.screenshots.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveScreenshot(img)}
                      className="relative aspect-video rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
                    >
                      <img
                        src={img}
                        alt={`${game.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Games Section */}
          {similarGames.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                เกมแนะนำที่ใกล้เคียงกัน (คุณอาจจะชอบสิ่งนี้)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarGames.map((simGame) => (
                  <div
                    key={simGame.id}
                    onClick={() => {
                      onSelectGame(simGame);
                      setActiveScreenshot(null);
                    }}
                    className="p-2.5 rounded-2xl bg-[#08080c] hover:bg-[#141624] border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center gap-3 group shadow-sm"
                  >
                    <img
                      src={simGame.thumbnailImage}
                      alt={simGame.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                        {simGame.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {simGame.category === "indie" ? "อินดี้" : "แอคชั่น"} • {simGame.difficulty}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-[#08080c] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {copied && <span className="text-emerald-400 font-bold">คัดลอกลิงก์สำเร็จ!</span>}
          </div>

          <div className="flex items-center gap-2">
            {game.steamUrl && (
              <a
                href={game.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#141622] hover:bg-[#1e2233] text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                <span>ดูร้านค้า</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
