import React from 'react';
import { PageTab } from '../types';
import { APP_INFO } from '../data/content';
import { Copy, Calculator } from 'lucide-react';
import { GothicCross, GothicStilettoCross } from './GothicIcons';

interface NavigationProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  onOpenCalculator: () => void;
  onCopyWechat: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  onOpenCalculator,
  onCopyWechat,
}) => {
  const navItems: { id: PageTab; label: string; enLabel: string; symbol: string }[] = [
    { id: 'cover', label: '封面', enLabel: 'COVER', symbol: '✦' },
    { id: 'about', label: '个人信息', enLabel: 'ABOUT', symbol: '♟️' },
    { id: 'services', label: '须知与业务', enLabel: 'SERVICES', symbol: '†' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand Title */}
        <button
          onClick={() => onTabChange('cover')}
          className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer"
        >
          <GothicCross size={20} className="text-zinc-500 group-hover:text-rose-400 transition-colors" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-[0.2em] text-zinc-100 group-hover:text-zinc-50 transition-colors font-cinzel">
              {APP_INFO.nickname}
            </span>
            <span className="text-[9px] tracking-[0.25em] text-zinc-500 font-mono -mt-0.5">
              DU ZHENG JIE · CURSED
            </span>
          </div>
        </button>

        {/* Center Page Switcher */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm tracking-widest transition-all duration-300 font-gothic flex items-center gap-1.5 rounded ${
                  isActive
                    ? 'text-zinc-100 bg-zinc-900/90 shadow-inner border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-rose-400' : 'text-zinc-600'}`}>
                  {item.symbol}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">

          {/* Quick Copy WeChat */}
          <button
            onClick={onCopyWechat}
            title="点击复制微信号 TuT-0423-"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider border border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 text-zinc-300 hover:text-white rounded transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-[11px]">TuT-0423-</span>
          </button>

          {/* Quick Calculator / Estimate Order */}
          <button
            onClick={onOpenCalculator}
            title="业务意向估价器与约单模板"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider border border-rose-950/80 hover:border-rose-800/80 bg-rose-950/30 text-rose-200 hover:bg-rose-950/50 rounded transition-all shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] font-gothic font-medium">约单意向</span>
          </button>
        </div>
      </div>
    </header>
  );
};
