import React, { useState, useRef } from 'react';
import { Student, Teacher, Announcement, Homework, TimetableLesson, DayOfWeek } from '../types';
import { 
  Crown, 
  Lock, 
  KeyRound, 
  UserPlus, 
  GraduationCap, 
  Trash2, 
  Edit3, 
  Sliders, 
  RotateCcw, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Download,
  Upload,
  AlertTriangle,
  Users,
  Award,
  Calendar,
  Megaphone,
  BookOpen,
  Sparkles,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Radio
} from 'lucide-react';

interface OwnerPanelTabProps {
  isUnlocked: boolean;
  onUnlock: (pin: string) => boolean;
  onLock: () => void;
  onChangePin: (oldPin: string, newPin: string) => { success: boolean; message: string };
  students: Student[];
  teachers: Teacher[];
  announcements: Announcement[];
  homeworks: Homework[];
  schedule: Record<DayOfWeek, TimetableLesson[]>;
  classroomCode?: string;
  onChangeClassroomCode?: (code: string) => void;
  liveTickerText?: string;
  onUpdateLiveTicker?: (text: string) => void;
  liveTickerEnabled?: boolean;
  onToggleLiveTicker?: () => void;
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onDeleteStudent: (id: number) => void;
  onEditStudent: (student: Student) => void;
  onUpdatePoints?: (id: number, delta: number) => void;
  onToggleAttendance?: (id: number, status: 'present' | 'late' | 'absent') => void;
  onMarkAllAttendance?: (status: 'present' | 'absent') => void;
  onAddTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  onDeleteTeacher: (id: number) => void;
  onEditTeacher: (teacher: Teacher) => void;
  onAddAnnouncement: (news: Omit<Announcement, 'id'>) => void;
  onEditAnnouncement?: (news: Announcement) => void;
  onDeleteAnnouncement: (id: number) => void;
  onAddHomework: (hw: Omit<Homework, 'id' | 'completed'>) => void;
  onEditHomework?: (hw: Homework) => void;
  onToggleHomework: (id: number) => void;
  onDeleteHomework: (id: number) => void;
  onAddLessonPeriod?: (day: DayOfWeek, lesson: Omit<TimetableLesson, 'id'>) => void;
  onEditLessonPeriod?: (day: DayOfWeek, lesson: TimetableLesson) => void;
  onDeleteLessonPeriod?: (day: DayOfWeek, id: number) => void;
  onClearAnnouncements: () => void;
  onClearHomeworks: () => void;
  onResetData: () => void;
  onImportData?: (jsonData: string) => boolean;
}

