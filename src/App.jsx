import React, { useState, useEffect } from 'react';

// ==========================================
// [VI] Từ điển Đa ngôn ngữ
// ==========================================
const translations = {
  vi: {
    title: "Khanh's Myongji College Hub",
    weather: 'Thời tiết Seoul',
    todo: 'Việc cần làm',
    timetable: 'Thời khóa biểu',
    progress: 'Tiến độ học kỳ',
    notifications: 'Thông báo',
    addTodo: 'Thêm việc...',
    adviceGood: 'Trời đẹp lắm! Rủ người yêu đi chơi đi. Chưa có thì ra đường "nhặt" gấp một anh/em nhé! 😜',
    adviceBad: 'Trời xấu rồi, ở nhà code thôi, người yêu tính sau! 😭',
    mon: 'Thứ 2', tue: 'Thứ 3', wed: 'Thứ 4', thu: 'Thứ 5', fri: 'Thứ 6', sat: 'Thứ 7',
    add: 'Thêm',
  },
  en: {
    title: "Khanh's Myongji College Hub",
    weather: 'Seoul Weather',
    todo: 'To-Do List',
    timetable: 'Timetable',
    progress: 'Semester Progress',
    notifications: 'Notifications',
    addTodo: 'Add task...',
    adviceGood: 'Beautiful weather! Go out with your lover. Single? Go outside and "kidnap" someone! 😜',
    adviceBad: 'Bad weather, stay home and code, romance can wait! 😭',
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
    add: 'Add',
  },
  ko: {
    title: "Khanh's 명지대 허브",
    weather: '서울 날씨',
    todo: '할 일 목록',
    timetable: '시간표',
    progress: '학기 진행률',
    notifications: '공지사항',
    addTodo: '할 일 추가...',
    adviceGood: '날씨가 너무 좋아요! 애인과 데이트하세요. 없으면 빨리 밖에서 한 명 "주워" 오세요! 😜',
    adviceBad: '날씨가 안 좋네요, 집에서 코딩이나 합시다. 연애는 나중에! 😭',
    mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토',
    add: '추가',
  }
};

