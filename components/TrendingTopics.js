import { useState } from 'react';

const trendingData = {
  hooks: [
    "POV: You just discovered...",
    "Wait for it... 🔥",
    "This changed everything...",
    "Nobody talks about this...",
    "The secret they don't want you to know...",
    "I can't believe this worked...",
    "Watch until the end...",
    "This is your sign to...",
    "Day in my life as a...",
    "How I went from X to Y...",
  ],
  aesthetics: [
    "Clean Girl Aesthetic",
    "Dark Academia",
    "Cottagecore",
    "Y2K Retro",
    "Minimalist Modern",
    "Soft Girl",
    "Grunge Revival",
    "Coastal Grandmother",
    "Cyberpunk Neon",
    "Bohemian Luxe",
  ],
  niches: [
    "Fitness & Wellness",
    "Beauty & Skincare",
    "Fashion & Style",
    "Food & Recipes",
    "Tech & Gadgets",
    "Finance & Money",
    "Travel & Adventure",
    "Productivity & Life Hacks",
    "Gaming & Entertainment",
    "Education & Learning",
  ],
  sounds: [
    "Trending Audio #1 - Viral Beat",
    "Emotional Piano - Storytelling",
    "Upbeat Pop - Product Showcase",
    "Lo-fi Hip Hop - Aesthetic Vibes",
    "Dramatic Build-up - Reveals",
    "Motivational - Transformation",
    "Comedy Sound Effect",
    "ASMR Ambient",
    "Cinematic Orchestra",
    "Electronic Dance",
  ],
};

export default function TrendingTopics({ onSelectTrend }) {
  const [activeCategory, setActiveCategory] = useState('hooks');

  const categories = [
    { id: 'hooks', label: '🪝 Hooks', icon: '🪝' },
    { id: 'aesthetics', label: '✨ Aesthetics', icon: '✨' },
    { id: 'niches', label: '🎯 Niches', icon: '🎯' },
    { id: 'sounds', label: '🎵 Sounds', icon: '🎵' },
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <span className="gradient-text">Viral Trends 2024</span>
      </h3>
      
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-tiktok-red to-tiktok-cyan text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Trend Tags */}
      <div className="flex flex-wrap gap-2">
        {trendingData[activeCategory].map((trend, index) => (
          <button
            key={index}
            onClick={() => onSelectTrend(trend, activeCategory)}
            className="trend-tag px-3 py-2 rounded-lg text-sm hover:cursor-pointer"
          >
            {trend}
          </button>
        ))}
      </div>
    </div>
  );
}
