"use client";

import Link from 'next/link';
import { BookOpen, ArrowRight, Star, Layout, Shield, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1e293b', overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <nav style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0', 
        height: '72px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ backgroundColor: '#4f46e5', padding: '6px', borderRadius: '8px', color: '#fff', display: 'flex' }}>
              <BookOpen size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.025em' }}>Enem<span style={{ color: '#4f46e5' }}>Focus</span></span>
          </div>
          <Link href="/login" style={{ 
            textDecoration: 'none', 
            color: '#4f46e5', 
            fontWeight: 700, 
            fontSize: '0.85rem', 
            padding: '8px 16px', 
            borderRadius: '10px',
            backgroundColor: '#f5f3ff'
          }}>
            Entrar
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: '#eef2ff', 
          color: '#4f46e5', 
          padding: '8px 16px', 
          borderRadius: '30px', 
          fontSize: '0.7rem', 
          fontWeight: 800, 
          display: 'inline-block', 
          marginBottom: '20px', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          border: '1px solid #e0e7ff'
        }}>
          🚀 Inteligência para sua Aprovação
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', // Isso faz o texto diminuir no celular e aumentar no PC
          fontWeight: 900, 
          lineHeight: 1, 
          letterSpacing: '-0.05em', 
          marginBottom: '24px', 
          color: '#0f172a' 
        }}>
          O fim da bagunça nos seus <span style={{ color: '#4f46e5' }}>estudos.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#64748b', lineHeight: 1.6, marginBottom: '40px', maxWidth: '650px', margin: '0 auto 40px' }}>
          O EnemFocus organiza seu ciclo de estudo baseado no peso das matérias e no tempo que você tem. Estude o que importa.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/login" style={{ 
            textDecoration: 'none', 
            backgroundColor: '#4f46e5', 
            color: '#fff', 
            padding: '16px 32px', 
            borderRadius: '14px', 
            fontWeight: 700, 
            fontSize: '1rem', 
            boxShadow: '0 15px 20px -5px rgba(79, 70, 229, 0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            width: 'auto'
          }}>
            Começar Agora Grátis <ArrowRight size={20} />
          </Link>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 20px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Como ajudamos você?</h2>
            <p style={{ color: '#64748b' }}>Simplicidade para você focar no conteúdo.</p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', // MÁGICA DO CELULAR: Se não couber, ele joga o card para baixo
            gap: '20px',
            justifyContent: 'center'
          }}>
            {/* Card 1 */}
            <div style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              flex: '1 1 300px', // O card tenta ter 300px, mas cresce se sobrar espaço
              maxWidth: '350px' 
            }}>
              <div style={{ color: '#4f46e5', marginBottom: '20px' }}><Layout size={28} /></div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Ciclo Automático</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>Distribuição proporcional baseada no tempo diário disponível.</p>
            </div>

            {/* Card 2 */}
            <div style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              flex: '1 1 300px',
              maxWidth: '350px'
            }}>
              <div style={{ color: '#4f46e5', marginBottom: '20px' }}><Star size={28} /></div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Prioridade ENEM</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>O sistema prioriza o que realmente cai e o que você mais precisa.</p>
            </div>

            {/* Card 3 */}
            <div style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              flex: '1 1 300px',
              maxWidth: '350px'
            }}>
              <div style={{ color: '#4f46e5', marginBottom: '20px' }}><Shield size={28} /></div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Zero Distração</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>Dashboard limpo para você entrar, ver o ciclo e começar a estudar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
        <p>© 2026 Desenvolvido por <span style={{color: '#4f46e5', fontWeight: 700}}>HZ Tech</span></p>
      </footer>
    </div>
  );
}