const themes = {
  myongji: 'bg-gradient-to-br from-[#005BAC] to-blue-900 text-white',
  pink: 'bg-gradient-to-br from-pink-300 to-pink-500 text-gray-800',
  anime: 'bg-gradient-to-br from-sky-300 to-indigo-400 text-white'
};

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'vi');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'myongji');
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [weatherGood, setWeatherGood] = useState(true);
  
  const initialTimetable = [
    { id: 1, day: 1, start: 13.41, end: 15.0, name: 'Nhập môn CNTT', bg: 'bg-blue-500' },
    { id: 2, day: 2, start: 11.41, end: 13.0, name: 'Kỹ thuật số', bg: 'bg-purple-500' },
    { id: 3, day: 2, start: 13.0, end: 15.0, name: 'Lập trình Internet', bg: 'bg-orange-500' },
    { id: 4, day: 4, start: 10.83, end: 12.5, name: 'Kỹ năng giao tiếp', bg: 'bg-green-500' },
    { id: 5, day: 4, start: 13.41, end: 15.0, name: 'TH Lập trình', bg: 'bg-red-500' }
  ];
  const [timetable, setTimetable] = useState(() => JSON.parse(localStorage.getItem('timetable')) || initialTimetable);
  const [notifs, setNotifs] = useState(() => JSON.parse(localStorage.getItem('notifs')) || { regDate: '2026-03-10', topikDate: '2026-04-15' });
  const [weeks, setWeeks] = useState(() => JSON.parse(localStorage.getItem('weeks')) || { current: 3, total: 15 });
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = translations[lang];
  const glassClass = "bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-5";

  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('timetable', JSON.stringify(timetable));
    localStorage.setItem('notifs', JSON.stringify(notifs));
    localStorage.setItem('weeks', JSON.stringify(weeks));
  }, [lang, theme, todos, timetable, notifs, weeks]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: e.target.value, done: false }]);
      e.target.value = '';
    }
  };

  const toggleTodo = (id) => setTodos(todos.map(td => td.id === id ? { ...td, done: !td.done } : td));
  const deleteTodo = (id) => setTodos(todos.filter(td => td.id !== id));

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${themes[theme]}`}>
      <header className={`${glassClass} flex flex-col md:flex-row justify-between items-center mb-8`}>
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img src="https://i0.wp.com/konsultanpendidikan.com/wp-content/uploads/2013/11/symbol.png" alt="Myongji Logo" className="w-12 h-12 object-contain bg-white/50 rounded-full p-1" />
          <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <button onClick={() => setTheme('myongji')} className="w-6 h-6 rounded-full bg-[#005BAC] border-2 border-white"></button>
            <button onClick={() => setTheme('pink')} className="w-6 h-6 rounded-full bg-pink-400 border-2 border-white"></button>
            <button onClick={() => setTheme('anime')} className="w-6 h-6 rounded-full bg-sky-300 border-2 border-white"></button>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white/30 border border-white/50 rounded px-2 py-1 text-inherit outline-none">
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="ko">🇰🇷 한국어</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className={`${glassClass} overflow-x-auto relative`}>
            <h2 className="text-xl font-bold mb-4">{t.timetable} (08:00 - 20:00)</h2>
            <div className="min-w-[700px] grid grid-cols-7 relative border-t border-l border-white/20">
              {(() => {
                const hour = currentTime.getHours() + currentTime.getMinutes() / 60;
                if (hour >= 8 && hour <= 20) {
                  const topPercent = ((hour - 8) / 12) * 100;
                  return <div className="absolute left-0 right-0 h-[2px] bg-red-500 z-10 shadow-[0_0_5px_red]" style={{ top: `${topPercent}%` }}></div>;
                }
                return null;
              })()}
              <div className="border-b border-r border-white/20 p-2 text-center font-semibold">Time</div>
              {[t.mon, t.tue, t.wed, t.thu, t.fri, t.sat].map((day, i) => (
                <div key={i} className="border-b border-r border-white/20 p-2 text-center font-semibold">{day}</div>
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <React.Fragment key={`time-${i}`}>
                  <div className="border-b border-r border-white/20 p-2 text-center text-sm">{i + 8}:00</div>
                  {Array.from({ length: 6 }).map((_, dayIdx) => (
                    <div key={`cell-${i}-${dayIdx}`} className="border-b border-r border-white/20 h-14 relative"></div>
                  ))}
                </React.Fragment>
              ))}
              {timetable.map((cls) => {
                const topPercent = ((cls.start - 8) / 12) * 100;
                const heightPercent = ((cls.end - cls.start) / 12) * 100;
                return (
                  <div key={cls.id} 
                       className={`absolute ${cls.bg} text-white rounded p-1 text-xs whitespace-normal break-words shadow-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
                       style={{ 
                         top: `calc(${topPercent}% + 2.5rem)`,
                         height: `calc(${heightPercent}% - 4px)`, 
                         left: `calc(${(cls.day + 1) * (100 / 7)}% + 2px)`, 
                         width: `calc(${100 / 7}% - 4px)` 
                       }}
                       onClick={() => setTimetable(timetable.filter(t => t.id !== cls.id))}>
                    <span className="font-bold block">{cls.name}</span>
                    <span>{Math.floor(cls.start)}:{String(Math.round((cls.start % 1) * 60)).padStart(2, '0')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className={glassClass}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{t.weather}</h2>
              <button onClick={() => setWeatherGood(!weatherGood)} className="text-sm bg-white/20 px-2 py-1 rounded">Toggle</button>
            </div>
            <div className="flex items-center gap-4 text-3xl mb-2">
              <span>{weatherGood ? '☀️' : '🌧️'}</span>
              <span className="font-semibold">{weatherGood ? '24°C' : '15°C'}</span>
            </div>
            <p className="text-sm italic opacity-90">{weatherGood ? t.adviceGood : t.adviceBad}</p>
          </div>

          <div className={glassClass}>
            <h2 className="text-xl font-bold mb-4">{t.todo}</h2>
            <input type="text" placeholder={t.addTodo} onKeyDown={handleAddTodo} className="w-full bg-white/20 placeholder-white/70 border border-white/30 rounded p-2 mb-4 outline-none focus:bg-white/30 transition" />
            <ul className="max-h-48 overflow-y-auto space-y-2">
              {todos.map(td => (
                <li key={td.id} className="flex items-center justify-between p-2 bg-white/10 rounded">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleTodo(td.id)}>
                    <input type="checkbox" checked={td.done} readOnly />
                    <span className={td.done ? 'line-through opacity-50' : ''}>{td.text}</span>
                  </div>
                  <button onClick={() => deleteTodo(td.id)} className="text-red-300 hover:text-red-500 font-bold">✕</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={glassClass}>
            <h2 className="text-xl font-bold mb-4">{t.notifications}</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span>Hạn đăng ký:</span>
                <input type="date" value={notifs.regDate} onChange={(e) => setNotifs({...notifs, regDate: e.target.value})} className="bg-transparent border-none outline-none text-right" />
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span>TOPIK:</span>
                <input type="date" value={notifs.topikDate} onChange={(e) => setNotifs({...notifs, topikDate: e.target.value})} className="bg-transparent border-none outline-none text-right" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-white/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-green-400" strokeDasharray={`${(weeks.current / weeks.total) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold">{Math.round((weeks.current / weeks.total) * 100)}%</div>
              </div>
              <div className="flex gap-2 text-sm">
                <span>Tuần</span>
                <input type="number" value={weeks.current} onChange={(e) => setWeeks({...weeks, current: Number(e.target.value)})} className="w-10 bg-white/20 rounded text-center" />
                <span>/</span>
                <input type="number" value={weeks.total} onChange={(e) => setWeeks({...weeks, total: Number(e.target.value)})} className="w-10 bg-white/20 rounded text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}