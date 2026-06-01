/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Cpu, Wind, Volume2, Recycle } from "lucide-react";

export default function TechOverview() {
  const steps = [
    {
      icon: Cpu,
      title: "1. AIGC 叙事编排",
      color: "text-cyan-400 bg-cyan-950/30 border-cyan-800/40",
      description: "当用户在工坊中提出设想，后台服务通过官方服务端 @google/genai SDK 驱动最新款【Gemini 3.5 Flash】大语言模型，通过高精度语义对齐及结构图谱，动态拟写出融合文学高度与物理控制参数（JSON Schema 保证）的分镜头故事板脚本。",
    },
    {
      icon: Wind,
      title: "2. 程序化 Canvas 微粒物理",
      color: "text-emerald-400 bg-emerald-950/30 border-emerald-800/40",
      description: "前台渲染摒弃了传统笨重的视频预制件，纯粹使用轻盈、响应式的原生 HTML5 Canvas 逻辑。根据后台注入的五种拓扑算法模型（同步栅格、神经网络、混沌扩散、重合行星轨、正弦波流 field），实时模拟在毫秒级频率下各种微粒质点的位置移跃、连线与膨胀。",
    },
    {
      icon: Volume2,
      title: "3. 实时 Web Audio FM 声学合成",
      color: "text-[#9c7eff] bg-[#9c7eff]/10 border-[#9c7eff]/20",
      description: "在音效编排上完美践行“艺术与科技相生”理念。通过浏览器原生 Web Audio 动态建立振荡器（OscillatorNode）与回声平滑延迟链（DelayNode），依据生成的心情名目，在正弦、锯齿、三角和方波中瞬时合成具有迷幻未来声学质感的乐器共振和弦。",
    },
    {
      icon: Recycle,
      title: "4. 生态永续与绿色未来理念",
      color: "text-amber-400 bg-amber-950/30 border-amber-800/40",
      description: "平台深度贯彻“双碳理念”与低碳生活追求。数字馆藏特配专门章节如《未来栖居・生态大同》，让科技甘做空气与绿水之下的底色。通过数字化的可视表达诠释产业脱碳、科技兴产的宏大画卷，展示环境永续与数字转型的并轨新蓝图。",
    },
  ];

  return (
    <div className="bg-[#121620] rounded-2xl border border-gray-800/80 p-6 lg:p-8 shadow-2xl relative">
      <div className="max-w-3xl mb-8">
        <h3 className="font-sans text-base lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          架构解析：艺术与科技的深层聚变 (System Blueprint)
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
          本平台是新媒体“动画与数字创新短片”赛道的高级交互探索。它向评审与大众展示：AIGC 技术、粒子物理学与微音学合成逻辑在全软件协议下，如何共同编织一个活生生的数字诗学有机体。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-xl bg-gray-900/30 border border-gray-800/65 flex gap-4"
          >
            <div className={`p-2.5 rounded-lg border shrink-0 h-fit flex items-center justify-center ${step.color}`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-sans font-bold text-gray-200">
                {step.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
