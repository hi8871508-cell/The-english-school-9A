import React, { useState } from 'react';
import { Student } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Calendar, 
  ShieldAlert, 
  BookMarked,
  Shield,
  Award,
  CheckSquare,
  Square
} from 'lucide-react';

interface DutyTabProps {
  students: Student[];
  isOwnerUnlocked?: boolean;
  onUpdatePoints?: (id: number, delta: number) => void;
  onShowToast?: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export const DutyTab: React.FC<DutyTabProps> = ({ 
  students, 
  isOwnerUnlocked,
  onUpdatePoints,
  onShowToast 
}) => {
  const naturalToday = new Date().getDay();
  const defaultDay = naturalToday >= 1 && naturalToday <= 5 ? naturalToday : 1;
  const [selectedDayOverride, setSelectedDayOverride] = useState<number>(defaultDay);

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    prep: true,
    board: true,
    vent: false,
    sweep: false,
    lights: false,
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const dutyGroups = [
    { id: 1, name: '1-р баг (Lion House) - Даваа', dayIndex: 1, prefix: '1-р баг', house: 'Lion', dayLabel: 'Даваа' },
    { id: 2, name: '2-р баг (Eagle House) - Мягмар', dayIndex: 2, prefix: '2-р баг', house: 'Eagle', dayLabel: 'Мягмар' },
    { id: 3, name: '3-р баг (Falcon House) - Лхагва', dayIndex: 3, prefix: '3-р баг', house: 'Falcon', dayLabel: 'Лхагва' },
    { id: 4, name: '4-р баг (Windsor House) - Пүрэв', dayIndex: 4, prefix: '4-р баг', house: 'Windsor', dayLabel: 'Пүрэв' },
    { id: 5, name: '5-р баг (Prefects Squad) - Баасан', dayIndex: 5, prefix: '5-р баг', house: 'Prefects', dayLabel: 'Баасан' },
  ];

  const activeGroup = dutyGroups.find(g => g.dayIndex === selectedDayOverride) || dutyGroups[0];
  const activeMembers = students.filter(s => s.group.startsWith(activeGroup.prefix));

  const handleAwardBonusPoints = () => {
    if (!onUpdatePoints || activeMembers.length === 0) return;
    activeMembers.forEach(m => {
      onUpdatePoints(m.id, 10);
    });
    if (onShowToast) {
      onShowToast(`${activeGroup.name} бүх сурагчдад амжилттай +10 House Points олголоо!`, 'success');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner with Clear Visible Borders */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The English School of Ulaanbaatar 9A · Daily Duty Roster</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              🧹 Ангийн Жижүүрийн Хуваарь ба House Үүрэг
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Өдөр тутмын цэвэр цэмцгэр, аюулгүй сургалтын орчинг бүрдүүлэх жижүүрийн 5 баг бүрэлдэхүүн.
            </p>
          </div>

          {/* Owner Privilege: Quick Points Award Button */}
          {isOwnerUnlocked && (
            <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center">
                👑 Super Admin горим
              </span>
              <button
                onClick={handleAwardBonusPoints}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md border border-amber-400 active:scale-95 transition"
              >
                <Award className="w-4 h-4" />
                <span>Өнөөдрийн жижүүрт +10 House Points өгөх</span>
              </button>
            </div>
          )}
        </div>

        {/* Day Selector with Visible Line Buttons */}
        <div className="mt-4 pt-4 border-t-2 border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Гараг сонгож харах:</span>
          {dutyGroups.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedDayOverride(g.dayIndex)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition ${
                selectedDayOverride === g.dayIndex
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              {g.dayLabel} ({g.house})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Dynamic Duty Groups List */}
        <div className="lg:col-span-2 space-y-4">
          {dutyGroups.map((group) => {
            const isSelected = group.dayIndex === selectedDayOverride;
            const groupMembers = students.filter(s => s.group.startsWith(group.prefix));

            return (
              <div
                key={group.id}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shrink-0 border-2 ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }`}>
                      {group.id}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-black text-base text-slate-900 dark:text-white">
                          {group.name}
                        </h4>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 border border-amber-400">
                            Идэвхтэй ээлж!
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {groupMembers.length} сурагч энэ багт томилогдсон байна
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 rounded-xl self-start sm:self-center">
                    {group.house} House
                  </span>
                </div>

                {/* Member chips with visible borders */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Бүрэлдэхүүн сурагчид:
                  </div>
                  {groupMembers.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Энэ багт сурагч хараахан сонгогдоогүй байна.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {groupMembers.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700/80 border-2 border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-900 dark:text-slate-100 shadow-xs"
                        >
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          <span>{m.name}</span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-black">
                            ({m.points || 0} pts)
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Duty Responsibilities Checklist & Rules */}
        <div className="space-y-6">
          <div className="bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-black text-amber-900 dark:text-amber-200 flex items-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mr-2" />
              Жижүүрийн Шалгах Хуудас (Checklist)
            </h3>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mb-3">
              Үүргийг гүйцэтгэсэн тухай бүрт дээр нь дарж тэмдэглэнэ үү:
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => toggleCheck('prep')}
                className="w-full flex items-center space-x-2 text-left p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {checklist.prep ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className={checklist.prep ? 'line-through text-slate-400' : ''}>Хичээл эхлэхээс 15 мин өмнө ангидаа ирэх</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('board')}
                className="w-full flex items-center space-x-2 text-left p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {checklist.board ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className={checklist.board ? 'line-through text-slate-400' : ''}>Ухаалаг самбар арчих, маркер бэлтгэх</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('vent')}
                className="w-full flex items-center space-x-2 text-left p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {checklist.vent ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className={checklist.vent ? 'line-through text-slate-400' : ''}>Завсарлагаанаар цонх онгойлгож агааржуулах</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('sweep')}
                className="w-full flex items-center space-x-2 text-left p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {checklist.sweep ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className={checklist.sweep ? 'line-through text-slate-400' : ''}>Ширээ тэгшлэх, шал шүүрдэх, хог гаргах</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('lights')}
                className="w-full flex items-center space-x-2 text-left p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {checklist.lights ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className={checklist.lights ? 'line-through text-slate-400' : ''}>Гэрэл унтраах, хаалга түгжих</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center mb-3">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              ESU Code of Conduct (Ангийн Дүрэм)
            </h3>
            <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed font-medium">
              <li>Always show respect to peers, teachers, and school property</li>
              <li>Punctuality: Arrive on time for every period and tutor time</li>
              <li>Mobile phones placed in the phone caddy before registration</li>
              <li>Maintain high academic integrity in prep and homework</li>
              <li>Embrace diversity, teamwork, and House spirit</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};
