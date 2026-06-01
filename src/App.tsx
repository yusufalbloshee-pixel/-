/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import DigitalTheater from "./components/DigitalTheater";
import Workshop from "./components/Workshop";
import ArtGallery from "./components/ArtGallery";
import TechOverview from "./components/TechOverview";
import { PRESET_STORYBOARDS } from "./data/presets";
import { Storyboard } from "./types";
import { Compass, Sparkles, Heart } from "lucide-react";

export default function App() {
  const [activeStoryboard, setActiveStoryboard] = useState<Storyboard>(PRESET_STORYBOARDS[0]);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const handleSelectStoryboard = (storyboard: Storyboard) => {
    setActiveStoryboard(storyboard);
    setActiveSceneIndex(0);
  };

  const handleStoryboardGenerated = (storyboard: Storyboard) => {
    setActiveStoryboard(storyboard);
    setActiveSceneIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#c9d1d9] flex flex-col antialiased">
      
      {/* Upper Navigation banner / title info block */}
      <Header />

      {/* Primary responsive grid layout of the app */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-12">
        
        {/* Full-width Immersive Stage segment */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5 select-none">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              数智巨幕影厅 (Cinematic Screen Viewport)
            </h2>
            <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/20 border border-cyan-800/40 px-2 py-0.5 rounded">
              来源: {activeStoryboard.creator}
            </span>
          </div>

          <DigitalTheater 
            storyboard={activeStoryboard}
            onSceneChange={(idx) => setActiveSceneIndex(idx)}
          />
        </section>

        {/* Co-working Bento-style Grid: Craft workshop on left, Digital asset cards on right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form studio block column */}
          <div className="lg:col-span-7">
            <Workshop onStoryboardGenerated={handleStoryboardGenerated} />
          </div>

          {/* Preset list gallery column */}
          <div className="lg:col-span-5">
            <ArtGallery 
              onSelectStoryboard={handleSelectStoryboard}
              activeStoryboardTitle={activeStoryboard.title}
            />
          </div>

        </section>

        {/* Technical overview detail grid */}
        <section>
          <TechOverview />
        </section>

      </main>

      {/* Sustainable footer and info notes */}
      <footer className="border-t border-[#161b22] py-8 bg-[#090d16]/80 text-center text-xs text-gray-500 font-mono relative">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="flex items-center justify-center gap-1">
            <span>首届数智未来设计展出品</span>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-0.5">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by Google AI Studio Build
            </span>
          </p>
          <p className="text-[10px] text-gray-600">
            &copy; 1999–2026 智创未来数字科技群组. 基于可持续科技与新媒体艺术并轨方案构建. 保留所有艺术演绎权利.
          </p>
        </div>
      </footer>

    </div>
  );
}
