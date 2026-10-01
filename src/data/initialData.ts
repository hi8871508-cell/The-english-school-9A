import { Student, Teacher, Announcement, Homework, TimetableLesson, DayOfWeek, ExamItem } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Тэмүүлэн (Temuulen)', gender: 'Эр', role: 'Head Boy / Ангийн Дарга', group: '1-р баг (Lion)', house: 'Lion', points: 45, phone: '9911-1001', attendance: 'present' },
  { id: 2, name: 'Анужин (Anujin)', gender: 'Эм', role: 'Head Girl / Охидын Дарга', group: '2-р баг (Eagle)', house: 'Eagle', points: 52, phone: '9911-1002', attendance: 'present' },
  { id: 3, name: 'Бат-Эрдэнэ (Bat-Erdene)', gender: 'Эр', role: 'Boys Prefect / Хөвгүүдийн Дарга', group: '3-р баг (Falcon)', house: 'Falcon', points: 38, phone: '9911-1003', attendance: 'present' },
  { id: 4, name: 'Номин (Nomin)', gender: 'Эм', role: 'Academic Captain / Сургалт', group: '4-р баг (Windsor)', house: 'Windsor', points: 60, phone: '9911-1004', attendance: 'present' },
  { id: 5, name: 'Тулга (Tulga)', gender: 'Эр', role: 'Sports Captain / Спорт Дарга', group: '1-р баг (Lion)', house: 'Lion', points: 40, phone: '9911-1005', attendance: 'present' },
  { id: 6, name: 'Хулан (Khulan)', gender: 'Эм', role: 'Hygiene & Wellbeing Prefect', group: '2-р баг (Eagle)', house: 'Eagle', points: 48, phone: '9911-1006', attendance: 'present' },
  { id: 7, name: 'Ананд (Anand)', gender: 'Эр', role: 'House Captain (Lion)', group: '1-р баг (Lion)', house: 'Lion', points: 35, phone: '9911-1007', attendance: 'present' },
  { id: 8, name: 'Билгүүн (Bilguun)', gender: 'Эр', role: 'Media & Tech Prefect', group: '3-р баг (Falcon)', house: 'Falcon', points: 42, phone: '9911-1008', attendance: 'late' },
  { id: 9, name: 'Болд (Bold)', gender: 'Эр', role: 'Student / Сурагч', group: '3-р баг (Falcon)', house: 'Falcon', points: 30, phone: '9911-1009', attendance: 'present' },
  { id: 10, name: 'Дулмаа (Dulmaa)', gender: 'Эм', role: 'Student / Сурагч', group: '4-р баг (Windsor)', house: 'Windsor', points: 34, phone: '9911-1010', attendance: 'present' },
  { id: 11, name: 'Есүй (Yesui)', gender: 'Эм', role: 'House Captain (Eagle)', group: '2-р баг (Eagle)', house: 'Eagle', points: 44, phone: '9911-1011', attendance: 'present' },
  { id: 12, name: 'Заяа (Zaya)', gender: 'Эм', role: 'House Captain (Windsor)', group: '4-р баг (Windsor)', house: 'Windsor', points: 47, phone: '9911-1012', attendance: 'present' },
  { id: 13, name: 'Идэр (Ider)', gender: 'Эр', role: 'House Captain (Falcon)', group: '3-р баг (Falcon)', house: 'Falcon', points: 36, phone: '9911-1013', attendance: 'present' },
  { id: 14, name: 'Цэлмэг (Tselmeg)', gender: 'Эм', role: 'Student / Сурагч', group: '2-р баг (Eagle)', house: 'Eagle', points: 29, phone: '9911-1014', attendance: 'present' },
  { id: 15, name: 'Сүхбат (Sukhbat)', gender: 'Эр', role: 'Student / Сурагч', group: '1-р баг (Lion)', house: 'Lion', points: 31, phone: '9911-1015', attendance: 'present' },
  { id: 16, name: 'Төгөлдөр (Tuguldur)', gender: 'Эр', role: 'Student / Сурагч', group: '4-р баг (Windsor)', house: 'Windsor', points: 33, phone: '9911-1016', attendance: 'present' }
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 1, name: 'Mr. David Harrison', subject: 'English First Language & Lit (Cambridge)', phone: '+976 9911-2233', room: 'B-204 (British Wing)', email: 'david.harrison@esu.edu.mn', titlePrefix: 'Mr.' },
  { id: 2, name: 'Mrs. Бадамханд (Badam)', subject: 'Mathematics & Year 9A Form Tutor', phone: '+976 9911-3344', room: 'M-102 (Maths Dept)', email: 'badam@esu.edu.mn', titlePrefix: 'Mrs.' },
  { id: 3, name: 'Dr. James Anderson', subject: 'Physics & Combined Science', phone: '+976 9988-7766', room: 'S-301 (Science Lab 1)', email: 'james.anderson@esu.edu.mn', titlePrefix: 'Dr.' },
  { id: 4, name: 'Ms. Sarah Jenkins', subject: 'Chemistry & Biology', phone: '+976 9922-4455', room: 'S-304 (Science Lab 2)', email: 'sarah.jenkins@esu.edu.mn', titlePrefix: 'Ms.' },
  { id: 5, name: 'Mr. Ганбат (Ganbat)', subject: 'Computer Science & ICT', phone: '+976 9955-6677', room: 'T-208 (ICT Suite)', email: 'ganbat@esu.edu.mn', titlePrefix: 'Mr.' },
  { id: 6, name: 'Ms. Эрдэнэ (Erdene)', subject: 'Mongolian Language & History', phone: '+976 9977-8899', room: 'H-105 (Humanities)', email: 'erdene@esu.edu.mn', titlePrefix: 'Ms.' },
  { id: 7, name: 'Mr. Mark Robinson', subject: 'Global Perspectives & Humanities', phone: '+976 9933-1122', room: 'H-202 (Lecture Room)', email: 'mark.robinson@esu.edu.mn', titlePrefix: 'Mr.' },
  { id: 8, name: 'Coach Болд (Bold)', subject: 'Physical Education & Athletics', phone: '+976 9944-5566', room: 'ESU Sports Complex', email: 'bold.pe@esu.edu.mn', titlePrefix: 'Coach' }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Cambridge Checkpoint & Mock Exam Schedule',
    category: 'Сургууль',
    priority: 'Чухал',
    date: '2026-10-06',
    author: 'Academic Office (ESU)',
    content: 'Year 9 Cambridge Checkpoint бэлтгэл шалгалтууд 10-р сарын дундуур эхэлнэ. Бүх сурагчид Mathematics, English, Combined Science хичээлүүдийн past paper материалуудаа давтаж бэлтгэнэ үү.'
  },
  {
    id: 2,
    title: 'Annual ESU Inter-House Sports & Chess Cup',
    category: 'House Events',
    priority: 'Энгийн',
    date: '2026-10-15',
    author: 'House Masters (Lion, Eagle, Falcon, Windsor)',
    content: 'ESU House Cup тэмцээний дараагийн шат ирэх Баасан гарагт болно. House оноо авахын тулд сурагчид House өмсгөлтэйгээ бэлэн ирнэ үү. (Lion: Red, Eagle: Blue, Falcon: Green, Windsor: Gold).'
  },
  {
    id: 3,
    title: 'Year 9 Parents & Form Tutor Conference',
    category: 'Эцэг эх',
    priority: 'Чухал',
    date: '2026-10-08',
    author: 'Mrs. Бадам (Form Tutor 9A)',
    content: '9А ангийн эцэг эх, асран хамгаалагчдын ганцаарчилсан уулзалт (Parent-Teacher Consultation) Пүрэв гарагийн 17:00-20:00 цагт ESU Main Hall-д болно. Цахим бүртгэлээр цагаа сонгоно уу.'
  }
];

