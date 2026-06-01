/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VisualConfig {
  particleColor: string;      // Primary color (hex, e.g., "#00f2fe")
  accentColor: string;        // Accent glow color
  particleCount: number;      // Amount of particles (e.g., 50 - 300)
  particleSpeed: number;      // Speed multiplier
  pattern: 'network' | 'grid' | 'organic' | 'industrial' | 'quantum'; // Canvas physics rendering formula
  noiseIntensity: number;     // Random jitter or sine wave height
}

export interface AudioConfig {
  baseFreq: number;           // Root synth oscillator frequency (Hz)
  type: 'sine' | 'square' | 'sawtooth' | 'triangle'; // Sound synthesis form
  scale: 'major' | 'minor' | 'pentatonic' | 'ambient'; // Musical mood / scale
  tempo: number;              // Speed of note changes (bpm)
}

export interface Scene {
  id: string | number;
  title: string;              // Scene name
  duration: number;           // Scene duration in seconds (e.g., 6)
  caption: string;            // Captions / voiceover script / artistic narrative
  visualDirection: string;    // Prompt / direction for visual effects
  audioDirection: string;     // Prompt / direction for audio effects
  visualConfig: VisualConfig; 
  audioConfig: AudioConfig;
}

export interface Storyboard {
  title: string;
  theme: 'tech' | 'digital' | 'smart' | 'industry';
  creator: 'AIGC 智能编排' | '卓越数智馆藏';
  description: string;
  scenes: Scene[];
}
