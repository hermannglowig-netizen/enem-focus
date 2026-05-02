"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { generateStudyCycle, formatMinutes, SubjectInput } from '../../utils/generateStudyCycle';
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
      if (!user) router.push('/login');
      else {
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

  if (loading) return <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Carregando...</div>;

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1e293b' }}>
      
      {/* HEADER */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#4f46e5', padding: '6px', borderRadius: '8px', color: '#fff' }}>
            <BookOpen size={20} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>Enem<span style={{ color: '#4f46e5' }}>Focus</span></span>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LogOut size={16} /> SAIR
        </button>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* COLUNA ESQUERDA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Nova Disciplina</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none' }}
                  placeholder="Nome da matéria"
                  value={nomeMateria}
                  onChange={(e) => setNomeMateria(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="number" 
                    style={{ width: '60px', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold', color: '#4f46e5' }}
                    value={pesoMateria}
                    onChange={(e) => setPesoMateria(Number(e.target.value))}
                  />
                  <button 
                    onClick={adicionarMateria}
                    style={{ flex: 1, backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Plus size={18} /> Adicionar
                  </button>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#0f172a', borderRadius: '16px', padding: '24px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Carga Horária</span>
                <Clock size={18} color="#818cf8" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900 }}>{horasDisponiveis}h <span style={{ fontSize: '0.875rem', color: '#64748b' }}>/dia</span></div>
              <input 
                type="range" min="1" max="12" 
                value={horasDisponiveis}
                onChange={(e) => setHorasDisponiveis(Number(e.target.value))}
                style={{ width: '100%', marginTop: '20px', accentColor: '#4f46e5' }}
              />
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', marginLeft: '10px' }}>Ciclo de Estudos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {materias.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', border: '2px dashed #e2e8f0', color: '#94a3b8' }}>Nenhuma matéria.</div>
              ) : (
                ciclo.sessions.map((s) => (
                  <div key={s.id} style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f3ff', color: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {s.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{s.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>PESO {s.weight}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 900, fontSize: '1.25rem' }}>{formatMinutes(s.allocatedMinutes)}</div>
                        <div style={{ fontSize: '0.65rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase' }}>Duração</div>
                      </div>
                      <button onClick={() => excluirMateria(s.id)} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                        <Trash2 size={18} />
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