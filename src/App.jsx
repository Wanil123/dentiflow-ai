import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#030712",
  surface: "#0a1120",
  card: "#0f1729",
  border: "#1a2744",
  accent: "#06d6a0",
  accentDim: "#06d6a040",
  blue: "#4cc9f0",
  purple: "#b07df0",
  orange: "#ff9f43",
  red: "#ff6b6b",
  white: "#f0f4f8",
  muted: "#8892a4",
  dim: "#4a5568",
};

const patients = [
  { id: 1, name: "Caroline Bergeron", need: "Blanchiment", value: "850$", status: "booked", score: 94, source: "Google", follow: "Confirmé", time: "Auj. 15:20" },
  { id: 2, name: "Maxime Pelletier", need: "Implant dentaire", value: "4,200$", status: "nurturing", score: 87, source: "Facebook Ad", follow: "Email #2 envoyé", time: "Auj. 11:45" },
  { id: 3, name: "Émilie Fortin", need: "Examen + nettoyage", value: "320$", status: "booked", score: 91, source: "Site web", follow: "RDV demain 9h", time: "Auj. 10:30" },
  { id: 4, name: "David Chen", need: "Urgence — douleur", value: "600$", status: "booked", score: 98, source: "Appel direct", follow: "Vu aujourd'hui", time: "Auj. 08:15" },
  { id: 5, name: "Stéphanie Morin", need: "Invisalign", value: "6,500$", status: "nurturing", score: 72, source: "Instagram", follow: "Rappel vendredi", time: "Hier 16:00" },
  { id: 6, name: "Philippe Bouchard", need: "Couronne", value: "1,400$", status: "lost", score: 45, source: "Référence", follow: "Pas de réponse ×3", time: "Hier 09:20" },
  { id: 7, name: "Nathalie Gagnon", need: "Prothèse partielle", value: "2,800$", status: "booked", score: 88, source: "Google", follow: "Consultation lundi", time: "13 fév" },
];

const automations = [
  { name: "Confirmation RDV (SMS + Email)", type: "Pré-visite", triggers: "24h avant", status: "active", sent: 142, rate: "97%", icon: "📱" },
  { name: "Rappel no-show", type: "Récupération", triggers: "15 min après no-show", status: "active", sent: 23, rate: "35%", icon: "🔄" },
  { name: "Suivi post-traitement", type: "Post-visite", triggers: "48h après visite", status: "active", sent: 89, rate: "68%", icon: "💊" },
  { name: "Nurturing Invisalign", type: "Séquence vente", triggers: "Jour 1, 3, 7, 14", status: "active", sent: 67, rate: "22%", icon: "✨" },
  { name: "Réactivation patients inactifs", type: "Win-back", triggers: "6 mois sans visite", status: "active", sent: 215, rate: "18%", icon: "📧" },
  { name: "Collecte avis Google", type: "Réputation", triggers: "7 jours après visite", status: "active", sent: 104, rate: "41%", icon: "⭐" },
];

const chatMessages = [
  { role: "patient", text: "Bonjour, est-ce que vous avez des disponibilités cette semaine pour un nettoyage?", time: "10:28" },
  { role: "ai", text: "Bonjour! 😊 Absolument. Nous avons des places disponibles mercredi à 10h ou 14h, et jeudi à 9h ou 15h30. Quelle plage vous conviendrait le mieux?", time: "10:28" },
  { role: "patient", text: "Jeudi 9h ça serait parfait!", time: "10:29" },
  { role: "ai", text: "Excellent! Je vous réserve le jeudi 20 février à 9h avec Dre Tremblay. Est-ce votre première visite chez nous?", time: "10:29" },
  { role: "patient", text: "Oui c'est ma première fois.", time: "10:29" },
  { role: "ai", text: "Bienvenue! 🎉 Pour accélérer votre enregistrement, je vous envoie par email un formulaire pré-visite à remplir. Puis-je avoir votre nom complet et votre courriel?", time: "10:30" },
  { role: "patient", text: "Émilie Fortin, emilie.fortin@gmail.com", time: "10:30" },
  { role: "ai", text: "Merci Émilie! Votre RDV est confirmé ✅\n\n📅 Jeudi 20 fév. à 9h00\n👩‍⚕️ Dre Tremblay\n📍 1250 rue Sherbrooke, Montréal\n\nVous recevrez un SMS de rappel 24h avant. À bientôt!", time: "10:30" },
];

