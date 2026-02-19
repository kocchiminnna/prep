
import React from 'react';
import { Sparkles, ClipboardList } from 'lucide-react';

const Header = ({ onOpenMyList }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-slate-800 tracking-tight leading-none bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
            整形のしおり
          </h1>
          <p className="text-[10px] text-slate-500 font-medium">オリジナル整形持ち物リストを作ろう</p>
        </div>

        <button
          onClick={onOpenMyList}
          className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-full transition-colors border border-rose-100"
        >
          <ClipboardList size={16} />
          <span className="text-xs font-bold">マイリスト</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

