export type GameCategory = "all" | "indie" | "action" | "indie-action" | "award-winner" | "roguelike" | "story";

export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Very Hard" | "Soulslike";

export type Platform = "PC" | "PlayStation" | "Xbox" | "Nintendo Switch" | "Mac" | "Steam Deck" | "Linux" | "iOS" | "Android";

export interface Game {
  id: string;
  title: string;
  titleTh?: string;
  tagline: string;
  category: "indie" | "action" | "indie-action";
  subGenres: string[];
  developer: string;
  publisher: string;
  releaseYear: number;
  rating: number; // 0 to 10
  metacriticScore?: number;
  steamRating: string; // e.g. "Overwhelmingly Positive" (97%)
  difficulty: DifficultyLevel;
  averagePlaytimeHours: number;
  priceEstimateThb: number | string; // e.g. 399 or "Free-to-Play"
  platforms: Platform[];
  tags: string[];
  bannerImage: string;
  thumbnailImage: string;
  screenshots: string[];
  trailerYoutubeId?: string;
  overviewTh: string;
  highlightsTh: string[];
  combatAndGameplayTh: string;
  whyYouShouldPlayTh: string;
  prosTh: string[];
  consTh: string[];
  vibe: string;
  steamUrl?: string;
  featured?: boolean;
  awardWinning?: boolean;
}

export interface FilterOptions {
  search: string;
  category: GameCategory;
  platform: string;
  difficulty: string;
  playtime: string;
  priceRange: string;
  tag: string;
  sortBy: "rating" | "playtime" | "difficulty" | "releaseYear" | "title";
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  options: {
    label: string;
    description: string;
    icon: string;
    points: {
      category?: "indie" | "action" | "indie-action";
      difficulty?: DifficultyLevel;
      tags?: string[];
      targetGameIds?: string[];
    };
  }[];
}
