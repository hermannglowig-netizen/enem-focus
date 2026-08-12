"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 flex flex-col items-center">
        
        {/* Ícone do Topo / Header */}
        <div className="flex items-center justify-center bg-indigo-600 text-white rounded-xl p-3 mb-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Enem<span className="text-indigo-600">Focus</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Sua aprovação começa com organização.
        </p>

        {/* Grid dos Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
          
          {/* Card Plano Grátis */}
          <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:border-gray-300 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Plano Grátis</h2>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                  Básico
                </span>
              </div>

              <ul className="space-y-3 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Cronograma Básico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span> Métricas de Base
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-gray-300 font-bold">✕</span> Repetição Espaçada
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-gray-300 font-bold">✕</span> Simulados TRI Ilimitados
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-gray-900">R$ 0</span>
                <span className="text-xs text-gray-500"> / mês</span>
              </div>
              <Link 
                href="/register?plan=free"
                className="block text-center w-full py-2.5 px-4 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-colors text-sm"
              >
                Selecionar Grátis
              </Link>
            </div>
          </div>

          {/* Card Plano Premium */}
          <div className="border-2 border-indigo-600 rounded-xl p-6 flex flex-col justify-between relative bg-indigo-50/20 shadow-sm">
            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
              Melhor Valor
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Plano Premium</h2>
              </div>

              <ul className="space-y-3 mb-6 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">✓</span> <span className="font-medium">Cronograma Inteligente</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">✓</span> <span className="font-medium">Repetição Espaçada</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">✓</span> <span className="font-medium">Simulados TRI Ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">✓</span> <span className="font-medium">Análise de Desempenho</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-gray-900">R$ 39,90</span>
                <span className="text-xs text-gray-500"> / mês</span>
              </div>
              <Link 
                href="/checkout?plan=premium"
                className="block text-center w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-semibold rounded-lg shadow-md transition-colors text-sm"
              >
                Escolher Premium
              </Link>
            </div>
          </div>

        </div>

        {/* Rodapé direcionando de volta pro Login */}
        <p className="text-xs text-gray-500 mt-2">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline font-semibold">
            Acessar Painel
          </Link>
        </p>

      </div>
    </div>
  );
}