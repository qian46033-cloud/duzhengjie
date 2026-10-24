import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Play a soft bell/chime note
  const triggerBell = (ctx: AudioContext, masterGain: GainNode) => {
    try {
      const bellGain = ctx.createGain();
      bellGain.connect(masterGain);
      bellGain.gain.setValueAtTime(0, ctx.currentTime);
      bellGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';

      const freqs = [174.61, 220.0, 261.63, 329.63, 392.0]; // F3, A3, C4, E4, G4 - gothic minor pentatonic
      const baseFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq * 2.01, ctx.currentTime);

      osc1.connect(bellGain);
      osc2.connect(bellGain);

      osc1.start();
      osc2.start();

      osc1.stop(ctx.currentTime + 3.6);
      osc2.stop(ctx.currentTime + 3.6);
    } catch {
      // ignore
    }
  };

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Dark low drone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.connect(masterGain);

      const chord = [55, 110, 164.81]; // A1, A2, E3
      const oscillators: OscillatorNode[] = [];

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(subGain);
        subGain.connect(filter);
        osc.start();
        oscillators.push(osc);
      });

      oscNodesRef.current = oscillators;

      // Trigger first chime
      triggerBell(ctx, masterGain);

      // Periodically trigger ethereal chime
      intervalRef.current = window.setInterval(() => {
        if (ctx && masterGain) {
          triggerBell(ctx, masterGain);
        }
      }, 7000);

      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio could not be initialized:', e);
    }
  };

  const stopAmbience = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscNodesRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscNodesRef.current = [];

    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbience();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? '静音氛围音效' : '开启哥特沉浸氛围音'}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider border border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 backdrop-blur-md text-zinc-400 hover:text-zinc-200 rounded transition-all duration-300"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="font-mono text-[11px] text-zinc-300">沉浸氛围 ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-mono text-[11px] text-zinc-500">氛围音 OFF</span>
        </>
      )}
    </button>
  );
};