function AnimatedNumber({ value, prefix = "", suffix = "", color }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
    const steps = 35;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setDisplay(Math.round(num * ease * 10) / 10);
      if (step >= steps) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <span style={{ color, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
      {prefix}{Number.isInteger(display) ? display.toLocaleString() : display.toFixed(1)}{suffix}
    </span>
  );
}

export default function App() {
  const [tab, setTab] = useState("pipeline");
  const [chatVisible, setChatVisible] = useState(0);
  const chatRef = useRef(null);

  useEffect(() => {
    if (tab === "chatbot" && chatVisible < chatMessages.length) {
      const t = setTimeout(() => setChatVisible(v => v + 1), 700);
      return () => clearTimeout(t);
    }
  }, [tab, chatVisible]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatVisible]);

  const tabs = [
    { key: "pipeline", label: "Pipeline patients", icon: "👥" },
    { key: "automations", label: "Automatisations", icon: "⚡" },
    { key: "chatbot", label: "Chatbot en action", icon: "💬" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.white,
      fontFamily: "'Plus Jakarta Sans', 'SF Pro Display', -apple-system, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes pulse2 { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        @keyframes slideIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px ${C.accent}20 } 50% { box-shadow: 0 0 40px ${C.accent}35 } }
      `}</style>

      {/* Header */}
      <header style={{
        padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`, background: "rgba(3,7,18,0.9)", backdropFilter: "blur(16px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, animation: "glow 3s infinite",
          }}>🦷</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.5 }}>
              Denti<span style={{ color: C.accent }}>Flow</span> AI
            </div>
            <div style={{ fontSize: 11, color: C.dim }}>Clinique Dentaire Sainte-Catherine — Automatisation complète</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 20,
            background: `${C.accent}12`, border: `1px solid ${C.accent}35`,
            fontSize: 12, fontWeight: 600, color: C.accent,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, animation: "pulse2 2s infinite" }} />
            6 automatisations actives
          </div>
          <div style={{ padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
            PrimeDev Studios
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "10px 28px", borderBottom: `1px solid ${C.border}`, background: "rgba(3,7,18,0.5)" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); if (t.key === "chatbot") setChatVisible(0); }}
            style={{
              padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
              background: tab === t.key ? `linear-gradient(135deg, ${C.accent}, ${C.blue})` : "transparent",
              color: tab === t.key ? C.bg : C.muted, transition: "all 0.25s",
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 28 }}>

        {/* KPI BAR - always visible */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "PATIENTS CE MOIS", val: 156, suffix: "", color: C.accent, icon: "👥", sub: "+23% vs jan." },
            { label: "RDV BOOKÉS PAR L'IA", val: 89, suffix: "", color: C.blue, icon: "📅", sub: "57% du total" },
            { label: "REVENUS GÉNÉRÉS", val: 42, suffix: "K$", color: C.purple, icon: "💰", sub: "Via automatisations" },
            { label: "TAUX NO-SHOW", val: 4, suffix: "%", color: C.accent, icon: "📉", sub: "Était 18% avant IA" },
            { label: "AVIS GOOGLE", val: 4.9, suffix: "/5", color: C.orange, icon: "⭐", sub: "127 avis · +34 ce mois" },
          ].map((k, i) => (
            <div key={i} style={{
              background: C.card, borderRadius: 14, padding: "18px 16px",
              border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", bottom: -15, right: -15, width: 60, height: 60,
                borderRadius: "50%", background: `${k.color}08`,
              }} />
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
                {k.icon} {k.label}
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>
                <AnimatedNumber value={k.val} suffix={k.suffix} color={k.color} />
              </div>
              <div style={{ fontSize: 10, color: C.dim }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* PIPELINE */}
        {tab === "pipeline" && (
          <div style={{ animation: "slideIn 0.3s ease" }}>
            <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Pipeline patients — Qualifiés par IA</div>
                  <div style={{ fontSize: 12, color: C.dim }}>Scoring automatique basé sur le besoin, l'urgence et la valeur potentielle</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { label: "Bookés", count: patients.filter(p => p.status === "booked").length, color: C.accent },
                    { label: "Nurturing", count: patients.filter(p => p.status === "nurturing").length, color: C.orange },
                    { label: "Perdus", count: patients.filter(p => p.status === "lost").length, color: C.red },
                  ].map((s, i) => (
                    <div key={i} style={{
                      padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                      background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30`,
                    }}>
                      {s.count} {s.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Table header */}
              <div style={{
                display: "grid", gridTemplateColumns: "1.8fr 1.2fr 0.8fr 0.7fr 0.8fr 1.2fr 0.8fr",
                padding: "10px 24px", fontSize: 10, fontWeight: 700, color: C.dim,
                textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${C.border}`,
              }}>
                <span>Patient</span><span>Besoin</span><span>Valeur</span><span>Score</span><span>Source</span><span>Suivi IA</span><span>Heure</span>
              </div>

              {patients.map((p, i) => {
                const statusColor = p.status === "booked" ? C.accent : p.status === "nurturing" ? C.orange : C.red;
                return (
                  <div key={p.id} style={{
                    display: "grid", gridTemplateColumns: "1.8fr 1.2fr 0.8fr 0.7fr 0.8fr 1.2fr 0.8fr",
                    alignItems: "center", padding: "14px 24px",
                    borderBottom: `1px solid ${C.border}`,
                    animation: "slideIn 0.3s ease", animationDelay: `${i * 50}ms`,
                    animationFillMode: "backwards", cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.surface}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: `${statusColor}15`, border: `1px solid ${statusColor}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700, color: statusColor,
                      }}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted }}>{p.need}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{p.value}</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: p.score >= 85 ? `${C.accent}18` : p.score >= 65 ? `${C.orange}18` : `${C.red}18`,
                      color: p.score >= 85 ? C.accent : p.score >= 65 ? C.orange : C.red,
                    }}>
                      {p.score}%
                    </div>
                    <div style={{ fontSize: 11, color: C.dim }}>{p.source}</div>
                    <div style={{ fontSize: 11, color: statusColor, fontWeight: 500 }}>{p.follow}</div>
                    <div style={{ fontSize: 11, color: C.dim }}>{p.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AUTOMATIONS */}
        {tab === "automations" && (
          <div style={{ animation: "slideIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {automations.map((a, i) => (
                <div key={i} style={{
                  background: C.card, borderRadius: 14, padding: 22,
                  border: `1px solid ${C.border}`,
                  animation: "slideIn 0.3s ease", animationDelay: `${i * 80}ms`,
                  animationFillMode: "backwards",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "50"}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: `${C.accent}12`, border: `1px solid ${C.accent}25`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                      }}>{a.icon}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: C.dim }}>{a.type} · Déclencheur: {a.triggers}</div>
                      </div>
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700,
                      background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}30`,
                      textTransform: "uppercase", letterSpacing: 0.5,
                    }}>Actif</div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 10, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                        Messages envoyés
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.blue, fontFamily: "'Space Mono', monospace" }}>
                        {a.sent}
                      </div>
                    </div>
                    <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 10, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                        Taux de réponse
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.accent, fontFamily: "'Space Mono', monospace" }}>
                        {a.rate}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <div style={{ width: "100%", height: 5, borderRadius: 3, background: C.surface }}>
                      <div style={{
                        width: `${parseInt(a.rate)}%`, height: "100%", borderRadius: 3,
                        background: `linear-gradient(90deg, ${C.accent}, ${C.blue})`,
                        transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Summary */}
            <div style={{
              marginTop: 20, background: C.card, borderRadius: 14, padding: 24,
              border: `1px solid ${C.accent}30`,
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  Temps économisé / mois
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.accent, fontFamily: "'Space Mono', monospace" }}>47h</div>
                <div style={{ fontSize: 11, color: C.dim }}>Réceptionniste + suivi</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  No-shows évités
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.blue, fontFamily: "'Space Mono', monospace" }}>23</div>
                <div style={{ fontSize: 11, color: C.dim }}>Valeur: ~6,900$</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  Patients réactivés
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.purple, fontFamily: "'Space Mono', monospace" }}>38</div>
                <div style={{ fontSize: 11, color: C.dim }}>Inactifs 6+ mois</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  ROI mensuel
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.orange, fontFamily: "'Space Mono', monospace" }}>14x</div>
                <div style={{ fontSize: 11, color: C.dim }}>Retour sur investissement</div>
              </div>
            </div>
          </div>
        )}

        {/* CHATBOT */}
        {tab === "chatbot" && (
          <div style={{ animation: "slideIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
              {/* Chat Window */}
              <div style={{
                background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
                display: "flex", flexDirection: "column", height: 520,
              }}>
                {/* Chat header */}
                <div style={{
                  padding: "14px 20px", borderBottom: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>🦷</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      Chatbot IA — Clinique Ste-Catherine
                    </div>
                    <div style={{ fontSize: 11, color: C.accent }}>● En ligne · Répond en ~2 secondes</div>
                  </div>
                </div>

                {/* Messages */}
                <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {/* Intro */}
                  <div style={{
                    textAlign: "center", padding: 12, margin: "0 auto 8px",
                    borderRadius: 12, background: C.surface, fontSize: 11, color: C.dim, maxWidth: 300,
                  }}>
                    Widget chatbot intégré sur le site web de la clinique
                  </div>

                  {chatMessages.slice(0, chatVisible).map((msg, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: msg.role === "ai" ? "flex-start" : "flex-end",
                      animation: "slideIn 0.3s ease",
                    }}>
                      {msg.role === "ai" && (
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, marginRight: 8, flexShrink: 0,
                          background: `${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14,
                        }}>🦷</div>
                      )}
                      <div style={{
                        maxWidth: "75%", padding: "10px 16px", borderRadius: 16,
                        background: msg.role === "ai"
                          ? `linear-gradient(135deg, ${C.surface}, #0d1a2e)`
                          : `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                        border: msg.role === "ai" ? `1px solid ${C.border}` : "none",
                        color: msg.role === "ai" ? C.white : C.bg,
                        fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line",
                        borderBottomLeftRadius: msg.role === "ai" ? 4 : 16,
                        borderBottomRightRadius: msg.role === "patient" ? 4 : 16,
                      }}>
                        {msg.text}
                        <div style={{
                          fontSize: 10, marginTop: 4, textAlign: "right",
                          color: msg.role === "ai" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                        }}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  {chatVisible < chatMessages.length && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: `${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14,
                      }}>🦷</div>
                      <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
                        {[0, 1, 2].map((d) => (
                          <div key={d} style={{
                            width: 7, height: 7, borderRadius: "50%", background: C.muted,
                            animation: "pulse2 1.2s infinite", animationDelay: `${d * 200}ms`,
                          }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Side Panel */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  background: C.card, borderRadius: 16, padding: 20,
                  border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>📋 Fiche patient auto-créée</div>
                  {[
                    ["Nom", "Émilie Fortin"],
                    ["Email", "emilie.fortin@gmail.com"],
                    ["Type", "Nouvelle patiente"],
                    ["Besoin", "Examen + nettoyage"],
                    ["RDV", "Jeudi 20 fév. 9h00"],
                    ["Dentiste", "Dre Tremblay"],
                    ["Formulaire", "Pré-visite envoyé ✅"],
                  ].map(([k, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: 11, color: C.dim }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.white }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: C.card, borderRadius: 16, padding: 20,
                  border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>⚡ Actions automatiques</div>
                  {[
                    { icon: "✅", text: "RDV créé", sub: "Système de gestion clinique" },
                    { icon: "📧", text: "Formulaire pré-visite envoyé", sub: "Email automatique" },
                    { icon: "📱", text: "SMS rappel programmé", sub: "24h avant le RDV" },
                    { icon: "📊", text: "Fiche patient créée", sub: "CRM mis à jour" },
                  ].map((a, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
                      borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                      opacity: i < chatVisible / 2 ? 1 : 0.3,
                      transition: "opacity 0.5s",
                    }}>
                      <span>{a.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{a.text}</div>
                        <div style={{ fontSize: 10, color: C.dim }}>{a.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 32, padding: "20px 24px", borderRadius: 16,
          background: `linear-gradient(135deg, ${C.accent}10, ${C.blue}15)`,
          border: `1px solid ${C.accent}25`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              Développé par <span style={{ color: C.accent }}>PrimeDev Studios</span>
            </div>
            <div style={{ fontSize: 12, color: C.dim }}>
              Automatisation IA sur mesure · n8n · OpenAI · Twilio · CRM Integration
            </div>
          </div>
          <a href="https://primedev-studios.netlify.app/#contact" target="_blank" rel="noopener noreferrer" style={{
            padding: "10px 24px", borderRadius: 10,
            background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
            fontSize: 13, fontWeight: 700, color: C.bg, cursor: "pointer",
            textDecoration: "none",
          }}>
            Demander une démo →
          </a>
        </div>
      </div>
    </div>
  );
}
