import React, { useState } from 'react';
import { Radio, Edit3, Sparkles, Volume2, Check, X } from 'lucide-react';

interface LiveTickerProps {
  text: string;
  enabled?: boolean;
  isOwnerUnlocked?: boolean;
  onUpdateText: (newText: string) => void;
  onOpenOwnerPanel?: () => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  text,
  enabled = true,
  isOwnerUnlocked = false,
  onUpdateText,
  onOpenOwnerPanel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(text);

  if (!enabled && !isOwnerUnlocked) {
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftText.trim()) {
      onUpdateText(draftText.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-b-2 border-slate-700/80 shadow-md select-none overflow-hidden z-30">
      <div className="max-w-7xl mx-auto flex items-center h-10 px-3 sm:px-6 lg:px-8">
        
        {/* LIVE BADGE WITH PULSING INDICATOR */}
        <div className="flex items-center space-x-2 shrink-0 pr-3 z-10 border-r border-white/20 bg-gradient-to-r from-slate-950 to-transparent">
          <img 
            src="/esu_school_crest.jpg" 
            alt="ESU 9A" 
            className="w-5 h-5 rounded-md object-contain bg-white border border-amber-400 p-0.5 shadow-xs" 
          />
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-rose-500 relative" />
          </div>
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-rose-600/90 text-white font-black text-[10px] tracking-widest uppercase shadow-sm">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-black text-amber-300 tracking-wider">
            9A
          </span>
        </div>

        {/* MARQUEE TEXT CONTENT */}
        <div className="flex-1 overflow-hidden relative mx-3 py-1 cursor-pointer group" title="Хулганаа дээгүүр нь гүйлгэж гүйлтийг түр зогсоож уншина уу">
          <div className="animate-ticker text-xs font-semibold tracking-wide text-slate-100 flex items-center">
            {/* First sequence */}
            <span className="inline-flex items-center space-x-6 mr-12">
              <span>{text}</span>
              <span className="text-amber-400 font-bold">✦</span>
              <span className="text-blue-300 font-medium">The English School of Ulaanbaatar</span>
              <span className="text-amber-400 font-bold">✦</span>
            </span>
            {/* Duplicated for seamless 100% infinite loop */}
            <span className="inline-flex items-center space-x-6 mr-12" aria-hidden="true">
              <span>{text}</span>
              <span className="text-amber-400 font-bold">✦</span>
              <span className="text-blue-300 font-medium">The English School of Ulaanbaatar</span>
              <span className="text-amber-400 font-bold">✦</span>
            </span>
          </div>
        </div>

        {/* OWNER EDIT BUTTON */}
        {isOwnerUnlocked && (
          <div className="shrink-0 flex items-center space-x-1 pl-2 border-l border-white/20 z-10 bg-slate-950/80">
            <button
              onClick={() => {
                setDraftText(text);
                setIsEditing(true);
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] shadow-sm transition active:scale-95"
              title="Шуурхай LIVE бичвэрийг засах"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">LIVE Засах</span>
            </button>
          </div>
        )}
      </div>

      {/* QUICK IN-PLACE EDIT MODAL FOR OWNER */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  👑 LIVE Гүйх Мэдээний Текст Засах
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Дэлгэцийн дээд талд гүйх шуурхай зар / мэдээ:
                </label>
                <textarea
                  rows={3}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Жишээ: 📢 Анхаар: Маргааш Cambridge Checkpoint давтлага 15:30 цагт B-204 өрөөнд болно..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500">Бэлэн загварууд (товшиж оруулах):</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDraftText('📢 Шуурхай зар: Маргааш Cambridge шалгалтын давтлага 15:30 цагт B-204 өрөөнд хичээллэнэ. Бүх сурагчид цагтаа ирнэ үү!')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/60 font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                  >
                    📝 Шалгалтын давтлага
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraftText('🏆 ESU Inter-House тэмцээн энэ Баасан гарагт 14:00 цагт болно. Lion, Eagle, Falcon, Windsor багууддаа амжилт хүсье!')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/60 font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                  >
                    🏆 House Тэмцээн
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraftText('🧹 Ангийн жижүүрийн баг хичээл эхлэхээс 15 минутын өмнө 08:15 цагт ангидаа бэлэн байх шаардлагатай!')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/60 font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                  >
                    🧹 Жижүүрийн сануулга
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t-2 border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  Болих
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl shadow-md border border-amber-400 flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Шинэчлэх & Хадгалах</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
