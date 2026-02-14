
import React, { useState, useEffect } from 'react';
import { View, Order } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RMGenerator from './components/RMGenerator';
import OrderLinker from './components/OrderLinker';
import OrderSearch from './components/OrderSearch';
import SMSInbox from './components/SMSInbox';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from "tracking_data.json" (simulated via localStorage)
  useEffect(() => {
    const savedData = localStorage.getItem('tracking_data');
    if (savedData) {
      setOrders(JSON.parse(savedData));
    }
  }, []);

  // Save to "tracking_data.json"
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('tracking_data', JSON.stringify(newOrders));
  };

  const addOrder = (order: Order) => {
    saveOrders([...orders, order]);
  };

  const updateOrder = (updatedOrder: Order) => {
    saveOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const deleteOrder = (id: string) => {
    saveOrders(orders.filter(o => o.id !== id));
  };

  const renderView = () => {
    switch (view) {
      case View.DASHBOARD:
        return <Dashboard orders={orders} onDelete={deleteOrder} />;
      case View.GENERATOR:
        return <RMGenerator onAdd={addOrder} />;
      case View.LINKER:
        return <OrderLinker orders={orders} onUpdate={updateOrder} />;
      case View.SEARCH:
        return <OrderSearch orders={orders} />;
      case View.NOTIFICATIONS:
        return <SMSInbox orders={orders} onMarkAsSent={updateOrder} />;
      default:
        return <Dashboard orders={orders} onDelete={deleteOrder} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={view} setView={setView} orderCount={orders.length} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ruslan Market Logistics</h1>
            <p className="text-slate-500">Trek-kodlarni boshqarish tizimi</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100 relative">
               <i className="fa-solid fa-bell text-slate-400"></i>
               {orders.filter(o => o.chinaTrack && !o.smsSent).length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                   {orders.filter(o => o.chinaTrack && !o.smsSent).length}
                 </span>
               )}
             </div>
             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
               RM
             </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
