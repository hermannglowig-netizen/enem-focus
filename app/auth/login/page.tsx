"use client";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Esse alerta vai saltar na sua tela, não tem como o navegador ignorar
    alert("O botão foi clicado com sucesso!"); 
    console.log("Tentando ir para a dashboard...");
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Teste de Login</h1>
      <button 
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg"
      >
        CLIQUE AQUI PARA ENTRAR
      </button>
    </div>
  );
}