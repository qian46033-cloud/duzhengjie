import React from 'react';
import { motion } from 'motion/react';
import { APP_INFO } from '../data/content';
import { PageTab } from '../types';
import { Copy, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import coverOceanImg from '../assets/cover_ocean.jpeg';
import {
  GothicCross,
  GothicStilettoCross,
  GothicArchTracery,
  GothicFiligreeCorner,
  GothicDivider,
} from './GothicIcons';

interface CoverSectionProps {
  onEnter: (tab: PageTab) => void;
  onCopyWechat: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onEnter, onCopyWechat }) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 text-center select-none overflow-hidden">
      {/* Gothic halo background decoration */}
      <div className="absolute w-[360px] sm:w-[600px] h-[360px] sm:h-[600px] rounded-full bg-radial from-rose-950/20 via-zinc-900/10 to-transparent blur-3xl pointer-events-none -z-10 animate-gothic-pulse" />

      {/* Top Gothic Cathedral Cross Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col items-center gap-2 mb-4"
      >
        <div className="flex items-center gap-4 text-zinc-500">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-rose-900/60" />
          <GothicCross size={32} className="text-zinc-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent via-zinc-700 to-rose-900/60" />
        </div>
        <div className="text-[11px] font-cinzel text-zinc-500 tracking-[0.5em] uppercase">
          † Memento Mori · Dark Gothic Sanctum †
        </div>
      </motion.div>

      {/* Main Nickname Title: 都正街/咒眾 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="relative max-w-4xl"
      >
        <div className="text-zinc-600 font-cinzel text-xs sm:text-sm tracking-[0.6em] uppercase mb-2">
          Obsidian Requiem · Curse & Melody
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-zinc-100 font-cinzel drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)] flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span className="text-zinc-100">{APP_INFO.nickname.split('/')[0]}</span>
          <span className="text-rose-600/90 font-mono text-4xl sm:text-6xl font-light">/</span>
          <span className="text-rose-200/95 tracking-[0.2em]">{APP_INFO.nickname.split('/')[1] || '咒眾'}</span>
        </h1>

        <div className="text-zinc-500 text-xs sm:text-sm tracking-[0.5em] font-mono mt-3 flex items-center justify-center gap-3">
          <GothicStilettoCross className="w-3.5 h-3.5 text-zinc-600" />
          <span>░ ◤·DU ZHENG JIE · CURSED REALM·◢ ░</span>
          <GothicStilettoCross className="w-3.5 h-3.5 text-zinc-600" />
        </div>
      </motion.div>

      {/* User Uploaded Atmospheric Image: Seamless Gothic Coastal Tableau */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.35 }}
        className="relative mt-8 mb-6 w-full max-w-2xl group"
      >
        {/* Gothic Ornate Outer Arch Frame */}
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-zinc-700/60 via-zinc-900/80 to-zinc-950 shadow-[0_0_35px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Gothic Filigree Corners */}
          <GothicFiligreeCorner position="tl" className="absolute top-2 left-2 z-20 w-8 h-8 text-zinc-400 drop-shadow" />
          <GothicFiligreeCorner position="tr" className="absolute top-2 right-2 z-20 w-8 h-8 text-zinc-400 drop-shadow" />
          <GothicFiligreeCorner position="bl" className="absolute bottom-2 left-2 z-20 w-8 h-8 text-zinc-400 drop-shadow" />
          <GothicFiligreeCorner position="br" className="absolute bottom-2 right-2 z-20 w-8 h-8 text-zinc-400 drop-shadow" />

          {/* Top Center Gothic Cross Badge */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1 bg-zinc-950/80 border border-zinc-700/80 rounded-full shadow-lg backdrop-blur-md">
            <GothicCross size={16} className="text-rose-400" />
            <span className="text-[10px] font-cinzel tracking-widest text-zinc-300">DU ZHENG JIE</span>
            <GothicCross size={16} className="text-rose-400" />
          </div>

          {/* Image Container with Artistic Edge Blending */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden rounded-xl bg-black">
            <img
              src={coverOceanImg || APP_INFO.coverImage}
              alt="都正街 - 沉郁夜海"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('7b5b5b7a57f722ade9b323540bdc04f8_12390439.jpeg')) {
                  target.src = './assets/aistudio/7b5b5b7a57f722ade9b323540bdc04f8_12390439.jpeg';
                }
              }}
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.92] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Seamless Gothic Blending Overlays:
                Vignette, mist gradients, and subtle dark tint around borders */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/80 via-transparent to-[#070709]/80 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.95)] pointer-events-none" />

            {/* Overlaid Gothic Tracery & Text on the coast */}
            <div className="absolute bottom-4 inset-x-4 flex flex-col items-center justify-end text-center z-10 pointer-events-none">
              <GothicArchTracery className="w-48 h-6 text-zinc-400/50 mb-1" />
              <div className="text-xs font-mono tracking-[0.4em] text-zinc-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                † 夜潮与沉木 · 寂雪无声 †
              </div>
            </div>
          </div>
        </div>

        {/* Caption below frame */}
        <div className="flex items-center justify-between px-3 mt-2 text-[10px] font-mono text-zinc-600">
          <span>LAT 28.19° N · LON 112.98° E</span>
          <span>CURSED ARCHIVE</span>
        </div>
      </motion.div>

      {/* Gothic Ornate Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-lg"
      >
        <GothicDivider text="沉 郁" className="my-6" />
      </motion.div>

      {/* Main Copy (Chinese & English) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-xl space-y-2.5 px-2"
      >
        {/* Chinese Copy - smaller quiet size */}
        <p className="text-lg sm:text-xl font-gothic tracking-[0.25em] text-zinc-300 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          “{APP_INFO.chineseCopy}”
        </p>

        {/* English Copy */}
        <p className="text-xs sm:text-xs tracking-[0.22em] text-zinc-500 font-cinzel italic leading-relaxed uppercase">
          {APP_INFO.englishCopy}
        </p>
      </motion.div>

      {/* Business service tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
        className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-lg"
      >
        {APP_INFO.mainServices.map((service, idx) => (
          <span
            key={service}
            className="px-3.5 py-1.5 text-xs tracking-widest text-zinc-300 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-600 hover:text-rose-300 transition-colors rounded font-gothic flex items-center gap-2 shadow-sm"
          >
            <GothicStilettoCross className="w-3 h-3 text-rose-500/80" />
            <span>{service}</span>
          </span>
        ))}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md justify-center"
      >
        <button
          onClick={() => onEnter('about')}
          className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-b from-zinc-800/90 to-zinc-950 border border-zinc-700/80 hover:border-rose-700/80 text-zinc-100 rounded text-xs sm:text-sm tracking-[0.25em] font-gothic flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer"
        >
          <GothicStilettoCross className="w-3.5 h-3.5 text-zinc-500 group-hover:text-rose-400 transition-colors" />
          <span>了解关于我与师承</span>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-rose-400 transition-all" />
        </button>

        <button
          onClick={() => onEnter('services')}
          className="group w-full sm:w-auto px-6 py-3 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/80 hover:border-rose-600 text-rose-200 rounded text-xs sm:text-sm tracking-[0.25em] font-gothic flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg"
        >
          <GothicCross size={16} className="text-rose-400" />
          <span>查阅须知与业务</span>
        </button>
      </motion.div>

      {/* Quick Contacts Footer in Cover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 pt-8 border-t border-zinc-900/90 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono"
      >
        <button
          onClick={onCopyWechat}
          className="hover:text-zinc-300 flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <span className="text-zinc-600 group-hover:text-rose-400">WeChat✚</span>
          <span className="text-zinc-400 group-hover:text-white underline decoration-zinc-800 underline-offset-4">
            {APP_INFO.wechat}
          </span>
          <Copy className="w-3 h-3 text-zinc-600 group-hover:text-zinc-300" />
        </button>

        <span className="text-zinc-800">|</span>

        <a
          href={APP_INFO.weibo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300 flex items-center gap-1.5 transition-colors group"
        >
          <span className="text-zinc-600 group-hover:text-rose-400">Micro-blog✚</span>
          <span className="text-zinc-400 group-hover:text-white underline decoration-zinc-800 underline-offset-4">
            {APP_INFO.weibo.name}
          </span>
          <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-300" />
        </a>
      </motion.div>
    </section>
  );
};
