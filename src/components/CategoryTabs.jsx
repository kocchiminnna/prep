import React from 'react';
import { Syringe, Skull, Eye, Triangle, ArrowUpCircle, Heart, Circle, MessageCircle } from 'lucide-react';

const icons = {
    Syringe, Skull, Eye, Triangle, ArrowUpCircle, Heart, Circle, MessageCircle
};

const CategoryTabs = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3 overflow-x-auto no-scrollbar">
            <div className="flex px-4 gap-3 min-w-max">
                {categories.map((cat) => {
                    const Icon = icons[cat.icon] || icons.Circle;
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'bg-rose-400 text-white shadow-md shadow-rose-200 scale-105'
                                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-100'}
                            `}
                        >
                            <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                            <span>{cat.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryTabs;
