import React, { useState } from 'react';
import { Student } from '../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  Trash2, 
  Edit3, 
  Phone, 
  Crown, 
  ShieldCheck, 
  Sparkles,
  Trophy,
  Award,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Minus,
  Check
} from 'lucide-react';

interface StudentsTabProps {
  students: Student[];
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onUpdatePoints?: (id: number, delta: number) => void;
  onToggleAttendance?: (id: number, status: 'present' | 'late' | 'absent') => void;
  isOwnerUnlocked?: boolean;
  onMarkAllAttendance?: (status: 'present' | 'absent') => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onUpdatePoints,
  onToggleAttendance,
  isOwnerUnlocked,
  onMarkAllAttendance,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');

  const houses = ['Lion', 'Eagle', 'Falcon', 'Windsor'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.phone && student.phone.includes(searchQuery));
    
    const matchesHouse = selectedHouse === 'all' || student.house === selectedHouse;
    const matchesGender = selectedGender === 'all' || student.gender === selectedGender;

    return matchesSearch && matchesHouse && matchesGender;
  });

  const getHouseBadge = (house: string) => {
    switch (house) {
      case 'Lion':
        return { badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-2 border-rose-300', dot: 'bg-rose-500' };
      case 'Eagle':
        return { badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-2 border-blue-300', dot: 'bg-blue-600' };
      case 'Falcon':
        return { badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-2 border-emerald-300', dot: 'bg-emerald-500' };
      case 'Windsor':
      default:
        return { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-2 border-amber-300', dot: 'bg-amber-500' };
    }
  };

  const keyRoles = [
    { title: 'Head Boy', icon: <Crown className="w-4 h-4 text-amber-500" />, match: 'head boy' },
    { title: 'Head Girl', icon: <Crown className="w-4 h-4 text-pink-500" />, match: 'head girl' },
    { title: 'Boys Prefect', icon: <Users className="w-4 h-4 text-cyan-500" />, match: 'boys' },
    { title: 'Sports Captain', icon: <ShieldCheck className="w-4 h-4 text-orange-500" />, match: 'sport' },
    { title: 'Academic Captain', icon: <Award className="w-4 h-4 text-purple-500" />, match: 'academic' },
    { title: 'Hygiene & Wellbeing', icon: <Sparkles className="w-4 h-4 text-emerald-500" />, match: 'hygiene' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner with High-Contrast Visible Borders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-blue-300">
            <Users className="w-3.5 h-3.5" />
            <span>The English School of Ulaanbaatar 9A · Сурагчдын Жагсаалт ({students.length})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            👥 Сурагчдын Бүртгэл, House & Үүрэг Ролууд
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Сурагч нэмэх, засах, хасах болон House points, ирцийн бүртгэлийг хөтлөх хэсэг.
          </p>
        </div>

        <button
          onClick={onAddStudent}
          className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 active:scale-95 text-white font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all self-start sm:self-center shrink-0 border border-blue-400"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Шинэ сурагч нэмэх</span>
        </button>
      </div>

      {/* Super Admin Attendance Action Bar */}
      {isOwnerUnlocked && onMarkAllAttendance && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-amber-950/40 rounded-2xl border-2 border-amber-300 dark:border-amber-800 shadow-sm">
          <div className="flex items-center space-x-2">
            <Crown className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs font-extrabold text-amber-950 dark:text-amber-200">
              👑 Owner Шуурхай Үйлдэл:
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Бүх сурагчдын өнөөдрийн ирцийг нэг зэрэг шинэчлэх
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onMarkAllAttendance('present')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs border border-emerald-500 transition"
            >
              ✓ Бүгдийг ирснээр тэмдэглэх
            </button>
            <button
              onClick={() => onMarkAllAttendance('absent')}
              className="px-3.5 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-600 transition"
            >
              Ирц цэвэрлэх
            </button>
          </div>
        </div>
      )}

      {/* Leadership Board Cards with Visible Borders */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 flex items-center">
          <Crown className="w-4 h-4 text-amber-500 mr-1.5" />
          ESU Year 9A Leadership Council & Prefects
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {keyRoles.map((roleItem, idx) => {
            const assigned = students.find(s => s.role.toLowerCase().includes(roleItem.match));
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center space-x-1.5 mb-2">
                  {roleItem.icon}
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                    {roleItem.title}
                  </span>
                </div>
                <div>
                  <p className="font-black text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate">
                    {assigned ? assigned.name : 'Томилоогүй'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold truncate">
                    {assigned ? `${assigned.house} House` : 'Сонгоогүй'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Toolbar with Visible Borders */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Нэр, үүрэг, утсаар хайх..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* House filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedHouse('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition whitespace-nowrap ${
                selectedHouse === 'all'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
              }`}
            >
              Бүх House
            </button>
            {houses.map(h => (
              <button
                key={h}
                onClick={() => setSelectedHouse(h)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 whitespace-nowrap transition ${
                  selectedHouse === h
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                }`}
              >
                {h}
              </button>
            ))}

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-bold"
            >
              <option value="all">Бүх хүйс</option>
              <option value="Эр">Эр</option>
              <option value="Эм">Эм</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
          <span>Нийт олдсон: <strong className="text-slate-900 dark:text-white">{filteredStudents.length}</strong> сурагч</span>
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedHouse('all'); setSelectedGender('all'); }}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Шүүлтүүр цэвэрлэх
            </button>
          )}
        </div>
      </div>

      {/* Students Table with High-Contrast Clear Row Dividers (Зураастай хүснэгт) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase text-[10px] font-black tracking-wider border-b-2 border-slate-300 dark:border-slate-600">
              <tr>
                <th className="p-3.5 pl-5 border-r border-slate-200 dark:border-slate-600">#</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">Сурагчийн нэр</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">House</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">Хариуцсан роль</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">Points (Оноо)</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">Ирц (Today)</th>
                <th className="p-3.5 border-r border-slate-200 dark:border-slate-600">Утас</th>
                <th className="p-3.5 pr-5 text-right">Үйлдэл (Засах / Хасах)</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                    Сурагч олдсонгүй. Дээрх "+ Шинэ сурагч нэмэх" товчоор нэмнэ үү.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, idx) => {
                  const houseMeta = getHouseBadge(st.house);
                  return (
                    <tr 
                      key={st.id} 
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                    >
                      <td className="p-3.5 pl-5 font-bold text-slate-500 text-xs border-r border-slate-200 dark:border-slate-700/60">
                        {idx + 1}
                      </td>
                      <td className="p-3.5 border-r border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 border ${
                            st.gender === 'Эм' 
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300'
                          }`}>
                            {st.name.slice(0, 1)}
                          </div>
                          <div>
                            <span className="font-black text-slate-900 dark:text-white block">
                              {st.name}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              {st.group}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 border-r border-slate-200 dark:border-slate-700/60">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black ${houseMeta.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${houseMeta.dot}`} />
                          <span>{st.house}</span>
                        </span>
                      </td>
                      <td className="p-3.5 border-r border-slate-200 dark:border-slate-700/60">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          st.role.toLowerCase().includes('head') || st.role.toLowerCase().includes('captain')
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-slate-300'
                        }`}>
                          {st.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-xs border-r border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-amber-700 dark:text-amber-400 font-black">{st.points || 0} pts</span>
                          {onUpdatePoints && (
                            <div className="flex items-center space-x-0.5">
                              <button
                                onClick={() => onUpdatePoints(st.id, 5)}
                                className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 hover:bg-amber-200 dark:hover:bg-amber-900 rounded text-amber-800 dark:text-amber-300 font-extrabold text-[10px] border border-amber-300"
                                title="+5 House Points шагнах"
                              >
                                +5
                              </button>
                              <button
                                onClick={() => onUpdatePoints(st.id, 1)}
                                className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-300"
                                title="+1 House Point"
                              >
                                +1
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 border-r border-slate-200 dark:border-slate-700/60">
                        {onToggleAttendance ? (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => onToggleAttendance(st.id, 'present')}
                              className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition ${
                                st.attendance === 'present' 
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs' 
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-emerald-50'
                              }`}
                              title="Ирсэн (Present)"
                            >
                              Ирсэн
                            </button>
                            <button
                              onClick={() => onToggleAttendance(st.id, 'late')}
                              className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition ${
                                st.attendance === 'late' 
                                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs' 
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-amber-50'
                              }`}
                              title="Хоцорсон (Late)"
                            >
                              Хоцорсон
                            </button>
                            <button
                              onClick={() => onToggleAttendance(st.id, 'absent')}
                              className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition ${
                                st.attendance === 'absent' 
                                  ? 'bg-rose-600 text-white border-rose-700 shadow-xs' 
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-rose-50'
                              }`}
                              title="Тасалсан (Absent)"
                            >
                              Тасалсан
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-600 text-xs font-bold">Present</span>
                        )}
                      </td>
                      <td className="p-3.5 text-xs text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700/60 font-medium">
                        {st.phone ? (
                          <a href={`tel:${st.phone}`} className="hover:text-blue-600 flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{st.phone}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => onEditStudent(st)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                            title="Мэдээлэл засах"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteStudent(st.id)}
                            className="p-1.5 text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                            title="Жагсаалтаас хасах"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