export const INITIAL_HOMEWORKS: Homework[] = [
  {
    id: 101,
    subject: 'Mathematics (Cambridge)',
    description: 'Chapter 4 Quadratic Equations: Exercise 4.2 Questions 1-12 in student workbook. Check solutions with working out.',
    dueDate: '2026-10-02',
    completed: false,
    priority: 'High'
  },
  {
    id: 102,
    subject: 'English First Language',
    description: 'Read Chapter 5 of "Animal Farm" and write a 300-word analytical response on character symbolism.',
    dueDate: '2026-10-03',
    completed: true,
    priority: 'High'
  },
  {
    id: 103,
    subject: 'Physics (Science)',
    description: 'Complete Lab Report on Velocity-Time Graphs and calculate kinetic energy equations 1-5.',
    dueDate: '2026-10-04',
    completed: false,
    priority: 'Medium'
  },
  {
    id: 104,
    subject: 'Global Perspectives',
    description: 'Prepare a 3-slide team presentation on "Renewable Energy Solutions in Central Asia".',
    dueDate: '2026-10-05',
    completed: false,
    priority: 'Medium'
  },
  {
    id: 105,
    subject: 'Computer Science (ICT)',
    description: 'Python Basics Worksheet: Write functions for list filtering and sorting algorithms.',
    dueDate: '2026-10-07',
    completed: false,
    priority: 'Low'
  }
];

