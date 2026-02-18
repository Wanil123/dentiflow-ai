import { useState, useEffect, useRef, useCallback } from "react";

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

function useIsMobile(bp = 768) {
  const [m, setM] = useState(window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return m;
}

function detectLang() {
  const n = navigator.language || navigator.userLanguage || "fr";
  return n.startsWith("fr") ? "fr" : "en";
}

const T = {
  fr: {
    heroBadge: "Demonstration interactive",
    heroTitle: "Voici votre clinique dentaire avec l'automatisation IA",
    heroSub: "Chaque patient capte. Chaque RDV booke. Chaque no-show recupere. Automatiquement, 24/7.",
    heroExplore: "Explorer la demo",
    heroCta: "Demander un pilote gratuit",
    heroStat1: "patients ce mois",
    heroStat2: "RDV bookes par l'IA",
    heroStat3: "taux no-show (etait 18%)",
    subtitle: "Clinique Dentaire Sainte-Catherine \u2014 Automatisation complete",
    automationsActive: "6 automatisations actives",
    tabPipeline: "Pipeline patients",
    tabAutomations: "Automatisations",
    tabChatbot: "Chatbot en action",
    kpiPatients: "PATIENTS CE MOIS", kpiPatientsVal: 156, kpiPatientsSub: "+23% vs jan.",
    kpiBooked: "RDV BOOKES PAR L'IA", kpiBookedVal: 89, kpiBookedSub: "57% du total",
    kpiRevenue: "REVENUS GENERES", kpiRevenueSub: "Via automatisations",
    kpiNoshow: "TAUX NO-SHOW", kpiNoshowSub: "Etait 18% avant IA",
    kpiReviews: "AVIS GOOGLE", kpiReviewsSub: "127 avis \xB7 +34 ce mois",
    pipelineTitle: "Pipeline patients \u2014 Qualifies par IA",
    pipelineSub: "Scoring automatique base sur le besoin, l'urgence et la valeur potentielle",
    booked: "Bookes", nurturing: "Nurturing", lost: "Perdus",
    colPatient: "Patient", colNeed: "Besoin", colValue: "Valeur", colScore: "Score", colSource: "Source", colFollow: "Suivi IA", colTime: "Heure",
    trigger: "Declencheur", active: "Actif", msgSent: "Messages envoyes", responseRate: "Taux de reponse",
    roiTimeSaved: "Temps economise / mois", roiTimeSub: "Receptionniste + suivi",
    roiNoshow: "No-shows evites", roiNoshowSub: "Valeur: ~6,900$",
    roiReactivated: "Patients reactives", roiReactivatedSub: "Inactifs 6+ mois",
    roiMonthly: "ROI mensuel", roiMonthlySub: "Retour sur investissement",
    chatTitle: "Chatbot IA \u2014 Clinique Ste-Catherine",
    chatOnline: "\u25CF En ligne \xB7 Repond en ~2 secondes",
    chatIntro: "Widget chatbot integre sur le site web de la clinique",
    chatHint: "Cliquez une reponse pour avancer la conversation",
    chatDone: "Patient booke et fiche creee automatiquement!",
    ficheTitle: "\u{1F4CB} Fiche patient auto-creee",
    actionsTitle: "\u26A1 Actions automatiques",
    footerBy: "Developpe par",
    footerTech: "Automatisation IA sur mesure \xB7 n8n \xB7 OpenAI \xB7 Twilio \xB7 CRM Integration",
    footerCta: "Demander une demo \u2192",
    floatingCta: "Obtenir cette solution",
    ficheFields: [
      ["Nom", "Emilie Fortin"],
      ["Email", "emilie.fortin@gmail.com"],
      ["Type", "Nouvelle patiente"],
      ["Besoin", "Examen + nettoyage"],
      ["RDV", "Jeudi 20 fev. 9h00"],
      ["Dentiste", "Dre Tremblay"],
      ["Formulaire", "Pre-visite envoye \u2705"],
    ],
    actions: [
      { icon: "\u2705", text: "RDV cree", sub: "Systeme de gestion clinique" },
      { icon: "\u{1F4E7}", text: "Formulaire pre-visite envoye", sub: "Email automatique" },
      { icon: "\u{1F4F1}", text: "SMS rappel programme", sub: "24h avant le RDV" },
      { icon: "\u{1F4CA}", text: "Fiche patient creee", sub: "CRM mis a jour" },
    ],
  },
  en: {
    heroBadge: "Interactive demo",
    heroTitle: "This is your dental clinic with AI automation",
    heroSub: "Every patient captured. Every appointment booked. Every no-show recovered. Automatically, 24/7.",
    heroExplore: "Explore the demo",
    heroCta: "Request a free pilot",
    heroStat1: "patients this month",
    heroStat2: "AI-booked appointments",
    heroStat3: "no-show rate (was 18%)",
    subtitle: "Sainte-Catherine Dental Clinic \u2014 Full Automation",
    automationsActive: "6 active automations",
    tabPipeline: "Patient pipeline",
    tabAutomations: "Automations",
    tabChatbot: "Chatbot in action",
    kpiPatients: "PATIENTS THIS MONTH", kpiPatientsVal: 156, kpiPatientsSub: "+23% vs Jan.",
    kpiBooked: "AI-BOOKED APPTS", kpiBookedVal: 89, kpiBookedSub: "57% of total",
    kpiRevenue: "REVENUE GENERATED", kpiRevenueSub: "Via automations",
    kpiNoshow: "NO-SHOW RATE", kpiNoshowSub: "Was 18% before AI",
    kpiReviews: "GOOGLE REVIEWS", kpiReviewsSub: "127 reviews \xB7 +34 this month",
    pipelineTitle: "Patient pipeline \u2014 AI-qualified",
    pipelineSub: "Automatic scoring based on need, urgency and potential value",
    booked: "Booked", nurturing: "Nurturing", lost: "Lost",
    colPatient: "Patient", colNeed: "Need", colValue: "Value", colScore: "Score", colSource: "Source", colFollow: "AI Follow-up", colTime: "Time",
    trigger: "Trigger", active: "Active", msgSent: "Messages sent", responseRate: "Response rate",
    roiTimeSaved: "Time saved / month", roiTimeSub: "Receptionist + follow-up",
    roiNoshow: "No-shows prevented", roiNoshowSub: "Value: ~$6,900",
    roiReactivated: "Patients reactivated", roiReactivatedSub: "Inactive 6+ months",
    roiMonthly: "Monthly ROI", roiMonthlySub: "Return on investment",
    chatTitle: "AI Chatbot \u2014 Ste-Catherine Clinic",
    chatOnline: "\u25CF Online \xB7 Responds in ~2 seconds",
    chatIntro: "Chatbot widget embedded on the clinic's website",
    chatHint: "Click a response to advance the conversation",
    chatDone: "Patient booked and record created automatically!",
    ficheTitle: "\u{1F4CB} Auto-created patient card",
    actionsTitle: "\u26A1 Automatic actions",
    footerBy: "Built by",
    footerTech: "Custom AI automation \xB7 n8n \xB7 OpenAI \xB7 Twilio \xB7 CRM Integration",
    footerCta: "Request a demo \u2192",
    floatingCta: "Get this solution",
    ficheFields: [
      ["Name", "Emilie Fortin"],
      ["Email", "emilie.fortin@gmail.com"],
      ["Type", "New patient"],
      ["Need", "Exam + cleaning"],
      ["Appt", "Thursday Feb 20, 9am"],
      ["Dentist", "Dr. Tremblay"],
      ["Form", "Pre-visit sent \u2705"],
    ],
    actions: [
      { icon: "\u2705", text: "Appt created", sub: "Clinic management system" },
      { icon: "\u{1F4E7}", text: "Pre-visit form sent", sub: "Automatic email" },
      { icon: "\u{1F4F1}", text: "SMS reminder scheduled", sub: "24h before appt" },
      { icon: "\u{1F4CA}", text: "Patient card created", sub: "CRM updated" },
    ],
  },
};

const patients = [
  { id: 1, name: "Caroline Bergeron", need: { fr: "Blanchiment", en: "Whitening" }, value: "850$", status: "booked", score: 94, source: "Google", follow: { fr: "Confirme", en: "Confirmed" }, time: { fr: "Auj. 15:20", en: "Today 15:20" } },
  { id: 2, name: "Maxime Pelletier", need: { fr: "Implant dentaire", en: "Dental implant" }, value: "4,200$", status: "nurturing", score: 87, source: "Facebook Ad", follow: { fr: "Email #2 envoye", en: "Email #2 sent" }, time: { fr: "Auj. 11:45", en: "Today 11:45" } },
  { id: 3, name: "Emilie Fortin", need: { fr: "Examen + nettoyage", en: "Exam + cleaning" }, value: "320$", status: "booked", score: 91, source: { fr: "Site web", en: "Website" }, follow: { fr: "RDV demain 9h", en: "Appt tomorrow 9am" }, time: { fr: "Auj. 10:30", en: "Today 10:30" } },
  { id: 4, name: "David Chen", need: { fr: "Urgence \u2014 douleur", en: "Emergency \u2014 pain" }, value: "600$", status: "booked", score: 98, source: { fr: "Appel direct", en: "Direct call" }, follow: { fr: "Vu aujourd'hui", en: "Seen today" }, time: { fr: "Auj. 08:15", en: "Today 08:15" } },
  { id: 5, name: "Stephanie Morin", need: "Invisalign", value: "6,500$", status: "nurturing", score: 72, source: "Instagram", follow: { fr: "Rappel vendredi", en: "Callback Friday" }, time: { fr: "Hier 16:00", en: "Yest. 16:00" } },
  { id: 6, name: "Philippe Bouchard", need: { fr: "Couronne", en: "Crown" }, value: "1,400$", status: "lost", score: 45, source: { fr: "Reference", en: "Referral" }, follow: { fr: "Pas de reponse \xD73", en: "No response \xD73" }, time: { fr: "Hier 09:20", en: "Yest. 09:20" } },
  { id: 7, name: "Nathalie Gagnon", need: { fr: "Prothese partielle", en: "Partial denture" }, value: "2,800$", status: "booked", score: 88, source: "Google", follow: { fr: "Consultation lundi", en: "Consult Monday" }, time: { fr: "13 fev", en: "Feb 13" } },
];

const automations = [
  { name: { fr: "Confirmation RDV (SMS + Email)", en: "Appt Confirmation (SMS + Email)" }, type: { fr: "Pre-visite", en: "Pre-visit" }, triggers: { fr: "24h avant", en: "24h before" }, status: "active", sent: 142, rate: "97%", icon: "\u{1F4F1}" },
  { name: { fr: "Rappel no-show", en: "No-show reminder" }, type: { fr: "Recuperation", en: "Recovery" }, triggers: { fr: "15 min apres no-show", en: "15 min after no-show" }, status: "active", sent: 23, rate: "35%", icon: "\u{1F504}" },
  { name: { fr: "Suivi post-traitement", en: "Post-treatment follow-up" }, type: { fr: "Post-visite", en: "Post-visit" }, triggers: { fr: "48h apres visite", en: "48h after visit" }, status: "active", sent: 89, rate: "68%", icon: "\u{1F48A}" },
  { name: { fr: "Nurturing Invisalign", en: "Invisalign nurturing" }, type: { fr: "Sequence vente", en: "Sales sequence" }, triggers: { fr: "Jour 1, 3, 7, 14", en: "Day 1, 3, 7, 14" }, status: "active", sent: 67, rate: "22%", icon: "\u2728" },
  { name: { fr: "Reactivation patients inactifs", en: "Inactive patient reactivation" }, type: "Win-back", triggers: { fr: "6 mois sans visite", en: "6 months no visit" }, status: "active", sent: 215, rate: "18%", icon: "\u{1F4E7}" },
  { name: { fr: "Collecte avis Google", en: "Google review collection" }, type: { fr: "Reputation", en: "Reputation" }, triggers: { fr: "7 jours apres visite", en: "7 days after visit" }, status: "active", sent: 104, rate: "41%", icon: "\u2B50" },
];

/* Interactive chatbot flow */
const chatFlows = {
  fr: [
    { type: "ai", text: "Bonjour! \u{1F60A} Bienvenue a la Clinique Dentaire Sainte-Catherine. Comment puis-je vous aider?" },
    { type: "choices", options: [
      { label: "RDV nettoyage", text: "Euh bonjour, est-ce que vous auriez des disponibilites cette semaine pour un nettoyage?" },
      { label: "Mal de dent", text: "Salut, j'ai une dent qui me fait vraiment mal depuis hier..." },
    ]},
    { type: "ai", text: "Bien sur! Nous avons des places mercredi a 10h ou 14h, et jeudi a 9h ou 15h30. Quelle plage vous conviendrait?" },
    { type: "choices", options: [
      { label: "Jeudi 9h", text: "Jeudi 9h ca serait parfait!" },
      { label: "Mercredi 14h", text: "Hmm mercredi 14h ca marcherait" },
    ]},
    { type: "ai", text: "Excellent! Je vous reserve le jeudi 20 fevrier a 9h avec Dre Tremblay. Est-ce votre premiere visite chez nous?" },
    { type: "choices", options: [
      { label: "Oui, premiere fois", text: "Oui c'est ma premiere fois" },
      { label: "Non, deja patient", text: "Non j'suis deja venu il y a longtemps" },
    ]},
    { type: "ai", text: "Bienvenue! \u{1F389} Pour accelerer votre enregistrement, je vous envoie un formulaire pre-visite par email. Puis-je avoir votre nom et courriel?" },
    { type: "choices", options: [
      { label: "Donner mes infos", text: "Emilie Fortin, emilie.fortin@gmail.com" },
      { label: "Juste mon nom", text: "Emilie Fortin. Mon email c'est emilie.fortin@gmail.com" },
    ]},
    { type: "ai", text: "Merci Emilie! Votre RDV est confirme \u2705\n\n\u{1F4C5} Jeudi 20 fev. a 9h00\n\u{1F469}\u200D\u2695\uFE0F Dre Tremblay\n\u{1F4CD} 1250 rue Sherbrooke, Montreal\n\nVous recevrez un SMS de rappel 24h avant. A bientot!" },
  ],
  en: [
    { type: "ai", text: "Hello! \u{1F60A} Welcome to Sainte-Catherine Dental Clinic. How can I help you?" },
    { type: "choices", options: [
      { label: "Cleaning appointment", text: "Uh hi, do you have any availability this week for a cleaning?" },
      { label: "Toothache", text: "Hey, I've had a tooth that's been really hurting since yesterday..." },
    ]},
    { type: "ai", text: "Of course! We have spots Wednesday at 10am or 2pm, and Thursday at 9am or 3:30pm. Which works best?" },
    { type: "choices", options: [
      { label: "Thursday 9am", text: "Thursday 9am would be perfect!" },
      { label: "Wednesday 2pm", text: "Hmm Wednesday 2pm could work" },
    ]},
    { type: "ai", text: "Excellent! I'm booking you for Thursday, February 20th at 9am with Dr. Tremblay. Is this your first visit with us?" },
    { type: "choices", options: [
      { label: "Yes, first time", text: "Yeah it's my first time" },
      { label: "No, been before", text: "No I came a long time ago" },
    ]},
    { type: "ai", text: "Welcome! \u{1F389} To speed up your registration, I'll send you a pre-visit form by email. May I have your name and email?" },
    { type: "choices", options: [
      { label: "Give my info", text: "Emilie Fortin, emilie.fortin@gmail.com" },
      { label: "Just my name", text: "Emilie Fortin. My email is emilie.fortin@gmail.com" },
    ]},
    { type: "ai", text: "Thank you Emilie! Your appointment is confirmed \u2705\n\n\u{1F4C5} Thursday Feb 20 at 9:00am\n\u{1F469}\u200D\u2695\uFE0F Dr. Tremblay\n\u{1F4CD} 1250 Sherbrooke St, Montreal\n\nYou'll receive an SMS reminder 24h before. See you soon!" },
  ],
};

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
  const [lang, setLang] = useState(detectLang);
  const [showHero, setShowHero] = useState(true);
  const [tab, setTab] = useState("pipeline");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatStep, setChatStep] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const mobile = useIsMobile();
  const t = T[lang];
  const flow = chatFlows[lang];

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "fr" ? "en" : "fr"));
    setChatMessages([]);
    setChatStep(-1);
    setIsTyping(false);
  }, []);

  const g = (v) => (typeof v === "object" ? v[lang] : v);

  // Start chat when tab = chatbot
  useEffect(() => {
    if (tab === "chatbot") {
      setChatMessages([]);
      setChatStep(0);
      setIsTyping(false);
    }
  }, [tab, lang]);

  // Process AI steps
  useEffect(() => {
    if (tab !== "chatbot" || chatStep < 0 || chatStep >= flow.length) return;
    const step = flow[chatStep];
    if (step.type !== "ai") return;

    setIsTyping(true);
    const delay = chatMessages.length === 0 ? 800 : 1000 + Math.random() * 500;
    const timer = setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "ai", text: step.text }]);
      setIsTyping(false);
      setChatStep((s) => s + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [chatStep, tab, flow, chatMessages.length]);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages, isTyping]);

  const handleChoice = (option) => {
    setChatMessages((prev) => [...prev, { role: "patient", text: option.text }]);
    setChatStep((s) => s + 1);
  };

  const clientMsgCount = chatMessages.filter((m) => m.role === "patient").length;

  const statusLabel = (status) => {
    const map = {
      booked: { label: t.booked, color: C.accent },
      nurturing: { label: t.nurturing, color: C.orange },
      lost: { label: t.lost, color: C.red },
    };
    return map[status] || map.booked;
  };

  const tabs = [
    { key: "pipeline", label: t.tabPipeline, icon: "\u{1F465}" },
    { key: "automations", label: t.tabAutomations, icon: "\u26A1" },
    { key: "chatbot", label: mobile ? "\u{1F4AC}" : t.tabChatbot, icon: mobile ? "" : "\u{1F4AC}" },
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
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px ${C.accent}20 } 50% { box-shadow: 0 0 40px ${C.accent}35 } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-6px) } }
        @keyframes choicePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(6,214,160,0.3) } 50% { box-shadow: 0 0 0 6px rgba(6,214,160,0) } }
      `}</style>

      {/* ========== HERO ========== */}
      {showHero && (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: mobile ? 20 : 40, textAlign: "center", position: "relative", overflow: "hidden",
          background: `radial-gradient(ellipse at 50% 0%, #0d2b3e 0%, ${C.bg} 60%)`,
        }}>
          <button onClick={toggleLang} style={{
            position: "absolute", top: mobile ? 16 : 24, right: mobile ? 16 : 24,
            padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}40`,
            cursor: "pointer",
          }}>
            {lang === "fr" ? "EN" : "FR"}
          </button>

          <div style={{
            padding: "6px 18px", borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}30`,
            marginBottom: 24, animation: "fadeIn 0.6s ease",
          }}>
            {"\u{1F3AF}"} {t.heroBadge}
          </div>

          <div style={{
            fontSize: mobile ? 32 : 40, marginBottom: 8, animation: "fadeIn 0.6s ease 0.1s backwards",
          }}>{"\u{1F9B7}"}</div>

          <div style={{
            fontSize: mobile ? 26 : 34, fontWeight: 800, letterSpacing: -1, marginBottom: 8,
            animation: "fadeIn 0.6s ease 0.15s backwards",
          }}>
            Denti<span style={{ color: C.accent }}>Flow</span> AI
          </div>

          <h1 style={{
            fontSize: mobile ? 20 : 36, fontWeight: 800, letterSpacing: -0.5,
            maxWidth: 680, lineHeight: 1.2, margin: "0 0 16px",
            animation: "fadeIn 0.6s ease 0.2s backwards",
          }}>
            {t.heroTitle}
          </h1>

          <p style={{
            fontSize: mobile ? 14 : 17, color: C.muted, maxWidth: 540,
            lineHeight: 1.6, margin: "0 0 32px",
            animation: "fadeIn 0.6s ease 0.3s backwards",
          }}>
            {t.heroSub}
          </p>

          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
            marginBottom: 40, animation: "fadeIn 0.6s ease 0.4s backwards",
          }}>
            <button onClick={() => setShowHero(false)} style={{
              padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
              color: C.bg, fontSize: 15, fontWeight: 700,
              boxShadow: `0 4px 24px ${C.accent}40`,
            }}>
              {t.heroExplore} \u2192
            </button>
            <a href="https://www.prime-dev-studios.com/#contact" target="_blank" rel="noopener noreferrer" style={{
              padding: "14px 32px", borderRadius: 12, textDecoration: "none",
              background: "transparent", color: C.white, fontSize: 15, fontWeight: 600,
              border: `1px solid ${C.border}`,
            }}>
              {t.heroCta}
            </a>
          </div>

          <div style={{
            display: "flex", gap: mobile ? 16 : 40, flexWrap: "wrap", justifyContent: "center",
            animation: "fadeIn 0.6s ease 0.5s backwards",
          }}>
            {[
              { val: "156", icon: "\u{1F465}", label: t.heroStat1, color: C.accent },
              { val: "89", icon: "\u{1F4C5}", label: t.heroStat2, color: C.blue },
              { val: "4%", icon: "\u{1F4C9}", label: t.heroStat3, color: C.purple },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: mobile ? 28 : 36, fontWeight: 800, color: s.color, fontFamily: "'Space Mono', monospace" }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{s.icon} {s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", bottom: mobile ? 16 : 24, fontSize: 12, color: C.dim }}>
            {t.footerBy} <span style={{ color: C.accent, fontWeight: 600 }}>PrimeDev Studios</span>
          </div>
        </div>
      )}

      {/* ========== MAIN APP ========== */}
      {!showHero && (
        <>
          <header style={{
            padding: mobile ? "12px 14px" : "14px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: `1px solid ${C.border}`, background: "rgba(3,7,18,0.9)", backdropFilter: "blur(16px)",
            position: "sticky", top: 0, zIndex: 50, gap: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: mobile ? 10 : 14, minWidth: 0 }}>
              <div style={{
                width: mobile ? 34 : 40, height: mobile ? 34 : 40, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: mobile ? 17 : 20, animation: "glow 3s infinite",
              }}>{"\u{1F9B7}"}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: mobile ? 15 : 17, fontWeight: 800, letterSpacing: -0.5 }}>
                  Denti<span style={{ color: C.accent }}>Flow</span> AI
                </div>
                {!mobile && <div style={{ fontSize: 11, color: C.dim }}>{t.subtitle}</div>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button onClick={toggleLang} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}40`,
                cursor: "pointer",
              }}>
                {lang === "fr" ? "EN" : "FR"}
              </button>
              {!mobile && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 14px", borderRadius: 20,
                  background: `${C.accent}12`, border: `1px solid ${C.accent}35`,
                  fontSize: 12, fontWeight: 600, color: C.accent,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, animation: "pulse2 2s infinite" }} />
                  {t.automationsActive}
                </div>
              )}
              {!mobile && (
                <div style={{ padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
                  PrimeDev Studios
                </div>
              )}
            </div>
          </header>

          <div style={{
            display: "flex", gap: 4, padding: mobile ? "10px 12px" : "10px 28px",
            borderBottom: `1px solid ${C.border}`, background: "rgba(3,7,18,0.5)",
            overflowX: "auto",
          }}>
            {tabs.map((tb) => (
              <button key={tb.key} onClick={() => setTab(tb.key)}
                style={{
                  padding: mobile ? "7px 14px" : "8px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontSize: mobile ? 12 : 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
                  background: tab === tb.key ? `linear-gradient(135deg, ${C.accent}, ${C.blue})` : "transparent",
                  color: tab === tb.key ? C.bg : C.muted, transition: "all 0.25s",
                  whiteSpace: "nowrap", flexShrink: 0,
                }}>
                {tb.icon && <span>{tb.icon}</span>} {tb.label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? 14 : 28, paddingBottom: mobile ? 80 : 28 }}>

            {/* KPI BAR */}
            <div style={{
              display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)",
              gap: mobile ? 10 : 14, marginBottom: mobile ? 14 : 24,
            }}>
              {[
                { label: t.kpiPatients, val: t.kpiPatientsVal, suffix: "", color: C.accent, icon: "\u{1F465}", sub: t.kpiPatientsSub },
                { label: t.kpiBooked, val: t.kpiBookedVal, suffix: "", color: C.blue, icon: "\u{1F4C5}", sub: t.kpiBookedSub },
                { label: t.kpiRevenue, val: 42, suffix: "K$", color: C.purple, icon: "\u{1F4B0}", sub: t.kpiRevenueSub },
                { label: t.kpiNoshow, val: 4, suffix: "%", color: C.accent, icon: "\u{1F4C9}", sub: t.kpiNoshowSub },
                { label: t.kpiReviews, val: 4.9, suffix: "/5", color: C.orange, icon: "\u2B50", sub: t.kpiReviewsSub },
              ].map((k, i) => (
                <div key={i} style={{
                  background: C.card, borderRadius: mobile ? 12 : 14, padding: mobile ? "14px 12px" : "18px 16px",
                  border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
                  ...(mobile && i === 4 ? { gridColumn: "1 / -1" } : {}),
                }}>
                  <div style={{ position: "absolute", bottom: -15, right: -15, width: 60, height: 60, borderRadius: "50%", background: `${k.color}08` }} />
                  <div style={{ fontSize: mobile ? 9 : 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
                    {k.icon} {k.label}
                  </div>
                  <div style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>
                    <AnimatedNumber value={k.val} suffix={k.suffix} color={k.color} />
                  </div>
                  <div style={{ fontSize: mobile ? 9 : 10, color: C.dim }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* PIPELINE */}
            {tab === "pipeline" && (
              <div style={{ animation: "slideIn 0.3s ease" }}>
                <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <div style={{
                    padding: mobile ? "14px 14px" : "18px 24px", borderBottom: `1px solid ${C.border}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
                  }}>
                    <div>
                      <div style={{ fontSize: mobile ? 14 : 16, fontWeight: 700 }}>{t.pipelineTitle}</div>
                      {!mobile && <div style={{ fontSize: 12, color: C.dim }}>{t.pipelineSub}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[
                        { label: t.booked, count: patients.filter((p) => p.status === "booked").length, color: C.accent },
                        { label: t.nurturing, count: patients.filter((p) => p.status === "nurturing").length, color: C.orange },
                        { label: t.lost, count: patients.filter((p) => p.status === "lost").length, color: C.red },
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

                  {mobile ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {patients.map((p, i) => {
                        const st = statusLabel(p.status);
                        return (
                          <div key={p.id} style={{
                            padding: "14px 14px", borderBottom: `1px solid ${C.border}`,
                            animation: "slideIn 0.3s ease", animationDelay: `${i * 50}ms`, animationFillMode: "backwards",
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{
                                  width: 30, height: 30, borderRadius: 8,
                                  background: `${st.color}15`, border: `1px solid ${st.color}30`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: 13, fontWeight: 700, color: st.color,
                                }}>{p.name.charAt(0)}</div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                              </div>
                              <div style={{
                                display: "inline-flex", alignItems: "center", gap: 4,
                                padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                                background: p.score >= 85 ? `${C.accent}18` : p.score >= 65 ? `${C.orange}18` : `${C.red}18`,
                                color: p.score >= 85 ? C.accent : p.score >= 65 ? C.orange : C.red,
                              }}>{p.score}%</div>
                            </div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                              <span style={{ fontSize: 12, color: C.muted }}>{g(p.need)}</span>
                              <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{p.value}</span>
                              <span style={{
                                padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                                background: `${st.color}15`, color: st.color,
                              }}>{st.label}</span>
                              <span style={{ fontSize: 11, color: C.dim, marginLeft: "auto" }}>{g(p.time)}</span>
                            </div>
                            <div style={{ fontSize: 11, color: st.color, marginTop: 4, fontWeight: 500 }}>{g(p.follow)}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div style={{
                        display: "grid", gridTemplateColumns: "1.8fr 1.2fr 0.8fr 0.7fr 0.8fr 1.2fr 0.8fr",
                        padding: "10px 24px", fontSize: 10, fontWeight: 700, color: C.dim,
                        textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${C.border}`,
                      }}>
                        <span>{t.colPatient}</span><span>{t.colNeed}</span><span>{t.colValue}</span><span>{t.colScore}</span><span>{t.colSource}</span><span>{t.colFollow}</span><span>{t.colTime}</span>
                      </div>
                      {patients.map((p, i) => {
                        const statusColor = p.status === "booked" ? C.accent : p.status === "nurturing" ? C.orange : C.red;
                        return (
                          <div key={p.id} style={{
                            display: "grid", gridTemplateColumns: "1.8fr 1.2fr 0.8fr 0.7fr 0.8fr 1.2fr 0.8fr",
                            alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.border}`,
                            animation: "slideIn 0.3s ease", animationDelay: `${i * 50}ms`, animationFillMode: "backwards",
                            cursor: "pointer", transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = C.surface)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 34, height: 34, borderRadius: 10,
                                background: `${statusColor}15`, border: `1px solid ${statusColor}30`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 14, fontWeight: 700, color: statusColor,
                              }}>{p.name.charAt(0)}</div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                            </div>
                            <div style={{ fontSize: 12, color: C.muted }}>{g(p.need)}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{p.value}</div>
                            <div style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                              background: p.score >= 85 ? `${C.accent}18` : p.score >= 65 ? `${C.orange}18` : `${C.red}18`,
                              color: p.score >= 85 ? C.accent : p.score >= 65 ? C.orange : C.red,
                            }}>{p.score}%</div>
                            <div style={{ fontSize: 11, color: C.dim }}>{g(p.source)}</div>
                            <div style={{ fontSize: 11, color: statusColor, fontWeight: 500 }}>{g(p.follow)}</div>
                            <div style={{ fontSize: 11, color: C.dim }}>{g(p.time)}</div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* AUTOMATIONS */}
            {tab === "automations" && (
              <div style={{ animation: "slideIn 0.3s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  {automations.map((a, i) => (
                    <div key={i} style={{
                      background: C.card, borderRadius: 14, padding: mobile ? 16 : 22,
                      border: `1px solid ${C.border}`,
                      animation: "slideIn 0.3s ease", animationDelay: `${i * 80}ms`, animationFillMode: "backwards",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.accent + "50")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
                          <div style={{
                            width: mobile ? 36 : 40, height: mobile ? 36 : 40, borderRadius: 10, flexShrink: 0,
                            background: `${C.accent}12`, border: `1px solid ${C.accent}25`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: mobile ? 16 : 18,
                          }}>{a.icon}</div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 700 }}>{g(a.name)}</div>
                            <div style={{ fontSize: 11, color: C.dim }}>{g(a.type)} \xB7 {t.trigger}: {g(a.triggers)}</div>
                          </div>
                        </div>
                        <div style={{
                          padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, flexShrink: 0,
                          background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}30`,
                          textTransform: "uppercase", letterSpacing: 0.5,
                        }}>{t.active}</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                          <div style={{ fontSize: 10, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.msgSent}</div>
                          <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 800, color: C.blue, fontFamily: "'Space Mono', monospace" }}>{a.sent}</div>
                        </div>
                        <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                          <div style={{ fontSize: 10, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{t.responseRate}</div>
                          <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 800, color: C.accent, fontFamily: "'Space Mono', monospace" }}>{a.rate}</div>
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
                  marginTop: 20, background: C.card, borderRadius: 14, padding: mobile ? 16 : 24,
                  border: `1px solid ${C.accent}30`,
                  display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16,
                }}>
                  {[
                    { label: t.roiTimeSaved, val: "47h", color: C.accent, sub: t.roiTimeSub },
                    { label: t.roiNoshow, val: "23", color: C.blue, sub: t.roiNoshowSub },
                    { label: t.roiReactivated, val: "38", color: C.purple, sub: t.roiReactivatedSub },
                    { label: t.roiMonthly, val: "14x", color: C.orange, sub: t.roiMonthlySub },
                  ].map((r, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: mobile ? 9 : 10, color: C.dim, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{r.label}</div>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: r.color, fontFamily: "'Space Mono', monospace" }}>{r.val}</div>
                      <div style={{ fontSize: mobile ? 10 : 11, color: C.dim }}>{r.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INTERACTIVE CHATBOT */}
            {tab === "chatbot" && (
              <div style={{ animation: "slideIn 0.3s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 340px", gap: 16 }}>
                  <div style={{
                    background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
                    display: "flex", flexDirection: "column", height: mobile ? 440 : 540,
                  }}>
                    <div style={{
                      padding: mobile ? "12px 14px" : "14px 20px", borderBottom: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <div style={{
                        width: mobile ? 32 : 38, height: mobile ? 32 : 38, borderRadius: 12, flexShrink: 0,
                        background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: mobile ? 15 : 18,
                      }}>{"\u{1F9B7}"}</div>
                      <div>
                        <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 700 }}>{t.chatTitle}</div>
                        <div style={{ fontSize: 11, color: C.accent }}>{t.chatOnline}</div>
                      </div>
                    </div>

                    {/* Hint */}
                    <div style={{
                      padding: "8px 16px", background: `${C.accent}08`,
                      borderBottom: `1px solid ${C.border}`,
                      fontSize: 11, color: C.accent, fontWeight: 500, textAlign: "center",
                    }}>
                      {"\u{1F446}"} {t.chatHint}
                    </div>

                    <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: mobile ? 14 : 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{
                        textAlign: "center", padding: 12, margin: "0 auto 8px",
                        borderRadius: 12, background: C.surface, fontSize: 11, color: C.dim, maxWidth: 300,
                      }}>
                        {t.chatIntro}
                      </div>

                      {chatMessages.map((msg, i) => (
                        <div key={i} style={{
                          display: "flex", justifyContent: msg.role === "ai" ? "flex-start" : "flex-end",
                          animation: "slideIn 0.3s ease",
                        }}>
                          {msg.role === "ai" && (
                            <div style={{
                              width: 28, height: 28, borderRadius: 8, marginRight: 8, flexShrink: 0,
                              background: `${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 14,
                            }}>{"\u{1F9B7}"}</div>
                          )}
                          <div style={{
                            maxWidth: mobile ? "85%" : "75%", padding: "10px 16px", borderRadius: 16,
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
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease" }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: `${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                          }}>{"\u{1F9B7}"}</div>
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

                      {/* Choice buttons */}
                      {!isTyping && chatStep >= 0 && chatStep < flow.length && flow[chatStep].type === "choices" && (
                        <div style={{
                          display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end",
                          padding: "4px 0", animation: "slideIn 0.3s ease",
                        }}>
                          {flow[chatStep].options.map((opt, i) => (
                            <button key={i} onClick={() => handleChoice(opt)} style={{
                              padding: "10px 18px", borderRadius: 20, border: `1px solid ${C.accent}60`,
                              background: `${C.accent}12`, color: C.accent,
                              fontSize: 12, fontWeight: 600, cursor: "pointer",
                              transition: "all 0.2s", animation: "choicePulse 2s infinite",
                              animationDelay: `${i * 300}ms`,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = `${C.accent}12`; e.currentTarget.style.color = C.accent; }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {chatStep >= flow.length && !isTyping && (
                        <div style={{
                          padding: "12px 16px", borderRadius: 12, textAlign: "center",
                          background: `${C.accent}12`, border: `1px solid ${C.accent}30`,
                          fontSize: 12, fontWeight: 600, color: C.accent,
                          animation: "slideIn 0.4s ease",
                        }}>
                          \u2705 {t.chatDone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Side Panel */}
                  <div style={{ display: "flex", flexDirection: mobile ? "row" : "column", gap: 12, overflowX: mobile ? "auto" : "visible" }}>
                    <div style={{
                      background: C.card, borderRadius: 16, padding: mobile ? 16 : 20,
                      border: `1px solid ${C.border}`, minWidth: mobile ? 280 : "auto", flex: mobile ? "0 0 auto" : "unset",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{t.ficheTitle}</div>
                      {t.ficheFields.map(([k, v], i) => {
                        const visible = i <= 1 ? clientMsgCount >= 1
                          : i <= 3 ? clientMsgCount >= 2
                          : i <= 5 ? clientMsgCount >= 3
                          : clientMsgCount >= 4;
                        return (
                          <div key={i} style={{
                            display: "flex", justifyContent: "space-between", padding: "6px 0",
                            borderBottom: i < 6 ? `1px solid ${C.border}` : "none", gap: 12,
                            opacity: visible ? 1 : 0.15, transition: "opacity 0.5s ease",
                          }}>
                            <span style={{ fontSize: 11, color: C.dim, whiteSpace: "nowrap" }}>{k}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: C.white, textAlign: "right" }}>
                              {visible ? v : "\u2014"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{
                      background: C.card, borderRadius: 16, padding: mobile ? 16 : 20,
                      border: `1px solid ${C.border}`, minWidth: mobile ? 240 : "auto", flex: mobile ? "0 0 auto" : "unset",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{t.actionsTitle}</div>
                      {t.actions.map((a, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
                          borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                          opacity: clientMsgCount > i ? 1 : 0.2,
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
              marginTop: mobile ? 20 : 32, padding: mobile ? "16px 14px" : "20px 24px", borderRadius: 16,
              background: `linear-gradient(135deg, ${C.accent}10, ${C.blue}15)`,
              border: `1px solid ${C.accent}25`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexDirection: mobile ? "column" : "row", gap: mobile ? 12 : 0,
            }}>
              <div style={{ textAlign: mobile ? "center" : "left" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                  {t.footerBy} <span style={{ color: C.accent }}>PrimeDev Studios</span>
                </div>
                <div style={{ fontSize: 12, color: C.dim }}>{t.footerTech}</div>
              </div>
              <a href="https://www.prime-dev-studios.com/#contact" target="_blank" rel="noopener noreferrer" style={{
                padding: "10px 24px", borderRadius: 10,
                background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                fontSize: 13, fontWeight: 700, color: C.bg, cursor: "pointer",
                textDecoration: "none", whiteSpace: "nowrap",
              }}>
                {t.footerCta}
              </a>
            </div>
          </div>

          {/* FLOATING CTA */}
          <a href="https://www.prime-dev-studios.com/#contact" target="_blank" rel="noopener noreferrer"
            style={{
              position: "fixed", bottom: mobile ? 16 : 24, right: mobile ? 16 : 24, zIndex: 100,
              padding: mobile ? "10px 18px" : "12px 24px", borderRadius: 50,
              background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
              color: C.bg, fontSize: 13, fontWeight: 700,
              textDecoration: "none", boxShadow: `0 4px 24px ${C.accent}40`,
              display: "flex", alignItems: "center", gap: 8,
              animation: "float 3s ease-in-out infinite",
            }}>
            {"\u{1F4AC}"} {t.floatingCta}
          </a>
        </>
      )}
    </div>
  );
}
