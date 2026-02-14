
import React, { useState } from 'react';
import { Order } from '../types';

interface OrderLinkerProps {
  orders: Order[];
  onUpdate: (order: Order) => void;
}

const OrderLinker: React.FC<OrderLinkerProps> = ({ orders, onUpdate }) => {
  const [selectedRM, setSelectedRM] = useState('');
  const [chinaTrack, setChinaTrack] = useState('');

  const unlinkedOrders = orders.filter(o => !o.chinaTrack);

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id === selectedRM);
    if (!order) return;

    const updatedOrder: Order = {
      ...order,
      chinaTrack: chinaTrack,
      linkedAt: Date.now(), // Tracking when it was linked for the 2-day SMS logic
      smsSent: false
    };

    onUpdate(updatedOrder);
    setSelectedRM('');
    setChinaTrack('');
    alert(`Xitoy trek-kodi ${chinaTrack} muvaffaqiyatli ${selectedRM} ga bog'landi! SMS 2 kundan keyin yuboriladi.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-link text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Xitoy Trek-kodini Bog'lash</h2>
            <p className="text-slate-500 text-sm">Ichki RM kodini tashqi kargo raqamiga ulab qo'ying</p>
          </div>
        </div>

        <form onSubmit={handleLink} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">RM Kodni tanlang</label>
            <select
              required
              value={selectedRM}
              onChange={(e) => setSelectedRM(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            >
              <option value="">-- RM Kodni tanlang --</option>
              {unlinkedOrders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.customerName})
                </option>
              ))}
            </select>
            {unlinkedOrders.length === 0 && (
              <p className="mt-2 text-xs text-amber-600 font-medium">Hozirda bog'lanmagan RM kodlar mavjud emas.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Xitoy Kargo Trek-kodi (iPost/JT)</label>
            <input
              type="text"
              required
              placeholder="Masalan: JT5439207576412"
              value={chinaTrack}
              onChange={(e) => setChinaTrack(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedRM || !chinaTrack}
            className={`w-full py-4 rounded-xl font-bold transition-all ${
              selectedRM && chinaTrack 
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            MA'LUMOTLARNI BOG'LASH
          </button>
        </form>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb"></i> Ma'lumot
        </h3>
        <p className="text-indigo-700 text-sm leading-relaxed">
          Tizim Xitoy trek-kodi bog'langandan so'ng avtomatik ravishda 2 kundan keyin mijozga SMS xabarnoma yuboradi. 
          Bu mijozga buyurtma yo'lga chiqqanini bildirish uchun smart-delay hisoblanadi.
        </p>
      </div>
    </div>
  );
};

export default OrderLinker;
