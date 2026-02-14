
import React from 'react';
import { Order } from '../types';

interface DashboardProps {
  orders: Order[];
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, onDelete }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-boxes-stacked text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500">Jami buyurtmalar</p>
            <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-link text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500">Bog'langan (Xitoy)</p>
            <p className="text-2xl font-bold text-slate-800">{orders.filter(o => o.chinaTrack).length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-paper-plane text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500">SMS yuborilgan</p>
            <p className="text-2xl font-bold text-slate-800">{orders.filter(o => o.smsSent).length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">So'nggi buyurtmalar</h2>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Hammasini ko'rish</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">RM Kod</th>
                <th className="px-6 py-4">Mijoz</th>
                <th className="px-6 py-4">Xitoy Kargo</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4">SMS Holati</th>
                <th className="px-6 py-4">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    Ma'lumotlar mavjud emas. Yangi RM kod yarating.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.chinaTrack ? (
                        <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded text-sm">
                          {order.chinaTrack}
                        </span>
                      ) : (
                        <span className="text-amber-500 text-xs italic">Kutilmoqda...</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.smsSent ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <i className="fa-solid fa-circle-check"></i> YUBORILGAN
                        </span>
                      ) : order.chinaTrack ? (
                        <span className="flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                          <i className="fa-solid fa-clock"></i> REJALANGAN
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => onDelete(order.id)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
