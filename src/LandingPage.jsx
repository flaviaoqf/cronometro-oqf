import { Clock, Play, BarChart2, BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const COLORS = {
  black: '#030303',
  blackSecondary: '#0B0B0B',
  grafite: '#111113',
  silverMain: '#D7D7D9',
  silverSecondary: '#9F9FA6',
  white: '#F8F8FC',
  bluePremium: '#0BA4FF',
  redPremium: '#842318',
};

const LandingPage = ({ onStart }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const faqs = [
    { q: 'O cronometro de estudos e gratuito?', a: 'Sim! O Cronometro de Estudos OQF e totalmente gratuito. Basta criar sua conta e comecar a registrar suas horas de estudo agora mesmo.' },
    { q: 'Precisa instalar algum aplicativo?', a: 'Nao. O cronometro funciona direto no navegador, em qualquer dispositivo. Sem downloads, sem instalacao.' },
    { q: 'Como funciona o controle de horas estudadas?', a: 'Voce inicia o cronometro ao comecar a estudar, informa o assunto e finaliza quando terminar. O sistema registra automaticamente a duracao de cada sessao e calcula suas estatisticas.' },
    { q: 'O cronometro serve para concurseiros?', a: 'Sim! E especialmente pensado para quem se prepara para concursos publicos, vestibulares e certificacoes.' },
    { q: 'Meus dados ficam salvos?', a: 'Sim. Todo o seu historico de sessoes fica salvo na sua conta e voce pode consultar a qualquer momento, de qualquer dispositivo.' },
  ];

  const benefits = [
    { icon: Clock, title: 'Controle total do seu tempo', desc: 'Saiba exatamente quantas horas voce estuda por dia, semana e mes.' },
    { icon: BarChart2, title: 'Estatisticas detalhadas', desc: 'Veja sua media diaria, tempo total e evolucao ao longo do tempo.' },
    { icon: BookOpen, title: 'Registro por assunto', desc: 'Anote qual materia voce estudou em cada sessao e organize seu historico.' },
    { icon: CheckCircle, title: 'Funciona em qualquer dispositivo', desc: 'Acesse pelo celular, tablet ou computador sem instalar nada.' },
  ];

  const steps = [
    { n: '1', text: 'Crie sua conta gratuita em segundos, sem cartao de credito.' },
    { n: '2', text: 'Inicie o cronometro, informe o assunto que esta estudando e deixe correr.' },
    { n: '3', text: 'Finalize a sessao e acompanhe suas estatisticas de horas estudadas.' },
  ];

  const styles = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #030303 0%, #0B0B0B 50%, #111113 100%)', color: COLORS.white, fontFamily: 'system-ui, -apple-system, sans-serif' },
    nav: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(3,3,3,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(215,215,217,0.1)' },
    navInner: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    logoWrap: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoText: { fontSize: '11px', color: '#9F9FA6', margin: 0 },
    ctaBtn: { background: COLORS.bluePremium, color: COLORS.white, border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em' },
    hero: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '32px' },
    h1: { fontSize: '48px', fontWeight: '900', color: COLORS.white, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' },
    subtitle: { fontSize: '18px', color: COLORS.silverSecondary, margin: 0, maxWidth: '560px' },
    timerBox: { background: 'rgba(11,164,255,0.05)', border: '1px solid rgba(11,164,255,0.2)', borderRadius: '24px', padding: '40px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', backdropFilter: 'blur(20px)', boxShadow: '0 0 60px rgba(11,164,255,0.08)' },
    timerDisplay: { fontSize: '72px', fontWeight: '900', color: COLORS.white, fontFamily: 'monospace', letterSpacing: '-0.02em', margin: 0 },
    sessionDot: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: COLORS.silverSecondary },
    dot: { width: '8px', height: '8px', borderRadius: '50%', background: COLORS.bluePremium },
    startBtn: { background: COLORS.bluePremium, color: COLORS.white, border: 'none', borderRadius: '10px', padding: '16px 40px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.08em', marginTop: '8px' },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' },
    sectionTitle: { fontSize: '32px', fontWeight: '800', color: COLORS.white, margin: '0 0 8px 0', textAlign: 'center' },
    sectionSub: { fontSize: '16px', color: COLORS.silverSecondary, textAlign: 'center', margin: '0 0 40px 0' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
    card: { background: 'rgba(17,17,19,0.8)', border: '1px solid rgba(215,215,217,0.08)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' },
    cardTitle: { fontSize: '16px', fontWeight: '700', color: COLORS.white, margin: 0 },
    cardDesc: { fontSize: '14px', color: COLORS.silverSecondary, margin: 0, lineHeight: 1.5 },
    stepsWrap: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px', margin: '0 auto' },
    step: { display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(17,17,19,0.6)', border: '1px solid rgba(215,215,217,0.08)', borderRadius: '12px', padding: '20px' },
    stepNum: { width: '32px', height: '32px', borderRadius: '50%', background: COLORS.bluePremium, color: COLORS.white, fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    stepText: { margin: 0, fontSize: '15px', color: COLORS.silverMain, lineHeight: 1.5 },
    faqWrap: { maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' },
    faqItem: { background: 'rgba(17,17,19,0.7)', border: '1px solid rgba(215,215,217,0.08)', borderRadius: '12px', overflow: 'hidden' },
    faqQ: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', color: COLORS.white, background: 'none', border: 'none', width: '100%', textAlign: 'left' },
    faqA: { padding: '0 20px 18px', fontSize: '14px', color: COLORS.silverSecondary, lineHeight: 1.6, margin: 0 },
    ctaSection: { background: 'rgba(11,164,255,0.06)', borderTop: '1px solid rgba(11,164,255,0.15)', borderBottom: '1px solid rgba(11,164,255,0.15)', padding: '60px 24px', textAlign: 'center' },
    footer: { background: COLORS.black, borderTop: '1px solid rgba(215,215,217,0.06)', padding: '24px', textAlign: 'center' },
    footerText: { fontSize: '13px', color: COLORS.silverSecondary, margin: 0, letterSpacing: '0.05em' },
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logoWrap}>
            <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png" alt="OQF" style={{ width: '36px', height: '36px' }} />
            <p style={styles.logoText}>OQF</p>
          </div>
          <button style={styles.ctaBtn} onClick={onStart}>
            ENTRAR / CADASTRAR
          </button>
        </div>
      </nav>

      <section style={styles.hero}>
        <h1 style={styles.h1}>
          Cronometro de Estudos<br />Online Gratis
        </h1>
        <p style={styles.subtitle}>
          Timer de estudo online para controlar suas horas estudadas.
          Ideal para concurseiros, vestibulandos e quem quer conquistar disciplina real.
        </p>
        <div style={styles.timerBox}>
          <p style={styles.timerDisplay}>00:00:00</p>
          <div style={styles.sessionDot}>
            <span style={styles.dot}></span>
            PRONTO PARA COMECAR
          </div>
          <button style={styles.startBtn} onClick={onStart}>
            COMECAR AGORA
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Por que usar o cronometro de estudos OQF?</h2>
        <p style={styles.sectionSub}>Contador de horas de estudo com estatisticas, historico e controle por assunto.</p>
        <div style={styles.grid}>
          {benefits.map((b, i) => (
            <div key={i} style={styles.card}>
              <b.icon size={24} color={COLORS.bluePremium} />
              <p style={styles.cardTitle}>{b.title}</p>
              <p style={styles.cardDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Como usar o timer de estudo online</h2>
        <p style={styles.sectionSub}>Em 3 passos simples voce tem controle total das suas horas estudadas.</p>
        <div style={styles.stepsWrap}>
          {steps.map((s, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepNum}>{s.n}</div>
              <p style={styles.stepText}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.ctaSection}>
        <h2 style={{ ...styles.sectionTitle, marginBottom: '12px' }}>Comece a controlar suas horas hoje</h2>
        <p style={{ ...styles.sectionSub, marginBottom: '28px' }}>Cronometro para concurseiros e estudantes. Gratis, sem instalacao.</p>
        <button style={styles.startBtn} onClick={onStart}>COMECAR AGORA</button>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Perguntas Frequentes</h2>
        <p style={styles.sectionSub}>Tire suas duvidas sobre o cronometro de estudos online.</p>
        <div style={styles.faqWrap}>
          {faqs.map((f, i) => (
            <div key={i} style={styles.faqItem}>
              <button style={styles.faqQ} onClick={() => toggleFaq(i)}>
                <span>{f.q}</span>
                {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === i && <p style={styles.faqA}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>OQF - O QUE EU FARIA - DISCIPLINA HOJE, LIBERDADE AMANHA</p>
      </footer>
    </div>
  );
};

export default LandingPage;
