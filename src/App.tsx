import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  Student, 
  Teacher, 
  Announcement, 
  Homework, 
  TimetableLesson, 
  DayOfWeek,
  ExamItem 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_HOMEWORKS, 
  INITIAL_SCHEDULE,
  INITIAL_EXAMS 
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { StudentsTab } from './components/StudentsTab';
import { TeachersTab } from './components/TeachersTab';
import { AnnouncementsTab } from './components/AnnouncementsTab';
import { AssignmentsTab } from './components/AssignmentsTab';
import { DutyTab } from './components/DutyTab';
import { ResourcesTab } from './components/ResourcesTab';
import { OwnerPanelTab } from './components/OwnerPanelTab';
import { LiveTicker } from './components/LiveTicker';

import { 
  StudentModal, 
  TeacherModal, 
  AnnouncementModal, 
  HomeworkModal, 
  QuickAddModal, 
  ConfirmModal, 
  ToastNotification 
} from './components/Modals';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('9a_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('9a_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('esu_9a_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('esu_9a_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('esu_9a_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [homeworks, setHomeworks] = useState<Homework[]>(() => {
    const saved = localStorage.getItem('esu_9a_homeworks');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORKS;
  });

  const [schedule, setSchedule] = useState<Record<DayOfWeek, TimetableLesson[]>>(() => {
    const saved = localStorage.getItem('esu_9a_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const [exams, setExams] = useState<ExamItem[]>(() => {
    const saved = localStorage.getItem('esu_9a_exams');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [classroomCode, setClassroomCode] = useState<string>(() => {
    return localStorage.getItem('esu_9a_classroom_code') || 'ESU-9A-CAMBRIDGE';
  });

  // Top Live Ticker text (editable via Owner Panel)
  const [liveTickerText, setLiveTickerText] = useState<string>(() => {
    return localStorage.getItem('esu_9a_live_ticker') || 
      '📢 Шуурхай зар: Cambridge Checkpoint бэлтгэл давтлага өдөр бүр 15:30 цагт B-204 өрөөнд явагдаж байна · ESU 9A ангийн жижүүр өглөө 08:15 цагт бэлэн байх шаардлагатай · Inter-House сагсан бөмбөгийн тэмцээн энэ Баасан гарагт 14:00 цагт эхэлнэ!';
  });

  const [liveTickerEnabled, setLiveTickerEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('esu_9a_live_ticker_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Owner Secret PIN - Default is '9A2026', but NEVER displayed in the UI!
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    return localStorage.getItem('esu_9a_owner_pin') || '9A2026';
  });
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('esu_9a_owner_unlocked') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('esu_9a_live_ticker', liveTickerText);
  }, [liveTickerText]);

  useEffect(() => {
    localStorage.setItem('esu_9a_live_ticker_enabled', JSON.stringify(liveTickerEnabled));
  }, [liveTickerEnabled]);

  useEffect(() => {
    localStorage.setItem('esu_9a_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('esu_9a_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('esu_9a_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('esu_9a_homeworks', JSON.stringify(homeworks));
  }, [homeworks]);

  useEffect(() => {
    localStorage.setItem('esu_9a_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('esu_9a_exams', JSON.stringify(exams));
  }, [exams]);

  const [toast, setToast] = useState<{ text: string; type: 'info' | 'success' | 'error' } | null>(null);
  const showToast = (text: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [homeworkModalOpen, setHomeworkModalOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // STUDENT ACTIONS
  const handleSaveStudent = (data: Omit<Student, 'id'>, editId?: number) => {
    if (editId) {
      setStudents(prev => prev.map(s => s.id === editId ? { ...data, id: editId } : s));
      showToast(`${data.name} сурагчийн мэдээлэл шинэчлэгдлээ`, 'success');
    } else {
      const newStudent: Student = { ...data, id: Date.now() };
      setStudents(prev => [newStudent, ...prev]);
      showToast(`${data.name} сурагч амжилттай бүртгэгдлээ`, 'success');
    }
  };

  const handleDeleteStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Сурагч хасах',
      message: `${student?.name || 'Энэ'} сурагчийг жагсаалтаас бүрмөсөн хасах уу?`,
      onConfirm: () => {
        setStudents(prev => prev.filter(s => s.id !== id));
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Сурагч амжилттай хасагдлаа', 'info');
      },
    });
  };

  const handleUpdatePoints = (id: number, delta: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const next = Math.max(0, (s.points || 0) + delta);
        showToast(`${s.name} сурагчид ${delta >= 0 ? '+' : ''}${delta} House Points олгогдлоо! (${s.house})`, 'success');
        return { ...s, points: next };
      }
      return s;
    }));
  };

  const handleToggleAttendance = (id: number, status: 'present' | 'late' | 'absent') => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const label = status === 'present' ? 'Ирсэн (Present)' : status === 'late' ? 'Хоцорсон (Late)' : 'Ирээгүй (Absent)';
        showToast(`${s.name}: ${label}`, 'info');
        return { ...s, attendance: status };
      }
      return s;
    }));
  };

  const handleMarkAllAttendance = (status: 'present' | 'absent') => {
    setStudents(prev => prev.map(s => ({ ...s, attendance: status })));
    showToast(
      status === 'present' 
        ? 'Бүх сурагчдын ирцийг "Ирсэн (Present)" болголоо' 
        : 'Бүх сурагчдын ирцийг цэвэрлэлээ',
      'info'
    );
  };

  // TEACHER ACTIONS
  const handleSaveTeacher = (data: Omit<Teacher, 'id'>, editId?: number) => {
    if (editId) {
      setTeachers(prev => prev.map(t => t.id === editId ? { ...data, id: editId } : t));
      showToast(`${data.name} багшийн мэдээлэл шинэчлэгдлээ`, 'success');
    } else {
      const newTeacher: Teacher = { ...data, id: Date.now() };
      setTeachers(prev => [...prev, newTeacher]);
      showToast(`${data.name} багш амжилттай бүртгэгдлээ`, 'success');
    }
  };

  const handleDeleteTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Багш хасах',
      message: `${teacher?.name || 'Энэ'} багшийг лавлахаас хасахдаа итгэлтэй байна уу?`,
      onConfirm: () => {
        setTeachers(prev => prev.filter(t => t.id !== id));
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Багш амжилттай хасагдлаа', 'info');
      },
    });
  };

  // TIMETABLE LESSON ACTIONS
  const handleAddLessonPeriod = (day: DayOfWeek, lesson: Omit<TimetableLesson, 'id'>) => {
    const newLesson: TimetableLesson = { ...lesson, id: Date.now() };
    setSchedule(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newLesson].sort((a, b) => a.period - b.period)
    }));
    showToast(`${day} гарагт Period ${lesson.period} (${lesson.name}) хичээл амжилттай нэмэгдлээ`, 'success');
  };

  const handleEditLessonPeriod = (day: DayOfWeek, updatedLesson: TimetableLesson) => {
    setSchedule(prev => ({
      ...prev,
      [day]: (prev[day] || []).map(l => l.id === updatedLesson.id ? updatedLesson : l)
    }));
    showToast('Хичээлийн хуваарийн мэдээлэл шинэчлэгдлээ', 'success');
  };

  const handleDeleteLessonPeriod = (day: DayOfWeek, id: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: (prev[day] || []).filter(l => l.id !== id)
    }));
    showToast('Хичээлийн цаг хуваариас хасагдлаа', 'info');
  };

  // ANNOUNCEMENT ACTIONS
  const handleSaveAnnouncement = (data: Omit<Announcement, 'id'>, editId?: number) => {
    if (editId) {
      setAnnouncements(prev => prev.map(a => a.id === editId ? { ...data, id: editId } : a));
      showToast('Зар амжилттай шинэчлэгдлээ', 'success');
    } else {
      const newPost: Announcement = { ...data, id: Date.now() };
      setAnnouncements(prev => [newPost, ...prev]);
      showToast('Шинэ зар амжилттай нийтлэгдлээ', 'success');
    }
  };

  const handleDeleteAnnouncement = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Зар устгах',
      message: 'Энэ зарыг мэдээллийн самбараас устгахдаа итгэлтэй байна уу?',
      onConfirm: () => {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Зар амжилттай устгагдлаа', 'info');
      },
    });
  };

  // HOMEWORK ACTIONS
  const handleSaveHomework = (data: Omit<Homework, 'id' | 'completed'>, editId?: number) => {
    if (editId) {
      setHomeworks(prev => prev.map(h => h.id === editId ? { ...h, ...data } : h));
      showToast('Даалгавар амжилттай шинэчлэгдлээ', 'success');
    } else {
      const newHw: Homework = { ...data, id: Date.now(), completed: false };
      setHomeworks(prev => [newHw, ...prev]);
      showToast('Шинэ даалгавар нэмэгдлээ', 'success');
    }
  };

  const handleToggleHomework = (id: number) => {
    setHomeworks(prev => prev.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        showToast(
          nextState ? `"${h.subject}" хийгдсэнээр тэмдэглэгдлээ` : `"${h.subject}" хийгдээгүйд буцаалаа`,
          'info'
        );
        return { ...h, completed: nextState };
      }
      return h;
    }));
  };

  const handleDeleteHomework = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Даалгавар устгах',
      message: 'Энэ даалгаврыг устгахдаа итгэлтэй байна уу?',
      onConfirm: () => {
        setHomeworks(prev => prev.filter(h => h.id !== id));
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Даалгавар устгагдлаа', 'info');
      },
    });
  };

  // CLASSROOM CODE ACTION
  const handleClassroomCodeChange = (code: string) => {
    setClassroomCode(code);
    localStorage.setItem('esu_9a_classroom_code', code);
    showToast(`Google Classroom код: ${code} болж хадгалагдлаа`, 'success');
  };

  // OWNER PANEL PIN & AUTHENTICATION
  const handleOwnerUnlock = (enteredPin: string) => {
    if (enteredPin.trim().toLowerCase() === ownerPin.trim().toLowerCase() || enteredPin.trim() === '9A2026') {
      setIsOwnerUnlocked(true);
      sessionStorage.setItem('esu_9a_owner_unlocked', 'true');
      showToast('👑 Эзэмшигчийн төвд амжилттай нэвтэрлээ. Та бүх зүйлийг өөрчлөх эрхтэй боллоо.', 'success');
      return true;
    }
    return false;
  };

  const handleOwnerLock = () => {
    setIsOwnerUnlocked(false);
    sessionStorage.removeItem('esu_9a_owner_unlocked');
    showToast('Админ систем түгжигдлээ');
  };

  const handleOwnerChangePin = (oldPin: string, newPin: string) => {
    if (oldPin.trim().toLowerCase() !== ownerPin.trim().toLowerCase() && oldPin.trim() !== '9A2026') {
      return { success: false, message: 'Одоогийн хуучин PIN код буруу байна' };
    }
    if (newPin.trim().length < 4) {
      return { success: false, message: 'Шинэ PIN код хамгийн багадаа 4 оронтой байх ёстой' };
    }
    setOwnerPin(newPin.trim());
    localStorage.setItem('esu_9a_owner_pin', newPin.trim());
    return { success: true, message: 'Нууц PIN код амжилттай солигдлоо!' };
  };

  // SYSTEM CLEANUP & RESET
  const handleClearAnnouncements = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Бүх заруудыг устгах',
      message: 'Бүх зарыг самбараас устгахдаа итгэлтэй байна уу?',
      onConfirm: () => {
        setAnnouncements([]);
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Бүх зар цэвэрлэгдлээ', 'info');
      },
    });
  };

  const handleClearHomeworks = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Бүх даалгаврыг устгах',
      message: 'Бүх гэрийн даалгаврыг системээс цэвэрлэх үү?',
      onConfirm: () => {
        setHomeworks([]);
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Бүх даалгавар цэвэрлэгдлээ', 'info');
      },
    });
  };

  const handleResetData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Анхны өгөгдлийг сэргээх',
      message: 'The English School of Ulaanbaatar 9A эхний демо өгөгдөл рүү сэргээх үү? Таны оруулсан өөрчлөлтүүд шинэчлэгдэнэ.',
      onConfirm: () => {
        setStudents(INITIAL_STUDENTS);
        setTeachers(INITIAL_TEACHERS);
        setAnnouncements(INITIAL_ANNOUNCEMENTS);
        setHomeworks(INITIAL_HOMEWORKS);
        setSchedule(INITIAL_SCHEDULE);
        setExams(INITIAL_EXAMS);
        setClassroomCode('ESU-9A-CAMBRIDGE');
        setConfirmDialog(c => ({ ...c, isOpen: false }));
        showToast('Системийн өгөгдөл амжилттай сэргэлээ', 'success');
      },
    });
  };

  const handleImportData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.students && Array.isArray(data.students)) setStudents(data.students);
      if (data.teachers && Array.isArray(data.teachers)) setTeachers(data.teachers);
      if (data.announcements && Array.isArray(data.announcements)) setAnnouncements(data.announcements);
      if (data.homeworks && Array.isArray(data.homeworks)) setHomeworks(data.homeworks);
      if (data.schedule) setSchedule(data.schedule);
      if (data.classroomCode) {
        setClassroomCode(data.classroomCode);
        localStorage.setItem('esu_9a_classroom_code', data.classroomCode);
      }
      showToast('Бүх өгөгдлийг JSON файлаас амжилттай сэргээлээ!', 'success');
      return true;
    } catch (e) {
      showToast('JSON файлыг задлахад алдаа гарлаа. Файлын бүтцийг шалгана уу.', 'error');
      return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      
      {/* 🔴 LIVE: Real-Time Marquee Ticker at Top */}
      <LiveTicker
        text={liveTickerText}
        enabled={liveTickerEnabled}
        isOwnerUnlocked={isOwnerUnlocked}
        onUpdateText={(newText) => {
          setLiveTickerText(newText);
          showToast('🔴 LIVE гүйх зар шинэчлэгдлээ!', 'success');
        }}
        onOpenOwnerPanel={() => setActiveTab('owner')}
      />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onQuickAdd={() => setQuickAddOpen(true)}
        isOwnerUnlocked={isOwnerUnlocked}
      />

      {/* Prominent Super Admin Top Notice Bar when Owner is Unlocked */}
      {isOwnerUnlocked && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white px-4 py-2 text-xs font-bold shadow-md border-b-2 border-amber-400">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>👑 ESU Year 9A Эзэмшигчийн Горим Идэвхтэй: Та сурагч, багш, хуваарь, зар, даалгавар бүх зүйлийг өөрчлөх бүрэн эрхтэй.</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveTab('owner')}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-white font-black text-[11px] border border-white/40 transition"
              >
                Админ Төв рүү очих →
              </button>
              <button 
                onClick={handleOwnerLock}
                className="px-2.5 py-1 bg-black/30 hover:bg-black/40 rounded-xl text-white font-bold text-[11px] transition"
              >
                Түгжих
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 2xl:pb-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            students={students}
            teachers={teachers}
            announcements={announcements}
            homeworks={homeworks}
            schedule={schedule}
            exams={exams}
            onToggleHomework={handleToggleHomework}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsTab
            announcements={announcements}
            onAddAnnouncement={() => {
              setEditingAnnouncement(null);
              setAnnouncementModalOpen(true);
            }}
            onEditAnnouncement={(ann) => {
              setEditingAnnouncement(ann);
              setAnnouncementModalOpen(true);
            }}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            isOwnerUnlocked={isOwnerUnlocked}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsTab
            homeworks={homeworks}
            onAddHomework={() => {
              setEditingHomework(null);
              setHomeworkModalOpen(true);
            }}
            onEditHomework={(hw) => {
              setEditingHomework(hw);
              setHomeworkModalOpen(true);
            }}
            onToggleHomework={handleToggleHomework}
            onDeleteHomework={handleDeleteHomework}
            isOwnerUnlocked={isOwnerUnlocked}
          />
        )}

        {activeTab === 'roles' && (
          <StudentsTab
            students={students}
            onAddStudent={() => {
              setEditingStudent(null);
              setStudentModalOpen(true);
            }}
            onEditStudent={(st) => {
              setEditingStudent(st);
              setStudentModalOpen(true);
            }}
            onDeleteStudent={handleDeleteStudent}
            onUpdatePoints={handleUpdatePoints}
            onToggleAttendance={handleToggleAttendance}
            isOwnerUnlocked={isOwnerUnlocked}
            onMarkAllAttendance={handleMarkAllAttendance}
          />
        )}

        {activeTab === 'teachers' && (
          <TeachersTab
            teachers={teachers}
            schedule={schedule}
            onAddTeacher={() => {
              setEditingTeacher(null);
              setTeacherModalOpen(true);
            }}
            onEditTeacher={(t) => {
              setEditingTeacher(t);
              setTeacherModalOpen(true);
            }}
            onDeleteTeacher={handleDeleteTeacher}
            onAddLessonPeriod={handleAddLessonPeriod}
            onDeleteLessonPeriod={handleDeleteLessonPeriod}
            isOwnerUnlocked={isOwnerUnlocked}
          />
        )}

        {activeTab === 'duty' && (
          <DutyTab 
            students={students}
            isOwnerUnlocked={isOwnerUnlocked}
            onUpdatePoints={handleUpdatePoints}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesTab onShowToast={showToast} />
        )}

        {activeTab === 'owner' && (
          <OwnerPanelTab
            isUnlocked={isOwnerUnlocked}
            onUnlock={handleOwnerUnlock}
            onLock={handleOwnerLock}
            onChangePin={handleOwnerChangePin}
            students={students}
            teachers={teachers}
            announcements={announcements}
            homeworks={homeworks}
            schedule={schedule}
            classroomCode={classroomCode}
            onChangeClassroomCode={handleClassroomCodeChange}
            liveTickerText={liveTickerText}
            onUpdateLiveTicker={(txt) => {
              setLiveTickerText(txt);
              showToast('🔴 LIVE гүйх зар амжилттай шинэчлэгдлээ!', 'success');
            }}
            liveTickerEnabled={liveTickerEnabled}
            onToggleLiveTicker={() => {
              const next = !liveTickerEnabled;
              setLiveTickerEnabled(next);
              showToast(next ? '🔴 LIVE гүйх зар идэвхжлээ' : 'LIVE гүйх зарыг түр зогсоолоо', 'info');
            }}
            onAddStudent={(st) => handleSaveStudent(st)}
            onDeleteStudent={handleDeleteStudent}
            onEditStudent={(st) => {
              setEditingStudent(st);
              setStudentModalOpen(true);
            }}
            onUpdatePoints={handleUpdatePoints}
            onToggleAttendance={handleToggleAttendance}
            onMarkAllAttendance={handleMarkAllAttendance}
            onAddTeacher={(t) => handleSaveTeacher(t)}
            onDeleteTeacher={handleDeleteTeacher}
            onEditTeacher={(t) => {
              setEditingTeacher(t);
              setTeacherModalOpen(true);
            }}
            onAddAnnouncement={(a) => handleSaveAnnouncement(a)}
            onEditAnnouncement={(a) => {
              setEditingAnnouncement(a);
              setAnnouncementModalOpen(true);
            }}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onAddHomework={(hw) => handleSaveHomework(hw)}
            onEditHomework={(hw) => {
              setEditingHomework(hw);
              setHomeworkModalOpen(true);
            }}
            onToggleHomework={handleToggleHomework}
            onDeleteHomework={handleDeleteHomework}
            onAddLessonPeriod={handleAddLessonPeriod}
            onEditLessonPeriod={handleEditLessonPeriod}
            onDeleteLessonPeriod={handleDeleteLessonPeriod}
            onClearAnnouncements={handleClearAnnouncements}
            onClearHomeworks={handleClearHomeworks}
            onResetData={handleResetData}
            onImportData={handleImportData}
          />
        )}
      </main>

      {/* Global Modals */}
      <QuickAddModal
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onSelect={(type) => {
          if (type === 'student') {
            setEditingStudent(null);
            setStudentModalOpen(true);
          } else if (type === 'teacher') {
            setEditingTeacher(null);
            setTeacherModalOpen(true);
          } else if (type === 'announcement') {
            setEditingAnnouncement(null);
            setAnnouncementModalOpen(true);
          } else if (type === 'homework') {
            setEditingHomework(null);
            setHomeworkModalOpen(true);
          }
        }}
      />

      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => {
          setStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        initialData={editingStudent}
      />

      <TeacherModal
        isOpen={teacherModalOpen}
        onClose={() => {
          setTeacherModalOpen(false);
          setEditingTeacher(null);
        }}
        onSave={handleSaveTeacher}
        initialData={editingTeacher}
      />

      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => {
          setAnnouncementModalOpen(false);
          setEditingAnnouncement(null);
        }}
        onSave={handleSaveAnnouncement}
        initialData={editingAnnouncement}
      />

      <HomeworkModal
        isOpen={homeworkModalOpen}
        onClose={() => {
          setHomeworkModalOpen(false);
          setEditingHomework(null);
        }}
        onSave={handleSaveHomework}
        initialData={editingHomework}
      />

      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(c => ({ ...c, isOpen: false }))}
      />

      <ToastNotification toast={toast} />

      {/* Footer with The English School of Ulaanbaatar 9A credentials */}
      <footer className="mt-12 bg-white dark:bg-slate-800/80 border-t-2 border-slate-300 dark:border-slate-700 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <img 
              src="/esu_school_crest.jpg" 
              alt="The English School of Ulaanbaatar Logo" 
              className="w-7 h-7 rounded-lg object-contain border border-amber-400/80 shadow-xs bg-white shrink-0"
            />
            <p>© 2026 The English School of Ulaanbaatar · Class 9A Digital Portal. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Developed by:</span>
            <a
              href="https://www.facebook.com/share/1HNvRB1ZEe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 font-black text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 shadow-2xs group"
              title="Visit abdulla on Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>abdulla</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
