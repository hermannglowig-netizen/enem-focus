"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard'); // Ajuste aqui para a rota pós-login do seu projeto
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center">
        
        {/* Logo / Header */}
        <div className="flex items-center justify-center bg-indigo-600 text-white rounded-xl p-3 mb-3">
          <BookOpen className="w-7 h-7" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Enem<span className="text-indigo-600">Focus</span>
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sua aprovação começa com organização.
        </p>

        {/* Mensagem de Erro (se houver) */}
        {error && (
          <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 text-center border border-red-200">
            {error}
          </div>
        )}

        {/* Formulário de Login */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-gray-800"
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Acessando..." : "Acessar Painel"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Link para a página de escolha de plano */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Não tem uma conta?{" "}
          <Link href="/pricing" className="text-indigo-600 font-semibold hover:underline">
            Criar conta grátis
          </Link>
        </p>

      </div>
    </div>
  );
}