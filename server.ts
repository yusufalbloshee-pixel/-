/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side securely. Never pass key to the client.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check API
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AIGC Storyboard and Script Generator
app.post("/api/generate-storyboard", async (req: Request, res: Response) => {
  try {
    const { prompt, theme, style } = req.body;

    if (!prompt) {
       res.status(400).json({ error: "用户构想描述不能为空 (Prompt is required)" });
       return;
    }

    const themeMap: Record<string, string> = {
      tech: "科技创新 (Quantum/Bio/AI Technology Innovation)",
      digital: "数字赋能 (Digital Twin, Data Flow, Smart City Grid)",
      smart: "智慧生活 (Smart Home, Robot Assistants, Sustainable Living)",
      industry: "产业升级 (Automation, Green Manufacturing, Intelligent Agriculture)"
    };

    const stylePrompt = style ? `并且视觉特效形式需融入【${style}】艺术风格` : '';
    const selectedThemeText = themeMap[theme] || "综合科创未来主轴";

    const promptText = `
      请作为资深数智艺术总监与AIGC创意导演，为“蓝图赛道：科创逐梦・智创未来”创作一套由4个分镜头场景（Scene）组成的高概念交互式数字艺术短片剧本故事板。
      
      用户提供的创意灵感：【${prompt}】
      本短片的核心创意母题为：【${selectedThemeText}】
      ${stylePrompt}

      短片分镜头结构设计指导（必须层层递进）：
      Scene 1 (第1幕)：【源起与觉醒 (Data Inception)】- 描绘元数据、微观量子、想法火花产生。
      Scene 2 (第2幕)：【链接与数字孪生 (Cyber Crystallization)】- 描绘数据链接成网，工厂或城市线框汇聚，孪生重构。
      Scene 3 (第3幕)：【智慧赋能场景 (Empowered Ecosystem)】- 描绘智慧生活应用，或绿能产业实体升级。
      Scene 4 (第4幕)：“筑梦未来与可持续 (Ethereal Infinite Bluefront)”- 宏大画卷，星辰大海与低碳科技和谐交响，无边界。

      你的任务是：
      生成短片的标题、简短宏大的人文主义数字艺术描述，以及为这4个连续场景各自生成精妙配置。配置中需包含文字独白/配音词（caption，20-60字，极具文学美感，饱含人文思考的中文诗意旁白）、英文视觉指令（visualDirection）、音频氛围描述（audioDirection），以及供前端 Canvas 实时粒子系统和 Web Audio 音频合成器读取控制的具体参数对象（visualConfig 和 audioConfig）。

      物理及颜色指南（务必用富有未来质感的色调组合）：
      - 科技创新主题：以深浅荧光蓝 (#00d2ff, #00f2fe) 和紫罗兰 (#b92b27) 为底
      - 数字赋能主题：采用璀璨黄绿 (#85e3ff, #11ffbd) 或赛博蓝绿 (#0575e6, #00f260)
      - 智慧生活主题：暖心森林薄荷绿 (#a8ff78) 与澄澈浅天蓝 (#78ffd6)
      - 产业升级主题：璀璨熔岩金橙色 (#f12711, #f5af19) 结合科技冷灰

      Canvas物理渲染模式（pattern）可选：'network'（神经网络物理连接）, 'grid'（数字孪生栅格节点）, 'organic'（涌现动态有机波流）, 'industrial'（重合环形齿轮轨迹）, 'quantum'（无规则量子云扩散粒子）。
    `;

    // Define response schema to prevent format inconsistencies
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "短片艺术标题，不超过15字"
        },
        theme: {
          type: Type.STRING,
          description: "保持输入的主题 classification (tech/digital/smart/industry)"
        },
        description: {
          type: Type.STRING,
          description: "短片设计哲学或导演的前言阐述，100-150字"
        },
        scenes: {
          type: Type.ARRAY,
          description: "4个连续的时序场景",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "场景ID, e.g. '1', '2', '3', '4'" },
              title: { type: Type.STRING, description: "本幕场景名称" },
              duration: { type: Type.INTEGER, description: "场景播放秒数，范围5-8秒" },
              caption: { type: Type.STRING, description: "诗意优美的、饱含艺术感与科技温度的中文独白旁白（不添加废话或角色名，直接朗诵词）" },
              visualDirection: { type: Type.STRING, description: "英文视觉提示词，用于粒子流细节描绘" },
              audioDirection: { type: Type.STRING, description: "声音音效或合成音色在英文环境的形容词描述" },
              visualConfig: {
                type: Type.OBJECT,
                properties: {
                  particleColor: { type: Type.STRING, description: "主要粒子颜色 hex 值 (例如 #00f2fe)" },
                  accentColor: { type: Type.STRING, description: "溢出发光辅色 hex 值" },
                  particleCount: { type: Type.INTEGER, description: "建议粒子总数，取值 80 至 260" },
                  particleSpeed: { type: Type.NUMBER, description: "扩散运动速度因子，取值 0.5 到 2.5" },
                  pattern: { type: Type.STRING, description: "渲染模式，必须为 'network', 'grid', 'organic', 'industrial', 'quantum' 之一" },
                  noiseIntensity: { type: Type.NUMBER, description: "物理扰动烈度，取值 1.0 到 5.0" }
                },
                required: ["particleColor", "accentColor", "particleCount", "particleSpeed", "pattern", "noiseIntensity"]
              },
              audioConfig: {
                type: Type.OBJECT,
                properties: {
                  baseFreq: { type: Type.NUMBER, description: "根音振荡器赫兹数，取值 110 到 660 之间的基数，如 220, 330, 440" },
                  type: { type: Type.STRING, description: "震荡波形，取值 'sine', 'square', 'sawtooth', 'triangle' 之一" },
                  scale: { type: Type.STRING, description: "乐理色彩，取值 'major', 'minor', 'pentatonic', 'ambient' 之一" },
                  tempo: { type: Type.INTEGER, description: "情绪频率速度BPM，取值 60 到 120" }
                },
                required: ["baseFreq", "type", "scale", "tempo"]
              }
            },
            required: ["id", "title", "duration", "caption", "visualDirection", "audioDirection", "visualConfig", "audioConfig"]
          }
        }
      },
      required: ["title", "theme", "description", "scenes"]
    };

    // Query Gemini 3.5 Flash server-side. Ensure custom configurations.
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "你是一个融汇科技与人文、擅长撰写新媒体数字艺术方案的 AIGC 艺术大师。你的回答必须绝对符合 JSON responseSchema 格式，并且在中文文本上饱含科技张力与哲思感、人文温度，没有任何辅助废话。",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.85
      }
    });

    const outputText = result.text;
    if (!outputText) {
      throw new Error("No output generated from Gemini API");
    }

    const jsonResult = JSON.parse(outputText.trim());
    res.json({ success: true, storyboard: jsonResult });
  } catch (error: any) {
    console.error("Gemini storyboard generation failed:", error);
    res.status(500).json({ success: false, error: error.message || "智能叙事生成器暂时遇到异常，请稍后重试。" });
  }
});

// Configure Vite middleware and static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Smart-Create Future] Service is running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Server bootstamped bootstrap failed:", err);
});
