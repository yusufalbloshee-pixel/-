/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Sliders, Settings2, ShieldCheck } from "lucide-react";
import { Storyboard, Scene, VisualConfig } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface DigitalTheaterProps {
  storyboard: Storyboard;
  onSceneChange?: (sceneIndex: number) => void;
}

export default function DigitalTheater({ storyboard, onSceneChange }: DigitalTheaterProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTuner, setShowTuner] = useState(false);
  const [customVisualConfig, setCustomVisualConfig] = useState<VisualConfig | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // Web Audio synth refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const delayGainRef = useRef<GainNode | null>(null);
  const sequencerIntervalRef = useRef<number | null>(null);

  const activeScene: Scene = storyboard.scenes[currentSceneIndex] || storyboard.scenes[0];
  const activeVisualConfig = customVisualConfig || activeScene.visualConfig;

  // Handle scene auto-advancing
  useEffect(() => {
    setCurrentTime(0);
    setCustomVisualConfig(null); // Reset tuning back to scene defaults
    if (onSceneChange) {
      onSceneChange(currentSceneIndex);
    }
  }, [currentSceneIndex, storyboard]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeScene.duration) {
            // Advance scene
            setCurrentSceneIndex((idx) => (idx + 1) % storyboard.scenes.length);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeScene, storyboard]);

  // Handle ResizeObserver on Canvas container
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Real-time Canvas procedural particle physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles based on visualConfig
    const count = activeVisualConfig.particleCount;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      angle: number;
      speedMult: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * activeVisualConfig.particleSpeed * 2,
        vy: (Math.random() - 0.5) * activeVisualConfig.particleSpeed * 2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
        speedMult: Math.random() * 0.5 + 0.75,
      });
    }

    let frameCount = 0;

    const render = () => {
      // Clear with slight trailing fade to make fluid paths
      ctx.fillStyle = "rgba(14, 17, 23, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      const speedFactor = activeVisualConfig.particleSpeed * 1.5;
      const noise = activeVisualConfig.noiseIntensity;

      // Render pattern styles
      if (activeVisualConfig.pattern === "grid") {
        // Digital twin radar lines and grids
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        const gridSpacing = 80;
        
        for (let x = 0; x < canvas.width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Radar line sweep
        const sweepY = (frameCount * 1.5) % canvas.height;
        ctx.strokeStyle = `${activeVisualConfig.accentColor}2c`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, sweepY);
        ctx.lineTo(canvas.width, sweepY);
        ctx.stroke();
      }

      // Draw and update particle loops
      particles.forEach((p, idx) => {
        // Apply layout physics formula
        switch (activeVisualConfig.pattern) {
          case "network": {
            // Neural synapses floating with gentle friction
            p.x += p.vx * speedFactor;
            p.y += p.vy * speedFactor;
            // Brownian drift
            p.vx += (Math.random() - 0.5) * 0.1 * noise;
            p.vy += (Math.random() - 0.5) * 0.1 * noise;
            break;
          }
          case "grid": {
            // Snapped grid elements moving vertically with high precision
            p.y += (p.vy > 0 ? 1 : -1) * p.speedMult * speedFactor * 0.6;
            p.vx = 0;
            // Oscillate size
            p.size = (Math.sin(frameCount * 0.05 + idx) + 1.5) * 1.5;
            break;
          }
          case "organic": {
            // Organic wave flow fields representing sustainable fluids
            const waveX = Math.sin(p.y * 0.01 + frameCount * 0.02) * noise * 2;
            p.x += (p.vx + waveX) * speedFactor * 0.5;
            p.y += p.vy * speedFactor * 0.8;
            break;
          }
          case "industrial": {
            // Circular concentric orbital speeds representing manufacturing circular economy
            p.angle += 0.005 * speedFactor * p.speedMult;
            const radius = (idx / particles.length) * (canvas.width > canvas.height ? canvas.height : canvas.width) * 0.4 + 50;
            const targetX = canvas.width / 2 + Math.cos(p.angle) * radius;
            const targetY = canvas.height / 2 + Math.sin(p.angle) * radius;
            // Interpolate for spring-like compliance
            p.x += (targetX - p.x) * 0.1;
            p.y += (targetY - p.y) * 0.1;
            break;
          }
          case "quantum": {
            // Complete chaotic expansions and jittering
            p.x += p.vx * speedFactor * 2.2;
            p.y += p.vy * speedFactor * 2.2;
            p.vx += (Math.random() - 0.5) * 0.3 * noise;
            p.vy += (Math.random() - 0.5) * 0.3 * noise;
            // Add attractive force to center
            const dx = canvas.width / 2 - p.x;
            const dy = canvas.height / 2 - p.y;
            p.vx += dx * 0.00002;
            p.vy += dy * 0.00002;
            break;
          }
        }

        // Speed caps to prevent flying away
        const maxV = 4;
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy));

        // Canvas Boundary collision
        if (p.x < 0) { p.x = canvas.width; }
        if (p.x > canvas.width) { p.x = 0; }
        if (p.y < 0) { p.y = canvas.height; }
        if (p.y > canvas.height) { p.y = 0; }

        // Draw particle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = activeVisualConfig.accentColor;
        ctx.fillStyle = activeVisualConfig.particleColor;

        ctx.beginPath();
        if (activeVisualConfig.pattern === "grid") {
          // Draw rect for tech grid feel
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Clear shadows for performance before line rendering
      ctx.shadowBlur = 0;

      // Draw connections in network and quantum patterns
      if (activeVisualConfig.pattern === "network" || activeVisualConfig.pattern === "quantum") {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            const connectThreshold = 95;
            if (dist < connectThreshold) {
              const alphaRatio = (1 - dist / connectThreshold) * 0.18;
              ctx.strokeStyle = `${activeVisualConfig.particleColor}${Math.floor(alphaRatio * 255).toString(16).padStart(2, "0")}`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeVisualConfig]);

  // Web Audio Synth & Sequencer Engine
  useEffect(() => {
    if (isMuted) {
      cleanupAudio();
      return;
    }

    try {
      // Lazy init AudioContext on user action
      if (!audioCtxRef.current) {
        const AudioCoontextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCoontextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Establish Node chain
      gainRef.current = ctx.createGain();
      gainRef.current.gain.setValueAtTime(0.001, ctx.currentTime);

      // Low pass filter to make it warmer & more ambient
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      // Delay effect line
      delayRef.current = ctx.createDelay(1.5);
      delayRef.current.delayTime.setValueAtTime(0.4, ctx.currentTime);

      delayGainRef.current = ctx.createGain();
      delayGainRef.current.gain.setValueAtTime(0.35, ctx.currentTime); // 35% echo wet

      // Connect paths
      gainRef.current.connect(filter);
      filter.connect(ctx.destination);

      // Delay lines
      filter.connect(delayRef.current);
      delayRef.current.connect(delayGainRef.current);
      delayGainRef.current.connect(filter); // feedback loop
      delayGainRef.current.connect(ctx.destination);

      // Sequencer parameters
      const bpm = activeScene.audioConfig.tempo;
      const intervalSec = 60 / bpm;
      const baseFreq = activeScene.audioConfig.baseFreq;
      const synthType = activeScene.audioConfig.type;
      const scaleType = activeScene.audioConfig.scale;

      // Note intervals based on key signature
      const scaleIntervals: Record<string, number[]> = {
        major: [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2.0], // Do Re Mi Fa Sol La Si Do
        minor: [1, 1.125, 1.189, 1.333, 1.5, 1.587, 1.782, 2.0],
        pentatonic: [1, 1.125, 1.25, 1.5, 1.667, 2.0, 2.25, 3.0], // Pentatonic scale (super spacey)
        ambient: [1, 1.333, 1.5, 1.778, 2.0, 2.667, 3.0, 4.0], // Pure fourths & fifths overlay
      };

      const selectedIntervals = scaleIntervals[scaleType] || scaleIntervals.ambient;
      let step = 0;

      const playSynthStep = () => {
        if (!audioCtxRef.current || !gainRef.current) return;
        const noteCtx = audioCtxRef.current;
        const now = noteCtx.currentTime;

        // Choose random interval from scale
        const randInterval = selectedIntervals[Math.floor(Math.random() * selectedIntervals.length)];
        // Determine register octave
        const octaveMult = Math.random() > 0.6 ? 2 : (Math.random() < 0.25 ? 0.5 : 1);
        const targetFreq = baseFreq * randInterval * octaveMult;

        // Create temporary oscillator for each notes trace
        const osc = noteCtx.createOscillator();
        const noteGain = noteCtx.createGain();

        osc.type = synthType;
        osc.frequency.setValueAtTime(targetFreq, now);

        // Gentle attack/decay envelope (Anti-click)
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.05); // low volume
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + intervalSec * 1.8);

        osc.connect(noteGain);
        noteGain.connect(gainRef.current);

        osc.start(now);
        osc.stop(now + intervalSec * 2);

        step++;
      };

      // Fade-in synthesizer master volume container smoothly
      gainRef.current.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.0);

      // Start tick sequencer interval
      sequencerIntervalRef.current = window.setInterval(playSynthStep, intervalSec * 1000);

    } catch (err) {
      console.error("Web Audio Synthesizer init failure:", err);
    }

    return () => {
      cleanupAudio();
    };
  }, [isMuted, currentSceneIndex, storyboard]);

  const cleanupAudio = () => {
    if (sequencerIntervalRef.current) {
      clearInterval(sequencerIntervalRef.current);
      sequencerIntervalRef.current = null;
    }
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
      gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
    }
    setTimeout(() => {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
      if (delayRef.current) {
        delayRef.current.disconnect();
        delayRef.current = null;
      }
      if (delayGainRef.current) {
        delayGainRef.current.disconnect();
        delayGainRef.current = null;
      }
    }, 600);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % storyboard.scenes.length);
  };

  const handlePrev = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + storyboard.scenes.length) % storyboard.scenes.length);
  };

  const updateParameter = (key: keyof VisualConfig, val: any) => {
    setCustomVisualConfig((prev) => {
      const base = prev || activeScene.visualConfig;
      return {
        ...base,
        [key]: val,
      };
    });
  };

  // Humanize rendering names
  const patternNames: Record<string, string> = {
    network: "神经网络 (Synapse)",
    grid: "数字孪生 (Digital Twin)",
    organic: "生态呼吸 (Biophilic Flow)",
    industrial: "环链机耦 (Industrial Gear)",
    quantum: "微观量子 (Quantum Cloud)",
  };

  return (
    <div className="w-full bg-[#121620] rounded-2xl border border-gray-800/80 overflow-hidden shadow-2xl relative flex flex-col min-h-[580px] lg:min-h-[640px]">
      
      {/* Top Header details inside viewscreen */}
      <div className="px-6 py-4 border-b border-gray-800/60 bg-gray-900/40 backdrop-blur-md flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75" />
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse delay-150" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-tight text-white flex items-center">
              {storyboard.title}
              <span className="ml-[6px] text-[10px] font-mono px-1.5 py-[2px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 rounded">
                幕 {currentSceneIndex + 1}/{storyboard.scenes.length}
              </span>
            </h3>
            <p className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              导演设想：{activeScene.title}
            </p>
          </div>
        </div>

        {/* Info label */}
        <div className="text-[11px] bg-gray-800/50 text-gray-300 font-mono py-1 px-3 border border-gray-700/50 rounded-full flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          AIGC 实时电影渲染引擎
        </div>
      </div>

      {/* Main Canvas Viewscreen */}
      <div 
        ref={containerRef}
        className="flex-1 w-full bg-[#0e1117] relative overflow-hidden flex items-center justify-center min-h-[280px]"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Dark Ambient Layer Mask & Gradient Grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-[#0e1117]/30 pointer-events-none" />

        {/* Dynamic Poem Caption Overlays */}
        <div className="absolute bottom-12 inset-x-6 sm:inset-x-12 flex flex-col items-center justify-end z-10 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSceneIndex + "_" + storyboard.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-2xl px-6 py-4 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800/50"
            >
              <h4 className="text-cyan-400 font-sans text-xs tracking-widest font-bold mb-2 uppercase select-none">
                {activeScene.title}
              </h4>
              <p className="text-white font-sans text-sm sm:text-base leading-relaxed tracking-wider font-medium font-chinese select-text">
                「 {activeScene.caption} 」
              </p>
              
              {/* Minor metadata indicator */}
              <div className="mt-3 flex items-center justify-center space-x-4 text-[10px] font-mono text-gray-400">
                <span>🎨 渲染模式: {patternNames[activeVisualConfig.pattern] || activeVisualConfig.pattern}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>🎵 振荡声阶: {activeScene.audioConfig.type.toUpperCase()} / {activeScene.audioConfig.scale.toUpperCase()}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ambient Unmute Prompt if Muted */}
        {isMuted && isPlaying && (
          <button 
            onClick={toggleMute}
            className="absolute top-4 right-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 text-[11px] font-mono font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-lg flex items-center space-x-1.5 cursor-pointer z-10 transition animate-pulse"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>开启声学交响 (Art & Tech Sound)</span>
          </button>
        )}
      </div>

      {/* Timeline scrubbing bar */}
      <div className="w-full h-[3px] bg-gray-800/80 relative">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 transition-all duration-100"
          style={{ width: `${(currentTime / activeScene.duration) * 100}%` }}
        />
      </div>

      {/* Interactive Control Dashboard bar */}
      <div className="p-6 bg-gray-950/90 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
        
        {/* Playback Transport buttons */}
        <div className="flex items-center space-x-3 order-2 md:order-1">
          <button 
            type="button"
            onClick={handlePrev}
            aria-label="Previous scene"
            className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 transition-all active:scale-95 cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button 
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause cinematic play" : "Start cinematic play"}
            className="p-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#090d16] hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer flex items-center justify-center font-bold"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button 
            type="button"
            onClick={handleNext}
            aria-label="Next scene"
            className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 transition-all active:scale-95 cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Info title timeline text */}
        <div className="text-center md:text-left order-1 md:order-2">
          <span className="text-[12px] font-mono text-cyan-400 uppercase tracking-widest font-semibold block">分镜头剧本</span>
          <span className="text-sm font-sans text-white font-semibold">
            {activeScene.title}
          </span>
          <span className="text-xs font-mono text-gray-500 block">
            时长: {activeScene.duration}s &bull; 时序进度: {currentTime.toFixed(1)}s
          </span>
        </div>

        {/* Audio Mute & Tuning toggle controls */}
        <div className="flex items-center space-x-3 order-3">
          <button 
            onClick={toggleMute}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center space-x-1.5 ${
              !isMuted 
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-xs font-mono font-medium hidden sm:inline">
              {!isMuted ? "声学开启" : "声学静音"}
            </span>
          </button>

          <button 
            onClick={() => setShowTuner(!showTuner)}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center space-x-1.5 ${
              showTuner 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="text-xs font-mono font-medium hidden sm:inline">物理调谐</span>
          </button>
        </div>
      </div>

      {/* Physics Tuner Dashboard Overlay Panel */}
      <AnimatePresence>
        {showTuner && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#161a28] border-t border-gray-900 overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Config Slider 1 */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                  <span>粒子密度 (Particle Count)</span>
                  <span className="text-cyan-400">{activeVisualConfig.particleCount} dots</span>
                </label>
                <input 
                  type="range"
                  min="30"
                  max="350"
                  step="5"
                  value={activeVisualConfig.particleCount}
                  onChange={(e) => updateParameter("particleCount", parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] font-mono text-gray-500 leading-normal">
                  调谐前台画布进行时渲染的总数据点云密度规模。
                </p>
              </div>

              {/* Config Slider 2 */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                  <span>运动速度因数 (Speed Factor)</span>
                  <span className="text-cyan-400">x{activeVisualConfig.particleSpeed}</span>
                </label>
                <input 
                  type="range"
                  min="0.2"
                  max="3.5"
                  step="0.1"
                  value={activeVisualConfig.particleSpeed}
                  onChange={(e) => updateParameter("particleSpeed", parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] font-mono text-gray-500 leading-normal">
                  控制粒子微粒物理计算框架中的基础跃迁位移速率。
                </p>
              </div>

              {/* Config Slider 3 */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                  <span>空间湍流扰动 (Turbulence Noise)</span>
                  <span className="text-cyan-400">{activeVisualConfig.noiseIntensity} lvl</span>
                </label>
                <input 
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={activeVisualConfig.noiseIntensity}
                  onChange={(e) => updateParameter("noiseIntensity", parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] font-mono text-gray-500 leading-normal">
                  数值越大，对流与薛定谔波动计算的抖动程度越剧烈。
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
