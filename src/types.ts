export interface Student {
  id: number;
  name: string;
  gender: 'Эр' | 'Эм';
  role: string;
  group: string; // '1-р баг (Lion)' | '2-р баг (Eagle)' | '3-р баг (Falcon)' | '4-р баг (Windsor)' | '5-р баг (Oxford)'
  house: 'Lion' | 'Eagle' | 'Falcon' | 'Windsor';
  points: number;
  phone?: string;
  parentPhone?: string;
  attendance?: 'present' | 'late' | 'absent';
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  phone: string;
  room: string;
  email?: string;
  titlePrefix?: string; // Mr. / Ms. / Dr.
}

export interface Announcement {
  id: number;
  title: string;
  category: 'Анги' | 'Сургууль' | 'Эцэг эх' | 'Арга хэмжээ' | 'House Events';
  priority: 'Энгийн' | 'Чухал';
  date: string;
  author: string;
  content: string;
}

export interface Homework {
  id: number;
  subject: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface TimetableLesson {
  id: number;
  period: number;
  name: string;
  teacher: string;
  room: string;
  time: string;
}

export interface ExamItem {
  id: number;
  title: string;
  subject: string;
  date: string;
  room: string;
}

export type DayOfWeek = 'Даваа' | 'Мягмар' | 'Лхагва' | 'Пүрэв' | 'Баасан';

export type TabType = 
  | 'dashboard' 
  | 'announcements' 
  | 'assignments' 
  | 'roles' 
  | 'teachers' 
  | 'duty' 
  | 'resources' 
  | 'owner';
