import { Clock, Play, BarChart2, BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const LandingPage = ({ onStart }) => {
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

    const faqs = [
      { q: 'O cronômetro de estudos é gratuito?', a: 'Sim! O Cronômetro de Estudos OQF é totalmente gratuito. Basta criar sua conta e começar a registrar suas horas de estudo agora mesmo.' },
      { q: 'Preciso instalar algum aplicativo?', a: 'Não. O cronômetro funciona direto no navegador, em qualquer dispositivo — computador, celular ou tablet. Sem downloads, sem instalação.' },
      { q: 'Como funciona o controle de horas estudadas?', a: 'Você inicia o cronômetro ao começar a estudar, informa o assunto e finaliza quando terminar. O sistema registra automaticamente a duração de cada sessão e calcula suas estatísticas.' },
      { q: 'O cronômetro serve para concurseiros?', a: 'Sim! É especialmente pensado para quem se prepara para concursos públicos, vestibulares e certificações.' },
      { q: 'Meus dados ficam salvos?', a: 'Sim. Todo o seu histórico de sessões fica salvo na sua conta e você pode consultar a qualquer momento, de qualquer dispositivo.' },
        ];

    const benefits = [
      { icon: Clock, title: 'Controle total do seu tempo', desc: 'Saiba exatamente quantas horas você estuda por dia, semana e mês.' },
      { icon: BarChart2, title: 'Estatísticas detalhadas', desc: 'Veja sua média diária, tempo total e evolução ao longo do tempo.' },
      { icon: BookOpen, title: 'Registro por assunto', desc: 'Anote qual matéria você estudou em cada sessão e organize seu histórico.' },
      { icon: CheckCircle, title: 'Funciona em qualquer dispositivo', desc: 'Acesse pelo celular, tablet ou computador sem instalar nada.' },
        ];

    return (
          <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #030303 0%, #0B0B0B 50%, #111113 100%)', color: '#F8F8FC', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

                  <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(3,3,3,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(215,215,217,0.1)' }}>
                            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                      <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png" alt="OQF" style={{ width: '36px', height: '36px' }} />
                                                      <div>
                                                                    <p style={{ fontSize: '11px', color: '#9F9FA6', margin: 0 }}>OQF</p>p>
                                                                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#F8F8FC', margin: 0 }}>O QUE EU FARIA</p>p>
                                                      </div>div>
                                        </div>div>
                                      <button onClick={onStart} style={{ background: '#0BA4FF', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em' }}>ENTRAR / CADASTRAR</button>button>
                            </div>div>
                  </header>header>
          
                <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div>
                                  <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                                              Cronômetro de<br /><span style={{ color: '#0BA4FF' }}>Estudos Online</span>span><br />Grátis
                                  </h1>h1>
                                  <p style={{ fontSize: '17px', color: '#9F9FA6', lineHeight: 1.7, margin: '0 0 32px', maxWidth: '460px' }}>
                                              Registre suas horas de estudo, acompanhe seu progresso e construa disciplina todos os dias. O timer de estudo online ideal para concurseiros, vestibulandos e estudantes de alta performance.
                                  </p>p>
                                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                              <button onClick={onStart} style={{ background: '#0BA4FF', color: 'white', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <Play size={16} fill="white" /> COMEÇAR AGORA
                                              </button>button>
                                              <button onClick={onStart} style={{ background: 'transparent', color: '#D7D7D9', border: '1px solid rgba(215,215,217,0.2)', borderRadius: '10px', padding: '14px 24px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                                                            Já tenho conta
                                              </button>button>
                                  </div>div>
                                  <p style={{ marginTop: '16px', fontSize: '12px', color: '#9F9FA6' }}>"Deus nos deu espírito de disciplina." — 2 Timóteo 1:7</p>p>
                        </div>div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <div style={{ background: 'linear-gradient(135deg, rgba(17,17,19,0.9) 0%, rgba(7,7,8,0.95) 100%)', backdropFilter: 'blur(40px)', border: '1px solid rgba(215,215,217,0.15)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '380px', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(248,248,252,0.05)' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                                                            <div>
                                                                            <p style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#9F9FA6', margin: 0 }}>CRONÔMETRO</p>p>
                                                                            <p style={{ fontSize: '16px', fontWeight: '700', color: '#F8F8FC', margin: 0 }}>DE ESTUDO</p>p>
                                                            </div>div>
                                                            <p style={{ fontSize: '11px', color: '#9F9FA6', fontStyle: 'italic', textAlign: 'right', maxWidth: '130px', margin: 0 }}>"Deus nos deu espírito de disciplina." 2 Tim 1:7</p>p>
                                              </div>div>
                                              <div style={{ background: 'linear-gradient(135deg, rgba(7,7,8,0.9) 0%, rgba(17,17,19,0.8) 100%)', borderRadius: '20px', padding: '28px 20px', textAlign: 'center', border: '1px solid rgba(215,215,217,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}>
                                                            <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png" alt="OQF" style={{ width: '32px', height: '32px', margin: '0 auto 12px', display: 'block', opacity: 0.6 }} />
                                                            <div style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '-0.02em', color: '#F8F8FC', fontFamily: 'monospace' }}>00:00:00</div>div>
                                              </div>div>
                                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
                                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0BA4FF', opacity: 0.5 }} />
                                                            <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#9F9FA6' }}>PRONTO PARA INICIAR</span>span>
                                              </div>div>
                                              <div style={{ background: 'rgba(7,7,8,0.6)', border: '1px solid rgba(215,215,217,0.1)', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', color: '#9F9FA6', marginBottom: '12px' }}>Qual assunto você está estudando?</div>div>
                                              <button style={{ width: '100%', background: '#0BA4FF', color: 'white', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                            <Play size={14} fill="white" /> INICIAR / PAUSAR
                                              </button>button>
                                  </div>div>
                        </div>div>
                </section>section>
          
                <section style={{ background: 'rgba(7,7,8,0.5)', borderTop: '1px solid rgba(215,215,217,0.06)', borderBottom: '1px solid rgba(215,215,217,0.06)', padding: '64px 24px' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                  <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Por que usar o cronômetro de estudos?</h2>h2>
                                  <p style={{ textAlign: 'center', color: '#9F9FA6', marginBottom: '48px', fontSize: '15px' }}>Controle suas horas estudadas e evolua com disciplina todos os dias</p>p>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                    {benefits.map((b, i) => (
                          <div key={i} style={{ background: 'linear-gradient(135deg, rgba(17,17,19,0.8) 0%, rgba(7,7,8,0.6) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(215,215,217,0.1)', borderRadius: '16px', padding: '28px 24px' }}>
                                          <b.icon size={28} style={{ color: '#0BA4FF', marginBottom: '16px' }} />
                                          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: '#F8F8FC' }}>{b.title}</h3>h3>
                                          <p style={{ fontSize: '13px', color: '#9F9FA6', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>p>
                          </div>div>
                        ))}
                                  </div>div>
                        </div>div>
                </section>section>
          
                <section style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Como usar o timer de estudo online</h2>h2>
                        <p style={{ textAlign: 'center', color: '#9F9FA6', marginBottom: '48px', fontSize: '15px' }}>Simples, rápido e eficiente para controlar suas horas de estudo</p>p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                          {[{n:'01',title:'Crie sua conta gratuita',desc:'Cadastre-se em segundos com seu e-mail. Sem cartão de crédito.'},{n:'02',title:'Informe o assunto',desc:'Digite a matéria ou tema que você vai estudar naquela sessão.'},{n:'03',title:'Inicie e finalize',desc:'Clique em iniciar, estude com foco, e finalize quando terminar. Pronto!'}].map((s,i)=>(
                        <div key={i} style={{ textAlign: 'center', padding: '24px', background: 'rgba(11,11,11,0.6)', border: '1px solid rgba(215,215,217,0.08)', borderRadius: '16px' }}>
                                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#0BA4FF', marginBottom: '12px', opacity: 0.7 }}>{s.n}</div>div>
                                      <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#F8F8FC' }}>{s.title}</h3>h3>
                                      <p style={{ fontSize: '13px', color: '#9F9FA6', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>p>
                        </div>div>
                      ))}
                        </div>div>
                </section>section>
          
                <section style={{ background: 'linear-gradient(135deg, rgba(11,164,255,0.08) 0%, rgba(3,3,3,0) 100%)', border: '1px solid rgba(11,164,255,0.15)', borderRadius: '20px', margin: '0 auto 64px', maxWidth: '700px', padding: '48px 32px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>Comece a controlar suas horas estudadas hoje</h2>h2>
                        <p style={{ color: '#9F9FA6', marginBottom: '32px', fontSize: '15px', lineHeight: 1.7 }}>Junte-se a estudantes que usam o cronômetro para concurseiros OQF e transformam disciplina em resultado.</p>p>
                        <button onClick={onStart} style={{ background: '#0BA4FF', color: 'white', border: 'none', borderRadius: '10px', padding: '16px 40px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em' }}>COMEÇAR AGORA — É GRÁTIS</button>button>
                </section>section>
          
                <section style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 64px' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Perguntas frequentes</h2>h2>
                        <p style={{ textAlign: 'center', color: '#9F9FA6', marginBottom: '40px', fontSize: '15px' }}>Tire suas dúvidas sobre o contador de horas de estudo</p>p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {faqs.map((f,i)=>(
                        <div key={i} style={{ background: 'rgba(11,11,11,0.7)', border: openFaq===i ? '1px solid rgba(11,164,255,0.3)' : '1px solid rgba(215,215,217,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
                                      <button onClick={()=>toggleFaq(i)} style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', color: '#F8F8FC', fontSize: '14px', fontWeight: '600', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {f.q}
                                        {openFaq===i ? <ChevronUp size={16} style={{ color: '#0BA4FF', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: '#9F9FA6', flexShrink: 0 }} />}
                                      </button>button>
                          {openFaq===i && <div style={{ padding: '0 20px 18px', fontSize: '13px', color: '#9F9FA6', lineHeight: 1.7 }}>{f.a}</div>div>}
                        </div>div>
                      ))}
                        </div>div>
                </section>section>
          
                <footer style={{ borderTop: '1px solid rgba(215,215,217,0.08)', padding: '32px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
                                  <img src="https://pub-b5f060815c0c4e05a1806ddd0c75d138.r2.dev/LOGO%20OQF%20REDONDA.png" alt="OQF" style={{ width: '24px', height: '24px', opacity: 0.6 }} />
                                  <span style={{ fontSize: '12px', color: '#9F9FA6' }}>OQF – O QUE EU FARIA – DISCIPLINA HOJE, LIBERDADE AMANHÃ</span>span>
                        </div>div>
                        <p style={{ fontSize: '11px', color: 'rgba(159,159,166,0.5)', margin: 0 }}>Desenvolvido pelo OQF · cronometroestudos.com.br</p>p>
                </footer>footer>
          
          </div>div>
        );
};

export default LandingPage;</div>
