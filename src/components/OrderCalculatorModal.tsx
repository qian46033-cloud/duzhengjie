import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA, APP_INFO } from '../data/content';
import { ServiceCategory } from '../types';
import { X, Copy, Calculator, Check, ArrowRight } from 'lucide-react';

interface OrderCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ServiceCategory;
  initialItemId?: string;
  onShowToast: (msg: string) => void;
}

export const OrderCalculatorModal: React.FC<OrderCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'pr',
  initialItemId,
  onShowToast,
}) => {
  const [category, setCategory] = useState<ServiceCategory>(initialCategory);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(2); // e.g. hours for PR or words / hundred
  const [wordCount, setWordCount] = useState<number>(500); // for Gua Tiao
  const [includeCopywriting, setIncludeCopywriting] = useState<boolean>(false); // promo +5r
  const [clientNotes, setClientNotes] = useState<string>('');
  const [agreedToRules, setAgreedToRules] = useState<boolean>(true);

  useEffect(() => {
    setCategory(initialCategory);
    const cat = SERVICES_DATA.find((s) => s.id === initialCategory);
    if (cat && cat.items.length > 0) {
      if (initialItemId && cat.items.some((i) => i.id === initialItemId)) {
        setSelectedItemId(initialItemId);
      } else {
        setSelectedItemId(cat.items[0].id);
      }
    }
  }, [initialCategory, initialItemId, isOpen]);

  if (!isOpen) return null;

  const currentCategoryData = SERVICES_DATA.find((s) => s.id === category) || SERVICES_DATA[0];
  const currentItem =
    currentCategoryData.items.find((i) => i.id === selectedItemId) ||
    currentCategoryData.items[0];

  // Calculation logic based on item
  let estimatedPriceStr = '';
  let estimatedNum = 0;

  if (category === 'pr') {
    if (currentItem?.id === 'pr-temp-hourly') {
      const hours = Math.max(2, quantity);
      estimatedNum = hours * 50;
      estimatedPriceStr = `${estimatedNum}R (${hours}小时，50R/h，2h起接)`;
    } else if (currentItem?.id === 'pr-temp-full') {
      estimatedNum = 188;
      estimatedPriceStr = '188R (全流程后续，包代挂)';
    } else if (currentItem?.id === 'pr-advisor') {
      const hours = Math.max(1, quantity);
      estimatedNum = hours * 30;
      estimatedPriceStr = `${estimatedNum}R (${hours}小时，30R/h)`;
    } else if (currentItem?.id === 'pr-resident') {
      estimatedNum = 288;
      estimatedPriceStr = '288R/月';
    }
  } else if (category === 'manage') {
    if (currentItem?.id === 'manage-assistant') {
      estimatedNum = 258;
      estimatedPriceStr = '258R/月 (2个月起签，516R)';
    } else if (currentItem?.id === 'manage-hr') {
      estimatedNum = 258;
      estimatedPriceStr = '258R/月 (2个月起签，516R)';
    } else if (currentItem?.id === 'manage-core') {
      estimatedNum = 388;
      estimatedPriceStr = '388R/月 (2个月起签，776R)';
    }
  } else if (category === 'code') {
    // 15r per hundred words
    const hundreds = Math.max(1, Math.ceil(wordCount / 100));
    estimatedNum = hundreds * 15;
    estimatedPriceStr = `预估约 ${estimatedNum}R (${wordCount}字 / 定金50r 多退少补)`;
  } else if (category === 'exposure') {
    estimatedPriceStr = currentItem.price;
  } else if (category === 'aesthetic') {
    estimatedPriceStr = currentItem.price;
  } else if (category === 'promo') {
    let base = currentItem.price;
    if (includeCopywriting) {
      estimatedPriceStr = `${base} + 包文案 5R`;
    } else {
      estimatedPriceStr = base;
    }
  }

  // Generate order dispatch text
  const generateOrderText = () => {
    return `【${APP_INFO.nickname} · 业务预约委托】
-----------------------------------
业务板块: ${currentCategoryData.name} (${currentCategoryData.englishTitle})
预约项目: ${currentItem?.name || ''}
参考价目: ${currentItem?.price || ''}
预估/规格: ${estimatedPriceStr}
${includeCopywriting ? '附加选项: 包文案 (+5R)\n' : ''}
${category === 'pr' && currentItem?.id.includes('hourly') ? `预约时长: ${quantity} 小时\n` : ''}
${category === 'code' ? `预估字数: 约 ${wordCount} 字\n` : ''}
需求说明: ${clientNotes.trim() || '（请与我详细沟通需求内容与时间排期）'}
本人确认: 已详细阅读并承诺遵守《个人须知》与该业务下单规则。
-----------------------------------
联系微信号: ${APP_INFO.wechat}`;
  };

  const handleCopyOrder = () => {
    const text = generateOrderText();
    navigator.clipboard.writeText(text);
    onShowToast(`约单意向模板已复制！可直接发送至微信 ${APP_INFO.wechat}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#0b0b0e] border border-zinc-800 rounded-xl p-6 sm:p-7 shadow-2xl text-zinc-200 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-200 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="pb-4 border-b border-zinc-800/80 mb-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono mb-1">
              <Calculator className="w-4 h-4" />
              <span>ESTIMATOR & BOOKING DISPATCH</span>
            </div>
            <h3 className="text-xl font-gothic font-bold text-zinc-100 tracking-wider">
              {APP_INFO.nickname} · 意向约单估算器
            </h3>
            <p className="text-xs text-zinc-500 font-gothic mt-0.5">
              根据您的实际业务诉求快速计算预估，一键复制格式直接发给微信号 {APP_INFO.wechat}
            </p>
          </div>

          <div className="space-y-4 text-xs font-gothic">
            {/* 1. Category selector */}
            <div>
              <label className="block text-zinc-400 mb-1.5 font-medium">选择业务板块：</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setCategory(srv.id);
                      setSelectedItemId(srv.items[0].id);
                    }}
                    className={`py-1.5 px-2 text-center rounded border transition-colors ${
                      category === srv.id
                        ? 'bg-rose-950/40 border-rose-800 text-rose-200 font-bold'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span>{srv.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Item selector */}
            <div>
              <label className="block text-zinc-400 mb-1.5 font-medium">选择具体项目：</label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {currentCategoryData.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-2.5 rounded border flex items-center justify-between cursor-pointer transition-colors ${
                      selectedItemId === item.id
                        ? 'bg-zinc-900 border-zinc-600 text-zinc-100'
                        : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-200">{item.name}</span>
                      {item.tag && (
                        <span className="text-[10px] text-zinc-500 font-mono">{item.tag}</span>
                      )}
                    </div>
                    <span className="font-mono text-rose-300 font-bold shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Dynamic parameters */}
            {category === 'pr' && currentItem?.id.includes('hourly') && (
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <label className="block text-zinc-300 mb-1 font-medium">
                  预约服务时长 (小时，2h起接)：
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={2}
                    max={24}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="flex-1 accent-rose-500 cursor-pointer"
                  />
                  <span className="font-mono text-sm text-zinc-100 font-bold w-12 text-right">
                    {quantity} h
                  </span>
                </div>
              </div>
            )}

            {category === 'code' && (
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <label className="block text-zinc-300 mb-1 font-medium">
                  瓜条预估字数（15r/百字，定金50r多退少补）：
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={100}
                    value={wordCount}
                    onChange={(e) => setWordCount(Number(e.target.value))}
                    className="flex-1 accent-rose-500 cursor-pointer"
                  />
                  <span className="font-mono text-sm text-zinc-100 font-bold w-16 text-right">
                    {wordCount} 字
                  </span>
                </div>
              </div>
            )}

            {category === 'promo' && (
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-medium">加选：包文案 (+5R)</span>
                  <p className="text-[10px] text-zinc-500">Copy for the bag 官方定制润色文案</p>
                </div>
                <input
                  type="checkbox"
                  checked={includeCopywriting}
                  onChange={(e) => setIncludeCopywriting(e.target.checked)}
                  className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                />
              </div>
            )}

            {/* 4. Notes input */}
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">补充需求说明（可选）：</label>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="例如：涉及的团名、争议简述、需要的上线日期、预期排期等..."
                rows={2}
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-200 placeholder-zinc-600 text-xs focus:outline-none focus:border-zinc-600"
              />
            </div>

            {/* 5. Summary Price Box */}
            <div className="p-4 bg-zinc-950 border border-rose-950/70 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-500 font-mono">ESTIMATED PRICE</span>
                <div className="text-sm font-bold text-rose-300 font-gothic">
                  {estimatedPriceStr || currentItem?.price}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500">下单默认已读须知</span>
                <div className="text-xs text-zinc-300 font-mono">微信: {APP_INFO.wechat}</div>
              </div>
            </div>

            {/* Agreement check */}
            <div className="flex items-center gap-2 pt-1 text-zinc-400 text-xs">
              <input
                type="checkbox"
                id="agreeRules"
                checked={agreedToRules}
                onChange={(e) => setAgreedToRules(e.target.checked)}
                className="w-3.5 h-3.5 accent-rose-600 rounded cursor-pointer"
              />
              <label htmlFor="agreeRules" className="cursor-pointer select-none">
                我已仔细阅读并确认认可《都正街·个人须知》及对应板块下单规则
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded transition-colors"
            >
              取消返回
            </button>
            <button
              disabled={!agreedToRules}
              onClick={handleCopyOrder}
              className={`px-5 py-2.5 rounded text-xs font-gothic font-semibold flex items-center gap-1.5 transition-all ${
                agreedToRules
                  ? 'bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700/80 shadow-lg cursor-pointer'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>复制约单模板 (发送至微信)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
