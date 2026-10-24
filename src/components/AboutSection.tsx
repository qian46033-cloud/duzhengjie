import React from 'react';
import { motion } from 'motion/react';
import { APP_INFO } from '../data/content';
import { PageTab } from '../types';
import { Copy, ExternalLink, ArrowRight, ShieldCheck, UserCheck, Users } from 'lucide-react';
import {
  GothicCross,
  GothicStilettoCross,
  GothicFiligreeCorner,
  GothicDivider,
} from './GothicIcons';

interface AboutSectionProps {
  onCopyWechat: () => void;
  onNavigateToServices: (tab: PageTab) => void;
  onShowToast: (msg: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onCopyWechat,
  onNavigateToServices,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 py-12">
      {/* Header title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GothicStilettoCross className="w-4 h-4 text-zinc-600" />
          <span className="text-xs tracking-[0.5em] text-zinc-500 font-cinzel">
            PAGE II · PERSONAL DOSSIER
          </span>
          <GothicStilettoCross className="w-4 h-4 text-zinc-600" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-cinzel font-bold tracking-[0.25em] text-zinc-100 flex items-center justify-center gap-3">
          <GothicCross size={28} className="text-rose-500/80 drop-shadow" />
          <span>{APP_INFO.nickname} · 个人档案</span>
          <GothicCross size={28} className="text-rose-500/80 drop-shadow" />
        </h2>
        <p className="text-xs text-zinc-500 font-gothic tracking-widest mt-2">
          身份档案 · 业务架构 · 师承与搭档脉络
        </p>
      </div>

      {/* Main About Me Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-6 sm:p-8 shadow-2xl mb-8 backdrop-blur-md overflow-hidden group hover:border-zinc-700 transition-colors"
      >
        {/* Gothic Filigree Corner Ornaments */}
        <GothicFiligreeCorner position="tl" className="absolute top-2 left-2 w-7 h-7 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        <GothicFiligreeCorner position="tr" className="absolute top-2 right-2 w-7 h-7 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        <GothicFiligreeCorner position="bl" className="absolute bottom-2 left-2 w-7 h-7 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        <GothicFiligreeCorner position="br" className="absolute bottom-2 right-2 w-7 h-7 text-zinc-600 group-hover:text-zinc-400 transition-colors" />

        {/* Section Header (Faithful ASCII representation + Gothic Cross) */}
        <div className="text-center pb-6 border-b border-zinc-800/80 relative">
          <div className="flex justify-center mb-2">
            <GothicCross size={24} className="text-zinc-400" />
          </div>
          <div className="text-xs sm:text-sm font-mono tracking-widest text-zinc-300 select-all mb-1 font-bold">
            ░              ◤·𝗔𝗯𝗼𝘂𝘁  𝗠𝗲▪️关于我·◢                ░
          </div>
          <p className="text-[11px] font-cinzel text-zinc-500 tracking-[0.3em] uppercase">
            Curriculum Vitae & Business Inquiries
          </p>
        </div>

        {/* Details list */}
        <div className="mt-6 space-y-6">
          {/* Nickname Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 font-gothic text-sm shrink-0 sm:w-28">
              <span className="text-rose-500/80">◎</span>
              <span className="font-semibold tracking-wider">本尊昵称：</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-gothic font-bold text-base text-zinc-100 tracking-wider">
                {APP_INFO.nickname}
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-rose-950/60 border border-rose-900/60 text-rose-300 font-mono rounded">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Main Services */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex items-center gap-2 text-zinc-400 font-gothic text-sm shrink-0 sm:w-28">
              <span className="text-rose-500/80">◎</span>
              <span className="font-semibold tracking-wider">主营业务：</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {APP_INFO.mainServices.map((srv) => (
                <span
                  key={srv}
                  className="px-2.5 py-1 text-xs tracking-wider font-gothic bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:border-zinc-600 transition-colors flex items-center gap-1.5"
                >
                  <GothicStilettoCross className="w-2.5 h-2.5 text-rose-400" />
                  <span>{srv}</span>
                </span>
              ))}
            </div>
          </div>

          {/* WeChat */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 font-gothic text-sm shrink-0 sm:w-28">
              <span className="text-rose-500/80">◎</span>
              <span className="font-semibold tracking-wider">WeChat✚：</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm tracking-wider text-rose-300 bg-rose-950/40 border border-rose-900/60 px-3 py-1 rounded select-all font-semibold">
                {APP_INFO.wechat}
              </span>
              <button
                onClick={onCopyWechat}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 rounded transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>复制微信号</span>
              </button>
            </div>
          </div>

          {/* Micro-blog (Weibo) */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex items-center gap-2 text-zinc-400 font-gothic text-sm shrink-0 sm:w-28">
              <span className="text-rose-500/80">◎</span>
              <span className="font-semibold tracking-wider">Micro-blog✚：</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center justify-between sm:justify-start gap-4 flex-wrap bg-zinc-900/50 border border-zinc-800/80 p-3 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500/80">✪</span>
                  <span className="font-gothic font-semibold text-zinc-200 text-sm">
                    {APP_INFO.weibo.name}
                  </span>
                </div>
                <a
                  href={APP_INFO.weibo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-rose-950/40 hover:bg-rose-950/80 text-rose-200 border border-rose-900/60 rounded transition-colors"
                >
                  <span>访问微博主页</span>
                  <ExternalLink className="w-3 h-3 text-rose-400" />
                </a>
              </div>
              <div className="text-[11px] text-zinc-600 font-mono pl-1 select-all break-all">
                {APP_INFO.weibo.url}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gothic Divider */}
      <GothicDivider text="师 承 与 搭 档" className="my-8" />

      {/* Mentors & Partner Grid (恩师、爱师、搭档) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {APP_INFO.mentors.map((person, index) => (
          <motion.div
            key={person.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 * (index + 1) }}
            className="relative bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 shadow-xl backdrop-blur-md group hover:border-zinc-700 transition-colors overflow-hidden flex flex-col justify-between"
          >
            {/* Corner cross */}
            <div className="absolute top-2 right-2 text-zinc-700 group-hover:text-rose-500/80 transition-colors">
              <GothicStilettoCross className="w-3.5 h-3.5" />
            </div>

            <div>
              {/* Header Raw ASCII */}
              <div className="text-center pb-4 border-b border-zinc-800/80">
                <div className="flex justify-center mb-1">
                  <GothicCross size={20} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <div className="text-[11px] font-mono tracking-wider text-zinc-400 select-all mb-1 truncate">
                  {person.headerRaw}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {index === 0 && <ShieldCheck className="w-4 h-4 text-rose-400" />}
                  {index === 1 && <UserCheck className="w-4 h-4 text-rose-400" />}
                  {index === 2 && <Users className="w-4 h-4 text-rose-400" />}
                  <span className="text-sm font-gothic font-bold tracking-widest text-zinc-200">
                    {person.title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-gothic flex items-center gap-1.5">
                    <GothicStilettoCross className="w-3 h-3 text-zinc-600" />
                    <span>Micro-blog✚：</span>
                  </span>
                  <span className="text-amber-500/80">✪</span>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded flex items-center justify-between gap-2">
                  <span className="font-gothic text-sm font-semibold text-zinc-200">
                    {person.name}
                  </span>
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 rounded transition-colors shrink-0"
                  >
                    <span>直达微博</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>

                <div className="text-[10px] text-zinc-600 font-mono truncate select-all">
                  {person.url}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA to Page 3 */}
      <div className="text-center pt-4 border-t border-zinc-900 flex justify-center">
        <button
          onClick={() => onNavigateToServices('services')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-xs sm:text-sm tracking-widest font-gothic rounded transition-colors group cursor-pointer shadow-lg"
        >
          <GothicCross size={16} className="text-rose-400" />
          <span>查阅 个人须知 与 六大业务板块</span>
          <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