export const INITIAL_SCHEDULE: Record<DayOfWeek, TimetableLesson[]> = {
  'Даваа': [
    { id: 1, period: 1, name: 'Mathematics (Algebra)', teacher: 'Mrs. Бадам (Badam)', room: 'M-102', time: '08:30 - 09:20' },
    { id: 2, period: 2, name: 'English First Language', teacher: 'Mr. David Harrison', room: 'B-204', time: '09:25 - 10:15' },
    { id: 3, period: 3, name: 'Physics (Mechanics)', teacher: 'Dr. James Anderson', room: 'S-301', time: '10:35 - 11:25' },
    { id: 4, period: 4, name: 'Computer Science (ICT)', teacher: 'Mr. Ганбат', room: 'T-208', time: '11:30 - 12:20' },
    { id: 5, period: 5, name: 'Physical Education (PE)', teacher: 'Coach Болд', room: 'ESU Gym', time: '13:10 - 14:00' }
  ],
  'Мягмар': [
    { id: 6, period: 1, name: 'Chemistry (Elements)', teacher: 'Ms. Sarah Jenkins', room: 'S-304', time: '08:30 - 09:20' },
    { id: 7, period: 2, name: 'Biology (Cell Biology)', teacher: 'Ms. Sarah Jenkins', room: 'S-304', time: '09:25 - 10:15' },
    { id: 8, period: 3, name: 'English Literature', teacher: 'Mr. David Harrison', room: 'B-204', time: '10:35 - 11:25' },
    { id: 9, period: 4, name: 'Mathematics (Geometry)', teacher: 'Mrs. Бадам (Badam)', room: 'M-102', time: '11:30 - 12:20' },
    { id: 10, period: 5, name: 'Global Perspectives', teacher: 'Mr. Mark Robinson', room: 'H-202', time: '13:10 - 14:00' }
  ],
  'Лхагва': [
    { id: 11, period: 1, name: 'English First Language', teacher: 'Mr. David Harrison', room: 'B-204', time: '08:30 - 09:20' },
    { id: 12, period: 2, name: 'Mathematics (Statistics)', teacher: 'Mrs. Бадам (Badam)', room: 'M-102', time: '09:25 - 10:15' },
    { id: 13, period: 3, name: 'Mongolian Language & Lit', teacher: 'Ms. Эрдэнэ', room: 'H-105', time: '10:35 - 11:25' },
    { id: 14, period: 4, name: 'Physics Laboratory', teacher: 'Dr. James Anderson', room: 'S-301', time: '11:30 - 12:20' },
    { id: 15, period: 5, name: 'House Activities & Clubs', teacher: 'House Masters', room: 'Main Hall', time: '13:10 - 14:00' }
  ],
  'Пүрэв': [
    { id: 16, period: 1, name: 'Combined Science', teacher: 'Dr. James Anderson', room: 'S-301', time: '08:30 - 09:20' },
    { id: 17, period: 2, name: 'World History & Geo', teacher: 'Mr. Mark Robinson', room: 'H-202', time: '09:25 - 10:15' },
    { id: 18, period: 3, name: 'Mathematics (Trigonometry)', teacher: 'Mrs. Бадам (Badam)', room: 'M-102', time: '10:35 - 11:25' },
    { id: 19, period: 4, name: 'Computer Science (Coding)', teacher: 'Mr. Ганбат', room: 'T-208', time: '11:30 - 12:20' },
    { id: 20, period: 5, name: 'Art & Design Studio', teacher: 'Faculty Art', room: 'Art Room 2', time: '13:10 - 14:00' }
  ],
  'Баасан': [
    { id: 21, period: 1, name: 'Mathematics Checkpoint', teacher: 'Mrs. Бадам (Badam)', room: 'M-102', time: '08:30 - 09:20' },
    { id: 22, period: 2, name: 'English Creative Writing', teacher: 'Mr. David Harrison', room: 'B-204', time: '09:25 - 10:15' },
    { id: 23, period: 3, name: 'Form 9A Assembly & Tutor Time', teacher: 'Mrs. Бадам (Form Tutor)', room: 'M-102', time: '10:35 - 11:25' },
    { id: 24, period: 4, name: 'Inter-House Sports League', teacher: 'Coach Болд', room: 'ESU Sports Field', time: '11:30 - 12:40' }
  ]
};

export const INITIAL_EXAMS: ExamItem[] = [
  { id: 1, title: 'Cambridge Checkpoint Math Mock', subject: 'Mathematics', date: '2026-10-14', room: 'Exam Hall 1' },
  { id: 2, title: 'English Reading & Writing Assessment', subject: 'English', date: '2026-10-18', room: 'B-204' },
  { id: 3, title: 'Science Practical Test', subject: 'Combined Science', date: '2026-10-22', room: 'S-301' },
];
