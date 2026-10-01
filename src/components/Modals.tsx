import React, { useState, useEffect } from 'react';
import { Student, Teacher, Announcement, Homework, TimetableLesson } from '../types';
import { 
  X, 
  UserPlus, 
  GraduationCap, 
  Megaphone, 
  BookOpen, 
  AlertTriangle, 
  Check, 
  Info,
  Shield,
  Award
} from 'lucide-react';

/* =========================================================================
   STUDENT MODAL (ADD & EDIT)
   ========================================================================= */
interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>, editId?: number) => void;
  initialData?: Student | null;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Эр' | 'Эм'>('Эр');
  const [role, setRole] = useState('Student / Сурагч');
  const [house, setHouse] = useState<'Lion' | 'Eagle' | 'Falcon' | 'Windsor'>('Lion');
  const [group, setGroup] = useState('1-р баг (Lion)');
  const [points, setPoints] = useState(30);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setGender(initialData.gender);
      setRole(initialData.role);
      setHouse(initialData.house || 'Lion');
      setGroup(initialData.group);
      setPoints(initialData.points || 0);
      setPhone(initialData.phone || '');
    } else {
      setName('');
      setGender('Эр');
      setRole('Student / Сурагч');
      setHouse('Lion');
      setGroup('1-р баг (Lion)');
      setPoints(30);
      setPhone('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleHouseChange = (newHouse: 'Lion' | 'Eagle' | 'Falcon' | 'Windsor') => {
    setHouse(newHouse);
    if (newHouse === 'Lion') setGroup('1-р баг (Lion)');
    else if (newHouse === 'Eagle') setGroup('2-р баг (Eagle)');
    else if (newHouse === 'Falcon') setGroup('3-р баг (Falcon)');
    else if (newHouse === 'Windsor') setGroup('4-р баг (Windsor)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(
      {
        name: name.trim(),
        gender,
        role: role.trim() || 'Student / Сурагч',
        group,
        house,
        points: Number(points) || 0,
        phone: phone.trim() || undefined,
        attendance: initialData?.attendance || 'present',
      },
      initialData ? initialData.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>{initialData ? 'Сурагчийн мэдээлэл засах' : 'ESU 9A Шинэ сурагч нэмэх'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Сурагчийн нэр (Student Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Жишээ: Тэмүүлэн (Temuulen)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Хүйс
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              >
                <option value="Эр">Эр (Male)</option>
                <option value="Эм">Эм (Female)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                House & Бүлэг
              </label>
              <select
                value={house}
                onChange={(e) => handleHouseChange(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white font-bold"
              >
                <option value="Lion">Lion House (Red)</option>
                <option value="Eagle">Eagle House (Blue)</option>
                <option value="Falcon">Falcon House (Green)</option>
                <option value="Windsor">Windsor House (Gold)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Үүрэг роль
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Head Boy, House Captain, etc."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                House Points
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Утас / Холбоо барих
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9911-0000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
            >
              {initialData ? 'Хадгалах' : '+ Нэмэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   TEACHER MODAL (ADD & EDIT)
   ========================================================================= */
interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: Omit<Teacher, 'id'>, editId?: number) => void;
  initialData?: Teacher | null;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSubject(initialData.subject);
      setPhone(initialData.phone);
      setRoom(initialData.room);
      setEmail(initialData.email || '');
    } else {
      setName('');
      setSubject('');
      setPhone('');
      setRoom('');
      setEmail('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim()) return;
    onSave(
      {
        name: name.trim(),
        subject: subject.trim(),
        phone: phone.trim() || '+976 9911-0000',
        room: room.trim() || 'Room B-204',
        email: email.trim() || undefined,
      },
      initialData ? initialData.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>{initialData ? 'Багшийн мэдээлэл засах' : 'ESU Шинэ багш нэмэх'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Багшийн нэр (Teacher Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Жишээ: Mr. David Harrison"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Заах хичээл (Subject) *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Жишээ: English First Language / Physics"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Кабинет / Өрөө
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="B-204"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Утасны дугаар
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+976 9911-2233"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Сургуулийн и-мэйл хаяг
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@esu.edu.mn"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow"
            >
              {initialData ? 'Хадгалах' : '+ Нэмэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   ANNOUNCEMENT MODAL (ADD & EDIT)
   ========================================================================= */
interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (news: Omit<Announcement, 'id'>, editId?: number) => void;
  initialData?: Announcement | null;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Анги' | 'Сургууль' | 'Эцэг эх' | 'Арга хэмжээ' | 'House Events'>('Сургууль');
  const [priority, setPriority] = useState<'Энгийн' | 'Чухал'>('Энгийн');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setPriority(initialData.priority);
      setContent(initialData.content);
    } else {
      setTitle('');
      setCategory('Сургууль');
      setPriority('Энгийн');
      setContent('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave(
      {
        title: title.trim(),
        category,
        priority,
        date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
        author: initialData ? initialData.author : 'ESU 9A Administration',
        content: content.trim(),
      },
      initialData ? initialData.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-blue-600" />
            <span>{initialData ? 'Зар засах (Edit Notice)' : 'Шинэ зар нийтлэх (Post Notice)'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Гарчиг *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notice title..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Ангилал
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white font-bold"
              >
                <option value="Сургууль">Сургууль (School)</option>
                <option value="Анги">Анги (Class 9A)</option>
                <option value="House Events">House Events</option>
                <option value="Эцэг эх">Эцэг эх (Parents)</option>
                <option value="Арга хэмжээ">Арга хэмжээ (Activities)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Зэрэглэл
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white font-bold"
              >
                <option value="Энгийн">Энгийн (Standard)</option>
                <option value="Чухал">🔥 Чухал (Urgent)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Дэлгэрэнгүй агуулга *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Announcement details..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
            >
              {initialData ? 'Хадгалах' : 'Нийтлэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   HOMEWORK MODAL (ADD & EDIT)
   ========================================================================= */
interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hw: Omit<Homework, 'id' | 'completed'>, editId?: number) => void;
  initialData?: Homework | null;
}

export const HomeworkModal: React.FC<HomeworkModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [subject, setSubject] = useState('Mathematics (Cambridge)');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject);
      setDueDate(initialData.dueDate);
      setDescription(initialData.description);
      setPriority(initialData.priority || 'Medium');
    } else {
      setSubject('Mathematics (Cambridge)');
      setDueDate('');
      setDescription('');
      setPriority('Medium');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !dueDate) return;
    onSave(
      {
        subject,
        dueDate,
        description: description.trim(),
        priority,
      },
      initialData ? initialData.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>{initialData ? 'Даалгавар засах (Edit Prep)' : 'Даалгавар нэмэх (Add Prep)'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Хичээл (Subject)
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              >
                <option value="Mathematics (Cambridge)">Mathematics</option>
                <option value="English First Language">English First Language</option>
                <option value="English Literature">English Literature</option>
                <option value="Physics (Science)">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science (ICT)">Computer Science</option>
                <option value="Global Perspectives">Global Perspectives</option>
                <option value="World History">World History</option>
                <option value="Mongolian Language">Mongolian Language</option>
                <option value="Art & Design">Art & Design</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Хугацаа (Due Date) *
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Даалгаврын агуулга *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Exercises, chapters, workbook pages, past paper questions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
            >
              {initialData ? 'Хадгалах' : 'Нэмэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   TIMETABLE LESSON MODAL (FOR OWNER FULL SCHEDULE CONTROL)
   ========================================================================= */
interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: 'Даваа' | 'Мягмар' | 'Лхагва' | 'Пүрэв' | 'Баасан';
  onSave: (day: 'Даваа' | 'Мягмар' | 'Лхагва' | 'Пүрэв' | 'Баасан', lesson: Omit<TimetableLesson, 'id'>, editId?: number) => void;
  initialData?: TimetableLesson | null;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  day,
  onSave,
  initialData,
}) => {
  const [period, setPeriod] = useState(1);
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [time, setTime] = useState('08:30 - 09:20');

  useEffect(() => {
    if (initialData) {
      setPeriod(initialData.period);
      setName(initialData.name);
      setTeacher(initialData.teacher);
      setRoom(initialData.room);
      setTime(initialData.time);
    } else {
      setPeriod(1);
      setName('');
      setTeacher('');
      setRoom('B-204');
      setTime('08:30 - 09:20');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(
      day,
      {
        period: Number(period) || 1,
        name: name.trim(),
        teacher: teacher.trim() || 'Faculty',
        room: room.trim() || 'Room',
        time: time.trim() || '08:30 - 09:20',
      },
      initialData ? initialData.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>{initialData ? 'Хичээлийн цаг засах' : `${day} гарагт хичээл нэмэх`}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Цагийн дугаар (Period)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                required
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Цагийн хуваарь (Time)
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="08:30 - 09:20"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Хичээлийн нэр *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Жишээ: Mathematics (Algebra)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Заах багш
              </label>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Mr. David Harrison"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Кабинет / Өрөө
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="B-204"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow"
            >
              Хадгалах
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   QUICK ADD CHOICE MODAL
   ========================================================================= */
interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'student' | 'teacher' | 'announcement' | 'homework') => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            Юу шинээр нэмэх вэ?
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => { onClose(); onSelect('student'); }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Сурагч</span>
          </button>

          <button
            onClick={() => { onClose(); onSelect('teacher'); }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Багш</span>
          </button>

          <button
            onClick={() => { onClose(); onSelect('announcement'); }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Зар мэдээ</span>
          </button>

          <button
            onClick={() => { onClose(); onSelect('homework'); }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-700/50 transition text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Даалгавар</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   CONFIRMATION MODAL
   ========================================================================= */
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {message}
        </p>

        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={onCancel}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Цуцлах
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow"
          >
            Тийм, гүйцэтгэ
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   TOAST NOTIFICATION
   ========================================================================= */
interface ToastProps {
  toast: { text: string; type: 'info' | 'success' | 'error' } | null;
}

export const ToastNotification: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 text-xs font-semibold">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 ${
          toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-blue-500'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : toast.type === 'error' ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
        </div>
        <p>{toast.text}</p>
      </div>
    </div>
  );
};
