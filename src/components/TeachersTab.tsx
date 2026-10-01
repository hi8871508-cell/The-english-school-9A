import React, { useState } from 'react';
import { Teacher, TimetableLesson, DayOfWeek } from '../types';
import { 
  GraduationCap, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  Plus, 
  Search,
  BookOpen,
  Crown
} from 'lucide-react';

interface TeachersTabProps {
  teachers: Teacher[];
  schedule: Record<DayOfWeek, TimetableLesson[]>;
  onAddTeacher: () => void;
  onEditTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: number) => void;
  onAddLessonPeriod?: (day: DayOfWeek, lesson: Omit<TimetableLesson, 'id'>) => void;
  onDeleteLessonPeriod?: (day: DayOfWeek, id: number) => void;
  isOwnerUnlocked?: boolean;
}

export const TeachersTab: React.FC<TeachersTabProps> = ({
  teachers,
  schedule,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
  onAddLessonPeriod,
  onDeleteLessonPeriod,
  isOwnerUnlocked,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Даваа');
  const [teacherSearch, setTeacherSearch] = useState('');

  // Quick Add Lesson Form (For Owner)
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [periodNum, setPeriodNum] = useState(1);
  const [periodName, setPeriodName] = useState('');
  const [periodTeacher, setPeriodTeacher] = useState('');
  const [periodRoom, setPeriodRoom] = useState('Room B-204');
  const [periodTime, setPeriodTime] = useState('08:30 - 09:20');

  const days: DayOfWeek[] = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];
  const dayLessons = schedule[selectedDay] || [];

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    t.subject.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    t.room.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    t.phone.includes(teacherSearch)
  );

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodName.trim() || !onAddLessonPeriod) return;
    onAddLessonPeriod(selectedDay, {
      period: Number(periodNum) || 1,
      name: periodName.trim(),
      teacher: periodTeacher.trim() || 'Faculty',
      room: periodRoom.trim() || 'B-204',
      time: periodTime.trim() || '08:30 - 09:20',
    });
    setPeriodName('');
    setPeriodTeacher('');
    setShowAddLessonForm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner with Clear Visible Borders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-indigo-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>The English School of Ulaanbaatar 9A · Faculty & Timetable</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            👨‍🏫 Cambridge Хичээлийн Хуваарь & Багш Нарын Лавлах
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Year 9A 5 өдрийн цагийн хуваарь, заадаг багш нарын холбоо барих мэдээлэл.
          </p>
        </div>

        <button
          onClick={onAddTeacher}
          className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 active:scale-95 text-white font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all self-start sm:self-center shrink-0 border border-indigo-400"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Шинэ багш нэмэх</span>
        </button>
      </div>

      {/* Timetable Section with Full Grid Lines (Тод хүснэгтийн зураасууд) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
              ESU Year 9A Цагийн Хуваарь ({selectedDay} гараг)
            </h3>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <div className="flex items-center space-x-1 border-2 border-slate-300 dark:border-slate-700 p-0.5 rounded-2xl bg-slate-50 dark:bg-slate-900">
              {days.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedDay === d
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Owner Add Lesson Button */}
            {isOwnerUnlocked && onAddLessonPeriod && (
              <button
                onClick={() => setShowAddLessonForm(p => !p)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-xs border border-amber-600 flex items-center space-x-1 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ {selectedDay}-д цаг нэмэх</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Add Lesson Period Form (When toggled by Owner) */}
        {showAddLessonForm && (
          <form onSubmit={handleLessonSubmit} className="p-4 bg-amber-50/70 dark:bg-slate-900 rounded-2xl border-2 border-amber-300 dark:border-amber-700 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 dark:text-amber-300">
                👑 {selectedDay} гарагт шинэ хичээлийн цаг оруулах:
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddLessonForm(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Хаах
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Цагийн дугаар</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={periodNum}
                  onChange={(e) => setPeriodNum(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Хичээлийн нэр *</label>
                <input
                  type="text"
                  required
                  placeholder="Жишээ: Chemistry Lab"
                  value={periodName}
                  onChange={(e) => setPeriodName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Багш</label>
                <input
                  type="text"
                  placeholder="Багшийн нэр"
                  value={periodTeacher}
                  onChange={(e) => setPeriodTeacher(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Өрөө</label>
                <input
                  type="text"
                  placeholder="B-204"
                  value={periodRoom}
                  onChange={(e) => setPeriodRoom(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs"
              >
                Хадгалах
              </button>
            </div>
          </form>
        )}

        {/* Timetable Table with Clearly Defined Grid Lines (Бүх хүснэгтийн нүд зураастай) */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 dark:border-slate-700">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700/80 border-b-2 border-slate-300 dark:border-slate-600 text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-200 font-black">
                <th className="py-3 px-4 border-r-2 border-slate-300 dark:border-slate-600">Period</th>
                <th className="py-3 px-4 border-r-2 border-slate-300 dark:border-slate-600">Хичээлийн нэр (Subject)</th>
                <th className="py-3 px-4 border-r-2 border-slate-300 dark:border-slate-600">Заах багш (Faculty)</th>
                <th className="py-3 px-4 border-r-2 border-slate-300 dark:border-slate-600">Кабинет (Room)</th>
                <th className="py-3 px-4 border-r-2 border-slate-300 dark:border-slate-600">Хугацаа (Time)</th>
                {onDeleteLessonPeriod && <th className="py-3 px-4 text-right">Үйлдэл</th>}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
              {dayLessons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs font-medium">
                    Энэ өдөр хичээл хуваарилагдаагүй байна.
                  </td>
                </tr>
              ) : (
                dayLessons.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-4 font-black text-indigo-700 dark:text-indigo-400 border-r-2 border-slate-200 dark:border-slate-700">
                      Period {l.period}
                    </td>
                    <td className="py-3 px-4 font-extrabold text-slate-900 dark:text-white border-r-2 border-slate-200 dark:border-slate-700">
                      {l.name}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 border-r-2 border-slate-200 dark:border-slate-700 font-medium">
                      {l.teacher}
                    </td>
                    <td className="py-3 px-4 border-r-2 border-slate-200 dark:border-slate-700">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-600">
                        {l.room}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono font-bold text-xs border-r-2 border-slate-200 dark:border-slate-700">
                      {l.time}
                    </td>
                    {onDeleteLessonPeriod && (
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onDeleteLessonPeriod(selectedDay, l.id)}
                          className="text-slate-500 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-700"
                          title="Хуваариас хасах"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teachers Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              ESU Faculty & Багш Нарын Лавлах ({filteredTeachers.length})
            </h3>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
              placeholder="Багш, хичээл, өрөөгөөр хайх..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeachers.map((t) => (
            <div 
              key={t.id}
              className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-xs border-2 border-slate-300 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 to-blue-800 text-white font-black text-sm flex items-center justify-center shadow-md border-2 border-amber-300">
                      {t.name.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {t.name}
                      </h4>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {t.subject}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditTeacher(t)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                      title="Багшийн мэдээлэл засах"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTeacher(t.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                      title="Багш хасах"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1 font-medium">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{t.room}</span>
                  </div>
                  {t.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{t.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono font-black text-slate-800 dark:text-slate-200">
                  {t.phone}
                </span>
                <a
                  href={`tel:${t.phone}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl text-xs border border-indigo-200 dark:border-indigo-800 transition"
                >
                  <Phone className="w-3 h-3" />
                  <span>Холбогдох</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
