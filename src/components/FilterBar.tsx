import React from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Gamepad,
  Clock,
  Gauge,
  Tag,
  ArrowUpDown,
  Laptop,
  Check
} from "lucide-react";
import { FilterOptions, GameCategory } from "../types";
import { CATEGORY_LABELS, POPULAR_TAGS } from "../data/games";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalGamesCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalGamesCount,
  filteredCount,
}) => {
  const categories: GameCategory[] = [
    "all",
    "indie",
    "action",
    "indie-action",
    "award-winner",
    "roguelike",
    "story",
  ];

  const platforms = [
    "ทั้งหมด",
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Steam Deck",
  ];

  const difficulties = [
    "ทั้งหมด",
    "Easy",
    "Medium",
    "Hard",
    "Very Hard",
    "Soulslike",
  ];

  const playtimes = [
    { label: "ทุกความยาว", value: "all" },
    { label: "สั้นกระชับ (< 15 ชม.)", value: "short" },
    { label: "กำลังดี (15 - 40 ชม.)", value: "medium" },
    { label: "มหากาพย์ (40+ ชม.)", value: "long" },
  ];

  const isFiltered =
    filters.category !== "all" ||
    filters.platform !== "ทั้งหมด" ||
    filters.difficulty !== "ทั้งหมด" ||
    filters.playtime !== "all" ||
    filters.tag !== "ทั้งหมด" ||
    filters.search !== "";

  return (
    <div className="space-y-4 mb-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#1e2230]">
        {categories.map((cat) => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              id={`tab-category-${cat}`}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02] border border-white/20"
                  : "bg-[#0e0f17]/90 hover:bg-[#161824] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              <span>{CATEGORY_LABELS[cat]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-[#0d0e16]/80 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Platform Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              แพลตฟอร์ม
            </label>
            <select
              id="filter-platform"
              value={filters.platform}
              onChange={(e) => onFilterChange({ platform: e.target.value })}
              className="w-full bg-[#08080c] border border-white/10 focus:border-cyan-500/60 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-rose-400" />
              ระดับความยาก
            </label>
            <select
              id="filter-difficulty"
              value={filters.difficulty}
              onChange={(e) => onFilterChange({ difficulty: e.target.value })}
              className="w-full bg-[#08080c] border border-white/10 focus:border-cyan-500/60 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === "ทั้งหมด" ? "ทุกระดับความยาก" : d}
                </option>
              ))}
            </select>
          </div>

          {/* Playtime Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              ระยะเวลาเล่นจบ
            </label>
            <select
              id="filter-playtime"
              value={filters.playtime}
              onChange={(e) => onFilterChange({ playtime: e.target.value })}
              className="w-full bg-[#08080c] border border-white/10 focus:border-cyan-500/60 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
            >
              {playtimes.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
              เรียงลำดับตาม
            </label>
            <select
              id="filter-sortby"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as FilterOptions["sortBy"],
                })
              }
              className="w-full bg-[#08080c] border border-white/10 focus:border-cyan-500/60 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
            >
              <option value="rating">คะแนนรีวิวสูงสุด (Top Rated)</option>
              <option value="releaseYear">เกมใหม่ล่าสุด (Release Year)</option>
              <option value="playtime">เวลาเล่น (น้อยไปมาก)</option>
              <option value="title">ชื่อเกม (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Tag Pills */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center flex-wrap gap-2">
          <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-cyan-400" /> แท็กยอดนิยม:
          </span>
          {POPULAR_TAGS.map((tag) => {
            const isTagActive = filters.tag === tag;
            return (
              <button
                key={tag}
                onClick={() =>
                  onFilterChange({ tag: isTagActive && tag !== "ทั้งหมด" ? "ทั้งหมด" : tag })
                }
                className={`px-3 py-1 rounded-xl text-[11px] font-medium transition-all ${
                  isTagActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold"
                    : "bg-[#08080c] hover:bg-[#141624] text-slate-300 border border-white/10 hover:border-white/20"
                }`}
              >
                {tag}
              </button>
            );
          })}

          {isFiltered && (
            <button
              id="btn-reset-filters"
              onClick={onResetFilters}
              className="ml-auto text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/40 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3 h-3" />
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400">
        <span>
          พบเกมที่ตรงตามเงื่อนไข{" "}
          <strong className="text-cyan-300 font-bold">{filteredCount}</strong> จากทั้งหมด {totalGamesCount} เกม
        </span>
        {filters.search && (
          <span>
            คำค้นหา: <span className="text-cyan-400 font-medium">"{filters.search}"</span>
          </span>
        )}
      </div>
    </div>
  );
};
