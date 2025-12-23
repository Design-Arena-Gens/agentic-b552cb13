import { useState } from 'react';
import Head from 'next/head';
import TrendingTopics from '../components/TrendingTopics';
import BrandSettings from '../components/BrandSettings';
import ClipTimeline from '../components/ClipTimeline';
import PromptOutput from '../components/PromptOutput';

export default function Home() {
  const [prompt, setPrompt] = useState({
    hook: '',
    aesthetic: '',
    niche: '',
    sound: '',
    customDescription: '',
  });

  const [brandConfig, setBrandConfig] = useState({
    name: '@yourbrand',
    primaryColor: '#FE2C55',
    secondaryColor: '#25F4EE',
    fontStyle: 'Modern Sans (Clean)',
    showWatermark: true,
    showCaptions: true,
  });

  const [clips, setClips] = useState([
    {
      shotType: 'Close-up Face',
      transition: 'cut',
      description: 'Hook moment - dramatic reveal or attention-grabbing opening that stops the scroll',
      textOverlay: '',
    },
    {
      shotType: 'Product Shot',
      transition: 'zoom',
      description: 'Main content - showcasing the key message, product, or transformation',
      textOverlay: '',
    },
  ]);

  const [showOutput, setShowOutput] = useState(false);

  const handleSelectTrend = (trend, category) => {
    setPrompt(prev => ({
      ...prev,
      [category === 'hooks' ? 'hook' : category === 'aesthetics' ? 'aesthetic' : category === 'niches' ? 'niche' : 'sound']: trend,
    }));
  };

  const handleUpdateClip = (index, updatedClip) => {
    const newClips = [...clips];
    newClips[index] = updatedClip;
    setClips(newClips);
  };

  const handleAddClip = () => {
    if (clips.length < 4) {
      setClips([...clips, {
        shotType: 'B-Roll Lifestyle',
        transition: 'fade',
        description: 'Supporting content or call-to-action',
        textOverlay: '',
      }]);
    }
  };

  const handleRemoveClip = (index) => {
    if (clips.length > 2) {
      const newClips = clips.filter((_, i) => i !== index);
      setClips(newClips);
    }
  };

  const handleGenerate = () => {
    setShowOutput(true);
    // Smooth scroll to output
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Head>
        <title>UGC Video Generator | Viral TikTok Sora Prompts</title>
        <meta name="description" content="Generate viral UGC video prompts for TikTok using Sora AI. Create 30-second videos with consistent branding and trending hooks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-10 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
              <span className="animate-pulse">🔴</span>
              <span className="text-sm">Powered by Sora AI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">UGC Video Generator</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Create viral TikTok video prompts optimized for Sora. Generate 30-second videos 
              with 2x 15-second clips, consistent branding, and trending hooks for millions of views.
            </p>
            
            {/* Stats Bar */}
            <div className="flex justify-center gap-6 mt-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Video Length</p>
                  <p className="font-bold">30 Seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎬</span>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Format</p>
                  <p className="font-bold">2x 15s Clips</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Aspect Ratio</p>
                  <p className="font-bold">9:16 Vertical</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Step 1: Trending Topics */}
            <section className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-tiktok-red rounded-full flex items-center justify-center font-bold">1</span>
                <h2 className="text-xl font-bold">Choose Viral Trends</h2>
              </div>
              <TrendingTopics onSelectTrend={handleSelectTrend} />
            </section>

            {/* Selected Trends Display */}
            {(prompt.hook || prompt.aesthetic || prompt.niche || prompt.sound) && (
              <div className="glass-card p-4 animate-slide-up">
                <p className="text-sm text-gray-400 mb-2">Selected Trends:</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.hook && (
                    <span className="px-3 py-1 bg-tiktok-red/20 border border-tiktok-red rounded-full text-sm">
                      🪝 {prompt.hook}
                    </span>
                  )}
                  {prompt.aesthetic && (
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500 rounded-full text-sm">
                      ✨ {prompt.aesthetic}
                    </span>
                  )}
                  {prompt.niche && (
                    <span className="px-3 py-1 bg-tiktok-cyan/20 border border-tiktok-cyan rounded-full text-sm">
                      🎯 {prompt.niche}
                    </span>
                  )}
                  {prompt.sound && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500 rounded-full text-sm">
                      🎵 {prompt.sound}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Custom Description */}
            <section className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-tiktok-red rounded-full flex items-center justify-center font-bold">2</span>
                <h2 className="text-xl font-bold">Describe Your Video</h2>
              </div>
              <div className="glass-card p-6">
                <label className="block text-sm text-gray-400 mb-2">
                  What&apos;s your video about? (Main concept/product/message)
                </label>
                <textarea
                  value={prompt.customDescription}
                  onChange={(e) => setPrompt(prev => ({ ...prev, customDescription: e.target.value }))}
                  placeholder="Example: A skincare routine showcasing my morning glow-up with a new vitamin C serum. Target audience is women 18-35 interested in clean beauty..."
                  className="w-full px-4 py-3 rounded-lg h-32 resize-none"
                />
              </div>
            </section>

            {/* Step 3: Brand Settings */}
            <section className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-tiktok-red rounded-full flex items-center justify-center font-bold">3</span>
                <h2 className="text-xl font-bold">Brand Consistency</h2>
              </div>
              <BrandSettings brandConfig={brandConfig} onUpdateBrand={setBrandConfig} />
            </section>

            {/* Step 4: Clip Timeline */}
            <section className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-tiktok-red rounded-full flex items-center justify-center font-bold">4</span>
                <h2 className="text-xl font-bold">Structure Your Clips</h2>
              </div>
              <ClipTimeline 
                clips={clips} 
                onUpdateClip={handleUpdateClip}
                onAddClip={handleAddClip}
                onRemoveClip={handleRemoveClip}
              />
            </section>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="generate-btn w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🚀</span>
              Generate Sora Prompt
              <span className="text-2xl">✨</span>
            </button>

            {/* Output Section */}
            {showOutput && (
              <section id="output-section" className="animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 bg-gradient-to-r from-tiktok-red to-tiktok-cyan rounded-full flex items-center justify-center font-bold">✓</span>
                  <h2 className="text-xl font-bold">Your Sora Prompt</h2>
                </div>
                <PromptOutput prompt={prompt} brandConfig={brandConfig} clips={clips} />
              </section>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm">
            <div className="glass-card p-6 mb-6">
              <h4 className="font-bold text-white mb-3">💡 Pro Tips for Viral Videos</h4>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-tiktok-red font-bold">First 3 Seconds</p>
                  <p className="text-xs">Hook immediately - this determines if viewers stay or scroll</p>
                </div>
                <div>
                  <p className="text-tiktok-cyan font-bold">Pattern Interrupts</p>
                  <p className="text-xs">Change visuals every 3-5 seconds to maintain attention</p>
                </div>
                <div>
                  <p className="text-purple-400 font-bold">Clear CTA</p>
                  <p className="text-xs">End with a strong call-to-action - follow, like, comment, or share</p>
                </div>
              </div>
            </div>
            <p>Built for creators going viral 🚀</p>
            <p className="mt-2">Optimized for Sora AI Video Generation</p>
          </footer>
        </div>
      </main>
    </>
  );
}
