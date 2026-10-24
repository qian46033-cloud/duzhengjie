import React, { useState } from 'react';
import { PageTab, ServiceCategory } from './types';
import { APP_INFO } from './data/content';
import { GothicBackground } from './components/GothicBackground';
import { GothicFeatherEffect } from './components/GothicFeatherEffect';
import { Navigation } from './components/Navigation';
import { CoverSection } from './components/CoverSection';
import { AboutSection } from './components/AboutSection';
import { RulesAndServicesSection } from './components/RulesAndServicesSection';
import { OrderCalculatorModal } from './components/OrderCalculatorModal';
import { MusicPlayer } from './components/MusicPlayer';
import { Toast } from './components/Toast';
import { Copy, ExternalLink, ChevronUp } from 'lucide-react';
import { GothicCross, GothicStilettoCross } from './components/GothicIcons';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('cover');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorCategory, setCalculatorCategory] = useState<ServiceCategory>('pr');
  const [calculatorItemId, setCalculatorItemId] = useState<string | undefined>();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(APP_INFO.wechat);
    showToast(`微信号 ${APP_INFO.wechat} 已复制到剪贴板！`);
  };

  const handleOpenCalculatorForService = (catId: ServiceCategory, itemId?: string) => {
    setCalculatorCategory(catId);
    setCalculatorItemId(itemId);
    setIsCalculatorOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-200 selection:bg-rose-950 selection:text-rose-200 flex flex-col font-gothic overflow-x-hidden">
      {/* Dynamic Gothic Canvas Background */}
      <GothicBackground />

      {/* Global Interactive Gothic Feather & Ripple Click/Glide Effect */}
      <GothicFeatherEffect />

      {/* Top Gothic Header Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCalculator={() => {
          setCalculatorCategory('pr');
          setCalculatorItemId(undefined);
          setIsCalculatorOpen(true);
        }}
        onCopyWechat={handleCopyWechat}
      />

      {/* Main Page Area based on activeTab */}
      <main className="relative z-10 flex-1">
        {activeTab === 'cover' && (
          <CoverSection
            onEnter={(nextTab) => {
              setActiveTab(nextTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCopyWechat={handleCopyWechat}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            onCopyWechat={handleCopyWechat}
            onNavigateToServices={(nextTab) => {
              setActiveTab(nextTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'services' && (
          <RulesAndServicesSection
            onCopyWechat={handleCopyWechat}
            onOpenCalculatorForService={handleOpenCalculatorForService}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Gothic Ornate Footer */}
      <footer className="relative z-10 border-t border-zinc-900 bg-[#050507]/95 backdrop-blur-md py-10 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Gothic Cross & Quote */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-zinc-600">
              <span className="w-12 h-[1px] bg-zinc-800" />
              <GothicCross size={20} className="text-zinc-500" />
              <span className="w-12 h-[1px] bg-zinc-800" />
            </div>
            <div className="text-sm sm:text-base font-gothic tracking-[0.2em] text-zinc-300">
              {APP_INFO.nickname} · {APP_INFO.chineseCopy}
            </div>
            <div className="text-[11px] font-cinzel text-zinc-600 tracking-[0.25em] uppercase">
              {APP_INFO.englishCopy}
            </div>
          </div>

          {/* Quick Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400 font-gothic">
            <button
              onClick={() => {
                setActiveTab('cover');
                scrollToTop();
              }}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Ⅰ. 封面首页
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={() => {
                setActiveTab('about');
                scrollToTop();
              }}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Ⅱ. 个人信息与名师
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={() => {
                setActiveTab('services');
                scrollToTop();
              }}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Ⅲ. 个人须知与六大业务
            </button>
          </div>

          {/* Micro-blogs & WeChat */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] text-zinc-500 font-mono">
            <button
              onClick={handleCopyWechat}
              className="hover:text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Copy className="w-3 h-3 text-zinc-600" />
              <span>WeChat: {APP_INFO.wechat}</span>
            </button>
            <span>|</span>
            <a
              href={APP_INFO.weibo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <span>{APP_INFO.nickname} ({APP_INFO.weibo.name})</span>
              <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
            </a>
            <span>|</span>
            <a
              href={APP_INFO.mentors[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <span>恩师何瑞 ({APP_INFO.mentors[0].name})</span>
              <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
            </a>
            <span>|</span>
            <a
              href={APP_INFO.mentors[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <span>爱师白易 ({APP_INFO.mentors[1].name})</span>
              <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
            </a>
            {APP_INFO.mentors[2] && (
              <>
                <span>|</span>
                <a
                  href={APP_INFO.mentors[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-300 flex items-center gap-1 transition-colors"
                >
                  <span>搭档春去 ({APP_INFO.mentors[2].name})</span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
                </a>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-600 gap-2">
            <span>© 2026 {APP_INFO.nickname} · 拿钱办事 · 态度对称 · 下单默认已读须知</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-zinc-400 transition-colors"
            >
              <span>回到顶部</span>
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Booking Estimator Modal */}
      <OrderCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialCategory={calculatorCategory}
        initialItemId={calculatorItemId}
        onShowToast={showToast}
      />

      {/* Global Gothic Background Music Player (ASMODEUS / DEITIES - surreal) */}
      <MusicPlayer onShowToast={showToast} />

      {/* Floating Gothic Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
