
import React, { useState } from 'react';
import { Order } from '../types';

interface OrderSearchProps {
  orders: Order[];
}

const OrderSearch: React.FC<OrderSearchProps> = ({ orders }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Order | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === query.toLowerCase());
    setResult(found || null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="RM kodini kiriting... (masalan: RM8834...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-5 bg-white rounded-2xl border border-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
          />
          <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700"
          >
            Qidirish
          </button>
        </form>
      </div>

      {result ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-scaleIn">
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Topilgan Buyurtma</p>
              <h2 className="text-2xl font-mono font-bold">{result.id}</h2>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              <i className="fa-solid fa-clock mr-2"></i>
              {new Date(result.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Mijoz</label>
                <div className="text-xl font-bold text-slate-800">{result.customerName}</div>
                <div className="text-slate-500">{result.customerPhone}</div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">SMS Holati</label>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                  result.smsSent ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${result.smsSent ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                  {result.smsSent ? 'Yuborilgan' : 'Rejalashtirilgan'}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Xitoy Trek-kodi</label>
                {result.chinaTrack ? (
                  <div className="text-xl font-mono font-bold text-slate-800 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 inline-block">
                    {result.chinaTrack}
                  </div>
                ) : (
                  <div className="text-amber-500 italic">Hali biriktirilmagan</div>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">Logistika</label>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <i className="fa-solid fa-plane-arrival text-slate-400"></i>
                  <span>Xitoy → O'zbekiston (Toshkent)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400">@ruslan_market_bot orqali kuzatish imkoniyati bor</span>
            <button className="text-indigo-600 text-sm font-bold hover:underline">
              <i className="fa-solid fa-download mr-2"></i>
              Fakturani yuklash
            </button>
          </div>
        </div>
      ) : query && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <i className="fa-solid fa-search text-2xl"></i>
          </div>
          <h3 className="text-slate-800 font-bold">Hech narsa topilmadi</h3>
          <p className="text-slate-500">"{query}" kodli buyurtma tizimda mavjud emas</p>
        </div>
      )}
    </div>
  );
};

export default OrderSearch;
