
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  orderCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, orderCount }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Bosh sahifa', icon: 'fa-chart-pie' },
    { id: View.GENERATOR, label: 'Yangi RM Generator', icon: 'fa-plus-circle' },
    { id: View.LINKER, label: 'Kargo Bog\'lash', icon: 'fa-link' },
    { id: View.SEARCH, label: 'Qidiruv', icon: 'fa-search' },
    { id: View.NOTIFICATIONS, label: 'SMS Simulyatsiya', icon: 'fa-message' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
          <i className="fa-solid fa-truck-fast text-white"></i>
        </div>
        <span className="font-bold text-xl text-slate-800 hidden md:inline">Ruslan Market</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
            <span className="font-medium hidden md:inline">{item.label}</span>
            {item.id === View.DASHBOARD && (
              <span className="ml-auto bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full hidden md:inline">
                {orderCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 hidden md:block">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Tizim holati</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
