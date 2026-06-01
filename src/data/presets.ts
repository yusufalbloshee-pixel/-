/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Storyboard } from "../types";

export const PRESET_STORYBOARDS: Storyboard[] = [
  {
    title: "量子源起・智启新生",
    theme: "tech",
    creator: "卓越数智馆藏",
    description: "本作品聚焦「科技创新」原动力，通过微观量子、神经网络与浩瀚太空星尘的光影交织，折射出科技强国梦的勃发。艺术与算法深度交融，探索认知之境的无边界探索。",
    scenes: [
      {
        id: "tech-1",
        title: "微观涌现 (Quantum Inception)",
        duration: 6,
        caption: "在量子的微观幽影里，每一次起伏的火花，都是科技创新的深邃基因，等待着宏观秩序的破晓唤起。",
        visualDirection: "Cyan and deep violet slow floating quantum points forming small chaotic stars, mystical",
        audioDirection: "Sub-harmonic sine bass drone with delicate glass-shatter bells",
        visualConfig: {
          particleColor: "#00d2ff",
          accentColor: "#7928ca",
          particleCount: 150,
          particleSpeed: 0.8,
          pattern: "quantum",
          noiseIntensity: 1.5,
        },
        audioConfig: {
          baseFreq: 220,
          type: "sine",
          scale: "ambient",
          tempo: 72,
        },
      },
      {
        id: "tech-2",
        title: "突触共生 (Neural Symbiosis)",
        duration: 6,
        caption: "当无数节点织网建立关联，智慧的信息流跨越物理鸿沟，神经网络如璀璨星丛般在数字夜空中蓬勃蔓延。",
        visualDirection: "Bright azure node strands connecting as a complex neural lattice with energy pulses mapping the path",
        audioDirection: "Staggered pentatonic electronic chime waves responding to connections",
        visualConfig: {
          particleColor: "#00f2fe",
          accentColor: "#4facfe",
          particleCount: 200,
          particleSpeed: 1.2,
          pattern: "network",
          noiseIntensity: 2.2,
        },
        audioConfig: {
          baseFreq: 330,
          type: "triangle",
          scale: "pentatonic",
          tempo: 88,
        },
      },
      {
        id: "tech-3",
        title: "灵动涌现 (Intelligent Morphing)",
        duration: 6,
        caption: "算法不仅是理性的冷静公式，更是艺术的数字墨华。它们涌现出变幻莫测的有机形态，重新定义生命的跃动。",
        visualDirection: "Flowing organic waves resembling gaseous liquid crystals morphing dynamically under kinetic field",
        audioDirection: "Swell strings simulation with low-pass filters and echo delay",
        visualConfig: {
          particleColor: "#ff007f",
          accentColor: "#7928ca",
          particleCount: 220,
          particleSpeed: 1.5,
          pattern: "organic",
          noiseIntensity: 3.5,
        },
        audioConfig: {
          baseFreq: 440,
          type: "sine",
          scale: "major",
          tempo: 80,
        },
      },
      {
        id: "tech-4",
        title: "无界星眸 (Infinite Horizon)",
        duration: 7,
        caption: "探索的终点是那片浩瀚星海。承载着数智的火种与绿色的基因，人类的创新图志在此刻化作无边宏宏深蓝。",
        visualDirection: "Spectacular fast expanding particle trails swirling in cosmic spiral shape, radiating absolute light",
        audioDirection: "Warm major triad chord resolution with ringing futuristic overtone",
        visualConfig: {
          particleColor: "#ffffff",
          accentColor: "#00f2fe",
          particleCount: 260,
          particleSpeed: 2.0,
          pattern: "quantum",
          noiseIntensity: 4.2,
        },
        audioConfig: {
          baseFreq: 554.37, // C#5
          type: "sine",
          scale: "major",
          tempo: 96,
        },
      },
    ],
  },
  {
    title: "万物孪生・数智赋能",
    theme: "digital",
    creator: "卓越数智馆藏",
    description: "本品立足于「数字赋能」与「数字孪生」技术，将冰冷的物理实境解码为温暖的数码光栅，勾勒实虚共振、协同交互的下一代智慧城市与产业大脑脉络。",
    scenes: [
      {
        id: "dig-1",
        title: "实境解码 (Inception of Codes)",
        duration: 6,
        caption: "数字，化虚无为可见。我们在虚拟的无限平面上重构世界，捕捉万物运转、能量涌流的第一缕数字脉搏。",
        visualDirection: "Dotted coordinate blueprint grid flickering, green radar sweeps glowing, matrix aesthetic",
        audioDirection: "Rhythmic ticking clock filter noise, industrial hum",
        visualConfig: {
          particleColor: "#11ffbd",
          accentColor: "#0575e6",
          particleCount: 160,
          particleSpeed: 0.6,
          pattern: "grid",
          noiseIntensity: 1.0,
        },
        audioConfig: {
          baseFreq: 147, // D3
          type: "sine",
          scale: "minor",
          tempo: 60,
        },
      },
      {
        id: "dig-2",
        title: "数字双生 (Digital Twin)",
        duration: 6,
        caption: "实体与数字的重构双生。精密的对称霓虹栅格，带着理性的温暖，同步照拂着工业社会运转的每个微小像素。",
        visualDirection: "Double layered mirroring floating points aligned in grid modules with rhythmic expansion",
        audioDirection: "Double tone sawtooth synthesizer under aggressive low-pass filtering",
        visualConfig: {
          particleColor: "#00f260",
          accentColor: "#0575e6",
          particleCount: 180,
          particleSpeed: 1.0,
          pattern: "grid",
          noiseIntensity: 2.0,
        },
        audioConfig: {
          baseFreq: 220, // A3
          type: "triangle",
          scale: "minor",
          tempo: 80,
        },
      },
      {
        id: "dig-3",
        title: "数据长河 (Flume of Resonance)",
        duration: 6,
        caption: "滚滚流淌的实时数据之河，穿越千百工厂，让算力突破时空阻隔。每一次闪屏，皆是赋能百业的数字赞歌。",
        visualDirection: "High-speed cascading streams of laser-like particles falling downwards in parallel paths",
        audioDirection: "Waterfall echo cascades and resonant pitch shifters",
        visualConfig: {
          particleColor: "#85e3ff",
          accentColor: "#00f260",
          particleCount: 220,
          particleSpeed: 2.2,
          pattern: "organic",
          noiseIntensity: 2.8,
        },
        audioConfig: {
          baseFreq: 293.66, // D4
          type: "sine",
          scale: "pentatonic",
          tempo: 100,
        },
      },
      {
        id: "dig-4",
        title: "共生中枢 (Sovereign Hub)",
        duration: 7,
        caption: "当未来彻底交织于有温度的数字中枢，科技不再局限于屏幕，而是幻化为低碳、安全、永续的城市理想基石。",
        visualDirection: "Massive volumetric sphere composed of millions of data lines rotating gracefully in empty space",
        audioDirection: "Wide panoramic electronic sweep, celestial resonance",
        visualConfig: {
          particleColor: "#ffffff",
          accentColor: "#11ffbd",
          particleCount: 250,
          particleSpeed: 1.1,
          pattern: "network",
          noiseIntensity: 3.0,
        },
        audioConfig: {
          baseFreq: 330, // E4
          type: "sine",
          scale: "major",
          tempo: 75,
        },
      },
    ],
  },
  {
    title: "未来栖居・生态大同",
    theme: "smart",
    creator: "卓越数智馆藏",
    description: "本品演绎「智慧生活」全新图景。在追求智能的同时贯彻「绿色低碳与永续呼吸」的环保哲学，展现人、机、大自然同频律动、宁静优雅的和谐未来境界。",
    scenes: [
      {
        id: "smart-1",
        title: "呼吸绿野 (Respiratory Habitat)",
        duration: 6,
        caption: "智慧生于无形，消融于日常。低碳传感器微光温柔跃动，生命与居室空间在此平稳同频呼吸。",
        visualDirection: "Gentle expansion and contraction of organic green clouds, pulsating at resting human breath rate",
        audioDirection: "Deep breath-like slow dynamic pad with soft ocean wave roar",
        visualConfig: {
          particleColor: "#a8ff78",
          accentColor: "#78ffd6",
          particleCount: 120,
          particleSpeed: 0.5,
          pattern: "organic",
          noiseIntensity: 1.8,
        },
        audioConfig: {
          baseFreq: 110, // A2
          type: "sine",
          scale: "ambient",
          tempo: 60,
        },
      },
      {
        id: "smart-2",
        title: "机耦和弦 (Automated Comfort)",
        duration: 6,
        caption: "贴心的机器指尖在光辉边缘编结舒适，柔和的算法关照千家万户。没有机器的冰冷，只有万物互联的安宁微温。",
        visualDirection: "A delicate network of glowing circles and interconnected lines revolving gracefully like cosmic clockwork",
        audioDirection: "Gently plucked acoustic guitar-like acoustic-synth frequencies",
        visualConfig: {
          particleColor: "#78ffd6",
          accentColor: "#a8ff78",
          particleCount: 140,
          particleSpeed: 0.9,
          pattern: "network",
          noiseIntensity: 1.4,
        },
        audioConfig: {
          baseFreq: 164.81, // E3
          type: "sine",
          scale: "major",
          tempo: 72,
        },
      },
      {
        id: "smart-3",
        title: "碳中和晶格 (Photosynthetic Circuit)",
        duration: 6,
        caption: "绿色的柔和晶格将自然能量提纯。智慧不掠夺绿色，而是在大自然的温存环流中，使科技归于极致的淳朴朴拙。",
        visualDirection: "Emerald and golden solar particles sliding across leafy geometric contours, leaf vein network mapping",
        audioDirection: "Bright, twinkling bird-like bell tappings in high octaves",
        visualConfig: {
          particleColor: "#11ffbd",
          accentColor: "#a8ff78",
          particleCount: 170,
          particleSpeed: 1.1,
          pattern: "organic",
          noiseIntensity: 2.5,
        },
        audioConfig: {
          baseFreq: 261.63, // C4
          type: "sine",
          scale: "pentatonic",
          tempo: 84,
        },
      },
      {
        id: "smart-4",
        title: "永续环流 (The Eternal Hoop)",
        duration: 7,
        caption: "在永恒环游的数字生态交响中，智慧生活最终让心灵得到沉淀，赋予我们在数字庇护下安心诗意而居的权利。",
        visualDirection: "Stunning wide-angle expanding rings radiating green and golden rays, slow and celestial",
        audioDirection: "Ethereal, warm orchestral chords that dissolve into tranquil background soundscapes",
        visualConfig: {
          particleColor: "#ffffff",
          accentColor: "#78ffd6",
          particleCount: 180,
          particleSpeed: 0.7,
          pattern: "quantum",
          noiseIntensity: 2.0,
        },
        audioConfig: {
          baseFreq: 329.63, // E4
          type: "sine",
          scale: "major",
          tempo: 66,
        },
      },
    ],
  },
  {
    title: "智造熔炉・产业转型",
    theme: "industry",
    creator: "卓越数智馆藏",
    description: "本品是对「产业升级」大潮的激情献礼。数字化机翼、工业机械环线、节能脱碳绿炉在数字画廊中交叠轰鸣，生动展现国家传统重工向低碳绿能、高端智造阔步迈进的雄浑交响。",
    scenes: [
      {
        id: "ind-1",
        title: "重工铸骨 (Steel and Frame)",
        duration: 6,
        caption: "冷峻而坚实的产业骨骼在晨光中苏醒。高耸的粒子网格，是传统重工业开启数字化蜕变升级的开篇起点。",
        visualDirection: "Symmetrical vertical grid structures climbing slowly like metallic scaffolds illuminated by orange lasers",
        audioDirection: "Low heavy mechanical beat, machine-room resonance",
        visualConfig: {
          particleColor: "#f12711",
          accentColor: "#f5af19",
          particleCount: 160,
          particleSpeed: 0.8,
          pattern: "grid",
          noiseIntensity: 1.2,
        },
        audioConfig: {
          baseFreq: 82.41, // E2
          type: "sawtooth",
          scale: "minor",
          tempo: 75,
        },
      },
      {
        id: "ind-2",
        title: "旋律咬合 (Gears of Intelligence)",
        duration: 6,
        caption: "精密数字齿轮高速扣合，工业指令精准传导。环形轨迹交错旋转，每一次流转皆是对高质量发展的庄严承诺。",
        visualDirection: "Symmetric golden gear outlines spinning in perfect concert, concentric speed lines flashing",
        audioDirection: "Bright percussive rhythmic synthesizer pulses matching concentric rotations",
        visualConfig: {
          particleColor: "#f5af19",
          accentColor: "#f12711",
          particleCount: 210,
          particleSpeed: 1.4,
          pattern: "industrial",
          noiseIntensity: 2.8,
        },
        audioConfig: {
          baseFreq: 130.81, // C3
          type: "square",
          scale: "minor",
          tempo: 90,
        },
      },
      {
        id: "ind-3",
        title: "低碳绿冶 (Low-Carbon Synthesis)",
        duration: 6,
        caption: "用绿意重塑钢花。绿色的脱碳能量粒子流刺破热烈的炉光，演绎传统冶炼产业迈向纯净碳中和的关键跨越。",
        visualDirection: "Aggressive orange background with emerald green sparks violently colliding and turning into tranquil waves",
        audioDirection: "Intense industrial synthesizer sweeps transitioning into gentle chord resolutions",
        visualConfig: {
          particleColor: "#00f260",
          accentColor: "#f12711",
          particleCount: 230,
          particleSpeed: 1.8,
          pattern: "organic",
          noiseIntensity: 4.0,
        },
        audioConfig: {
          baseFreq: 196.00, // G3
          type: "triangle",
          scale: "minor",
          tempo: 105,
        },
      },
      {
        id: "ind-4",
        title: "灯塔红星 (Beacon of Manufacturing)",
        duration: 7,
        caption: "升级落成的灯塔工厂在长河彼岸璀璨闪亮。这是大国智造迈向高端化、低碳化、全球化的耀眼时代航标。",
        visualDirection: "Bright shining golden vertical trails rising, erupting at peak and descending in beautiful grids",
        audioDirection: "Triumphant major progression with warm harmonic synthesizers",
        visualConfig: {
          particleColor: "#f5af19",
          accentColor: "#ffffff",
          particleCount: 250,
          particleSpeed: 1.2,
          pattern: "quantum",
          noiseIntensity: 3.2,
        },
        audioConfig: {
          baseFreq: 261.63, // C4
          type: "sine",
          scale: "major",
          tempo: 80,
        },
      },
    ],
  },
];
