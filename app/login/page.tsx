"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) setError(error.message);
    else alert('Verifique seu e-mail para confirmar o cadastro!');
    
    setLoading(false);
  };

  return (
    <div style={{ 
      backgroundColor: '#f1f5f9', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: '#fff', 
        width: '100%', 
        maxWidth: '400px', 
        borderRadius: '24px', 
        padding: '40px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e2e8f0'
      }}>
        
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            backgroundColor: '#4f46e5', 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff',
            margin: '0 auto 16px'
          }}>
            <BookOpen size={28} />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1e293b', margin: 0 }}>
            Enem<span style={{ color: '#4f46e5' }}>Focus</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '8px' }}>
            Sua aprovação começa com organização.
          </p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: '#fef2f2', 
            color: '#b91c1c', 
            padding: '12px', 
            borderRadius: '10px', 
            fontSize: '0.8rem', 
            fontWeight: 600, 
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* CAMPO EMAIL */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 40px', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                backgroundColor: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* CAMPO SENHA */}
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 40px', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                backgroundColor: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#4f46e5', 
              color: '#fff', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '12px', 
              fontWeight: 700, 
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              marginTop: '8px'
            }}
          >
            {loading ? 'Entrando...' : 'Acessar Painel'} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Não tem uma conta?{' '}
            <button 
              onClick={handleSignUp}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#4f46e5', 
                fontWeight: 700, 
                cursor: 'pointer',
                padding: 0
              }}
            >
              Criar conta grátis
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}