
import React from 'react';
import { Order } from '../types';

interface SMSInboxProps {
  orders: Order[];
  onMarkAsSent: (order: Order) => void;
}

const SMSInbox: React.FC<SMSInboxProps> = ({ orders, onMarkAsSent }) => {
  const now = Date.now();
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

  // Filter orders that have a China track
  const activeNotifications = orders.filter(o => o.chinaTrack);

  const isReadyForSMS = (order: Order) => {
    if (!order.linkedAt) return false;
    return now >= (order.linkedAt + TWO_DAYS_MS);
  };

  const getWaitTimeRemaining = (order: Order) => {
    if (!order.linkedAt) return '';
    const timeLeft = (order.linkedAt + TWO_DAYS_MS) - now;
    if (timeLeft <= 0) return 'TAYYOR';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}soat ${minutes}daq`;
  };

  const handleSend = (order: Order) => {
    const updated = { ...order, smsSent: true };
    onMarkAsSent(updated);
    alert(`SMS Mijozga yuborildi: ${order.customerName}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">SMS Xabarnoma Terminali</h2>
          <p className="text-indigo-200 text-sm max-w-md">
            Bu yerda Xitoy trek-kodi bog'langandan 2 kun o'tib yuborilishi kerak bo'lgan SMSlar navbati ko'rinadi.
          </p>
        </div>
        <i className="fa-solid fa-tower-broadcast text-8xl text-indigo-800/50 absolute right-4 top-1/2 -translate-y-1/2 -rotate-12"></i>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeNotifications.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-2xl border border-slate-200 border-dashed text-center text-slate-400">
            Hozircha xabarnoma yuborilishi kerak bo'lgan buyurtmalar yo'q.
          </div>
        ) : (
          activeNotifications.map((order) => {
            const ready = isReadyForSMS(order);
            const smsContent = `${order.customerName}, sizning ${order.id} raqamli buyurtmangizga Xitoy trek-kodi (${order.chinaTrack}) biriktirildi. Holatni @ruslan_market_bot orqali kuzating.`;

            return (
              <div key={order.id} className={`bg-white rounded-2xl border-2 transition-all p-6 ${
                order.smsSent ? 'border-emerald-100 opacity-60' : 
                ready ? 'border-amber-400 shadow-amber-100 shadow-lg scale-[1.02]' : 'border-slate-100'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Qabul qiluvchi</span>
                    <h3 className="font-bold text-slate-800">{order.customerName}</h3>
                    <p className="text-sm text-slate-500">{order.customerPhone}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    order.smsSent ? 'bg-emerald-50 text-emerald-600' :
                    ready ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {order.smsSent ? 'MUVAFFAQIYATLI' : ready ? 'YUBORISHGA TAYYOR' : `KUTILMOQDA: ${getWaitTimeRemaining(order)}`}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                  <p className="text-sm text-slate-600 font-mono italic">
                    "{smsContent}"
                  </p>
                </div>

                {!order.smsSent && (
                  <button
                    onClick={() => handleSend(order)}
                    disabled={!ready}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      ready 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    {ready ? 'SMSNI HOZIR YUBORISH' : 'VAQTNI KUTING'}
                  </button>
                )}
                {order.smsSent && (
                  <div className="text-center text-emerald-600 text-xs font-bold py-2">
                    <i className="fa-solid fa-check-double mr-1"></i> XABAR YETKAZILDI
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SMSInbox;
