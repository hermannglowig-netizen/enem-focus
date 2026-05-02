"use client";

import React, { useState } from 'react';
import { CRONOGRAMA_COMPLETO, CORES_MATERIAS } from "../../lib/constants";

export default function DashboardPage() {
  const [semanaAtual, setSemanaAtual] = useState(1);
  const [concluidas, setConcluidas] = useState<string[]>([]);
  
  const dadosDaSemana = CRONOGRAMA_COMPLETO[semanaAtual] || CRONOGRAMA_COMPLETO[1];

  // Cálculo de progresso (considera apenas as tarefas da SEMANA que está na tela)
  const totalTarefasSemana = dadosDaSemana.reduce((acc, dia) => acc + dia.tarefas.length, 0);
  const concluidasNestaSemana = concluidas.filter(id => id.startsWith(`sem-${semanaAtual}-`));
  const progresso = Math.round((concluidasNestaSemana.length / totalTarefasSemana) * 100) || 0;

  const toggleTarefa = (id: string) => {
    setConcluidas(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header com Barra de Progresso */}
      <header className="bg-white border-b border-gray-200 px-4 py-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Enem<span className="text-blue-600">Focus</span>
            </h1>
            <div className="flex gap-2">
               <button onClick={() => setSemanaAtual(s => Math.max(1, s - 1))} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">←</button>
               <button onClick={() => setSemanaAtual(s => s + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all active:scale-95">Semana {semanaAtual} →</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Seu Foco da Semana</span>
              <span className="text-sm font-black text-blue-600">{progresso}%</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-700 ease-in-out"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <div className="grid gap-10">
          {dadosDaSemana.map((item: any) => (
            <section key={`${semanaAtual}-${item.dia}`} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                {item.dia}
              </h2>
              
              <div className="grid gap-3">
                {item.tarefas.map((tarefa: any, idx: number) => {
                  // O ID ÚNICO: Agora ele amarra Semana + Dia + Tema. 
                  // Assim, "Matemática" na segunda da semana 1 é diferente da semana 2.
                  const idUnico = `sem-${semanaAtual}-${item.dia}-${tarefa.tema.replace(/\s+/g, '-')}`;
                  const estaMarcada = concluidas.includes(idUnico);
                  
                  return (
                    <div 
                      key={idUnico} 
                      onClick={() => toggleTarefa(idUnico)}
                      className={`group bg-white rounded-2xl p-5 border transition-all cursor-pointer flex items-center justify-between ${
                        estaMarcada ? 'border-blue-200 bg-blue-50/20 opacity-80' : 'border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                          estaMarcada ? 'bg-blue-600 border-blue-600 rotate-[360deg]' : 'border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {estaMarcada && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-tighter ${CORES_MATERIAS[tarefa.materia] || "bg-gray-100"}`}>
                            {tarefa.materia}
                          </span>
                          <h3 className={`font-bold text-lg mt-1 transition-all ${
                            estaMarcada ? 'text-gray-400 line-through' : 'text-gray-900'
                          }`}>
                            {tarefa.tema}
                          </h3>
                        </div>
                      </div>
                      
                      <div className={`text-xs font-bold ${estaMarcada ? 'text-blue-600' : 'text-gray-300'}`}>
                        {estaMarcada ? 'CONCLUÍDO' : 'PENDENTE'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}