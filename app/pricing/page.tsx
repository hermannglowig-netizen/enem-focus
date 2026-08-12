"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Ajuste a importação do Supabase se necessário
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribePremium = async () => {
    setLoading(true);

    try {
      // 1. Pega a sessão do usuário no Supabase
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Se o usuário não estiver logado, redireciona para a tela de login
        router.push("/login");
        return;
      }

      // 2. Chama a API de Checkout da AbacatePay
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          userEmail: session.user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // 3. Redireciona para o link do Pix/Checkout da AbacatePay
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao gerar cobrança do Pix.");
      }
    } catch (error) {
      console.error("Erro na assinatura:", error);
      alert("Ocorreu um erro ao processar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 text-slate-900 flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Escolha o plano ideal para a sua aprovação
        </h1>
        <p className="text-slate-500 mt-3 text-lg">
          Prepare-se para o Enem com foco total e recursos focados no seu resultado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Plano Gratuito */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Plano Gratuito</h2>
            <p className="text-3xl font-extrabold mt-4 text-slate-900">
              R$ 0 <span className="text-sm font-normal text-slate-500">/sempre</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 text-left">
              <li>✓ Acesso básico às matérias</li>
              <li>✓ Simulados simples</li>
              <li>✓ Suporte da comunidade</li>
            </ul>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-8 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all"
          >
            Acessar Grátis
          </button>
        </div>

        {/* Plano Premium */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-600 flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Recomendado
          </span>
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">Plano Premium</h2>
            <p className="text-3xl font-extrabold mt-4 text-slate-900">
              R$ 24,99 <span className="text-sm font-normal text-slate-500">/mês</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 text-left">
              <li>✓ Acesso ilimitado a todas as matérias</li>
              <li>✓ IA de Correção de Redação</li>
              <li>✓ Cronograma personalizado avançado</li>
              <li>✓ Análise detalhada de métricas e desempenho</li>
            </ul>
          </div>
          <button
            onClick={handleSubscribePremium}
            disabled={loading}
            className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-indigo-200"
          >
            {loading ? "Gerando Pix..." : "Assinar Premium via Pix"}
          </button>
        </div>
      </div>
    </div>
  );
}