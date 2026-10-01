import React from 'react';
import { 
  Student, 
  Teacher, 
  Announcement, 
  Homework, 
  TimetableLesson, 
  DayOfWeek,
  ExamItem
} from '../types';
import { 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Users, 
  Bell, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Phone,
  Award,
  Shield,
  Trophy,
  Check
} from 'lucide-react';

interface DashboardTabProps {
  students: Student[];
  teachers: Teacher[];
  announcements: Announcement[];
  homeworks: Homework[];
  schedule: Record<DayOfWeek, TimetableLesson[]>;
  exams?: ExamItem[];
  onToggleHomework: (id: number) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  students,
  teachers,
  announcements,
  homeworks,
  schedule,
  exams = [],
  onToggleHomework,
  onNavigateTab,
}) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('mn-MN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  });

  const dayOfWeekMap: Record<number, DayOfWeek> = {
    1: 'Даваа',
    2: 'Мягмар',
    3: 'Лхагва',
    4: 'Пүрэв',
    5: 'Баасан',
  };
  const currentDayOfWeek: DayOfWeek = dayOfWeekMap[today.getDay()] || 'Даваа';
  const dutyGroupMap: Record<DayOfWeek, string> = {
    'Даваа': '1-р баг (Lion)',
    'Мягмар': '2-р баг (Eagle)',
    'Лхагва': '3-р баг (Falcon)',
    'Пүрэв': '4-р баг (Windsor)',
    'Баасан': '5-р баг (Oxford)',
  };
  const todayDutyGroup = dutyGroupMap[currentDayOfWeek] || '1-р баг (Lion)';

  const pendingHomework = homeworks.filter(h => !h.completed);
  const totalHomework = homeworks.length;
  const completedHomeworkCount = totalHomework - pendingHomework.length;
  const progressPercent = totalHomework > 0 ? Math.round((completedHomeworkCount / totalHomework) * 100) : 0;

  const todayLessons = schedule[currentDayOfWeek] || schedule['Даваа'] || [];

  // Key leaders
  const headBoy = students.find(s => s.role.toLowerCase().includes('head boy') || s.role.toLowerCase().includes('ангийн дарга')) || students[0];
  const headGirl = students.find(s => s.role.toLowerCase().includes('head girl') || s.role.toLowerCase().includes('охид')) || students.find(s => s.gender === 'Эм');
  const formTutor = teachers.find(t => t.subject.toLowerCase().includes('form tutor') || t.name.toLowerCase().includes('badam')) || teachers[1] || teachers[0];

  // House Points Calculation
  const housePoints = {
    Lion: students.filter(s => s.house === 'Lion').reduce((sum, s) => sum + (s.points || 0), 0),
    Eagle: students.filter(s => s.house === 'Eagle').reduce((sum, s) => sum + (s.points || 0), 0),
    Falcon: students.filter(s => s.house === 'Falcon').reduce((sum, s) => sum + (s.points || 0), 0),
    Windsor: students.filter(s => s.house === 'Windsor').reduce((sum, s) => sum + (s.points || 0), 0),
  };

  const houseList = [
    { name: 'Lion House', code: 'Lion', points: housePoints.Lion, color: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-300 dark:border-rose-900', badge: 'bg-rose-100 dark:bg-rose-950/50' },
    { name: 'Eagle House', code: 'Eagle', points: housePoints.Eagle, color: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-300 dark:border-blue-900', badge: 'bg-blue-100 dark:bg-blue-950/50' },
    { name: 'Windsor House', code: 'Windsor', points: housePoints.Windsor, color: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-300 dark:border-amber-900', badge: 'bg-amber-100 dark:bg-amber-950/50' },
    { name: 'Falcon House', code: 'Falcon', points: housePoints.Falcon, color: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-300 dark:border-emerald-900', badge: 'bg-emerald-100 dark:bg-emerald-950/50' },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Hero Announcement Banner with ESU Crest & Royal British Aesthetics */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-2xl border-2 border-blue-900/60">
        <div className="absolute -right-8 -bottom-12 opacity-15 pointer-events-none select-none text-amber-400">
          <Trophy className="w-80 h-80" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border-2 border-amber-400/40 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-3 text-amber-300">
              <Shield className="w-3.5 h-3.5" />
              <span>The English School of Ulaanbaatar 9A · Cambridge International</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              The English School of Ulaanbaatar 9A 🎓
            </h2>
            <p className="mt-2 text-blue-100/90 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
              Cambridge International хөтөлбөрийн 9А ангийн цагийн хуваарь, House оноо, гэрийн даалгавар болон албан заруудын нэгдсэн цахим систем.
            </p>
          </div>

          {/* Official ESU Crest Badge */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1.5 bg-white shadow-2xl border-4 border-amber-400 flex items-center justify-center transform hover:scale-105 transition-transform">
              <img 
                src="/esu_school_crest.jpg" 
                alt="The English School of Ulaanbaatar Official Crest"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Quick Stats Bar with Visible Borders */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-white/20">
            <div>
              <span className="text-[11px] text-blue-300 font-semibold block">Өнөөдөр</span>
              <span className="font-black text-xs sm:text-sm text-white">{dateStr}</span>
            </div>
            <div>
              <span className="text-[11px] text-blue-300 font-semibold block">Жижүүр баг</span>
              <span className="font-black text-xs sm:text-sm text-amber-300">
                {todayDutyGroup}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-blue-300 font-semibold block">Дутуу даалгавар</span>
              <span className="font-black text-xs sm:text-sm text-emerald-300">
                {pendingHomework.length} даалгавар
              </span>
            </div>
            <div>
              <span className="text-[11px] text-blue-300 font-semibold block">ESU 9A Бүрэлдэхүүн</span>
              <span className="font-black text-xs sm:text-sm text-white">
                {students.length} сурагч · {teachers.length} багш
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* House Points Leaderboard Bar with Visible Borders */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
              ESU Inter-House Points Cup (Онооны Цом)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Онооны эрэмбэ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {houseList.map((h, i) => (
            <div 
              key={h.code} 
              className={`p-3.5 rounded-2xl border-2 ${h.border} bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between shadow-2xs`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-3.5 h-3.5 rounded-full ${h.color} border border-black/10`} />
                <div>
                  <span className="font-black text-xs text-slate-900 dark:text-white block">{h.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold">#{i + 1} байр</span>
                </div>
              </div>
              <span className="font-black text-base text-slate-900 dark:text-white font-mono">
                {h.points} <span className="text-[10px] font-normal text-slate-400">pts</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Announcements Preview + Homework Checklist */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Urgent Announcements with Visible Borders */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="text-base sm:text-lg font-black flex items-center text-slate-900 dark:text-white">
                <Bell className="w-5 h-5 text-amber-500 mr-2" /> 
                Чухал заруудын хураангуй (Notices)
              </h3>
              <button 
                onClick={() => onNavigateTab('announcements')} 
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Бүгдийг харах</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {announcements.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Одоогоор шинэ зар байхгүй байна.</p>
              ) : (
                announcements.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border-2 border-slate-200 dark:border-slate-700 flex items-start space-x-3.5 hover:border-blue-400 dark:hover:border-slate-600 transition"
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      item.priority === 'Чухал'
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-300'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300'
                    }`}>
                      {item.priority === 'Чухал' ? <Flame className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 whitespace-nowrap border border-slate-300">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed font-medium">
                        {item.content}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500 font-semibold">
                        <span>{item.author}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Homework Quick Checklist with Visible Borders */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3 border-b-2 border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2" /> 
                  Ойрын даалгаврууд (Prep & Homework)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Хийсэн даалгавраа чеклж биелэлтээ хянаарай</p>
              </div>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 text-xs font-black px-3 py-1 rounded-full border border-blue-300">
                {progressPercent}% гүйцэтгэсэн
              </span>
            </div>

            {/* Progress bar line */}
            <div className="w-full bg-slate-100 dark:bg-slate-700/80 h-3.5 rounded-full mb-4 overflow-hidden border-2 border-slate-300 dark:border-slate-600 p-0.5">
              <div 
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2">
              {homeworks.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">Гэрийн даалгавар оруулаагүй байна.</p>
              ) : (
                homeworks.slice(0, 4).map((hw) => (
                  <div
                    key={hw.id}
                    onClick={() => onToggleHomework(hw.id)}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      hw.completed 
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 opacity-70' 
                        : 'bg-slate-50 dark:bg-slate-700/40 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <input 
                        type="checkbox" 
                        checked={hw.completed} 
                        onChange={() => {}} 
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <span className={`font-black text-xs block truncate ${hw.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {hw.subject}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-medium">
                          {hw.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap ml-3">
                      {hw.dueDate}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 flex justify-end">
              <button 
                onClick={() => onNavigateTab('assignments')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Бүх даалгавар үзэх</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Today's Schedule & ESU Leadership */}
        <div className="space-y-6">
          
          {/* Today's Schedule Card with Visible Borders */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center">
                <Clock className="w-5 h-5 text-indigo-600 mr-2" /> 
                Өнөөдрийн Хичээл (Timetable)
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200">
                {currentDayOfWeek}
              </span>
            </div>

            <div className="space-y-2">
              {todayLessons.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">Өнөөдөр хичээлгүй байна.</p>
              ) : (
                todayLessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border-2 border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center shrink-0">
                        {lesson.period}
                      </span>
                      <div className="truncate">
                        <p className="font-black text-slate-900 dark:text-white truncate">{lesson.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium truncate">{lesson.teacher} · {lesson.room}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 shrink-0 ml-2">
                      {lesson.time}
                    </span>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => onNavigateTab('teachers')}
              className="w-full mt-3 py-2 text-xs font-bold text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-xl transition border border-transparent hover:border-blue-300"
            >
              Бүтэн цагийн хуваарь харах &rarr;
            </button>
          </div>

          {/* Key Class Leaders Card with Visible Borders */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border-2 border-slate-300 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center border-b-2 border-slate-200 dark:border-slate-700 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" /> 
              ESU 9A Удирдах Баг & Form Tutor
            </h3>
            
            <div className="space-y-3">
              {formTutor && (
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-indigo-50/50 dark:bg-slate-700/40 border-2 border-indigo-200 dark:border-slate-600">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    Tutor
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{formTutor.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Form Tutor 9A ({formTutor.subject})</p>
                  </div>
                  <a 
                    href={`tel:${formTutor.phone}`} 
                    className="p-2 text-slate-500 hover:text-blue-600 transition"
                    title={formTutor.phone}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              )}

              {headBoy && (
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-blue-50/50 dark:bg-slate-700/40 border-2 border-blue-200 dark:border-slate-600">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    HB
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{headBoy.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Head Boy ({headBoy.house} House)</p>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2.5 py-0.5 rounded-full font-black border border-blue-300">
                    Head Boy
                  </span>
                </div>
              )}

              {headGirl && (
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-rose-50/50 dark:bg-slate-700/40 border-2 border-rose-200 dark:border-slate-600">
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    HG
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{headGirl.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Head Girl ({headGirl.house} House)</p>
                  </div>
                  <span className="text-[10px] bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 px-2.5 py-0.5 rounded-full font-black border border-rose-300">
                    Head Girl
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigateTab('roles')}
              className="w-full mt-3 py-2 text-xs font-bold text-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition border border-transparent hover:border-slate-300"
            >
              Сурагчид & House багуудыг үзэх &rarr;
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
