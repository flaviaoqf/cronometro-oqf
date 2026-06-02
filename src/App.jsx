import LandingPage from './LandingPage';
import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, Square, Clock, Flame, Menu, X,
  ChevronRight, Crown, Leaf, LogOut, Eye, EyeOff
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const COLORS = {
  black: '#030303',
  blackSecondary: '#070708',
  grafite: '#111113',
  silverMain: '#D7D7D9',
  silverSecondary: '#9F9FA6',
  white: '#F8FAFC',
  bluePremium: '#0A84FF',
  redPremium: '#B42318'
};

// ============================================
// TELA DE LOGIN / CADASTRO
// ============================================
const AuthScreen = () => {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'register') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { name: form.name, phone: form.phone } }
        });
        if (signUpError) throw signUpError;

        if (data.user) {
          await supabase.from('study_timer_profiles').upsert([{
            id: data.user.id,
            name: form.name,
            email: form.email,
            phone: form.phone
          }]);
        }
        setSuccess('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });
        if (signInError) throw signInError;
      }
    } catch (err) {
      const msgs = {
        'Invalid login credentials': 'E-mail ou senha incorretos.',
        'User already registered': 'E-mail já cadastrado. Faça login.',
        'Password should be at least 6 characters': 'A senha deve ter ao menos 6 caracteres.',
        'Unable to validate email address: invalid format': 'E-mail inválido.',
        'Email not confirmed': 'Confirme seu e-mail antes de entrar.'
      };
      setError(msgs[err.message] || err.message);
    } finally {
      setLoading(false);
    }
  };

    const handleForgotPassword = async (e) => {
          e.preventDefault();
          if (!forgotEmail) { setError('Digite seu e-mail.'); return; }
          setLoading(true); setError(''); setSuccess('');
          try {
                  const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
                            redirectTo: window.location.origin
                  });
                  if (error) throw error;
                  setSuccess('E-mail enviado! Verifique sua caixa de entrada para redefinir sua senha.');
          } catch (err) {
                  setError('Nao foi possivel enviar o e-mail. Verifique o endereco digitado.');
          } finally {
                  setLoading(false);
          }
    };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(17,17,19,0.8)',
    border: '1px solid rgba(215,215,217,0.15)',
    color: COLORS.white,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 200ms ease'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{
      background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.blackSecondary} 50%, ${COLORS.grafite} 100%)`
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div className="text-center mb-10">
          <img
            src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png"
            alt="OQF" className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-light mb-1" style={{ color: COLORS.white }}>
            CRONÔMETRO DE ESTUDO
          </h1>
          <p className="text-sm" style={{ color: COLORS.silverSecondary }}>OQF – O Que Eu Faria</p>
        </div>

        <div className="rounded-2xl p-8" style={{
          background: 'rgba(7,7,8,0.6)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(215,215,217,0.15)'
        }}>
          <div className="flex mb-8 rounded-xl overflow-hidden" style={{ background: 'rgba(17,17,19,0.8)' }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                style={{
                  flex: 1, padding: '12px', fontSize: '13px', fontWeight: '600',
                  background: mode === m ? COLORS.bluePremium : 'transparent',
                  color: mode === m ? 'white' : COLORS.silverSecondary,
                  border: 'none', cursor: 'pointer', borderRadius: '10px',
                  transition: 'all 200ms ease'
                }}>
                {m === 'login' ? 'JÁ TENHO CONTA' : 'CRIAR CONTA'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'register' && (
              <input name="name" type="text" placeholder="Nome completo"
                value={form.name} onChange={handleChange} required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(215,215,217,0.15)'}
              />
            )}

            <input name="email" type="email" placeholder="Seu e-mail"
              value={form.email} onChange={handleChange} required style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(215,215,217,0.15)'}
            />

            {mode === 'register' && (
              <input name="phone" type="tel" placeholder="WhatsApp com DDD (ex: 11912345678)"
                value={form.phone} onChange={handleChange} required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(215,215,217,0.15)'}
              />
            )}

            <div style={{ position: 'relative' }}>
              <input name="password" type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Crie uma senha (mín. 6 caracteres)' : 'Sua senha'}
                value={form.password} onChange={handleChange} required
                style={{ ...inputStyle, paddingRight: '48px' }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(215,215,217,0.15)'}
              />
              <button type="button" onClick={() => setShowPassword(p => !p)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: COLORS.silverSecondary
              }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div style={{
                padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
                background: 'rgba(180,35,24,0.15)', border: '1px solid rgba(180,35,24,0.3)',
                color: '#ff7070'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
                background: 'rgba(10,132,255,0.15)', border: '1px solid rgba(10,132,255,0.3)',
                color: '#6bb8ff'
              }}>
                {success}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '16px', borderRadius: '12px', fontWeight: '700',
              fontSize: '14px', letterSpacing: '0.05em', marginTop: '4px',
              background: loading ? 'rgba(10,132,255,0.4)' : COLORS.bluePremium,
              color: 'white', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(10,132,255,0.25)',
              transition: 'all 200ms ease'
            }}>
              {loading ? 'AGUARDE...' : mode === 'login' ? 'ENTRAR' : 'CRIAR MINHA CONTA'}
            </button>
          </form>

          {mode === 'login' && !showForgotPassword && (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                                  <button type="button" onClick={() => { setShowForgotPassword(true); setError(''); setSuccess(''); }}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.bluePremium, fontSize: '13px' }}>
                                                    Esqueci minha senha
                                  </button>
                  </div>
                )}

          {showForgotPassword && (
                  <form onSubmit={handleForgotPassword} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  <p style={{ textAlign: 'center', fontSize: '13px', color: COLORS.silverSecondary, margin: 0 }}>Digite seu e-mail para receber o link de redefinicao de senha.</p>p>
                                  <input type="email" placeholder="Seu e-mail" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required style={inputStyle}
                                                    onFocus={(e) => e.target.style.borderColor = 'rgba(10,132,255,0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(215,215,217,0.15)'} />
                                  <button type="submit" disabled={loading} style={{ padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', background: loading ? 'rgba(10,132,255,0.4)' : COLORS.bluePremium, color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
                                    {loading ? 'ENVIANDO...' : 'ENVIAR LINK DE REDEFINICAO'}
                                  </button>
                                  <button type="button" onClick={() => { setShowForgotPassword(false); setError(''); setSuccess(''); setForgotEmail(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.silverSecondary, fontSize: '13px', textAlign: 'center' }}>
                                                    Voltar para o login
                                  </button>
                  </form>
                )}

          {mode === 'register' && (
            <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px', color: COLORS.silverSecondary }}>
              Seus dados são protegidos e usados apenas para personalizar sua experiência no OQF.
            </p>
          )}
        </div>

        <p style={{
          textAlign: 'center', marginTop: '24px', fontSize: '12px',
          fontStyle: 'italic', color: COLORS.silverSecondary, fontFamily: 'Georgia, serif'
        }}>
          "Deus nos deu espírito de disciplina." — 2 Timóteo 1:7
        </p>
      </div>
    </div>
  );
};

// ============================================
// TIMER DISPLAY
// ============================================
const TimerDisplay = ({ seconds, isRunning }) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex justify-center mb-12">
      <style>{`
        @keyframes pulse-subtle { 0%,100%{opacity:1} 50%{opacity:0.97} }
        .timer-running { animation: pulse-subtle 2s ease-in-out infinite; }
      `}</style>
      <div className={`relative w-full max-w-2xl ${isRunning ? 'timer-running' : ''}`}>
        <div className="absolute inset-0 rounded-3xl" style={{
          background: 'linear-gradient(135deg,rgba(215,215,217,0.08) 0%,rgba(159,159,166,0.04) 100%)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(215,215,217,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(248,250,252,0.1),inset 0 -1px 0 rgba(0,0,0,0.3)'
        }} />
        <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png"
          alt="OQF" className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 z-10"
          style={{ filter: 'brightness(1.1)' }}
        />
        <div className="relative z-10 px-8 py-12 text-center">
          <div className="mb-8 flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full" style={{
              backgroundColor: COLORS.bluePremium,
              boxShadow: `0 0 8px ${COLORS.bluePremium}`
            }} />
            <span className="text-xs tracking-widest font-medium" style={{ color: COLORS.silverSecondary }}>
              {isRunning ? 'SESSÃO EM ANDAMENTO' : 'PRONTO PARA INICIAR'}
            </span>
          </div>
          <div className="text-7xl md:text-8xl font-light tracking-tight mb-6 font-mono"
            style={{ color: COLORS.white, letterSpacing: '-0.02em' }}>
            {fmt(h)}:{fmt(m)}:{fmt(s)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// INPUT DE ASSUNTO
// ============================================
const SubjectInput = ({ subject, setSubject }) => (
  <div className="mb-8 max-w-2xl mx-auto px-4">
    <input type="text" placeholder="Qual assunto você está estudando?"
      value={subject} onChange={(e) => setSubject(e.target.value)}
      className="w-full px-6 py-4 rounded-2xl text-center"
      style={{
        background: 'rgba(7,7,8,0.6)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(215,215,217,0.15)', color: COLORS.white,
        fontSize: '16px', outline: 'none', transition: 'all 200ms ease'
      }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(215,215,217,0.3)'; e.target.style.background = 'rgba(7,7,8,0.8)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(215,215,217,0.15)'; e.target.style.background = 'rgba(7,7,8,0.6)'; }}
    />
  </div>
);

// ============================================
// BOTÕES DE CONTROLE
// ============================================
const ControlButtons = ({ isRunning, onStart, onFinalize }) => (
  <div className="flex gap-4 justify-center mb-12 px-4 flex-col sm:flex-row max-w-2xl mx-auto">
    <button onClick={onStart}
      className="flex-1 py-4 px-8 rounded-xl font-bold tracking-wider flex items-center justify-center gap-2"
      style={{ background: COLORS.bluePremium, color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(10,132,255,0.25)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#1a94ff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.bluePremium; }}>
      {isRunning ? <><Pause size={20} /> PAUSAR</> : <><Play size={20} /> INICIAR</>}
    </button>
    <button onClick={onFinalize}
      className="flex-1 py-4 px-8 rounded-xl font-bold tracking-wider flex items-center justify-center gap-2"
      style={{ background: COLORS.redPremium, color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(180,35,24,0.25)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#d4351f'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.redPremium; }}>
      <Square size={20} /> FINALIZAR
    </button>
  </div>
);

// ============================================
// BANNER DE PUBLICIDADE
// ============================================
const AdBanner = ({ srcDesktop, srcMobile, href, alt = 'Publicidade' }) => {
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const currentSrc = isMobile && srcMobile ? srcMobile : srcDesktop;
  const imgStyle = isMobile && srcMobile
    ? { width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '8px', display: 'block' }
    : { width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', display: 'block' };
  return (
    <div style={{ width: '100%', maxWidth: '728px', margin: '12px auto', display: 'block' }}>
      <a href={href} target='_blank' rel='noopener noreferrer' style={{ display: 'block' }}>
        <img
          src={currentSrc}
          alt={alt}
          style={imgStyle}
        />
      </a>
    </div>
  );
};
// ============================================
// GRÁFICO SEMANAL
const WeeklyChart = ({ sessions }) => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const daily = Array(7).fill(0);
  sessions.forEach(s => {
    const d = new Date(s.started_at || s.created_at);
    const dayDiff = Math.floor((d - startOfWeek) / 86400000);
    if (dayDiff >= 0 && dayDiff < 7) daily[dayDiff] += (s.duration_seconds || 0);
  });
  const maxVal = Math.max(...daily, 1);
  const toHours = (s) => s >= 3600 ? (s/3600).toFixed(1) + 'h' : Math.floor(s/60) + 'm';
  return (
    <div style={{ marginBottom: '28px' }}>
      <p style={{ color: COLORS.silverSecondary, fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Semana atual — horas por dia</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '110px' }}>
        {daily.map((val, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: '10px', color: COLORS.silverSecondary, marginBottom: '3px', minHeight: '14px' }}>{val > 0 ? toHours(val) : ''}</div>
            <div style={{ width: '100%', height: Math.max(Math.round((val / maxVal) * 80), val > 0 ? 3 : 0) + 'px', background: i === now.getDay() ? COLORS.bluePremium : 'rgba(74,144,226,0.35)', borderRadius: '4px 4px 0 0', minHeight: val > 0 ? '3px' : '0px' }} />
            <div style={{ fontSize: '11px', color: i === now.getDay() ? COLORS.white : COLORS.silverSecondary, marginTop: '5px', fontWeight: i === now.getDay() ? '600' : '400' }}>{days[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// GRÁFICO MENSAL
const MonthlyChart = ({ sessions }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daily = Array(daysInMonth).fill(0);
  sessions.forEach(s => {
    const d = new Date(s.started_at || s.created_at);
    if (d.getFullYear() === year && d.getMonth() === month) {
      daily[d.getDate() - 1] += (s.duration_seconds || 0);
    }
  });
  const maxVal = Math.max(...daily, 1);
  const w = 520, h = 90, padL = 28, padR = 8, padT = 8, padB = 22;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const toHours = (s) => (s / 3600).toFixed(1);
  const pts = daily.map((val, i) => ({
    x: padL + (daysInMonth > 1 ? (i / (daysInMonth - 1)) * chartW : chartW / 2),
    y: padT + chartH - (val / maxVal) * chartH
  }));
  const pathD = pts.map((p, i) => (i === 0 ? `M${p.x.toFixed(1)},${p.y.toFixed(1)}` : `L${p.x.toFixed(1)},${p.y.toFixed(1)}`)).join(' ');
  const areaD = pathD + ` L${pts[pts.length-1].x.toFixed(1)},${(padT+chartH).toFixed(1)} L${padL},${(padT+chartH).toFixed(1)} Z`;
  const todayPt = pts[now.getDate() - 1];
  return (
    <div style={{ marginBottom: '28px' }}>
      <p style={{ color: COLORS.silverSecondary, fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Mês atual — horas por dia</p>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '110px', display: 'block' }}>
        <defs><linearGradient id="mgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.bluePremium} stopOpacity="0.35" /><stop offset="100%" stopColor={COLORS.bluePremium} stopOpacity="0.02" /></linearGradient></defs>
        <path d={areaD} fill="url(#mgGrad)" />
        <path d={pathD} fill="none" stroke={COLORS.bluePremium} strokeWidth="1.8" strokeLinejoin="round" />
        {todayPt && <circle cx={todayPt.x.toFixed(1)} cy={todayPt.y.toFixed(1)} r="3.5" fill={COLORS.bluePremium} />}
        {[0, 6, 13, 20, daysInMonth-1].map(d => (<text key={d} x={(padL + (daysInMonth > 1 ? (d/(daysInMonth-1))*chartW : chartW/2)).toFixed(1)} y={h-3} fontSize="9" fill={COLORS.silverSecondary} textAnchor="middle">{d+1}</text>))}
        <text x={padL-4} y={padT+8} fontSize="9" fill={COLORS.silverSecondary} textAnchor="end">{toHours(maxVal)}h</text>
      </svg>
    </div>
  );
};


// ESTATÍSTICAS
// ============================================
const StatisticsSection = ({ sessions }) => {
  const totalSeconds = sessions.reduce((acc, s) => acc + (s.duration_seconds || 0), 0);
  const totalHours = `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m`;
  const avgMin = sessions.length > 0 ? Math.floor((totalSeconds / sessions.length) / 60) : 0;
  const averageDaily = `${avgMin}m`;

  const StatCard = ({ icon: Icon, label, value, sub }) => (
    <div className="flex-1 p-6 rounded-2xl" style={{
      background: 'linear-gradient(135deg,rgba(17,17,19,0.6) 0%,rgba(7,7,8,0.4) 100%)',
      backdropFilter: 'blur(20px)', border: '1px solid rgba(215,215,217,0.12)'
    }}>
      <div className="flex items-start gap-4">
        <Icon size={32} style={{ color: COLORS.bluePremium, opacity: 0.8 }} />
        <div>
          <p style={{ color: COLORS.silverSecondary, fontSize: '12px', fontWeight: '500' }}>{label}</p>
          <p className="text-2xl font-light mt-2" style={{ color: COLORS.white }}>{value}</p>
          {sub && <p style={{ color: COLORS.silverSecondary, fontSize: '11px', marginTop: '4px' }}>{sub}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <h3 className="mb-6 font-medium tracking-wide" style={{ color: COLORS.silverMain }}>SUAS ESTATÍSTICAS</h3>
      <div className="flex gap-4 flex-col sm:flex-row">
        <StatCard icon={Clock} label="TEMPO TOTAL" value={totalHours} sub="Horas estudadas" />
        <StatCard icon={Flame} label="MÉDIA POR SESSÃO" value={averageDaily} sub={`${sessions.length} sessões registradas`} />
      </div>
      <WeeklyChart sessions={sessions} />
      <MonthlyChart sessions={sessions} />
    </div>
  );
};

// ============================================
// OFERTAS PATROCINADAS
// ============================================
const SponsoredOffers = () => {
  const OfferCard = ({ Icon, title, description, extra, cta, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer"
      className="flex-1 p-6 rounded-2xl block no-underline"
      style={{ background: 'rgba(17,17,19,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(215,215,217,0.12)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(215,215,217,0.25)'; e.currentTarget.style.background = 'rgba(17,17,19,0.7)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(215,215,217,0.12)'; e.currentTarget.style.background = 'rgba(17,17,19,0.5)'; }}>
      <Icon size={28} style={{ color: COLORS.silverMain, marginBottom: '12px' }} />
      <h4 className="font-medium mb-2" style={{ color: COLORS.white }}>{title}</h4>
      <p className="text-sm mb-2" style={{ color: COLORS.silverSecondary }}>{description}</p>
      {extra && <p className="text-sm mb-4" style={{ color: COLORS.bluePremium }}>{extra}</p>}
      <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.bluePremium }}>
        {cta} <ChevronRight size={16} />
      </div>
    </a>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <h3 className="mb-6 font-medium tracking-wide" style={{ color: COLORS.silverMain }}>OFERTAS PATROCINADAS</h3>
      <div className="flex gap-4 flex-col sm:flex-row">
        <OfferCard Icon={Crown} title="Mentoria OQF"
          description="Estude com estratégia e alcance resultados extraordinários."
          cta="Saiba mais"
          link="https://app.lightforms.io/72mdKOz?utm_source=app_cronometro_oqf&utm_medium=botao_comercial&utm_campaign=lead_comercial_oqf"
        />
        <OfferCard Icon={Leaf} title="Suplementos para uma alimentação saudável"
          description="Suporte essencial para mais energia, foco e qualidade de vida."
          extra="Use o cupom: FAMILIAOQF" cta="Ver ofertas"
          link="https://soldiersnutrition.com.br/?utm_source=app_cronometro_oqf"
        />
      </div>
    </div>
  );
};

// ============================================
// HISTÓRICO
// ============================================
// HISTÓRICO
// ==========================================
const RecentHistory = ({ sessions, showAll = false }) => {
  const fmtDuration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0 && m > 0) return `${h}h${m}min estudados`;
    if (h > 0) return `${h}h estudadas`;
    if (m > 0) return `${m} min estudados`;
    return 'menos de 1 min';
  };
  const fmtDate = (d) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const displayed = showAll ? sessions : sessions.slice(0, 5);
  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <h3 className="mb-4 font-medium tracking-wide" style={{ color: COLORS.silverMain }}>HISTÓRICO RECENTE</h3>
      {displayed.length === 0 ? (
        <p style={{ color: COLORS.silverSecondary, fontSize: '14px' }}>Nenhuma sessão registrada ainda.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayed.map((s, i) => (
            <div key={i} style={{ background: 'rgba(17,17,19,0.5)', border: '1px solid rgba(215,215,217,0.10)', borderRadius: '12px', padding: '14px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ color: COLORS.white, fontWeight: '500', fontSize: '15px' }}>{s.subject || 'Sem título'}</span>
                <span style={{ color: COLORS.bluePremium, fontWeight: '600', fontSize: '14px' }}>{fmtDuration(s.duration_seconds || 0)}</span>
              </div>
              <div style={{ color: COLORS.silverSecondary, fontSize: '12px', marginTop: '4px' }}>{fmtDate(s.started_at || s.created_at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// ============================================
// TELA DE REDEFINICAO DE SENHA
// ============================================
const ResetPasswordScreen = ({ onDone }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas nao coincidem.'); return;
    }
    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.'); return;
    }
    setLoading(true); setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (updateError) { setError('Erro ao redefinir senha. Tente novamente.'); return; }
    setSuccess('Senha redefinida com sucesso!');
    setTimeout(() => { onDone(); }, 2000);
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(215,215,217,0.2)', background: 'rgba(255,255,255,0.05)', color: COLORS.white, fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.blackSecondary} 100%)`, padding: '20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px', border: '1px solid rgba(215,215,217,0.1)' }}>
        <h2 style={{ color: COLORS.white, textAlign: 'center', marginBottom: '8px', fontSize: '22px' }}>Nova senha</h2>
        <p style={{ color: COLORS.silverSecondary, textAlign: 'center', marginBottom: '24px', fontSize: '13px' }}>Digite e confirme sua nova senha</p>
        {success ? (
          <p style={{ color: COLORS.bluePremium, textAlign: 'center', fontWeight: '600' }}>{success}</p>
        ) : (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="password" placeholder="Nova senha" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Confirmar nova senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={inputStyle} />
            {error && <p style={{ color: '#ff6b6b', fontSize: '12px', textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ padding: '14px', borderRadius: '10px', background: COLORS.bluePremium, color: COLORS.white, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '14px' }}>
              {loading ? 'SALVANDO...' : 'SALVAR NOVA SENHA'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// HEADER
// ============================================
const Header = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabs = ['cronômetro', 'estatísticas', 'histórico'];
  const tabLabels = { 'cronômetro': 'CRONÔMETRO', 'estatísticas': 'ESTATÍSTICAS', 'histórico': 'HISTÓRICO' };
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Aluno';
  const initials = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50" style={{
      background: 'rgba(3,3,3,0.7)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(215,215,217,0.1)'
    }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png"
            alt="OQF" className="w-8 h-8" />
          <div>
            <p className="text-xs" style={{ color: COLORS.silverSecondary }}>OQF</p>
            <p className="text-sm font-medium" style={{ color: COLORS.white }}>O QUE EU FARIA</p>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                color: activeTab === tab ? COLORS.bluePremium : COLORS.silverSecondary,
                borderBottom: activeTab === tab ? `2px solid ${COLORS.bluePremium}` : '2px solid transparent',
                background: 'none', border: 'none',
                cursor: 'pointer', paddingBottom: '4px', fontSize: '13px', fontWeight: '500'
              }}>
              {tabLabels[tab]}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium" style={{ color: COLORS.white }}>{userName}</p>
            <p className="text-xs" style={{ color: COLORS.silverSecondary }}>Foco e disciplina</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${COLORS.bluePremium}, ${COLORS.redPremium})` }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{initials}</span>
          </div>
          <button onClick={onLogout} title="Sair"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.silverSecondary, padding: '4px' }}>
            <LogOut size={18} />
          </button>
        </div>

        <button className="sm:hidden p-2" style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} style={{ color: COLORS.silverMain }} /> : <Menu size={24} style={{ color: COLORS.silverMain }} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" style={{ borderTop: '1px solid rgba(215,215,217,0.1)', background: 'rgba(3,3,3,0.95)' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
              style={{
                color: activeTab === tab ? COLORS.bluePremium : COLORS.silverSecondary,
                background: 'none', border: 'none',
                borderBottom: '1px solid rgba(215,215,217,0.1)',
                cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px',
                fontSize: '14px', fontWeight: '500'
              }}>
              {tabLabels[tab]}
            </button>
          ))}
          <button onClick={onLogout}
            style={{
              color: COLORS.silverSecondary, background: 'none', border: 'none',
              cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px',
              fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
            <LogOut size={16} /> Sair
          </button>
        </div>
      )}
    </header>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function CronometroOQF() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState('cronômetro');
  const [showSessionRecovery, setShowSessionRecovery] = useState(false);
  const [toast, setToast] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
  const timerRef = useRef(null);

  // Monitorar autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true);
        } else {
          setUser(session?.user ?? null);
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  // Carregar sessões do Supabase quando o usuário logar
  useEffect(() => {
    if (!user) { setSessions([]); return; }

    const loadSessions = async () => {
      const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setSessions(data);
    };

    loadSessions();

    // Recuperar timer salvo localmente
    const savedState = localStorage.getItem('oqf_timer_state');
    if (savedState) {
      const { seconds: s, startedAt: sa, subject: sub, isRunning: was } = JSON.parse(savedState);
      if (was && s > 0) {
        const elapsed = Math.floor((Date.now() - new Date(sa).getTime()) / 1000);
        setSeconds(s + elapsed);
        setStartedAt(sa);
        setSubject(sub || '');
        setIsRunning(true); // retoma automaticamente, sem popup
      } else {
        setSeconds(s || 0);
        setSubject(sub || '');
      }
    }
  }, [user]);

  // Salvar estado do timer localmente
  useEffect(() => {
    localStorage.setItem('oqf_timer_state', JSON.stringify({ seconds, startedAt, subject, isRunning }));
  }, [seconds, startedAt, subject, isRunning]);

  // Ticker do timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setSeconds(p => p + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStart = () => {
    if (!isRunning && !startedAt) setStartedAt(new Date().toISOString());
    setIsRunning(p => !p);
  };

  const handleFinalize = async () => {
    if (seconds === 0) { showToast('Nenhuma sessão para finalizar', 'error'); return; }

    const session = {
      user_id: user.id,
      subject: subject || 'Sem título',
      started_at: startedAt || new Date().toISOString(),
      ended_at: new Date().toISOString(),
      duration_seconds: seconds
    };

    const { data, error } = await supabase.from('study_sessions').insert([session]).select();

    if (!error && data) {
      setSessions(prev => [data[0], ...prev]);
      showToast('Sessão registrada ✓', 'success');
    } else {
      showToast('Erro ao salvar sessão', 'error');
      console.error(error);
    }

    setSeconds(0);
    setIsRunning(false);
    setSubject('');
    setStartedAt(null);
    setShowSessionRecovery(false);
    localStorage.removeItem('oqf_timer_state');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSeconds(0);
    setIsRunning(false);
    setSubject('');
    setStartedAt(null);
    localStorage.removeItem('oqf_timer_state');
  };

  const handleResumeSession = () => { setShowSessionRecovery(false); setIsRunning(true); };
  const handleDiscardSession = () => {
    setSeconds(0); setIsRunning(false); setSubject(''); setStartedAt(null);
    setShowSessionRecovery(false);
    localStorage.removeItem('oqf_timer_state');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.blackSecondary} 50%, ${COLORS.grafite} 100%)`
      }}>
        <div style={{ textAlign: 'center' }}>
          <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png"
            alt="OQF" style={{ width: '48px', height: '48px', margin: '0 auto 16px', display: 'block', opacity: 0.7 }} />
          <p style={{ color: COLORS.silverSecondary, fontSize: '14px' }}>Carregando...</p>
        </div>
      </div>
    );
  }

    if (!user && !showAuth) return <LandingPage onStart={() => setShowAuth(true)} />;
    if (isPasswordRecovery) return <ResetPasswordScreen onDone={() => setIsPasswordRecovery(false)} />;
    if (!user && showAuth) return <AuthScreen />;

  return (
    <div className="min-h-screen relative" style={{
      background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.blackSecondary} 50%, ${COLORS.grafite} 100%)`
    }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        * { scrollbar-width: thin; scrollbar-color: rgba(215,215,217,0.2) transparent; }
        *::-webkit-scrollbar { width: 8px; }
        *::-webkit-scrollbar-thumb { background: rgba(215,215,217,0.2); border-radius: 4px; }
      `}</style>

      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8 fade-in">

        {activeTab === 'cronômetro' && (
          <>
            <div className="pt-4 pb-8 max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light mb-2" style={{ color: COLORS.white }}>
                CRONÔMETRO<br />DE ESTUDO
              </h1>
              <p className="text-sm" style={{ color: COLORS.silverSecondary }}>
                Registre suas horas, construa seu futuro.
              </p>
            </div>
            <TimerDisplay seconds={seconds} isRunning={isRunning} />
            <SubjectInput subject={subject} setSubject={setSubject} />
            <ControlButtons isRunning={isRunning} onStart={handleStart} onFinalize={handleFinalize} />
            <AdBanner srcDesktop="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/2banner%20grupo%20de%20alertas.png"
  srcMobile="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/Banner%201%20Mobile%20%E2%80%94%20Grupo%20de%20Alertas%20OQF.png" href="https://oqueeufaria.com.br/grupo-de-alerta-o/?utm_source=app_cronometro_oqf&utm_medium=botao_grupo_alerta&utm_campaign=comunidade_oqf" alt="Grupo de Alertas OQF" />
            <StatisticsSection sessions={sessions} />
            <AdBanner srcDesktop="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/1banner%20youtube.png"
  srcMobile="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/Banner%202%20Mobile%20%E2%80%94%20Canal%20do%20YouTube%20OQF.png" href="https://swiy.co/OQF-Youtube" alt="Canal OQF no YouTube" />
            <SponsoredOffers />
            <RecentHistory sessions={sessions} />
          </>
        )}

        {activeTab === 'estatísticas' && (
          <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-3xl font-light mb-8" style={{ color: COLORS.white }}>Suas Estatísticas</h2>
            <StatisticsSection sessions={sessions} />
            <RecentHistory sessions={sessions} />
                          <AdBanner srcDesktop="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/3banner%20guia%20de%20suplementa%C3%A7%C3%A3o.png"
  srcMobile="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/Banner%203%20Mobile%20%E2%80%94%20Guia%20de%20Suplementa%C3%A7%C3%A3o.png" href="https://pay.kiwify.com.br/702CrGV?coupon=DESCONTOLIMITADO&utm_source=Insta&utm_medium=manychat&utm_campaign=venda" alt="Guia de Suplementação" />
          </div>
        )}

        {activeTab === 'histórico' && (
          <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-3xl font-light mb-8" style={{ color: COLORS.white }}>Histórico Completo</h2>
            <RecentHistory sessions={sessions} showAll={true} />
          </div>
        )}
      </main>


      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-40 px-6 py-4 rounded-xl font-medium" style={{
          background: toast.type === 'success' ? COLORS.bluePremium : toast.type === 'error' ? COLORS.redPremium : COLORS.grafite,
          color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {toast.message}
        </div>
      )}

      <footer className="py-12 text-center" style={{
        borderTop: '1px solid rgba(215,215,217,0.1)', color: COLORS.silverSecondary, fontSize: '12px'
      }}>
        <p>OQF – O QUE EU FARIA – DISCIPLINA HOJE, LIBERDADE AMANHÃ.</p>
      </footer>
    </div>
  );
}
