import React, { useState } from 'react';
import { Announcement } from '../types';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Flame, 
  Clock, 
  User, 
  Filter,
  Edit3
} from 'lucide-react';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  onAddAnnouncement: () => void;
  onDeleteAnnouncement: (id: number) => void;
  onEditAnnouncement?: (news: Announcement) => void;
  isOwnerUnlocked?: boolean;
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({
  announcements,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onEditAnnouncement,
  isOwnerUnlocked,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['Бүх мэдээ', 'Анги', 'Сургууль', 'Эцэг эх', 'Арга хэмжээ', 'House Events'];

  const filtered = filter === 'all'
    ? announcements
    : announcements.filter(a => a.category === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner with High-Contrast Visible Borders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-2 border-slate-300 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-blue-300">
            <Megaphone className="w-3.5 h-3.5" />
            <span>The English School of Ulaanbaatar 9A · Нийт {announcements.length} зар нийтлэгдсэн</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            📢 Мэдээ, Мэдээллийн Самбар
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Анги, сургууль, эцэг эхийн хурал болон сургуулийн арга хэмжээний албан мэдээллүүд.
          </p>
        </div>

        <button
          onClick={onAddAnnouncement}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all self-start sm:self-center shrink-0 border border-blue-400"
        >
          <Plus className="w-4 h-4" />
          <span>+ Шинэ зар нийтлэх</span>
        </button>
      </div>

      {/* Filter Tabs with Visible Line Buttons */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isAll = cat === 'Бүх мэдээ';
          const matchValue = isAll ? 'all' : cat;
          const isActive = filter === matchValue;
          return (
            <button
              key={cat}
              onClick={() => setFilter(matchValue)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Announcements Cards with Clear Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-300 dark:border-slate-700">
            <Megaphone className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Энэ ангилалд мэдээлэл одоогоор байхгүй байна.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border-2 border-slate-300 dark:border-slate-700 flex flex-col justify-between space-y-4 hover:shadow-md transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black inline-flex items-center space-x-1 border ${
                    item.priority === 'Чухал'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300'
                  }`}>
                    {item.priority === 'Чухал' && <Flame className="w-3.5 h-3.5 mr-1 text-rose-600" />}
                    <span>{item.category}</span>
                  </span>

                  <span className="text-xs text-slate-500 font-mono font-bold flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1.5 font-bold">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.author}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {onEditAnnouncement && (
                    <button
                      onClick={() => onEditAnnouncement(item)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                      title="Зарыг засах"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteAnnouncement(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition"
                    title="Зар устгах"
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
