/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="py-6 sm:py-8 border-b border-gray-900 bg-[#0e1117] relative overflow-hidden">
      {/* Soft gradient spot in background for aesthetic rhythm */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-80 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-between gap-4 text-center">
        
        {/* Cinematic category flag */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-medium text-cyan-400 tracking-wider">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>首届数智未来杯：蓝图赛道（动画与数字创新短片）</span>
        </div>

        {/* Display headline pairing */}
        <div className="space-y-1">
          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span>科创逐梦</span>
            <span className="text-gray-500 font-light hidden sm:inline">&bull;</span>
            <span className="bg-gradient-to-r from-cyan-400 via-[#9c7eff] to-emerald-400 bg-clip-text text-transparent">智创未来</span>
          </h1>
          <p className="text-xs sm:text-sm font-sans text-gray-400 max-w-2xl mx-auto leading-relaxed">
            聚焦科技革新与数字转型，深耕艺术与数字创新技术融合。依托自主创意与 AIGC 原力驱发，全景描绘数字赋能、科技兴产、生态永续的时代发展大美蓝图。
          </p>
        </div>

      </div>
    </header>
  );
}
