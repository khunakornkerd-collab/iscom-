import React from "react";
import {
  Star,
  Clock,
  Heart,
  GitCompare,
  ExternalLink,
  Flame,
  Trophy,
  CheckCircle,
  Play
} from "lucide-react";
import { Game } from "../types";

interface GameCardProps {
  game: Game;
  onSelectGame: (game: Game) => void;
  isWishlisted: boolean;
  onToggleWishlist: (gameId: string) => void;
  isComparing: boolean;
  onToggleCompare: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelectGame,
  isWishlisted,
  onToggleWishlist,
  isComparing,
  onToggleCompare,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Hard":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      case "Very Hard":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "Soulslike":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]";
      default:
        return "bg-slate-800 text-slate-300 border-white/10";
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "indie":
        return { label: "INDIE", color: "bg-emerald-600/90 text-white border-emerald-400/30" };
      case "action":
        return { label: "ACTION", color: "bg-rose-600/90 text-white border-rose-400/30" };
      case "indie-action":
        return { label: "INDIE ACTION", color: "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]" };
      default:
        return { label: "GAME", color: "bg-slate-700 text-white border-white/10" };
    }
  };

  const badgeInfo = getCategoryBadge(game.category);

  return (
    <div
      id={`game-card-${game.id}`}
      className="group relative flex flex-col rounded-3xl bg-[#0d0e16]/90 border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(6,182,212,0.14)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#060609] cursor-pointer" onClick={() => onSelectGame(game)}>
        <img
          src={game.thumbnailImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e16] via-[#0d0e16]/30 to-transparent" />

        {/* Category Pill on top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black tracking-wider uppercase shadow-md border ${badgeInfo.color}`}>
            {badgeInfo.label}
          </span>
          {game.awardWinning && (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-400 text-black flex items-center gap-1 shadow-md shadow-amber-400/20">
              <Trophy className="w-2.5 h-2.5" />
              Award Winner
            </span>
          )}
        </div>

        {/* Top Right Quick Actions (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
          <button
            id={`btn-compare-${game.id}`}
            onClick={() => onToggleCompare(game.id)}
            title={isComparing ? "ลบออกจากการเปรียบเทียบ" : "เพิ่มในตารางเปรียบเทียบ"}
            className={`p-2 rounded-xl backdrop-blur-xl transition-all ${
              isComparing
                ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/30 scale-105"
                : "bg-[#08080c]/80 text-slate-300 hover:text-cyan-300 hover:bg-[#121422] border border-white/10"
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>

          <button
            id={`btn-wishlist-${game.id}`}
            onClick={() => onToggleWishlist(game.id)}
            title={isWishlisted ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
            className={`p-2 rounded-xl backdrop-blur-xl transition-all ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105"
                : "bg-[#08080c]/80 text-slate-300 hover:text-rose-400 hover:bg-[#121422] border border-white/10"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom Floating Stats in image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1 bg-[#08080c]/90 backdrop-blur-xl px-2.5 py-0.5 rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold">{game.rating}</span>
            <span className="text-[10px] text-slate-400">/10</span>
          </div>

          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getDifficultyColor(game.difficulty)} backdrop-blur-xl`}>
            {game.difficulty}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title and year */}
          <div className="flex items-start justify-between gap-1.5 mb-1">
            <h3 
              onClick={() => onSelectGame(game)}
              className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
            >
              {game.title}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">
              {game.releaseYear}
            </span>
          </div>

          {game.titleTh && (
            <p className="text-xs text-cyan-400/90 font-medium line-clamp-1 mb-1.5">
              {game.titleTh}
            </p>
          )}

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.tagline}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {game.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#08080c] text-slate-300 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer info: Playtime & Price */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>~{game.averagePlaytimeHours} ชม.</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400">
              {typeof game.priceEstimateThb === "number"
                ? `฿${game.priceEstimateThb.toLocaleString()}`
                : game.priceEstimateThb}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          id={`btn-view-details-${game.id}`}
          onClick={() => onSelectGame(game)}
          className="w-full py-2.5 px-3 rounded-2xl bg-[#141624] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 text-slate-200 hover:text-white text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 border border-white/5 hover:border-white/20 shadow-sm"
        >
          <span>ดูบทวิจารณ์ & ไฮไลท์</span>
        </button>
      </div>
    </div>
  );
};
