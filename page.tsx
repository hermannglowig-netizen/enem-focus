"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { generateStudyCycle, formatMinutes, SubjectInput } from '@/utils/generateStudyCycle';
import { Trash2, Plus, Clock, BookOpen, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [materias, setMaterias] = useState<SubjectInput[]>([]);
  const [nomeMateria, setNomeMateria] = useState("");
  const [pesoMateria, setPesoMateria] = useState(1);
  const [horasDisponiveis, setHorasDisponiveis] = useState(4);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
      } else {
        setLoading(false);
        carregarMaterias();
      }
    };
    checkUser();
  }, [router]);

  const carregarMaterias = async () => {
    const { data, error } = await supabase
      .from('materias')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMaterias(data.map((item: any) => ({
        id: item.id,
        name: item.nome,
        weight: item.peso
      })));
    }
  };

  const adicionarMateria = async () => {
    if (nomeMateria.trim() === "") return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('materias')
      .insert([{ nome: nomeMateria, peso: pesoMateria, user_id: user.id }])
      .select();

    if (!error && data) {
      setMaterias(prev => [...prev, { id: data[0].id, name: data[0].nome, weight: data[0].peso }]);
      setNomeMateria("");
      setPesoMateria(1);
    }
  };

  const excluirMateria = async (id: string) => {
    const { error } = await supabase.from('materias').delete().eq('id', id);
    if (!error) setMaterias(prev => prev.filter(m => m.id !== id));
  };

  const ciclo = generateStudyCycle(materias, horasDisponiveis);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-sans bg-slate-50 text-indigo-600 font-bold">
        Carregando seu plano de estudos...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Enem<span className="text-indigo-600">Focus</span>
          </span>
        </div>
        <button 
          onClick={() => supabase.auth.signOut().then(() => router.push('/auth/login'))} 
          className="text-slate-500 font-bold text-xs flex items-center gap-2 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} /> SAIR
        </button>
      </nav>

      <main className="max-w-6xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* COLUNA ESQUERDA - CONFIGURAÇÕES */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Nova Disciplina</h3>
              <div className="space-y-4">
                <input 
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Ex: Matemática, Redação..."
                  value={nomeMateria}
                  onChange={(e) => setNomeMateria(e.target.value)}
                />
                <div className="flex gap-3">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-slate-400 mb-1 ml-1">PESO</span>
                     <input 
                      type="number" 
                      className="w-16 p-3 rounded-xl border border-slate-200 text-center font-bold text-indigo-600 outline-none"
                      value={pesoMateria}
                      onChange={(e) => setPesoMateria(Number(e.target.value))}
                    />
                  </div>
                  <button 
                    onClick={adicionarMateria}
                    className="flex-1 mt-5 bg-indigo-600 text-white border-none rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Adicionar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carga Horária</span>
                <Clock size={18} className="text-indigo-400" />
              </div>
              <div className="text-3xl font-black">{horasDisponiveis}h <span className="text-sm text-slate-500">/dia</span></div>
              <input 
                type="range" min="1" max="12" 
                value={horasDisponiveis}
                onChange={(e) => setHorasDisponiveis(Number(e.target.value))}
                className="w-full mt-6 accent-indigo-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                Ajuste o tempo total que você tem disponível para estudar hoje.
              </p>
            </div>
          </div>

          {/* COLUNA DIREITA - O CICLO */}
          <div className="md:col-span-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 ml-2">Ciclo de Estudos Sugerido</h3>
            <div className="space-y-3">
              {materias.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                  <BookOpen size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="font-medium">Nenhuma matéria adicionada ainda.</p>
                </div>
              ) : (
                ciclo.sessions.map((s) => (
                  <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-lg">
                        {s.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-slate-800">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Peso {s.weight}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-black text-2xl text-slate-900">{formatMinutes(s.allocatedMinutes)}</div>
                        <div className="text-[9px] text-indigo-600 font-black uppercase tracking-widest">Duração</div>
                      </div>
                      <button 
                        onClick={() => excluirMateria(s.id)} 
                        className="text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}