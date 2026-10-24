import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GENERAL_RULES, SERVICES_DATA } from '../data/content';
import { ServiceCategory } from '../types';
import { 
  AlertTriangle, 
  Scroll, 
  Copy, 
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  GothicCross,
  GothicStilettoCross,
  GothicArchTracery,
  GothicFiligreeCorner,
  GothicDivider,
} from './GothicIcons';

interface RulesAndServicesSectionProps {
  onCopyWechat: () => void;
  onOpenCalculatorForService?: (catId: ServiceCategory, itemId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const RulesAndServicesSection: React.FC<RulesAndServicesSectionProps> = ({
  onCopyWechat,
  onOpenCalculatorForService,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('pr');

  const activeService = SERVICES_DATA.find((s) => s.id === selectedCategory) || SERVICES_DATA[0];

  const handleCopyCategoryText = () => {
    let full = `【${activeService.name}业务价目与须知】\n`;
    activeService.items.forEach((item) => {
      full += `· ${item.name} >> ${item.price} (${item.tag || ''})\n`;
      if (item.bonus) full += `  ${item.bonus}\n`;
      if (item.description) {
        item.description.forEach((d) => (full += `  - ${d}\n`));
      }
    });
    full += `\n${activeService.noticeTitle}\n`;
    activeService.notices.forEach((n) => {
      full += `${n}\n`;
    });

    navigator.clipboard.writeText(full);
    onShowToast(`已复制${activeService.name}板块完整价目须知`);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 py-12">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GothicStilettoCross className="w-4 h-4 text-zinc-600" />
          <span className="text-xs tracking-[0.5em] text-zinc-500 font-cinzel">
            PAGE III · PROTOCOLS & TARIFFS
          </span>
          <GothicStilettoCross className="w-4 h-4 text-zinc-600" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-cinzel font-bold tracking-[0.2em] text-zinc-100 flex items-center justify-center gap-3">
          <GothicCross size={26} className="text-rose-500/80" />
          <span>个人须知 · 六大业务</span>
          <GothicCross size={26} className="text-rose-500/80" />
        </h2>
        <p className="text-xs text-zinc-500 font-gothic tracking-widest mt-2">
          契约铁律 · 公关｜管理｜代码｜代挂｜美化｜代宣
        </p>
      </div>

      {/* Part 1: 个人须知 (Contract Rules) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 relative bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden"
      >
        <GothicFiligreeCorner position="tl" className="absolute top-2 left-2 w-7 h-7 text-zinc-700 pointer-events-none" />
        <GothicFiligreeCorner position="tr" className="absolute top-2 right-2 w-7 h-7 text-zinc-700 pointer-events-none" />
        <GothicFiligreeCorner position="bl" className="absolute bottom-2 left-2 w-7 h-7 text-zinc-700 pointer-events-none" />
        <GothicFiligreeCorner position="br" className="absolute bottom-2 right-2 w-7 h-7 text-zinc-700 pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-900/60 to-transparent" />
        
        {/* Header of General Rules */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/50 border border-rose-900/60 flex items-center justify-center text-rose-300 shadow-md">
              <GothicCross size={22} className="text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-gothic font-bold text-zinc-100 tracking-widest flex items-center gap-1.5">
                  <span>个人须知</span>
                  <GothicStilettoCross className="w-3.5 h-3.5 text-rose-500" />
                  <span>预约前必读</span>
                </h3>
                <span className="px-2 py-0.5 text-[10px] bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded font-mono">
                  铁律
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Obligatory Protocols & Terms of Service · 都正街/咒眾
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <span>CLAUSES</span>
            <span className="text-rose-500">10 ITEMS</span>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {GENERAL_RULES.map((rule, index) => {
            const isHighlight =
              index === 0 || index === 1 || index === 9 || index === 6;
            return (
              <div
                key={index}
                className={`p-3.5 rounded border transition-colors flex items-start gap-3 group ${
                  isHighlight
                    ? 'bg-rose-950/15 border-rose-900/40 hover:border-rose-800/80 shadow-[0_0_15px_rgba(159,18,57,0.1)]'
                    : 'bg-zinc-900/40 border-zinc-800/70 hover:border-zinc-700'
                }`}
              >
                <span className="font-mono text-rose-500/80 text-sm font-bold shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <GothicStilettoCross className="w-3 h-3 text-rose-500/70" />
                  <span>➫</span>
                </span>
                <div className="flex-1 text-xs sm:text-sm font-gothic tracking-wide leading-relaxed text-zinc-300">
                  <span className="text-zinc-500 font-mono text-[11px] mr-1">
                    &lt;
                  </span>
                  <span className={isHighlight ? 'text-zinc-100 font-medium' : 'text-zinc-300'}>
                    {rule}
                  </span>
                  <span className="text-zinc-500 font-mono text-[11px] ml-1">
                    &gt;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
            <span>咨询即视为认可以上全部条款，请理性约单。</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">RULESET · V2.4</span>
        </div>
      </motion.div>

      {/* Part 2: 六大业务板块 (The 6 Service Sectors) */}
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/70 border border-zinc-800 text-zinc-400 text-xs rounded-full font-gothic tracking-widest mb-2">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>六大业务板块 · 点击自由切换</span>
          </div>
          <h3 className="text-2xl font-cinzel font-bold text-zinc-100 tracking-wider">
            业务价目与下单规章
          </h3>
        </div>

        {/* Sector Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {SERVICES_DATA.map((srv) => {
            const isSelected = srv.id === selectedCategory;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedCategory(srv.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 relative group cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-rose-900/80 text-zinc-100 shadow-[0_0_20px_rgba(159,18,57,0.25)]'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div className="text-lg mb-1">{srv.gothicSymbol}</div>
                <div className="text-sm font-gothic font-bold tracking-wider">{srv.name}</div>
                <div className="text-[9px] font-cinzel tracking-wider text-zinc-500 mt-0.5 truncate max-w-full">
                  {srv.englishTitle.split(' ')[0]}
                </div>
                {isSelected && (
                  <span className="absolute -bottom-1 w-6 h-[2px] bg-rose-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-950/90 border border-zinc-800/90 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-md"
          >
            {/* Header of Active Service */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xl shrink-0">{activeService.gothicSymbol}</span>
                    <h4 className="text-xl sm:text-2xl font-gothic font-bold text-zinc-100 tracking-wider whitespace-nowrap">
                      {activeService.name}业务
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 tracking-widest px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded whitespace-nowrap shrink-0">
                    {activeService.englishTitle}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-gothic mt-1.5 pl-8 sm:pl-9">
                  {activeService.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyCategoryText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>复制此业务文本</span>
                </button>
                {onOpenCalculatorForService && (
                  <button
                    onClick={() => onOpenCalculatorForService(activeService.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/60 text-rose-200 rounded transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>意向约单</span>
                  </button>
                )}
              </div>
            </div>

            {/* Special Category Extra Badges or Table */}
            {activeService.id === 'exposure' && (
              <div className="my-6 p-4 bg-zinc-900/40 border border-zinc-800/90 rounded-lg">
                <div className="text-xs font-mono text-rose-400 font-bold mb-3 tracking-wider">
                  ·—————— + 微博 & 朋友圈 定价结构表 + ———————·
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-gothic text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400">
                        <th className="py-2 px-3">渠道</th>
                        <th className="py-2 px-3">类型 / 时长</th>
                        <th className="py-2 px-3">普通档</th>
                        <th className="py-2 px-3">置顶档</th>
                        <th className="py-2 px-3">说明</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-rose-300">微博</td>
                        <td className="py-2.5 px-3">永挂</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-zinc-100">30r</td>
                        <td className="py-2.5 px-3 text-zinc-500">-</td>
                        <td className="py-2.5 px-3 text-zinc-400">包车队，赠送置顶一个月</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-zinc-200" rowSpan={3}>朋友圈</td>
                        <td className="py-2.5 px-3">3天</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-300">15r</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-zinc-100">30r</td>
                        <td className="py-2.5 px-3 text-zinc-400">三天展示期</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">7天</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-300">30r</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-zinc-100">50r</td>
                        <td className="py-2.5 px-3 text-zinc-400">七天展示期</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">30天</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-300">100r</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-zinc-100">160r</td>
                        <td className="py-2.5 px-3 text-zinc-400">全月置顶曝光</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Service Items Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeService.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Item header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <GothicStilettoCross className="w-3.5 h-3.5 text-rose-500/80 shrink-0" />
                          <span className="text-base font-gothic font-bold text-zinc-100 group-hover:text-rose-200 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        {item.tag && (
                          <span className="text-[11px] font-mono text-zinc-500 mt-0.5 pl-5">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-rose-300 font-mono text-xs sm:text-sm font-bold rounded shadow-inner">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Descriptions */}
                    {item.description && item.description.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 font-gothic leading-relaxed pl-1">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500/80 text-[11px] mt-0.5">†</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Bonus tag */}
                    {item.bonus && (
                      <div className="mt-3 px-3 py-1.5 bg-rose-950/25 border border-rose-900/40 rounded text-xs text-rose-300 font-gothic">
                        {item.bonus}
                      </div>
                    )}
                  </div>

                  {/* Quick Order Intent CTA */}
                  {onOpenCalculatorForService && (
                    <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-mono">
                        ID: {item.id}
                      </span>
                      <button
                        onClick={() => onOpenCalculatorForService(activeService.id, item.id)}
                        className="text-xs text-zinc-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                      >
                        <span>选定此项约单</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Extra Rates if available (e.g. 包文案) */}
            {activeService.extraRates && activeService.extraRates.length > 0 && (
              <div className="mt-4 p-3 bg-zinc-900/60 border border-zinc-800 rounded flex items-center justify-between">
                <span className="text-xs text-zinc-300 font-gothic">
                  ⁺ ♟️ 增值选项目：
                </span>
                <div className="flex items-center gap-3">
                  {activeService.extraRates.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs bg-zinc-950 border border-zinc-700/80 text-rose-300 font-mono rounded font-medium"
                    >
                      {ex.label} {'>>'} {ex.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sector Specific Notice (下单须知) */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-lg">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span className="text-xs sm:text-sm font-mono text-zinc-200 font-bold tracking-wider whitespace-pre-line">
                      {activeService.noticeTitle}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    SECTOR CLAUSES
                  </span>
                </div>

                <div className="space-y-2 text-xs text-zinc-400 font-gothic leading-relaxed">
                  {activeService.notices.map((notice, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-2">
                      <span className="text-rose-500/70 shrink-0 mt-0.5">†</span>
                      <span className="select-text">{notice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick WeChat Copy at bottom of sector */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-zinc-900/30 border border-zinc-800/60 rounded">
              <div className="text-xs text-zinc-400 font-gothic text-center sm:text-left">
                已确认须知并准备约单？请直接微信添加小窗沟通，备注意向业务。
              </div>
              <button
                onClick={onCopyWechat}
                className="shrink-0 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-gothic rounded border border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-zinc-300" />
                <span>复制微信号 TuT-0423-</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
