import { useState } from 'react';

export default function BrandSettings({ brandConfig, onUpdateBrand }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorPresets = [
    { name: 'TikTok', primary: '#FE2C55', secondary: '#25F4EE' },
    { name: 'Instagram', primary: '#E1306C', secondary: '#F77737' },
    { name: 'YouTube', primary: '#FF0000', secondary: '#282828' },
    { name: 'Luxury Gold', primary: '#D4AF37', secondary: '#1A1A1A' },
    { name: 'Nature Green', primary: '#2ECC71', secondary: '#27AE60' },
    { name: 'Ocean Blue', primary: '#3498DB', secondary: '#2980B9' },
    { name: 'Sunset', primary: '#FF6B6B', secondary: '#FFE66D' },
    { name: 'Minimal B&W', primary: '#FFFFFF', secondary: '#000000' },
  ];

  const fontPresets = [
    'Modern Sans (Clean)',
    'Bold Impact (Statement)',
    'Elegant Serif (Luxury)',
    'Playful Rounded (Fun)',
    'Handwritten (Personal)',
    'Tech Mono (Futuristic)',
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <span>Brand Consistency</span>
        </h3>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Brand Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Brand Name / Watermark</label>
            <input
              type="text"
              value={brandConfig.name}
              onChange={(e) => onUpdateBrand({ ...brandConfig, name: e.target.value })}
              placeholder="@yourbrand"
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Color Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => onUpdateBrand({ 
                    ...brandConfig, 
                    primaryColor: preset.primary, 
                    secondaryColor: preset.secondary 
                  })}
                  className={`p-3 rounded-lg border transition-all ${
                    brandConfig.primaryColor === preset.primary 
                      ? 'border-white' 
                      : 'border-transparent hover:border-white/30'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` 
                  }}
                >
                  <span className="text-xs text-white font-medium drop-shadow-lg">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Style */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Text Style</label>
            <select
              value={brandConfig.fontStyle}
              onChange={(e) => onUpdateBrand({ ...brandConfig, fontStyle: e.target.value })}
              className="w-full px-4 py-3 rounded-lg"
            >
              {fontPresets.map((font, index) => (
                <option key={index} value={font}>{font}</option>
              ))}
            </select>
          </div>

          {/* Visual Elements */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={brandConfig.showWatermark}
                onChange={(e) => onUpdateBrand({ ...brandConfig, showWatermark: e.target.checked })}
                className="w-5 h-5 rounded accent-tiktok-red"
              />
              <span className="text-sm">Show Watermark</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={brandConfig.showCaptions}
                onChange={(e) => onUpdateBrand({ ...brandConfig, showCaptions: e.target.checked })}
                className="w-5 h-5 rounded accent-tiktok-red"
              />
              <span className="text-sm">Auto Captions</span>
            </label>
          </div>

          {/* Preview */}
          <div 
            className="p-4 rounded-lg text-center"
            style={{ 
              background: `linear-gradient(135deg, ${brandConfig.primaryColor}40, ${brandConfig.secondaryColor}40)`,
              border: `2px solid ${brandConfig.primaryColor}`
            }}
          >
            <p className="text-sm text-gray-400 mb-1">Preview</p>
            <p className="text-xl font-bold" style={{ color: brandConfig.primaryColor }}>
              {brandConfig.name || '@yourbrand'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
