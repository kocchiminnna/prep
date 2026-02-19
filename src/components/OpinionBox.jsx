import React, { useState } from 'react';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CATEGORIES } from '../data/items';

const OpinionBox = () => {
    const [type, setType] = useState('positive'); // 'positive' or 'negative'
    const [surgeryType, setSurgeryType] = useState(''); // New state for surgery type
    const [item, setItem] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Filter out 'opinion' category from selection
    const surgeryOptions = CATEGORIES.filter(c => c.id !== 'opinion');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!item || !reason || !surgeryType) return;

        // Google Form Configuration
        const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScqF3HvqkeamAH_2IGh0l33agROTUoYZKmimqY8NlqdBOqjsw/formResponse';

        // Form Entry IDs
        const ENTRY_IDS = {
            type: 'entry.828474696', // 必要？なくてもよかった？
            category: 'entry.2099131410', // 部位を選択 (New)
            item: 'entry.531662762', // アイテム名
            reason: 'entry.908940486' // 理由
        };

        // Map internal IDs to Google Form exact strings
        const getFormCategoryName = (id) => {
            const map = {
                'lipo': '脂肪吸引',
                'bone': '輪郭整形（骨切り）', // Fixed to match form
                'eye': '目整形',
                'nose': '鼻整形',
                'lift': 'リフトアップ',
                'breast': '豊胸' // Note: Form might not support this yet but sending anyway
            };
            return map[id] || '';
        };

        const formData = new FormData();
        formData.append(ENTRY_IDS.type, type === 'positive' ? '必要' : 'なくてもよかった');
        formData.append(ENTRY_IDS.category, getFormCategoryName(surgeryType));
        formData.append(ENTRY_IDS.item, item);
        formData.append(ENTRY_IDS.reason, reason);

        try {
            await fetch(FORM_ACTION, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            // Success Handling
            setSubmitted(true);
            setSurgeryType('');
            setItem('');
            setReason('');

            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error('Submission failed', error);
            setSubmitted(true);
            setSurgeryType('');
            setItem('');
            setReason('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className={`absolute top-0 left-0 w-full h-1 ${type === 'positive' ? 'bg-rose-400' : 'bg-slate-400'}`} />

            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-700 text-lg">みんなの意見箱</h3>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setType('positive')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${type === 'positive'
                            ? 'bg-white text-rose-500 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <ThumbsUp size={14} />
                        これ良かった！
                    </button>
                    <button
                        onClick={() => setType('negative')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${type === 'negative'
                            ? 'bg-white text-slate-600 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <ThumbsDown size={14} />
                        いらなかった
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="mb-6 p-4 bg-rose-50/50 rounded-xl border border-rose-100 text-sm">
                <p className="text-slate-700 mb-2 font-medium leading-relaxed">
                    意見が多かったアイテムは<br />
                    <span className="text-rose-500 font-bold underline decoration-rose-300 decoration-2">リストに正式追加</span>されます！
                </p>
                <div className="flex justify-end">
                    <a
                        href="https://x.com/gn0ycrb0ha65833"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors border-b border-dashed border-slate-300 hover:border-rose-300 pb-0.5"
                    >
                        管理人X: @gn0ycrb0ha65833
                    </a>
                </div>
            </div>

            <p className="text-sm text-slate-500 mb-4 leading-relaxed font-bold">
                {type === 'positive'
                    ? '「これは持って行って正解！」という神アイテムを教えてください✨'
                    : '「正直これは使わなかった...」というアイテムを共有して荷物を減らそう！'}
            </p>

            {submitted ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-xl text-center text-sm font-bold animate-pulse border border-green-100">
                    投稿ありがとうございます！<br />
                    皆様の声をリストに反映します✨
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Surgery Type Selector */}
                    <div className="relative">
                        <select
                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm bg-slate-50 focus:bg-white transition-colors appearance-none"
                            required
                        >
                            <option value="" disabled>どの手術のアイテムですか？</option>
                            {surgeryOptions.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            ▼
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder={type === 'positive' ? "アイテム名 (例: 延長コード)" : "アイテム名 (例: 大量の服)"}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm bg-slate-50 focus:bg-white transition-colors"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <textarea
                        placeholder={type === 'positive' ? "理由 (例: コンセントが遠かったので便利でした！)" : "理由 (例: 術後は着替えが大変で使いませんでした...)"}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm bg-slate-50 focus:bg-white transition-colors h-24 resize-none"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!item || !reason || !surgeryType}
                        className={`w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-md hover:shadow-lg transform active:scale-95 ${type === 'positive' ? 'bg-rose-400 hover:bg-rose-500' : 'bg-slate-600 hover:bg-slate-700'
                            }`}
                    >
                        <Send size={16} />
                        送信する
                    </button>
                </form>
            )}
        </div>
    );
};

export default OpinionBox;
