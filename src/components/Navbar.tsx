import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Megaphone, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Sparkles, 
  FolderOpen, 
  Crown, 
  Moon, 
  Sun, 
  Plus, 
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onQuickAdd: () => void;
  isOwnerUnlocked: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onQuickAdd,
  isOwnerUnlocked
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; shortLabel: string; icon: React.ReactNode; isOwner?: boolean }[] = [
    { id: 'dashboard', label: 'Нүүр (Home)', shortLabel: 'Нүүр', icon: <Home className="w-4 h-4" /> },
    { id: 'announcements', label: 'Зарууд (Notices)', shortLabel: 'Зарууд', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'assignments', label: 'Даалгавар (Prep)', shortLabel: 'Даалгавар', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'roles', label: 'Сурагчид & House', shortLabel: 'Сурагчид', icon: <Users className="w-4 h-4" /> },
    { id: 'teachers', label: 'Хуваарь & Багш', shortLabel: 'Хуваарь', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'duty', label: 'Жижүүр (Duty)', shortLabel: 'Жижүүр', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'resources', label: 'Номын сан', shortLabel: 'Номын сан', icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'owner', label: isOwnerUnlocked ? '👑 Админ Төв' : '👑 Owner Panel', shortLabel: 'Owner', icon: <Crown className="w-4 h-4" />, isOwner: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass border-b-2 border-slate-300 dark:border-slate-700 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-17">
            
            {/* Logo & School Name: The English School of Ulaanbaatar 9A */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-3 cursor-pointer select-none group shrink-0"
            >
              {/* ESU Official Crest Logo */}
              <div className="relative w-12 h-12 rounded-2xl p-0.5 shadow-md shadow-amber-500/15 group-hover:scale-105 transition-transform shrink-0 border-2 border-amber-400 bg-white overflow-hidden flex items-center justify-center">
                <img 
                  src="/esu_school_crest.jpg" 
                  alt="The English School of Ulaanbaatar 9A Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <h1 className="font-black text-sm sm:text-base leading-tight tracking-tight text-slate-900 dark:text-white truncate">
                    The English School of Ulaanbaatar 9A
                  </h1>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-black bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 rounded border border-amber-400">
                    Year 9A
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
                  Cambridge International · 2026-2027
                </p>
              </div>
            </div>

            {/* Desktop Navigation with Visible Indicator Lines and Borders */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                if (item.isOwner) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/25 ring-2 ring-amber-300/50'
                          : isOwnerUnlocked
                          ? 'bg-amber-50 text-amber-800 border-amber-400 dark:bg-amber-950/50 dark:text-amber-300 hover:bg-amber-100'
                          : 'text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800/80 hover:bg-amber-50 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      {item.icon}
                      <span>{item.shortLabel}</span>
                      {isOwnerUnlocked && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Owner горим нээлттэй" />
                      )}
                      {isActive && (
                        <span className="absolute -bottom-2.5 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/25'
                        : 'text-slate-700 dark:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/90 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {item.icon}
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="inline xl:hidden">{item.shortLabel}</span>
                    {isActive && (
                      <span className="absolute -bottom-2.5 left-2 right-2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Theme + Quick Add + 3-Line Menu (☰ Зураас) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors"
                title="Theme Toggle"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={onQuickAdd}
                className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all border border-blue-400"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Шинээр нэмэх</span>
              </button>

              {/* 3-LINE (☰ ЗУРААС) MENU BUTTON: Visible on all screens, distinctly showing the 3 lines */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-black transition-all border-2 shadow-sm ${
                  mobileMenuOpen
                    ? 'bg-blue-600 text-white border-blue-700 shadow-blue-500/20 ring-2 ring-blue-400/40'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600'
                }`}
                title="Үндсэн цэс (3 зураас)"
                aria-label="Цэс нээх"
              >
                {/* 3 Bold Horizontal Lines (☰ Зураас) */}
                <div className="flex flex-col justify-center items-center w-4 h-3.5 space-y-1 shrink-0">
                  <span className={`block w-4 h-0.5 rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-white' : 'bg-slate-800 dark:bg-white'}`} />
                  <span className={`block w-4 h-0.5 rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : 'bg-slate-800 dark:bg-white'}`} />
                  <span className={`block w-4 h-0.5 rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-white' : 'bg-slate-800 dark:bg-white'}`} />
                </div>
                <span className="font-extrabold tracking-wide">
                  {mobileMenuOpen ? 'Хаах' : 'Цэс'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Slide-Down Menu Overlay */}
        {mobileMenuOpen && (
          <div className="border-t-2 border-slate-300 dark:border-slate-700 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 shadow-2xl">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/60 rounded-2xl border-2 border-blue-200 dark:border-slate-700">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-amber-400 p-0.5 shadow overflow-hidden flex items-center justify-center shrink-0">
                    <img 
                      src="/esu_school_crest.jpg" 
                      alt="ESU 9A Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-xs sm:text-sm text-blue-950 dark:text-blue-100">
                      The English School of Ulaanbaatar 9A
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Бүх цэс болон тохиргооны хуудас руу шууд шилжих
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of All Nav Tabs with Clear Borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all border-2 text-left ${
                        isActive
                          ? item.isOwner
                            ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300/40'
                            : 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300/40'
                          : item.isOwner
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-extrabold">{item.label}</div>
                        </div>
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions Footer inside the menu */}
              <div className="pt-2 border-t-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onQuickAdd();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl text-xs font-bold shadow border border-blue-400 flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Шинээр өгөгдөл нэмэх (Сурагч, Багш, Зар, Даалгавар)</span>
                </button>

                {isOwnerUnlocked && (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Owner Super Admin эрх идэвхтэй байна</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
