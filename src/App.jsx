import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, CheckCircle, Ban } from 'lucide-react';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import ItemCard from './components/ItemCard';
import OpinionBox from './components/OpinionBox';
import { ITEMS, CATEGORIES } from './data/items';

function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [showMyList, setShowMyList] = useState(false);
  const [viewMode, setViewMode] = useState('needed'); // 'needed' or 'waste'

  // Persist "My List" Items (In List)
  const [myListItems, setMyListItems] = useState(() => {
    const saved = localStorage.getItem('myListItems');
    // Migration: If old 'checkedItems' exists, use it
    const old = localStorage.getItem('checkedItems');
    if (!saved && old) return JSON.parse(old);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist "Packed" Items (Checklist Status inside My List)
  const [packedItems, setPackedItems] = useState(() => {
    const saved = localStorage.getItem('packedItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist Custom Items
  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('customItems');
    return saved ? JSON.parse(saved) : [];
  });

  // New Item Input State
  const [newItemName, setNewItemName] = useState('');
  const [newItemReason, setNewItemReason] = useState('');

  // Reset view mode when category changes
  useEffect(() => {
    setViewMode('needed');
  }, [activeCategory]);

  useEffect(() => {
    localStorage.setItem('myListItems', JSON.stringify(myListItems));
  }, [myListItems]);

  useEffect(() => {
    localStorage.setItem('packedItems', JSON.stringify(packedItems));
  }, [packedItems]);

  useEffect(() => {
    localStorage.setItem('customItems', JSON.stringify(customItems));
  }, [customItems]);

  // Toggle "Add to List" (Site Checkbox)
  const toggleMyList = (id) => {
    setMyListItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Toggle "Packed" (My List Checkbox)
  const togglePacked = (id) => {
    setPackedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!newItemName) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      reason: newItemReason || '自分専用の追加アイテム',
      category: 'custom',
      type: 'must',
      source: 'japan',
      isCustom: true
    };

    setCustomItems([...customItems, newItem]);
    setNewItemName('');
    setNewItemReason('');
  };

  const deleteCustomItem = (id) => {
    if (confirm('このアイテムを削除しますか？')) {
      setCustomItems(customItems.filter(item => item.id !== id));
      setPackedItems(packedItems.filter(itemId => itemId !== id));
    }
  };

  const removeStandardItemFromMyList = (id) => {
    if (confirm('マイリストから削除しますか？')) {
      setMyListItems(myListItems.filter(item => item !== id));
      setPackedItems(packedItems.filter(itemId => itemId !== id));
    }
  };

  // Logic for My List View
  const renderMyList = () => {
    // Show ALL items in My List (from standard list) + ALL custom items
    const standardItemsInList = ITEMS.filter(item => myListItems.includes(item.id) && item.type !== 'waste');
    const myDisplayItems = [...customItems, ...standardItemsInList];

    return (
      <div className="fixed inset-0 z-[60] bg-slate-50 overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-white border-b border-rose-100 px-4 h-16 flex items-center justify-between shadow-sm">
          <h2 className="font-bold text-lg text-slate-800">マイリスト</h2>
          <button onClick={() => setShowMyList(false)} className="p-2 bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          {/* Add Item Form */}
          <div className="mb-6 bg-white p-4 rounded-2xl border border-dashed border-rose-300 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Plus size={18} className="text-rose-400" />
              オリジナルアイテムを追加
            </h3>
            <form onSubmit={addCustomItem} className="space-y-3">
              <input
                type="text"
                placeholder="アイテム名 (例: 推しの写真)"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <textarea
                placeholder="メモ (例: 辛い時に見る用)"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none h-16"
                value={newItemReason}
                onChange={(e) => setNewItemReason(e.target.value)}
              />
              <button
                type="submit"
                disabled={!newItemName}
                className="w-full bg-rose-400 text-white font-bold py-2 rounded-xl text-sm hover:bg-rose-500 transition-colors disabled:opacity-50"
              >
                リストに追加
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {myDisplayItems.length > 0 ? (
              myDisplayItems.map(item => (
                <div key={item.id} className="relative group">
                  <ItemCard
                    item={item}
                    isChecked={packedItems.includes(item.id)} // Checked status in My List = Packed
                    onToggle={() => togglePacked(item.id)}
                  />
                  {/* Remove Button for both custom and standard items in My List */}
                  <button
                    onClick={() => item.isCustom ? deleteCustomItem(item.id) : removeStandardItemFromMyList(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p>まだアイテムがありません🥺<br />カテゴリから必要なものを追加するか、<br />オリジナルアイテムを追加しよう！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main Category View Logic
  const categoryItems = ITEMS.filter(item => item.category === activeCategory);

  // Filter based on viewMode
  const displayList = viewMode === 'needed'
    ? categoryItems.filter(item => item.type !== 'waste')
    : categoryItems.filter(item => item.type === 'waste');

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      <Header onOpenMyList={() => setShowMyList(true)} />

      {!showMyList && (
        <>
          <CategoryTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          {/* Sub-navigation Tabs - Only show for surgery categories */}
          {activeCategory !== 'opinion' && (
            <div className="sticky top-[7rem] z-30 bg-slate-50/90 backdrop-blur-sm pt-4 pb-2 px-4 shadow-sm border-b border-slate-100">
              <div className="max-w-md mx-auto bg-white p-1 rounded-xl shadow-sm border border-slate-100 grid grid-cols-2 gap-1">
                <button
                  onClick={() => setViewMode('needed')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'needed'
                    ? 'bg-rose-100 text-rose-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <CheckCircle size={16} />
                  必要なもの
                </button>
                <button
                  onClick={() => setViewMode('waste')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'waste'
                    ? 'bg-slate-200 text-slate-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <Ban size={16} />
                  いらなかった
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {showMyList ? renderMyList() : (
        <main className="max-w-md mx-auto px-4 pt-6 animate-fade-in">
          {activeCategory === 'opinion' ? (
            <OpinionBox />
          ) : (
            <div className="mb-8 min-h-[50vh]">
              <div className="space-y-4">
                {displayList.length > 0 ? (
                  displayList.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isChecked={viewMode === 'needed' ? myListItems.includes(item.id) : false}
                      onToggle={viewMode === 'needed' ? () => toggleMyList(item.id) : () => { }}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200 mt-4">
                    {viewMode === 'needed' ? (
                      <p>このカテゴリの「必要なもの」は<br />まだ登録されていません💦</p>
                    ) : (
                      <p>このカテゴリの「いらなかったもの」は<br />まだありません✨</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  );
}

export default App;
