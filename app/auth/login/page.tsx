"use client";

import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Log para depuração no console do navegador
    console.log("Tentando iniciar sessão...");
    
    // Exibe o alerta que você solicitou para confirmar o clique
    alert("O botão foi clicado com sucesso!"); 

    try {
      // Aqui você poderá adicionar a lógica real de auth futuramente:
      // const { data, error } = await supabase.auth.signInWithPassword(...)
      
      console.log("Navegando para a dashboard...");
      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao redirecionar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
            Enem-Focus
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            Sua aprovação começa aqui
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">Área de Acesso</span>
            </div>
          </div>

          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'CARREGANDO...' : 'ENTRAR NO SISTEMA'}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          &copy; 2026 Enem-Focus - Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}