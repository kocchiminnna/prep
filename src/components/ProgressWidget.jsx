import React from 'react';

const ProgressWidget = ({ total, checked }) => {
    const percentage = Math.round((checked / total) * 100) || 0;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-full shadow-lg p-2 border border-rose-100 flex items-center gap-3 pr-6 animate-fade-in-up">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Simple SVG Circle Progress */}
                    <svg className="transform -rotate-90 w-12 h-12">
                        <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={113}
                            strokeDashoffset={113 - (113 * percentage) / 100}
                            className="text-rose-400 transition-all duration-500 ease-out"
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-slate-600">
                        {percentage}%
                    </span>
                </div>
                <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preparation</div>
                    <div className="text-sm font-bold text-slate-700">
                        <span className="text-rose-400">{checked}</span> / {total} Items
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressWidget;
