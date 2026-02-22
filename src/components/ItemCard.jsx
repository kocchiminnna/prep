import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, MapPin, ShoppingBag, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for conditional classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ItemCard = ({ item, isChecked, onToggle }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isMust = item.type === 'must';
    const isJapan = item.source === 'japan';

    return (
        <div
            className={cn(
                "group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                isChecked ? "border-rose-100 bg-rose-50/30" : "border-slate-100 hover:border-rose-200 shadow-sm hover:shadow-md"
            )}
        >
            <div className="p-4 flex items-start gap-4" onClick={() => setIsExpanded(!isExpanded)}>
                {/* Checkbox */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                    className={cn(
                        "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        isChecked
                            ? "bg-rose-400 border-rose-400 text-white"
                            : "border-slate-300 text-transparent hover:border-rose-300"
                    )}
                >
                    <Check size={14} strokeWidth={3} />
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">

                        <span className={cn(
                            "px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1",
                            isJapan ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                        )}>
                            <MapPin size={10} />
                            {isJapan ? '日本から持参' : '現地調達'}
                        </span>
                    </div>

                    <h3 className={cn(
                        "font-bold text-slate-800 leading-tight mb-1 transition-colors",
                        isChecked && "text-slate-400 line-through decoration-slate-300"
                    )}>
                        {item.name}
                    </h3>

                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <span>{item.type === 'waste' ? 'なぜ不要？' : 'なぜ必要？'}</span>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            <div
                className={cn(
                    "bg-slate-50/50 px-4 transition-all duration-300 ease-in-out origin-top",
                    isExpanded ? "max-h-40 py-3 opacity-100 border-t border-slate-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
                )}
            >
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    <span className="font-semibold text-rose-400 block mb-1 text-xs">REASON</span>
                    {item.reason}
                </p>

                {item.affiliateLink && (
                    <a
                        href={item.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 active:scale-[0.98] transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ShoppingBag size={16} className="text-white" />
                        <span className="text-white">Amazonで見る</span>
                        <ExternalLink size={14} className="text-white/70" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ItemCard;
