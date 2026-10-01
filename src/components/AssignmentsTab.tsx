import React, { useState } from 'react';
import { Homework } from '../types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Circle,
  Check,
  AlertCircle,
  Edit3
} from 'lucide-react';

interface AssignmentsTabProps {
  homeworks: Homework[];
  onAddHomework: () => void;
  onToggleHomework: (id: number) => void;
  onDeleteHomework: (id: number) => void;
  onEditHomework?: (hw: Homework) => void;
  isOwnerUnlocked?: boolean;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
  homeworks,
  onAddHomework,
  onToggleHomework,
  onDeleteHomework,
  onEditHomework,
  isOwnerUnlocked,
}) => {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const subjects = Array.from(new Set(homeworks.map(h => h.subject)));

  const filtered = homeworks.filter(hw => {
    const matchSubject = filterSubject === 'all' || hw.subject === filterSubject;
    const matchStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'pending' && !hw.completed) ||
      (filterStatus === 'completed' && hw.completed);
    return matchSubject && matchStatus;
  });

  const completedCount = homeworks.filter(h => h.completed).length;
  const progressPercent = homeworks.length > 0 ? Math.round((completedCount / homeworks.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner with High-Contrast Visible Borders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-emerald-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The English School of Ulaanbaatar 9A · {homeworks.length} даалгавар · {progressPercent}% хийсэн</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            📚 Cambridge Гэрийн Даалгаврын Төлөвлөгч
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Хичээл тус бүрийн бодлого, дасгал, хугацааг тэмдэглэж биелэлтээ хянана уу.
          </p>
        </div>

        <button
          onClick={onAddHomework}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all self-start sm:self-center shrink-0 border border-emerald-400"
        >
          <Plus className="w-4 h-4" />
          <span>+ Шинэ даалгавар нэмэх</span>
        </button>
      </div>

      {/* Progress & Filters with Visible Borders */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
              }`}
            >
              Бүгд ({homeworks.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition ${
                filterStatus === 'pending'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
              }`}
            >
              Дутуу ({homeworks.length - completedCount})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition ${
                filterStatus === 'completed'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
              }`}
            >
              Хийсэн ({completedCount})
            </button>
          </div>

          {subjects.length > 0 && (
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-bold"
            >
              <option value="all">Бүх хичээл</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
        </div>

        {/* Progress Bar Line */}
        <div className="pt-1">
          <div className="w-full bg-slate-100 dark:bg-slate-700/80 h-3 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-600 p-0.5">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Homework Grid with Clearly Defined Visible Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-300 dark:border-slate-700">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Гэрийн даалгавар олдсонгүй.</p>
          </div>
        ) : (
          filtered.map((hw) => (
            <div
              key={hw.id}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                hw.completed
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200">
                    {hw.subject}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{hw.dueDate}</span>
                  </span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                  hw.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {hw.description}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => onToggleHomework(hw.id)}
                  className={`flex items-center space-x-2 text-xs font-black py-1.5 px-3 rounded-xl border-2 transition ${
                    hw.completed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-400'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {hw.completed ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                  <span>{hw.completed ? 'Хийгдсэн' : 'Хийгээгүй'}</span>
                </button>

                <div className="flex items-center space-x-1">
                  {onEditHomework && (
                    <button
                      onClick={() => onEditHomework(hw)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                      title="Засах"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteHomework(hw.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                    title="Даалгавар устгах"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
