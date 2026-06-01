/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Brain, Loader, Flame, Film, Wand2, Lightbulb, AlertCircle } from "lucide-react";
import { Storyboard } from "../types";

interface WorkshopProps {
  onStoryboardGenerated: (storyboard: Storyboard) => void;
}

export default function Workshop({ onStoryboardGenerated }: WorkshopProps) {
  const [prompt, setPrompt] = useState("");
  const [theme, setTheme] = useState<"tech" | "digital" | "smart" | "industry">("tech");
  const [style, setStyle] = useState("实验数字特效粒子流 (Experimental Particles)");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const sampleIdeas = [
    "以低碳风能发电与5G数字孪生重构绿色特大城市，绿色和机械完美融汇。",
    "量子计算机芯片微观核心中的光速光子，承载超算之梦、激发数字浪潮。",
    "由智能低碳医疗机器人和生物科技盆景组成的生态森林未来康养智能空间。",
    "传统超级自动化大型黑灯超级工厂，通过机械臂阵列、低碳冷力实现绿色升级蜕变。"
  ];

  const handleApplySample = (idea: string) => {
    setPrompt(idea);
    setErrorMessage("");
  };

  const startLoadingSequence = () => {
    setLoading(true);
    setLoadingStep(0);
    const steps = [
      "正在链接 AIGC 编导神经中枢...",
      "正在召集 Gemini 3.5 智能引擎重构创意...",
      "正在编排 Canvas 物理学粒子渲染轨道与运动约束...",
      "正在设计 Web Audio 泛音振荡振幅与乐理色彩...",
      "数智合成完毕，正在同步巨幕视听轨道..."
    ];

    const timer = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1800);

    return timer;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrorMessage("请先输入您的导演灵感或选择下方的灵感示例。");
      return;
    }

    setErrorMessage("");
    const loadTimer = startLoadingSequence();

    try {
      const response = await fetch("/api/generate-storyboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, theme, style }),
      });

      const data = await response.json();
      clearInterval(loadTimer);

      if (data.success && data.storyboard) {
        onStoryboardGenerated(data.storyboard);
        setPrompt(""); // Clear input on success
      } else {
        throw new Error(data.error || "AIGC 反应堆发生扰动，未能妥善输出脚本。");
      }
    } catch (err: any) {
      clearInterval(loadTimer);
      setErrorMessage(err.message || "连接服务器异常，请确认开发服务器已经启动。");
    } finally {
      setLoading(false);
    }
  };

  const loadingStepsText = [
    "正在开启数智光立方，搭建虚拟编导 studio...",
    "Gemini 3.5 正在对大纲主题进行人文与艺术色彩配线...",
    "正在转换物理属性，注入粒子的微观速度与碰撞轨迹...",
    "正在架构声学振荡节点，调制低音共振频率与乐谱时序...",
    "数字画皮重构完毕，正在启动巨幕..."
  ];

  return (
    <div className="bg-[#121620] rounded-2xl border border-gray-800/80 p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Decorative cyber grid in bg */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Workshop Header */}
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Brain className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="font-sans text-base lg:text-lg font-bold text-white tracking-tight">
            AIGC 动画叙事工坊
          </h2>
          <p className="text-xs text-gray-400">
            用创意与AI重融，量身调制一套独一无二的时序动态短片剧本
          </p>
        </div>
      </div>

      {loading ? (
        /* Cinematic loading dynamic state container */
        <div className="min-h-[320px] flex flex-col items-center justify-center p-8 bg-gray-950/40 rounded-xl border border-gray-900/60 z-10 relative">
          <div className="relative flex items-center justify-center mb-6">
            <Loader className="w-12 h-12 text-cyan-400 animate-spin" />
            <Sparkles className="w-5 h-5 text-emerald-400 absolute animate-pulse" />
          </div>
          
          <h4 className="text-sm font-sans font-semibold text-white tracking-wider mb-2">
            AI 联合导演正在编组数字短片...
          </h4>
          
          <div className="max-w-md text-center">
            <p className="text-xs font-mono text-cyan-400 h-8 flex items-center justify-center animate-pulse">
              {loadingStepsText[loadingStep]}
            </p>
            <div className="w-48 h-1 bg-gray-900 rounded-full mx-auto overflow-hidden mt-4">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${((loadingStep + 1) / loadingStepsText.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 block mt-3 font-mono">
              运行平台: Gemini-3.5-flash server-side SDK
            </span>
          </div>
        </div>
      ) : (
        /* Director form interaction studio */
        <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
          
          {/* Main Idea Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                第一步：倾注导演灵感故事线 (Creativity Brainwave)
              </span>
              <span className="text-gray-500 text-[10px]">支持中/英文叙写</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (e.target.value.trim()) setErrorMessage("");
              }}
              rows={3}
              placeholder="例如：量子计算机芯片在极寒温度下苏醒，光速光信号流穿梭在星轨中编织未来数字中国的大动脉..."
              className="w-full bg-gray-950/60 border border-gray-800 focus:border-cyan-500 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Preset Ideas Suggestions shelf */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
              灵感备忘（点击直接套用）：
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sampleIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(idea)}
                  className="text-left text-xs bg-gray-900/60 hover:bg-gray-800/40 p-2.5 border border-gray-800/60 rounded-lg text-gray-400 hover:text-gray-200 transition-all cursor-pointer truncate"
                  title={idea}
                >
                  &raquo; {idea}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Grid selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Theme alignment block */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-bold block">
                第二步：对齐时代主轴 (Core Theme Target)
              </label>
              <select
                value={theme}
                onChange={(e: any) => setTheme(e.target.value)}
                className="w-full bg-gray-950/40 border border-gray-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="tech" className="bg-gray-950 text-white">科技创新（量子 AI 航天破晓）</option>
                <option value="digital" className="bg-gray-950 text-white">数字赋能（数字孪生 智能电网）</option>
                <option value="smart" className="bg-gray-950 text-white">智慧生活（低碳家园 绿色生态）</option>
                <option value="industry" className="bg-gray-950 text-white">产业升级（工业重构 零碳工厂）</option>
              </select>
            </div>

            {/* Art Style selections selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-bold block">
                第三步：设定艺术画派 (Visual Shorthand Style)
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-gray-950/40 border border-gray-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="实验数字特效粒子流 (Experimental Particles)" className="bg-gray-950 text-white">实验物理粒子流 (Interactive Particle flow)</option>
                <option value="3D全息发光矩阵 (3D Holographic Glare Matrix)" className="bg-gray-950 text-white">3D 全息晶格矩阵 (3D Glow Grid)</option>
                <option value="简约轻奢矢量微线阵列 (Minimalistic Vector Outline)" className="bg-gray-950 text-white">扁平极简微观矢量线条 (Minimal Vector Mesh)</option>
                <option value="AIGC 智能流动水墨画风 (NumTech Ink Flow)" className="bg-gray-950 text-white">AIGC 涌现梦幻水墨 (Emergences Ink Wave)</option>
              </select>
            </div>

          </div>

          {/* Action trigger button shelf */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 via-[#8a3ffc] to-emerald-500 hover:opacity-95 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-xl transition-all active:scale-[0.99] flex items-center justify-center space-x-2 border border-white/10 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-white" />
              <span>启动 AIGC 电影生成器 (Deploy Digital Screenplay)</span>
            </button>
          </div>

          {/* Error message banner alerts if any */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

        </form>
      )}

    </div>
  );
}
