import React, { useState } from 'react';
import { 
  FolderOpen, 
  Book, 
  ExternalLink, 
  Copy, 
  Check, 
  Images, 
  Laptop, 
  GraduationCap,
  Award
} from 'lucide-react';

interface ResourcesTabProps {
  onShowToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const classroomCode = 'ESU-9A-CAMBRIDGE';

  const copyCode = () => {
    navigator.clipboard.writeText(classroomCode);
    setCopied(true);
    onShowToast(`Classroom код хуулагдлаа: ${classroomCode}`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const galleryImages = [
    { title: 'ESU Inter-House Athletics', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80' },
    { title: 'Science Lab Experiments', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'ESU Chess Tournament', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' },
    { title: 'Art & Design Exhibition', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Year 9 Autumn Expedition', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80' },
    { title: 'House Cup Celebration', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <FolderOpen className="w-3.5 h-3.5" />
          <span>The English School of Ulaanbaatar · Academic Resources</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          📂 Номын Сан, Цахим Сан & Сургалтын Эх Сурвалжууд
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Cambridge Checkpoint материалууд, Google Classroom код болон ангийн фото зургийн дурсамж.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cambridge Past Papers & Textbooks */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xl mb-3 shadow-inner">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Cambridge Checkpoint & Books
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Year 9 Cambridge Checkpoint шалгалтын past paper, сурах бичиг болон бодлогын сан.
            </p>
          </div>

          <a
            href="https://www.cambridgeinternational.org"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-2xl text-xs text-center shadow transition flex items-center justify-center space-x-1.5"
          >
            <span>Cambridge Сан руу очих</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Google Classroom & Portal */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xl mb-3 shadow-inner">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              ESU Google Classroom
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Year 9A ангийн онлайн хичээл ба prep даалгавруудад нэгдэх албан код:
            </p>
            
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span>{classroomCode}</span>
              <button
                onClick={copyCode}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-sans font-bold flex items-center space-x-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Хуулсан' : 'Хуулах'}</span>
              </button>
            </div>
          </div>

          <a
            href="https://classroom.google.com"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-2xl text-xs text-center shadow transition flex items-center justify-center space-x-1.5"
          >
            <span>Classroom нээх</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Preview */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xl mb-3 shadow-inner">
              <Images className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              ESU 9A Дурсамж Цомог
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Аялал, House тэмцээн, баярын өдөрлөгүүдийн гэрэл зургийн түүх.
            </p>
          </div>

          <button
            onClick={() => setShowGallery(true)}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold rounded-2xl text-xs text-center shadow transition flex items-center justify-center space-x-1.5"
          >
            <span>Зургийн цомог үзэх ({galleryImages.length})</span>
            <Images className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <Images className="w-5 h-5 text-purple-500" />
                <span>📸 The English School of Ulaanbaatar · Class 9A Memories</span>
              </h3>
              <button
                onClick={() => setShowGallery(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Хаах
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {galleryImages.map((img, i) => (
                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-2xl overflow-hidden relative group">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 flex items-end p-3">
                    <span className="text-white text-xs font-bold">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
