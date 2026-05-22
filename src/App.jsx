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
const AdBanner = () => (
  <div className="my-8 mx-auto flex items-center justify-center rounded-xl"
    style={{
      width: '100%', maxWidth: '728px', height: '90px',
      background: 'rgba(7,7,8,0.4)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(215,215,217,0.15)', color: COLORS.silverSecondary, fontSize: '14px'
    }}>
    <div className="text-center">
      <div style={{ marginBottom: '4px' }}>📍</div>
      <div>ESPAÇO PARA BANNER DE PUBLICIDADE</div>
      <div style={{ fontSize: '12px', marginTop: '4px' }}>728 x 90px</div>
    </div>
  </div>
);

// ============================================
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
const RecentHistory = ({ sessions, showAll = false }) => {
  const fmt = (n) => String(n).padStart(2, '0');
  const fmtDuration = (s) => `${fmt(Math.floor(s/3600))}:${fmt(Math.floor((s%3600)/60))}:${fmt(s%60)}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString('pt-BR');
  const fmtTime = (d) => new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const displayed = showAll ? sessions : sessions.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <h3 className="mb-6 font-medium tracking-wide" style={{ color: COLORS.silverMain }}>
        {showAll ? 'HISTÓRICO COMPLETO' : 'HISTÓRICO RECENTE'}
      </h3>
      {sessions.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={{
          background: 'rgba(7,7,8,0.4)', border: '1px solid rgba(215,215,217,0.12)', color: COLORS.silverSecondary
        }}>
          Nenhuma sessão registrada ainda. Inicie seu primeiro cronômetro!
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{
          background: 'rgba(7,7,8,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(215,215,217,0.12)'
        }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(215,215,217,0.12)' }}>
                  {['DATA', 'ASSUNTO', 'TEMPO', 'INÍCIO', 'FIM'].map(h => (
                    <th key={h} className="px-6 py-4 text-left font-medium" style={{ color: COLORS.silverSecondary }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((s, i) => (
                  <tr key={i} style={{ borderBottom: i < displayed.length - 1 ? '1px solid rgba(215,215,217,0.08)' : 'none' }}>
                    <td className="px-6 py-4" style={{ color: COLORS.white }}>{fmtDate(s.started_at)}</td>
                    <td className="px-6 py-4" style={{ color: COLORS.white }}>{s.subject || '—'}</td>
                    <td className="px-6 py-4" style={{ color: COLORS.white }}>{fmtDuration(s.duration_seconds)}</td>
                    <td className="px-6 py-4" style={{ color: COLORS.silverSecondary }}>{fmtTime(s.started_at)}</td>
                    <td className="px-6 py-4" style={{ color: COLORS.silverSecondary }}>{fmtTime(s.ended_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
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
                borderBottom: activeTab === tab ? `2px solid ${COLORS.bluePremium}` : '2px solid transparent',
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

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState('cronômetro');
  const [showSessionRecovery, setShowSessionRecovery] = useState(false);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  // Monitorar autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
        setShowSessionRecovery(true);
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

  if (!user) return <AuthScreen />;

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
            <AdBanner />
            <StatisticsSection sessions={sessions} />
            <AdBanner />
            <SponsoredOffers />
            <RecentHistory sessions={sessions} />
          </>
        )}

        {activeTab === 'estatísticas' && (
          <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-3xl font-light mb-8" style={{ color: COLORS.white }}>Suas Estatísticas</h2>
            <StatisticsSection sessions={sessions} />
            <RecentHistory sessions={sessions} />
          </div>
        )}

        {activeTab === 'histórico' && (
          <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-3xl font-light mb-8" style={{ color: COLORS.white }}>Histórico Completo</h2>
            <RecentHistory sessions={sessions} showAll={true} />
          </div>
        )}
      </main>

      {/* Modal recuperação de sessão */}
      {showSessionRecovery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-2xl p-8 max-w-md w-full" style={{
            background: 'rgba(7,7,8,0.95)', backdropFilter: 'blur(30px)',
            border: '1px solid rgba(215,215,217,0.2)'
          }}>
            <h3 className="text-xl font-light mb-2" style={{ color: COLORS.white }}>Continuar Sessão?</h3>
            <p className="mb-6" style={{ color: COLORS.silverSecondary }}>
              Detectamos uma sessão em andamento. Deseja continuar de onde parou?
            </p>
            <div className="flex gap-3">
              <button onClick={handleDiscardSession} style={{
                flex: 1, padding: '12px', borderRadius: '10px', fontWeight: '500',
                background: 'transparent', border: '1px solid rgba(215,215,217,0.2)',
                color: COLORS.silverSecondary, cursor: 'pointer'
              }}>Descartar</button>
              <button onClick={handleResumeSession} style={{
                flex: 1, padding: '12px', borderRadius: '10px', fontWeight: '500',
                background: COLORS.bluePremium, color: 'white', border: 'none', cursor: 'pointer'
              }}>Continuar</button>
            </div>
          </div>
        </div>
      )}

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
