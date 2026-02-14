
import React, { useState } from 'react';
import { Order } from '../types';

interface RMGeneratorProps {
  onAdd: (order: Order) => void;
}

const RMGenerator: React.FC<RMGeneratorProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const generateRM = () => {
    // RM + 13 unique random digits
    const digits = Math.floor(Math.random() * 9000000000000) + 1000000000000;
    const newId = `RM${digits}`;
    setGeneratedId(newId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedId || !name || !phone) return;

    const newOrder: Order = {
      id: generatedId,
      customerName: name,
      customerPhone: phone,
      chinaTrack: null,
      createdAt: Date.now(),
      linkedAt: null,
      smsSent: false
    };

    onAdd(newOrder);
    
    // Reset form
    setName('');
    setPhone('');
    setGeneratedId(null);
    // Fix: replaced undefined newId with newOrder.id which contains the generated RM code
    alert(`${newOrder.id} kodi muvaffaqiyatli yaratildi va saqlandi!`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl animate-scaleIn">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
          <i className="fa-solid fa-fingerprint text-2xl"></i>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Yangi RM Kod Yaratish</h2>
        <p className="text-slate-500 text-sm">Mijoz uchun takrorlanmas ichki trek-kod yarating</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 mb-6">
          {generatedId ? (
            <div className="text-center animate-bounce">
              <span className="text-3xl font-mono font-bold text-indigo-600 tracking-tighter">
                {generatedId}
              </span>
              <p className="text-xs text-indigo-400 mt-2 font-bold uppercase">Yaratilgan Kod</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={generateRM}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              KODNI GENERATSIYA QILISH
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mijoz Ism Familiyasi</label>
            <input
              type="text"
              required
              placeholder="Masalan: Alisher Toshmatov"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon raqami</label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!generatedId}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            generatedId 
              ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-lg' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          MA'LUMOTLARNI SAQLASH
        </button>
      </form>
    </div>
  );
};

export default RMGenerator;