export const OwnerPanelTab: React.FC<OwnerPanelTabProps> = ({
  isUnlocked,
  onUnlock,
  onLock,
  onChangePin,
  students,
  teachers,
  announcements,
  homeworks,
  schedule,
  classroomCode = 'ESU-9A-CAMBRIDGE',
  onChangeClassroomCode,
  liveTickerText = '',
  onUpdateLiveTicker,
  liveTickerEnabled = true,
  onToggleLiveTicker,
  onAddStudent,
  onDeleteStudent,
  onEditStudent,
  onUpdatePoints,
  onToggleAttendance,
  onMarkAllAttendance,
  onAddTeacher,
  onDeleteTeacher,
  onEditTeacher,
  onAddAnnouncement,
  onEditAnnouncement,
  onDeleteAnnouncement,
  onAddHomework,
  onEditHomework,
  onToggleHomework,
  onDeleteHomework,
  onAddLessonPeriod,
  onEditLessonPeriod,
  onDeleteLessonPeriod,
  onClearAnnouncements,
  onClearHomeworks,
  onResetData,
  onImportData,
}) => {
  // Lock screen states
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Live Ticker edit state
  const [tickerDraft, setTickerDraft] = useState(liveTickerText);
  const [tickerSuccessMsg, setTickerSuccessMsg] = useState(false);

  // Sync tickerDraft when prop changes
  React.useEffect(() => {
    if (liveTickerText) {
      setTickerDraft(liveTickerText);
    }
  }, [liveTickerText]);

  // Change PIN modal state
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [changePinMsg, setChangePinMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Classroom Code edit state
  const [codeEdit, setCodeEdit] = useState(classroomCode);
  const [codeEditSaved, setCodeEditSaved] = useState(false);

  // Active sub-tab in owner panel
  type AdminSubTab = 'students' | 'teachers' | 'timetable' | 'announcements' | 'homeworks' | 'live_ticker' | 'system';
  const [adminTab, setAdminTab] = useState<AdminSubTab>('students');

  // Timetable sub-day
  const [scheduleDay, setScheduleDay] = useState<DayOfWeek>('Даваа');
  const days: DayOfWeek[] = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];

  // Timetable Add Period Form State
  const [newPeriodNum, setNewPeriodNum] = useState(1);
  const [newPeriodName, setNewPeriodName] = useState('');
  const [newPeriodTeacher, setNewPeriodTeacher] = useState('');
  const [newPeriodRoom, setNewPeriodRoom] = useState('B-204');
  const [newPeriodTime, setNewPeriodTime] = useState('08:30 - 09:20');

  // Student Quick Add Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'Эр' | 'Эм'>('Эр');
  const [newStudentHouse, setNewStudentHouse] = useState<'Lion' | 'Eagle' | 'Falcon' | 'Windsor'>('Lion');
  const [newStudentRole, setNewStudentRole] = useState('Student / Сурагч');
  const [newStudentPoints, setNewStudentPoints] = useState(30);
  const [newStudentPhone, setNewStudentPhone] = useState('');

  // Teacher Quick Add Form State
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newTeacherRoom, setNewTeacherRoom] = useState('B-204');
  const [newTeacherPhone, setNewTeacherPhone] = useState('+976 9911-0000');

  // Announcement Quick Add Form State
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Анги' | 'Сургууль' | 'Эцэг эх' | 'Арга хэмжээ' | 'House Events'>('Сургууль');
  const [newNoticePriority, setNewNoticePriority] = useState<'Энгийн' | 'Чухал'>('Энгийн');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Homework Quick Add Form State
  const [newHwSubject, setNewHwSubject] = useState('Mathematics (Cambridge)');
  const [newHwDueDate, setNewHwDueDate] = useState('');
  const [newHwDesc, setNewHwDesc] = useState('');
  const [newHwPriority, setNewHwPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('PIN кодоо оруулна уу');
      return;
    }
    const success = onUnlock(pinInput);
    if (!success) {
      setPinError('Нууц PIN код тохирохгүй байна. Дахин оролдоно уу.');
    } else {
      setPinError('');
      setPinInput('');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onChangePin(oldPin, newPin);
    if (res.success) {
      setChangePinMsg({ text: res.message, isError: false });
      setOldPin('');
      setNewPin('');
      setTimeout(() => {
        setShowChangePinModal(false);
        setChangePinMsg(null);
      }, 1500);
    } else {
      setChangePinMsg({ text: res.message, isError: true });
    }
  };

  const handleStudentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const groupName = `${newStudentHouse === 'Lion' ? '1' : newStudentHouse === 'Eagle' ? '2' : newStudentHouse === 'Falcon' ? '3' : '4'}-р баг (${newStudentHouse})`;
    onAddStudent({
      name: newStudentName.trim(),
      gender: newStudentGender,
      role: newStudentRole.trim() || 'Student / Сурагч',
      group: groupName,
      house: newStudentHouse,
      points: Number(newStudentPoints) || 0,
      phone: newStudentPhone.trim() || undefined,
      attendance: 'present',
    });
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentRole('Student / Сурагч');
    setNewStudentPoints(30);
  };

  const handleTeacherFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim() || !newTeacherSubject.trim()) return;
    onAddTeacher({
      name: newTeacherName.trim(),
      subject: newTeacherSubject.trim(),
      room: newTeacherRoom.trim() || 'Room B-204',
      phone: newTeacherPhone.trim() || '+976 9911-0000',
    });
    setNewTeacherName('');
    setNewTeacherSubject('');
    setNewTeacherRoom('B-204');
    setNewTeacherPhone('+976 9911-0000');
  };

  const handleAddPeriodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeriodName.trim() || !onAddLessonPeriod) return;
    onAddLessonPeriod(scheduleDay, {
      period: Number(newPeriodNum) || 1,
      name: newPeriodName.trim(),
      teacher: newPeriodTeacher.trim() || 'Faculty',
      room: newPeriodRoom.trim() || 'Room',
      time: newPeriodTime.trim() || '08:30 - 09:20',
    });
    setNewPeriodName('');
    setNewPeriodTeacher('');
  };

  const handleAddNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;
    onAddAnnouncement({
      title: newNoticeTitle.trim(),
      category: newNoticeCategory,
      priority: newNoticePriority,
      date: new Date().toISOString().split('T')[0],
      author: 'Owner / Admin',
      content: newNoticeContent.trim(),
    });
    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  const handleAddHwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwDesc.trim() || !newHwDueDate) return;
    onAddHomework({
      subject: newHwSubject,
      dueDate: newHwDueDate,
      description: newHwDesc.trim(),
      priority: newHwPriority,
    });
    setNewHwDesc('');
    setNewHwDueDate('');
  };

  const handleExportData = () => {
    const fullData = {
      school: 'The English School of Ulaanbaatar',
      class: 'Year 9A',
      classroomCode: codeEdit,
      students,
      teachers,
      announcements,
      homeworks,
      schedule,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ESU_9A_MasterBackup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImportData) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportData(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // LOCKED STATE: Clean, secure login without any leaked password hint!
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border-2 border-slate-300 dark:border-slate-700 text-center space-y-5">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-md border-2 border-amber-400">
            <img 
              src="/esu_school_crest.jpg" 
              alt="The English School of Ulaanbaatar Official Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
              The English School of Ulaanbaatar 9A
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              👑 Эзэмшигчийн Бүрэн Удирдах Панел
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Бүх сурагчид, багш нар, хуваарь, даалгавар, зарлал ба системийн тохиргоонд нэвтрэхийн тулд нууц PIN кодоо оруулна уу.
            </p>
          </div>

          <form onSubmit={handleUnlockSubmit} className="space-y-4 pt-2">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="Нууц PIN код оруулна уу"
                autoFocus
                className="w-full px-4 py-3 text-center tracking-widest text-base font-bold rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900 dark:text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs font-semibold text-rose-500 animate-in fade-in">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition-all text-sm flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Нэвтрэх (Unlock Everything)</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-400">
            ESU 9A Удирдлага болон зохицуулагч нэвтрэх эрхтэй.
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE: Full Super-Admin Management for EVERYTHING!
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Admin Master Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-500/40">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Owner Mode · Бүрэн Эрх Идэвхтэй</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            👑 ESU Year 9A Мастер Удирдах Төв
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1">
            Та эндээс сургуулийн хичээлийн хуваарь, сурагчид, багш нар, зарлал, даалгавар, оноо болон системийн бүх өгөгдлийг бүрэн хянаж өөрчлөх боломжтой.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setShowChangePinModal(true)}
            className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 transition flex items-center space-x-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>PIN код солих</span>
          </button>
          <button
            onClick={onLock}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition flex items-center space-x-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Түгжих (Гарах)</span>
          </button>
        </div>
      </div>

      {/* 6 Quick Stats Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">Сурагчид</span>
          <span className="text-xl font-black text-blue-600 dark:text-blue-400">{students.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">Faculty Багш нар</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{teachers.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">Хуваарийн Цагууд</span>
          <span className="text-xl font-black text-purple-600 dark:text-purple-400">
            {Object.values(schedule).reduce((acc, curr) => acc + curr.length, 0)}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">Зарууд</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400">{announcements.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">Prep Даалгавар</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{homeworks.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] text-slate-500 block font-bold">House Нийт Оноо</span>
          <span className="text-xl font-black text-rose-600 dark:text-rose-400">
            {students.reduce((acc, s) => acc + (s.points || 0), 0)}
          </span>
        </div>
      </div>

      {/* MASTER SUB-TABS NAVIGATION (EVERY SINGLE MODULE) */}
      <div className="flex items-center space-x-1.5 border-b-2 border-slate-300 dark:border-slate-700 pb-3 overflow-x-auto">
        <button
          onClick={() => setAdminTab('students')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'students'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Сурагчид & Ирц ({students.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('teachers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'teachers'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Faculty Багш нар ({teachers.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('timetable')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'timetable'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Хичээлийн Хуваарь</span>
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'announcements'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Заруудын удирдлага ({announcements.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('homeworks')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'homeworks'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Даалгаврын удирдлага ({homeworks.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('live_ticker')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'live_ticker'
              ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-400/40'
              : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <Radio className="w-3.5 h-3.5" />
          <span>🔴 LIVE Текст Засах</span>
        </button>

        <button
          onClick={() => setAdminTab('system')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition flex items-center space-x-1.5 whitespace-nowrap ${
            adminTab === 'system'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Системийн тохиргоо</span>
        </button>
      </div>

      {/* 1. STUDENTS & ATTENDANCE MANAGEMENT */}
      {adminTab === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/60 dark:bg-slate-800 p-4 rounded-2xl border border-blue-200/80 dark:border-slate-700">
            <div className="text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-200">Нэгдсэн ирцийн үйлдэл:</span>
              <p className="text-slate-500">Бүх сурагчдын ирцийг нэг зэрэг тэмдэглэх</p>
            </div>
            {onMarkAllAttendance && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onMarkAllAttendance('present')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition"
                >
                  ✓ Бүгдийг ирснээр тэмдэглэх
                </button>
                <button
                  onClick={() => onMarkAllAttendance('absent')}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition"
                >
                  Ирц цэвэрлэх
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Add Student Form */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                <UserPlus className="w-5 h-5 text-amber-500 mr-2" />
                Шинэ сурагч бүртгэх
              </h3>
              
              <form onSubmit={handleStudentFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Сурагчийн нэр *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Жишээ: Тэмүүлэн (Temuulen)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Хүйс
                    </label>
                    <select
                      value={newStudentGender}
                      onChange={(e) => setNewStudentGender(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Эр">Эр (Male)</option>
                      <option value="Эм">Эм (Female)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      House
                    </label>
                    <select
                      value={newStudentHouse}
                      onChange={(e) => setNewStudentHouse(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-bold"
                    >
                      <option value="Lion">Lion House</option>
                      <option value="Eagle">Eagle House</option>
                      <option value="Falcon">Falcon House</option>
                      <option value="Windsor">Windsor House</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Үүрэг роль
                    </label>
                    <input
                      type="text"
                      value={newStudentRole}
                      onChange={(e) => setNewStudentRole(e.target.value)}
                      placeholder="Student"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Points
                    </label>
                    <input
                      type="number"
                      value={newStudentPoints}
                      onChange={(e) => setNewStudentPoints(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Утасны дугаар
                  </label>
                  <input
                    type="text"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    placeholder="9911-0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Сурагч Бүртгэх</span>
                </button>
              </form>
            </div>

            {/* Students Table */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Сурагчдын Жагсаалт ({students.length})
              </h3>
              
              <div className="overflow-x-auto max-h-[480px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold sticky top-0">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Нэр</th>
                      <th className="p-2.5">House</th>
                      <th className="p-2.5">Роль</th>
                      <th className="p-2.5">Points</th>
                      <th className="p-2.5">Ирц</th>
                      <th className="p-2.5 text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {students.map((st, idx) => (
                      <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                        <td className="p-2.5 text-slate-400 font-bold">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-slate-900 dark:text-white">{st.name}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-bold text-[10px]">
                            {st.house}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold text-[10px]">
                            {st.role}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400 font-bold">
                          <div className="flex items-center space-x-1">
                            <span>{st.points || 0}</span>
                            {onUpdatePoints && (
                              <button
                                onClick={() => onUpdatePoints(st.id, 5)}
                                className="text-amber-600 hover:text-amber-800 font-bold text-[11px] px-1 bg-amber-50 dark:bg-slate-700 rounded"
                                title="+5 оноо"
                              >
                                +5
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-2.5">
                          {onToggleAttendance ? (
                            <button
                              onClick={() => onToggleAttendance(st.id, st.attendance === 'present' ? 'absent' : 'present')}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                st.attendance === 'present' 
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              }`}
                            >
                              {st.attendance === 'present' ? 'Present' : 'Absent'}
                            </button>
                          ) : (
                            <span className="text-emerald-600 font-bold">Present</span>
                          )}
                        </td>
                        <td className="p-2.5 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => onEditStudent(st)}
                              className="p-1 text-slate-400 hover:text-blue-600 rounded"
                              title="Засах"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteStudent(st.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded"
                              title="Хасах"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEACHERS MANAGEMENT */}
      {adminTab === 'teachers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <GraduationCap className="w-5 h-5 text-amber-500 mr-2" />
              Шинэ багш бүртгэх
            </h3>
            
            <form onSubmit={handleTeacherFormSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Багшийн нэр *
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="Mr. David Harrison"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Заах хичээл *
                </label>
                <input
                  type="text"
                  required
                  value={newTeacherSubject}
                  onChange={(e) => setNewTeacherSubject(e.target.value)}
                  placeholder="English First Language"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Кабинет
                  </label>
                  <input
                    type="text"
                    value={newTeacherRoom}
                    onChange={(e) => setNewTeacherRoom(e.target.value)}
                    placeholder="B-204"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Утас
                  </label>
                  <input
                    type="text"
                    value={newTeacherPhone}
                    onChange={(e) => setNewTeacherPhone(e.target.value)}
                    placeholder="+976 9911-0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>+ Багш Бүртгэх</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ESU Faculty Жагсаалт ({teachers.length})
            </h3>
            
            <div className="overflow-x-auto max-h-[480px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold sticky top-0">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Багшийн нэр</th>
                    <th className="p-2.5">Хичээл</th>
                    <th className="p-2.5">Кабинет</th>
                    <th className="p-2.5">Утас</th>
                    <th className="p-2.5 text-right">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {teachers.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="p-2.5 text-slate-400 font-bold">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-slate-900 dark:text-white">{t.name}</td>
                      <td className="p-2.5 text-indigo-600 dark:text-indigo-400 font-semibold">{t.subject}</td>
                      <td className="p-2.5 text-slate-500">{t.room}</td>
                      <td className="p-2.5 text-slate-500">{t.phone}</td>
                      <td className="p-2.5 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => onEditTeacher(t)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                            title="Засах"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTeacher(t.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Хасах"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. TIMETABLE SCHEDULE MANAGEMENT (FULL EDITOR) */}
      {adminTab === 'timetable' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 overflow-x-auto">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Гараг сонгох:</span>
              {days.map(d => (
                <button
                  key={d}
                  onClick={() => setScheduleDay(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    scheduleDay === d
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Lesson to selected day */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
                {scheduleDay} гарагт хичээл нэмэх
              </h3>

              <form onSubmit={handleAddPeriodSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Цагийн №</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      required
                      value={newPeriodNum}
                      onChange={(e) => setNewPeriodNum(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Хугацаа</label>
                    <input
                      type="text"
                      required
                      value={newPeriodTime}
                      onChange={(e) => setNewPeriodTime(e.target.value)}
                      placeholder="08:30 - 09:20"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Хичээлийн нэр *</label>
                  <input
                    type="text"
                    required
                    value={newPeriodName}
                    onChange={(e) => setNewPeriodName(e.target.value)}
                    placeholder="Жишээ: Physics Lab"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Багш</label>
                    <input
                      type="text"
                      value={newPeriodTeacher}
                      onChange={(e) => setNewPeriodTeacher(e.target.value)}
                      placeholder="Mr. Anderson"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Өрөө</label>
                    <input
                      type="text"
                      value={newPeriodRoom}
                      onChange={(e) => setNewPeriodRoom(e.target.value)}
                      placeholder="S-301"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Хуваарьт оруулах</span>
                </button>
              </form>
            </div>

            {/* List of lessons for selected day */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {scheduleDay} гарагийн цагийн жагсаалт ({(schedule[scheduleDay] || []).length} хичээл)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-2.5">Цаг</th>
                      <th className="p-2.5">Хичээл</th>
                      <th className="p-2.5">Багш</th>
                      <th className="p-2.5">Өрөө</th>
                      <th className="p-2.5">Хугацаа</th>
                      <th className="p-2.5 text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {(schedule[scheduleDay] || []).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-slate-400">Хичээлгүй байна.</td>
                      </tr>
                    ) : (
                      (schedule[scheduleDay] || []).map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                          <td className="p-2.5 font-bold text-indigo-600">№ {l.period}</td>
                          <td className="p-2.5 font-bold text-slate-900 dark:text-white">{l.name}</td>
                          <td className="p-2.5 text-slate-600 dark:text-slate-300">{l.teacher}</td>
                          <td className="p-2.5">{l.room}</td>
                          <td className="p-2.5 text-slate-400">{l.time}</td>
                          <td className="p-2.5 text-right">
                            {onDeleteLessonPeriod && (
                              <button
                                onClick={() => onDeleteLessonPeriod(scheduleDay, l.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                title="Устгах"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ANNOUNCEMENTS / NOTICES MANAGEMENT */}
      {adminTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Megaphone className="w-5 h-5 text-amber-500 mr-2" />
              Шинэ зар нийтлэх
            </h3>

            <form onSubmit={handleAddNoticeSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Гарчиг *</label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="Зарын гарчиг..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Ангилал</label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Сургууль">Сургууль</option>
                    <option value="Анги">Анги 9A</option>
                    <option value="House Events">House Events</option>
                    <option value="Эцэг эх">Эцэг эх</option>
                    <option value="Арга хэмжээ">Арга хэмжээ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Зэрэглэл</label>
                  <select
                    value={newNoticePriority}
                    onChange={(e) => setNewNoticePriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Энгийн">Энгийн</option>
                    <option value="Чухал">🔥 Чухал</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Агуулга *</label>
                <textarea
                  required
                  rows={3}
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="Мэдээний дэлгэрэнгүй тайлбар..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Зар нийтлэх</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Нийт Заруудын Жагсаалт ({announcements.length})
            </h3>

            <div className="space-y-3 max-h-[480px] overflow-y-auto">
              {announcements.map((a) => (
                <div key={a.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.priority === 'Чухал' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {a.category} · {a.priority}
                      </span>
                      <span className="text-[10px] text-slate-400">{a.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{a.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{a.content}</p>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0">
                    {onEditAnnouncement && (
                      <button
                        onClick={() => onEditAnnouncement(a)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                        title="Засах"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteAnnouncement(a.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title="Устгах"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. HOMEWORKS / PREP MANAGEMENT */}
      {adminTab === 'homeworks' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <BookOpen className="w-5 h-5 text-emerald-500 mr-2" />
              Шинэ даалгавар оруулах
            </h3>

            <form onSubmit={handleAddHwSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Хичээл</label>
                <input
                  type="text"
                  required
                  value={newHwSubject}
                  onChange={(e) => setNewHwSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Хугацаа *</label>
                  <input
                    type="date"
                    required
                    value={newHwDueDate}
                    onChange={(e) => setNewHwDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Зэрэглэл</label>
                  <select
                    value={newHwPriority}
                    onChange={(e) => setNewHwPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="High">High (Чухал)</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Даалгаврын агуулга *</label>
                <textarea
                  required
                  rows={3}
                  value={newHwDesc}
                  onChange={(e) => setNewHwDesc(e.target.value)}
                  placeholder="Бодлого, дасгал, сурах бичгийн хуудас..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Даалгавар хадгалах</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Даалгавруудын Жагсаалт ({homeworks.length})
            </h3>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto">
              {homeworks.map((hw) => (
                <div key={hw.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {hw.subject}
                      </span>
                      <span className="text-[10px] text-amber-600 font-semibold">{hw.dueDate} хүртэл</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${hw.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                        {hw.completed ? '✓ Хийгдсэн' : 'Дутуу'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">{hw.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => onToggleHomework(hw.id)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 rounded-lg text-slate-800 dark:text-white"
                    >
                      {hw.completed ? 'Буцаах' : 'Хийсэн'}
                    </button>
                    {onEditHomework && (
                      <button
                        onClick={() => onEditHomework(hw)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                        title="Засах"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteHomework(hw.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      title="Устгах"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5.5 LIVE TICKER REAL-TIME EDITOR */}
      {adminTab === 'live_ticker' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <div className="inline-flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-rose-300">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                  <span>The English School of Ulaanbaatar 9A · Top Marquee Banner</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center">
                  🔴 LIVE: Дээд Талын Гүйх Шуурхай Зар Засах
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  Энд бичсэн текст порталын хамгийн дээр бүх сурагч, багш нарт зориулагдан тасралтгүй урсаж харагдана.
                </p>
              </div>

              {onToggleLiveTicker && (
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Төлөв: {liveTickerEnabled ? <strong className="text-emerald-600 dark:text-emerald-400">Идэвхтэй</strong> : <span className="text-slate-400">Түр хаасан</span>}
                  </span>
                  <button
                    type="button"
                    onClick={onToggleLiveTicker}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition ${
                      liveTickerEnabled 
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {liveTickerEnabled ? '✓ Ажиллаж байна' : 'Хаагдсан (Нээх)'}
                  </button>
                </div>
              )}
            </div>

            {/* Real-time Live Preview */}
            <div>
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Бодит харагдах байдал (Live Preview):
              </span>
              <div className="rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-inner bg-slate-950 text-white p-3 flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] tracking-widest shrink-0 uppercase">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>LIVE</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="animate-ticker text-xs font-semibold text-slate-200 flex items-center">
                    <span className="inline-flex items-center space-x-6 mr-12">
                      <span>{tickerDraft || '(Текст оруулаагүй байна)'}</span>
                      <span className="text-amber-400 font-bold">✦</span>
                      <span className="text-blue-300 font-medium">The English School of Ulaanbaatar 9A</span>
                      <span className="text-amber-400 font-bold">✦</span>
                    </span>
                    <span className="inline-flex items-center space-x-6 mr-12" aria-hidden="true">
                      <span>{tickerDraft || '(Текст оруулаагүй байна)'}</span>
                      <span className="text-amber-400 font-bold">✦</span>
                      <span className="text-blue-300 font-medium">The English School of Ulaanbaatar 9A</span>
                      <span className="text-amber-400 font-bold">✦</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Гүйх зар, мэдээний агуулга:
                </label>
                <textarea
                  rows={4}
                  value={tickerDraft}
                  onChange={(e) => {
                    setTickerDraft(e.target.value);
                    setTickerSuccessMsg(false);
                  }}
                  placeholder="Энд LIVE гүйх текстээ бичнэ үү..."
                  className="w-full p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                  <span>Тэмдэгтийн тоо: {tickerDraft.length}</span>
                  <span>Хүссэн эможи 📢 🚨 🏆 🧹 📝 ашиглаж болно</span>
                </div>
              </div>

              {/* Ready Presets */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Шуурхай бэлэн загварууд (Нэг товшилтоор оруулах):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTickerDraft('📢 Шуурхай зар: Cambridge Checkpoint бэлтгэл давтлага өдөр бүр 15:30 цагт B-204 тоотод явагдаж байна. Сурагчид хичээлийн хэрэгслээ бүрэн авч цагтаа ирнэ үү!');
                      setTickerSuccessMsg(false);
                    }}
                    className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800 hover:border-rose-400 border-2 border-slate-200 dark:border-slate-700 text-xs transition"
                  >
                    <span className="font-black text-rose-600 dark:text-rose-400 block mb-0.5">📝 Cambridge Давтлага</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">Өдөр бүр 15:30 цагт B-204 тоотод...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTickerDraft('🏆 Inter-House Cup: Энэ 5 дахь өдөр 14:00 цагт Lion vs Eagle House-ийн хооронд сагсан бөмбөгийн тоглолттой. Хөгжөөн дэмжигчид спортын зааланд цуглана уу!');
                      setTickerSuccessMsg(false);
                    }}
                    className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800 hover:border-amber-400 border-2 border-slate-200 dark:border-slate-700 text-xs transition"
                  >
                    <span className="font-black text-amber-600 dark:text-amber-400 block mb-0.5">🏆 House Тэмцээн & Спорт</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">Энэ 5 дахь өдөр 14:00 цагт сагсан бөмбөг...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTickerDraft('🧹 Анхаар: Өнөөдрийн ангийн жижүүрийн баг хичээл эхлэхээс 15 минутын өмнө 08:15 цагт ангидаа бэлэн байж самбар, ширээг бэлтгэнэ үү!');
                      setTickerSuccessMsg(false);
                    }}
                    className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800 hover:border-blue-400 border-2 border-slate-200 dark:border-slate-700 text-xs transition"
                  >
                    <span className="font-black text-blue-600 dark:text-blue-400 block mb-0.5">🧹 Жижүүрийн сануулга</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">Өглөө 08:15-д ангидаа ирэх үүрэгтэй...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTickerDraft('🚨 Сургуулийн нийтлэг зар: Эцэг эхийн нэгдсэн уулзалт энэ Пүрэв гарагийн 17:30 цагт ESU Акт зааланд болно.');
                      setTickerSuccessMsg(false);
                    }}
                    className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800 hover:border-purple-400 border-2 border-slate-200 dark:border-slate-700 text-xs transition"
                  >
                    <span className="font-black text-purple-600 dark:text-purple-400 block mb-0.5">🚨 Эцэг эхийн хурал</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">Пүрэв гарагийн 17:30 цагт Акт зааланд...</span>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
                {tickerSuccessMsg ? (
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>LIVE гүйх зар амжилттай шинэчлэгдлээ! Шууд харагдаж байна.</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    Хадгалах дармагц бүх сурагчдад шууд өөрчлөгдөнө.
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (onUpdateLiveTicker && tickerDraft.trim()) {
                      onUpdateLiveTicker(tickerDraft.trim());
                      setTickerSuccessMsg(true);
                      setTimeout(() => setTickerSuccessMsg(false), 3000);
                    }
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md border border-rose-400 flex items-center justify-center space-x-2 active:scale-95 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Шинэчилсэн Текстийг Хадгалах</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SYSTEM MASTER CONTROLS & DATABASE */}
      {adminTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General App Settings */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Sliders className="w-5 h-5 text-blue-500 mr-2" />
              Ерөнхий Тохиргоо & Кодууд
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Google Classroom Код
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={codeEdit}
                    onChange={(e) => {
                      setCodeEdit(e.target.value);
                      setCodeEditSaved(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (onChangeClassroomCode) onChangeClassroomCode(codeEdit);
                      setCodeEditSaved(true);
                      setTimeout(() => setCodeEditSaved(false), 2000);
                    }}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 shadow"
                  >
                    {codeEditSaved ? '✓ Хадгаллаа' : 'Хадгалах'}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAdminTab('live_ticker')}
                  className="w-full p-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-2 border-rose-300 dark:border-rose-800 rounded-2xl text-xs font-bold flex items-center justify-between transition"
                >
                  <span className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                    <span>🔴 LIVE Гүйх Зар Засах Хэсэг рүү очих</span>
                  </span>
                  <span className="text-rose-400">&rarr;</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowChangePinModal(true)}
                  className="w-full p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl text-xs font-bold flex items-center justify-between transition"
                >
                  <span className="flex items-center space-x-2">
                    <KeyRound className="w-4 h-4 text-amber-500" />
                    <span>Админ PIN Кодоо Солих</span>
                  </span>
                  <span className="text-slate-400">&rarr;</span>
                </button>
              </div>

              <div className="pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-xs font-bold flex items-center justify-between transition"
                >
                  <span className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>JSON Файлаас Системийн Өгөгдөл Сэргээх (Import)</span>
                  </span>
                  <span className="text-indigo-400">&uarr;</span>
                </button>
              </div>

              <button
                onClick={handleExportData}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs font-bold flex items-center justify-between transition"
              >
                <span className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Бүх Өгөгдлийг JSON Татаж Авах (Full Backup)</span>
                </span>
                <span className="text-blue-400">&darr;</span>
              </button>

              <a
                href="/esu-9a-source-code.zip"
                download="esu-9a-source-code.zip"
                className="w-full p-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-between transition group"
              >
                <span className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>📦 Вэбсайтын Бүх Эх Кодыг ZIP Файлаар Татаж Авах</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">.ZIP (1.1 MB) &darr;</span>
              </a>
            </div>
          </div>

          {/* Database Cleanup & Master Reset */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <AlertTriangle className="w-5 h-5 text-rose-500 mr-2" />
              Өгөгдөл Цэвэрлэх & Дахин Эхлүүлэх
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Хэрэгцээгүй болсон зарууд, даалгавруудыг нэг товшилтоор цэвэрлэх эсвэл анхны демо өгөгдөл рүү сэргээнэ.
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={onClearAnnouncements}
                className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300 rounded-2xl text-xs font-bold border border-rose-200 dark:border-rose-900/50 flex items-center justify-between transition"
              >
                <span>Бүх заруудыг цэвэрлэх ({announcements.length})</span>
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={onClearHomeworks}
                className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300 rounded-2xl text-xs font-bold border border-rose-200 dark:border-rose-900/50 flex items-center justify-between transition"
              >
                <span>Бүх даалгавруудыг цэвэрлэх ({homeworks.length})</span>
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={onResetData}
                className="w-full p-3.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-2xl text-xs font-bold border border-amber-200 dark:border-amber-900/50 flex items-center justify-between transition"
              >
                <span>Анхны эх демо өгөгдлийг дахин сэргээх</span>
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center">
                <KeyRound className="w-4 h-4 text-amber-500 mr-2" />
                PIN код өөрчлөх
              </h3>
              <button 
                onClick={() => { setShowChangePinModal(false); setChangePinMsg(null); }}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Хаах
              </button>
            </div>

            <form onSubmit={handleChangePinSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Одоогийн нууц PIN
                </label>
                <input
                  type="password"
                  required
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="Хуучин кодоо оруулна уу"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Шинэ нууц PIN
                </label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Шинэ нууц кодоо оруулна уу"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {changePinMsg && (
                <p className={`text-xs font-bold ${changePinMsg.isError ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {changePinMsg.text}
                </p>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="w-1/2 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow"
                >
                  Шинэчлэх
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
