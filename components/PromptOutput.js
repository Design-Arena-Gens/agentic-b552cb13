import { useState } from 'react';

export default function PromptOutput({ prompt, brandConfig, clips }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('combined');

  const generateClipPrompt = (clip, index, total) => {
    const position = index === 0 ? 'opening' : index === total - 1 ? 'closing' : 'middle';
    const pacing = position === 'opening' ? 'attention-grabbing' : position === 'closing' ? 'memorable call-to-action' : 'engaging continuation';
    
    return `## CLIP ${index + 1} OF ${total} (15 seconds)
**Position**: ${position.toUpperCase()} - ${pacing}
**Shot Type**: ${clip.shotType}
**Transition**: ${clip.transition} to next clip

### Visual Description:
${clip.description || 'A dynamic scene showcasing the main subject with professional lighting and composition.'}

### Technical Specifications:
- Duration: 15 seconds exactly
- Aspect Ratio: 9:16 (vertical TikTok format)
- Frame Rate: 30fps for smooth playback
- Resolution: 1080x1920 (Full HD vertical)

### Text Overlay:
${clip.textOverlay ? `"${clip.textOverlay}" - appears with ${brandConfig.fontStyle} styling` : 'No text overlay for this clip'}

### Brand Elements:
- Watermark: ${brandConfig.showWatermark ? `"${brandConfig.name}" in corner` : 'None'}
- Primary Color Accent: ${brandConfig.primaryColor}
- Secondary Color: ${brandConfig.secondaryColor}

### Mood & Pacing:
- Energy Level: ${position === 'opening' ? 'HIGH - Hook immediately' : position === 'closing' ? 'MEDIUM-HIGH - Drive action' : 'MEDIUM - Build interest'}
- Camera Movement: ${clip.shotType.includes('Dynamic') || clip.shotType.includes('Action') ? 'Active tracking' : 'Smooth, subtle movement'}
- Lighting: Professional, flattering, consistent with brand aesthetic
`;
  };

  const generateCombinedPrompt = () => {
    const clipPrompts = clips.map((clip, i) => generateClipPrompt(clip, i, clips.length)).join('\n---\n\n');
    
    return `# 🎬 SORA VIDEO PROMPT - ${clips.length * 15} SECOND TIKTOK UGC

## OVERALL CONCEPT
**Hook/Theme**: ${prompt.hook || 'Viral attention-grabbing content'}
**Niche**: ${prompt.niche || 'General lifestyle'}
**Aesthetic**: ${prompt.aesthetic || 'Modern and trendy'}
**Sound Style**: ${prompt.sound || 'Trending audio beat'}

## BRAND CONSISTENCY GUIDELINES
- **Brand**: ${brandConfig.name || '@brand'}
- **Color Palette**: ${brandConfig.primaryColor} (primary) + ${brandConfig.secondaryColor} (secondary)
- **Typography**: ${brandConfig.fontStyle}
- **Watermark**: ${brandConfig.showWatermark ? 'Yes - subtle corner placement' : 'No'}
- **Auto Captions**: ${brandConfig.showCaptions ? 'Yes - styled to match brand' : 'No'}

## VIRAL OPTIMIZATION
- First 3 seconds: CRITICAL hook - must stop the scroll
- Pattern interrupts every 3-5 seconds
- Emotional resonance and relatability
- Clear value proposition or entertainment
- Strong CTA in final seconds

---

${clipPrompts}

---

## TECHNICAL REQUIREMENTS FOR SORA
- Total Duration: ${clips.length * 15} seconds
- Format: Vertical (9:16 aspect ratio)
- Quality: Cinematic, professional UGC feel
- Consistency: Maintain same subject/style across all clips
- Seamless transitions between clips
- Natural, authentic feel (not overly polished)
- Mobile-first viewing optimization

## SUGGESTED AUDIO SYNC POINTS
${clips.map((_, i) => `- ${i * 15}s: Beat drop / transition point`).join('\n')}

## HASHTAG SUGGESTIONS
#fyp #viral #trending #${prompt.niche?.toLowerCase().replace(/\s+/g, '') || 'content'} #ugc #foryou #tiktok
`;
  };

  const handleCopy = async () => {
    const text = activeTab === 'combined' 
      ? generateCombinedPrompt() 
      : generateClipPrompt(clips[parseInt(activeTab)], parseInt(activeTab), clips.length);
    
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card neon-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <span className="gradient-text">Generated Sora Prompt</span>
        </h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => setActiveTab('combined')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'combined'
              ? 'bg-gradient-to-r from-tiktok-red to-tiktok-cyan'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          📦 Full Prompt
        </button>
        {clips.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index.toString())}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === index.toString()
                ? 'bg-gradient-to-r from-tiktok-red to-tiktok-cyan'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🎬 Clip {index + 1}
          </button>
        ))}
      </div>

      {/* Prompt Display */}
      <div className="bg-black/50 rounded-lg p-4 max-h-96 overflow-y-auto scrollbar-hide">
        <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
          {activeTab === 'combined' 
            ? generateCombinedPrompt() 
            : generateClipPrompt(clips[parseInt(activeTab)], parseInt(activeTab), clips.length)}
        </pre>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-tiktok-red">{clips.length}</p>
          <p className="text-xs text-gray-400">Clips</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-tiktok-cyan">{clips.length * 15}s</p>
          <p className="text-xs text-gray-400">Total Duration</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-400">9:16</p>
          <p className="text-xs text-gray-400">Aspect Ratio</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">HD</p>
          <p className="text-xs text-gray-400">1080x1920</p>
        </div>
      </div>
    </div>
  );
}
