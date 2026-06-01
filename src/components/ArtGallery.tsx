/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PRESET_STORYBOARDS } from "../data/presets";
import { Storyboard } from "../types";
import { Layers, User, Play, ChevronRight } from "lucide-react";

interface ArtGalleryProps {
  onSelectStoryboard: (storyboard: Storyboard) => void;
  activeStoryboardTitle: string;
}

export default function ArtGallery({ onSelectStoryboard, activeStoryboardTitle }: ArtGalleryProps) {
  
  // Theme badge mapper helper
  const getThemeBadge = (theme: string) => {
    switch (theme) {
      case "tech":
        return {
          label: "科技创新",
          style: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
        };
      case "digital":
        return {
          label: "数字赋能",
          style: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        };
      case "smart":
        return {
          label: "智慧生活",
          style: "bg-teal-500/15 text-teal-400 border-teal-500/30",
        };
      case "industry":
        return {
          label: "产业升级",
          style: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        };
      default:
        return {
          label: "智创未来",
          style: "bg-gray-500/15 text-gray-400 border-gray-500/30",
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Section meta intro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-800/65 pb-4">
        <div>
          <h2 className="font-sans text-base lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            卓越数智艺术馆藏 (Outstanding Digital Collections)
          </h2>
          <p className="text-xs text-gray-400">
            精雕艺术与科技深度融汇的四部数字动画短片，即刻切换沉浸播放
          </p>
        </div>
        <div className="text-[11px] font-mono text-gray-500">
          馆藏总数: {PRESET_STORYBOARDS.length} 件 &bull; 创作语汇: 中文旁白
        </div>
      </div>

      {/* Preset cards grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRESET_STORYBOARDS.map((sb) => {
          const badge = getThemeBadge(sb.theme);
          const isActive = sb.title === activeStoryboardTitle;

          return (
            <div 
              key={sb.title}
              onClick={() => onSelectStoryboard(sb)}
              className={`group flex flex-col justify-between rounded-xl p-5 border text-left cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-xl ${
                isActive 
                  ? "bg-[#182030]/90 border-cyan-500/60 shadow-cyan-500/5 ring-1 ring-cyan-500/30" 
                  : "bg-gray-900/40 border-gray-800/80 hover:bg-gray-900/60 hover:border-gray-700/80"
              }`}
            >
              <div>
                
                {/* Badge theme bar */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`text-[10px] font-semibold px-2 py-[2.5px] rounded border font-mono tracking-wider uppercase ${badge.style}`}>
                    {badge.label}
                  </span>
                  
                  {isActive && (
                    <span className="flex items-center text-[10px] font-mono text-cyan-400 gap-1 animate-pulse font-bold bg-cyan-950/40 border border-cyan-800/60 px-2 py-[2.5px] rounded">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      当前巨幕播放中
                    </span>
                  )}
                </div>

                {/* Film Title */}
                <h3 className="text-sm font-sans font-bold text-white group-hover:text-cyan-400 transition mb-2">
                  {sb.title}
                </h3>

                {/* Philosophical Intro paragraph */}
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                  {sb.description}
                </p>

                {/* Scenes checklist breakdown preview */}
                <div className="space-y-1.5 mb-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-semibold">时序场景大纲 ({sb.scenes.length} 幕)</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sb.scenes.map((scene, sIdx) => (
                      <span 
                        key={scene.id}
                        className="text-[10px] font-sans px-2 py-1 bg-gray-950/50 rounded border border-gray-800/70 text-gray-300"
                      >
                        {sIdx + 1}. {scene.title.split(" (")[0]}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Card border footer with active state indicators */}
              <div className="pt-4 border-t border-gray-800/50 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  出品: <strong className="text-gray-400 font-normal">{sb.creator}</strong>
                </span>

                <span className="group-hover:text-cyan-400 flex items-center font-bold text-[10px] text-gray-400 transition-all">
                  加荷载入
                  <ChevronRight className="w-3 h-3 ml-[2px] transition group-hover:translate-x-1" />
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
