import { useState } from 'react';

export default function ClipTimeline({ clips, onUpdateClip, onAddClip, onRemoveClip }) {
  const [activeClip, setActiveClip] = useState(0);

  const transitionTypes = [
    { id: 'cut', name: 'Hard Cut', icon: '✂️' },
    { id: 'fade', name: 'Fade', icon: '🌅' },
    { id: 'zoom', name: 'Zoom', icon: '🔍' },
    { id: 'swipe', name: 'Swipe', icon: '👆' },
    { id: 'glitch', name: 'Glitch', icon: '⚡' },
    { id: 'spin', name: 'Spin', icon: '🔄' },
  ];

  const shotTypes = [
    'Close-up Face',
    'Product Shot',
    'Wide Establishing',
    'Over Shoulder',
    'POV First Person',
    'Action Dynamic',
    'B-Roll Lifestyle',
    'Text Overlay',
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <span>Video Timeline</span>
          <span className="text-sm text-gray-400 ml-2">
            ({clips.length * 15}s total)
          </span>
        </h3>
        {clips.length < 4 && (
          <button
            onClick={onAddClip}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center gap-2"
          >
            <span>+</span> Add Clip
          </button>
        )}
      </div>

      {/* Timeline Visual */}
      <div className="relative mb-6">
        <div className="flex items-center">
          {clips.map((clip, index) => (
            <div key={index} className="flex items-center flex-1">
              {/* Clip Block */}
              <button
                onClick={() => setActiveClip(index)}
                className={`flex-1 h-16 rounded-lg relative overflow-hidden transition-all ${
                  activeClip === index 
                    ? 'ring-2 ring-tiktok-red scale-105' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: `linear-gradient(135deg, 
                    ${index % 2 === 0 ? '#FE2C55' : '#25F4EE'}40, 
                    ${index % 2 === 0 ? '#25F4EE' : '#FE2C55'}40)`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-bold">Clip {index + 1}</p>
                    <p className="text-xs text-gray-300">15 sec</p>
                  </div>
                </div>
                {clips.length > 2 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveClip(index);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </button>
              
              {/* Transition Indicator */}
              {index < clips.length - 1 && (
                <div className="mx-2 flex flex-col items-center">
                  <div className="timeline-dot"></div>
                  <span className="text-xs text-gray-400 mt-1">
                    {transitionTypes.find(t => t.id === clip.transition)?.icon || '✂️'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Time Markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0:00</span>
          {clips.map((_, index) => (
            <span key={index}>{((index + 1) * 15)}s</span>
          ))}
        </div>
      </div>

      {/* Active Clip Editor */}
      <div className="bg-white/5 rounded-lg p-4 animate-fade-in">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-tiktok-red rounded-full flex items-center justify-center text-sm">
            {activeClip + 1}
          </span>
          Clip {activeClip + 1} Settings
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Shot Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Shot Type</label>
            <select
              value={clips[activeClip].shotType}
              onChange={(e) => onUpdateClip(activeClip, { ...clips[activeClip], shotType: e.target.value })}
              className="w-full px-4 py-3 rounded-lg"
            >
              {shotTypes.map((shot, index) => (
                <option key={index} value={shot}>{shot}</option>
              ))}
            </select>
          </div>

          {/* Transition */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Transition to Next</label>
            <div className="flex gap-2 flex-wrap">
              {transitionTypes.map((trans) => (
                <button
                  key={trans.id}
                  onClick={() => onUpdateClip(activeClip, { ...clips[activeClip], transition: trans.id })}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    clips[activeClip].transition === trans.id
                      ? 'bg-tiktok-red'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {trans.icon} {trans.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scene Description */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Scene Description (for Sora)</label>
            <textarea
              value={clips[activeClip].description}
              onChange={(e) => onUpdateClip(activeClip, { ...clips[activeClip], description: e.target.value })}
              placeholder="Describe what happens in this 15-second clip..."
              className="w-full px-4 py-3 rounded-lg h-24 resize-none"
            />
          </div>

          {/* Text Overlay */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Text Overlay (optional)</label>
            <input
              type="text"
              value={clips[activeClip].textOverlay}
              onChange={(e) => onUpdateClip(activeClip, { ...clips[activeClip], textOverlay: e.target.value })}
              placeholder="Text to appear on screen..."
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
