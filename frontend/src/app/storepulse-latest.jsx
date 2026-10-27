
import { useState, useEffect, useRef } from "react";

const STORES = {
  "spectrum mobile": {
    name: "Spectrum Mobile", initials: "SM", color: "#0066CC",
    usaRating: 2.7, totalReviews: 48320, monthReviews: 1240,
    responseTime: "3.2 days", ratingTrend: -4.2,
    states: { "Missouri": 2.1, "Texas": 2.4, "California": 2.9, "New York": 2.6, "Florida": 2.3, "Illinois": 2.8, "Ohio": 2.5, "Georgia": 2.2, "North Carolina": 3.0, "Michigan": 2.7, "Washington": 3.1, "Arizona": 2.4 },
    ratingDist: { 5: 8, 4: 10, 3: 12, 2: 18, 1: 52 },
    sentiment: { positive: 18, neutral: 22, negative: 60 },
    trendData: {
      labels: ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6","Wk 7","Wk 8"],
      billing:      [8,10,9,12,11,14,13,16],
      staff:        [4,5,6,5,7,8,7,9],
      cancellation: [2,3,3,4,3,5,5,6],
    },
    issueBreakdown: [
      { label:"Billing", pct:38, color:"#ff3b30" },
      { label:"Staff behavior", pct:25, color:"#ff9500" },
      { label:"Cancellation", pct:17, color:"#5856d6" },
      { label:"Wait time", pct:13, color:"#007aff" },
      { label:"Technical", pct:7, color:"#34c759" },
    ],
    escalations: [
      { store:"Independence MO", urgency:"High", reason:"Billing fraud + collections mention", reviewer:"Sean C.", status:"Open", date:"Feb 10", category:"Cancellation", quote:"Spectrum will make you regret using them when you try to cancel. Received a collections notice for $180 I never owed." },
      { store:"Kansas City MO", urgency:"High", reason:"FCC complaint threat + billing fraud", reviewer:"Linda P.", status:"Open", date:"Feb 9", category:"Billing", quote:"Charged twice for the same month. Refusing a refund. I'm filing a complaint with the FCC. This is theft." },
      { store:"Springfield MO", urgency:"High", reason:"Legal threat + deliberate obstruction claim", reviewer:"Karen B.", status:"Open", date:"Feb 12", category:"Cancellation", quote:"Trying to cancel for two weeks. Transferred 4 times then disconnected. This is deliberate. I'm contacting my attorney." },
      { store:"Dallas TX", urgency:"High", reason:"Misrepresentation of pricing by staff", reviewer:"James W.", status:"In Review", date:"Feb 11", category:"Staff", quote:"Sales rep lied about the promotional rate. Bill came in $40 more than quoted. He denied ever saying it." },
    ],
    stores: [
      { name:"Springfield MO", rating:1.9, reviews:52, escalations:11, trend:"↘", risk:"Critical" },
      { name:"Independence MO", rating:2.1, reviews:47, escalations:8, trend:"↘", risk:"Critical" },
      { name:"Dallas TX", rating:2.4, reviews:61, escalations:9, trend:"↘", risk:"Critical" },
      { name:"Kansas City MO", rating:2.8, reviews:39, escalations:5, trend:"↘", risk:"At risk" },
      { name:"Houston TX", rating:2.9, reviews:44, escalations:6, trend:"→", risk:"At risk" },
      { name:"Austin TX", rating:3.1, reviews:28, escalations:4, trend:"↗", risk:"At risk" },
      { name:"St. Louis MO", rating:3.2, reviews:31, escalations:3, trend:"↗", risk:"Stable" },
      { name:"Columbia MO", rating:3.5, reviews:22, escalations:2, trend:"→", risk:"Stable" },
    ],
    reviews: [
      { name:"Sean C.", date:"Feb 10", rating:1, text:"Spectrum will make you regret using them when you try to cancel. Called and got everything squared away then shipped equipment back. Received a collections notice 6 months later.", category:"Cancellation" },
      { name:"Linda P.", date:"Feb 9", rating:1, text:"They charged me twice for the same month and now refuse to issue a refund. I'm filing a complaint with the FCC. This is theft.", category:"Billing" },
      { name:"Karen B.", date:"Feb 12", rating:1, text:"I've been trying to cancel for two weeks. Every time I call I get transferred 4 times and then disconnected. This is deliberate. I'm contacting my attorney.", category:"Cancellation" },
      { name:"Maria T.", date:"Feb 8", rating:1, text:"Rep was extremely rude and dismissive. I asked about my bill and he literally rolled his eyes and told me to call customer service.", category:"Staff" },
      { name:"James W.", date:"Feb 11", rating:1, text:"The sales rep lied to me about the promotional rate. When my first bill came in it was $40 more than quoted.", category:"Billing" },
      { name:"Amy R.", date:"Feb 6", rating:3, text:"Service is okay but the store is always understaffed. 30-minute waits are normal. The staff that ARE there are nice enough.", category:"Wait Time" },
      { name:"David M.", date:"Feb 5", rating:2, text:"Equipment they gave me was defective. Took 3 trips to the store to resolve. Each time a different rep gave different info.", category:"Technical" },
      { name:"Rachel K.", date:"Feb 4", rating:2, text:"Hidden fees on every bill. What I was quoted and what I actually pay are never the same number.", category:"Billing" },
      { name:"Tom H.", date:"Feb 3", rating:4, text:"Coverage is actually solid in my area. Setup was smooth and the rep was helpful. No complaints so far.", category:"Positive" },
      { name:"Sarah L.", date:"Feb 2", rating:1, text:"Worst customer service I've ever experienced. On hold for 2 hours with no resolution whatsoever.", category:"Support" },
    ]
  },
  "taco bell": {
    name: "Taco Bell", initials: "TB", color: "#702082",
    usaRating: 3.8, totalReviews: 124500, monthReviews: 3840,
    responseTime: "1.1 days", ratingTrend: +2.1,
    states: { "California": 3.9, "Texas": 4.0, "Florida": 3.7, "New York": 3.6, "Illinois": 3.8, "Arizona": 4.1, "Ohio": 3.7, "Georgia": 3.9, "Michigan": 3.6, "Washington": 3.8, "Missouri": 3.7, "North Carolina": 4.0 },
    ratingDist: { 5: 32, 4: 28, 3: 18, 2: 12, 1: 10 },
    sentiment: { positive: 60, neutral: 24, negative: 16 },
    trendData: {
      labels: ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6","Wk 7","Wk 8"],
      billing:      [3,2,4,3,2,3,2,2],
      staff:        [2,3,2,2,3,2,3,2],
      cancellation: [1,1,2,1,1,2,1,1],
    },
    issueBreakdown: [
      { label:"Order accuracy", pct:35, color:"#ff3b30" },
      { label:"Wait time", pct:28, color:"#ff9500" },
      { label:"Staff", pct:18, color:"#5856d6" },
      { label:"Food quality", pct:12, color:"#007aff" },
      { label:"App issues", pct:7, color:"#34c759" },
    ],
    escalations: [
      { store:"Los Angeles CA", urgency:"High", reason:"Food safety complaint — health department report filed", reviewer:"Nicole W.", status:"Open", date:"Feb 5", category:"Safety", quote:"Food poisoning. Spent two days sick. Filed a report with the health department." },
      { store:"Houston TX", urgency:"Medium", reason:"Repeated order accuracy failures — 3rd complaint this month", reviewer:"Carlos R.", status:"Open", date:"Feb 10", category:"Order", quote:"Order was completely wrong. Missing half the items. This is the third time at this location." },
    ],
    stores: [
      { name:"Los Angeles CA", rating:3.6, reviews:210, escalations:3, trend:"↘", risk:"At risk" },
      { name:"Houston TX", rating:3.7, reviews:185, escalations:2, trend:"→", risk:"At risk" },
      { name:"Phoenix AZ", rating:4.2, reviews:142, escalations:1, trend:"↗", risk:"Stable" },
      { name:"Dallas TX", rating:4.0, reviews:168, escalations:1, trend:"↗", risk:"Stable" },
      { name:"Chicago IL", rating:3.8, reviews:155, escalations:2, trend:"→", risk:"Stable" },
    ],
    reviews: [
      { name:"Mike D.", date:"Feb 12", rating:5, text:"Best late-night food. Always hot and fresh at midnight. Staff super friendly.", category:"Positive" },
      { name:"Jessica T.", date:"Feb 11", rating:4, text:"Love the new menu items. Drive-thru was quick. Minor wait inside but worth it.", category:"Service" },
      { name:"Carlos R.", date:"Feb 10", rating:2, text:"Order was completely wrong. Missing half the items. Won't be back to this location.", category:"Order" },
      { name:"Ashley M.", date:"Feb 9", rating:5, text:"Value is unbeatable. Got a full meal for under $8. Consistently good.", category:"Value" },
      { name:"Nicole W.", date:"Feb 5", rating:1, text:"Food poisoning. Spent two days sick. Filed a report with health department.", category:"Safety" },
      { name:"Tyler H.", date:"Feb 6", rating:5, text:"Mobile app ordering is so smooth. Ready exactly when I arrive. No wait!", category:"App" },
      { name:"Priya S.", date:"Feb 7", rating:3, text:"Hit or miss. Some locations are great, others are disappointing.", category:"Consistency" },
      { name:"Jason L.", date:"Feb 4", rating:4, text:"New Cantina menu is amazing. Great additions. Will be back weekly.", category:"Menu" },
    ]
  },
  "best buy": {
    name: "Best Buy", initials: "BB", color: "#003087",
    usaRating: 3.4, totalReviews: 89200, monthReviews: 2100,
    responseTime: "2.4 days", ratingTrend: -1.3,
    states: { "California": 3.5, "Texas": 3.4, "Florida": 3.3, "New York": 3.2, "Illinois": 3.6, "Washington": 3.7, "Ohio": 3.4, "Georgia": 3.3, "Michigan": 3.5, "Arizona": 3.4, "Missouri": 3.3, "North Carolina": 3.5 },
    ratingDist: { 5: 25, 4: 22, 3: 20, 2: 18, 1: 15 },
    sentiment: { positive: 47, neutral: 28, negative: 25 },
    trendData: {
      labels: ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6","Wk 7","Wk 8"],
      billing:      [5,6,4,7,5,6,5,7],
      staff:        [4,3,5,4,6,4,5,4],
      cancellation: [2,3,2,3,2,3,3,2],
    },
    issueBreakdown: [
      { label:"Staff pressure", pct:30, color:"#ff3b30" },
      { label:"Shipping issues", pct:25, color:"#ff9500" },
      { label:"Pricing", pct:22, color:"#5856d6" },
      { label:"Installation", pct:15, color:"#007aff" },
      { label:"Returns", pct:8, color:"#34c759" },
    ],
    escalations: [
      { store:"New York NY", urgency:"High", reason:"Online order lost — 3 service calls, no resolution", reviewer:"Sandra L.", status:"Open", date:"Feb 9", category:"Shipping", quote:"Ordered online, item never arrived. Three customer service calls, still no resolution whatsoever." },
      { store:"Atlanta GA", urgency:"Medium", reason:"Paid installation no-show — twice", reviewer:"Derek S.", status:"In Review", date:"Feb 6", category:"Install", quote:"Paid for installation, tech didn't show up twice. Had to cancel and do it myself." },
    ],
    stores: [
      { name:"New York NY", rating:3.1, reviews:320, escalations:5, trend:"↘", risk:"At risk" },
      { name:"Atlanta GA", rating:3.3, reviews:215, escalations:3, trend:"→", risk:"At risk" },
      { name:"Seattle WA", rating:3.7, reviews:180, escalations:2, trend:"↗", risk:"Stable" },
      { name:"Chicago IL", rating:3.6, reviews:198, escalations:2, trend:"↗", risk:"Stable" },
      { name:"Austin TX", rating:3.5, reviews:165, escalations:1, trend:"→", risk:"Stable" },
    ],
    reviews: [
      { name:"Robert G.", date:"Feb 12", rating:4, text:"Geek Squad saved my laptop. Fair pricing and fast turnaround. Very happy.", category:"Service" },
      { name:"Emma T.", date:"Feb 11", rating:2, text:"Sales staff pushed extended warranties aggressively. Felt pressured the whole time.", category:"Staff" },
      { name:"Marcus J.", date:"Feb 10", rating:5, text:"Price matched Amazon with no hassle. Staff knowledgeable and helpful. Will return.", category:"Positive" },
      { name:"Sandra L.", date:"Feb 9", rating:1, text:"Ordered online, item never arrived. Three customer service calls, still no resolution.", category:"Shipping" },
      { name:"Kevin P.", date:"Feb 8", rating:3, text:"Good selection but hard to find help. Had to track down staff for 15 minutes.", category:"Service" },
      { name:"Hannah K.", date:"Feb 5", rating:5, text:"Total Tech subscription is worth it. Free installation on everything. Huge value.", category:"Value" },
      { name:"Derek S.", date:"Feb 6", rating:2, text:"Paid for installation, tech didn't show up twice. Had to cancel and do it myself.", category:"Install" },
      { name:"Alicia V.", date:"Feb 3", rating:4, text:"Knowledgeable staff helped me pick the right TV for my budget. Patient and helpful.", category:"Staff" },
    ]
  },
  "at&t": {
    name: "AT&T", initials: "AT", color: "#00A8E0",
    usaRating: 3.1, totalReviews: 215400, monthReviews: 5200,
    responseTime: "2.8 days", ratingTrend: +0.8,
    states: { "Texas": 3.3, "California": 3.0, "Florida": 3.1, "Georgia": 3.4, "New York": 2.9, "Illinois": 3.1, "Ohio": 3.2, "Missouri": 3.0, "Arizona": 3.3, "North Carolina": 3.2, "Michigan": 3.0, "Washington": 2.9 },
    ratingDist: { 5: 22, 4: 20, 3: 18, 2: 20, 1: 20 },
    sentiment: { positive: 42, neutral: 24, negative: 34 },
    trendData: {
      labels: ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6","Wk 7","Wk 8"],
      billing:      [9,8,11,9,10,12,11,13],
      staff:        [5,6,5,7,6,7,6,8],
      cancellation: [4,4,5,4,5,5,6,5],
    },
    issueBreakdown: [
      { label:"Billing errors", pct:36, color:"#ff3b30" },
      { label:"Cancellation", pct:24, color:"#ff9500" },
      { label:"Contract issues", pct:20, color:"#5856d6" },
      { label:"Coverage", pct:12, color:"#007aff" },
      { label:"Staff", pct:8, color:"#34c759" },
    ],
    escalations: [
      { store:"New York NY", urgency:"High", reason:"8-month overcharge — refund agreed but never issued", reviewer:"Antonio R.", status:"Open", date:"Feb 11", category:"Billing", quote:"Overcharged for 8 months. Customer service agreed but never issued refund. Still waiting." },
      { store:"Los Angeles CA", urgency:"High", reason:"ETF charged despite confirmed waiver eligibility", reviewer:"Grace L.", status:"Open", date:"Feb 6", category:"Billing", quote:"Charged early termination fee even after being told I qualified for waiver. Nobody can explain it." },
      { store:"Chicago IL", urgency:"Medium", reason:"Auto-pay enrolled without consent — 3 disputes", reviewer:"Dale H.", status:"In Review", date:"Feb 3", category:"Billing", quote:"Auto-pay enrolled without consent. Had to dispute three separate charges. Still unresolved." },
    ],
    stores: [
      { name:"New York NY", rating:2.9, reviews:890, escalations:12, trend:"↘", risk:"Critical" },
      { name:"Los Angeles CA", rating:3.0, reviews:720, escalations:8, trend:"↘", risk:"At risk" },
      { name:"Chicago IL", rating:3.1, reviews:540, escalations:6, trend:"→", risk:"At risk" },
      { name:"Dallas TX", rating:3.3, reviews:480, escalations:4, trend:"↗", risk:"Stable" },
      { name:"Atlanta GA", rating:3.4, reviews:390, escalations:3, trend:"↗", risk:"Stable" },
    ],
    reviews: [
      { name:"Patricia M.", date:"Feb 12", rating:4, text:"5G coverage in my area is excellent. Consistent speeds all day. Happy with the switch.", category:"Coverage" },
      { name:"Antonio R.", date:"Feb 11", rating:1, text:"Overcharged for 8 months. Customer service agreed but never issued refund.", category:"Billing" },
      { name:"Diane W.", date:"Feb 10", rating:3, text:"Service is average. Nothing special but nothing terrible. About what you'd expect.", category:"General" },
      { name:"Steve F.", date:"Feb 9", rating:5, text:"Business account rep is fantastic. Responsive and solves issues immediately.", category:"Business" },
      { name:"Grace L.", date:"Feb 6", rating:1, text:"Charged early termination fee even after being told I qualified for waiver.", category:"Billing" },
      { name:"Aaron T.", date:"Feb 5", rating:5, text:"Fiber internet install was professional and fast. Speeds better than advertised.", category:"Internet" },
      { name:"Dale H.", date:"Feb 3", rating:2, text:"Auto-pay enrolled without consent. Had to dispute three charges.", category:"Billing" },
      { name:"Paul B.", date:"Feb 7", rating:4, text:"International plan worked seamlessly in Europe. No surprises on the bill.", category:"Travel" },
    ]
  }
};

const TRENDING = ["Spectrum Mobile","AT&T","Taco Bell","Best Buy","T-Mobile","Verizon","McDonald's","Walmart"];
const ALL_STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

const ratingColor = r => r >= 4 ? "#34c759" : r >= 3 ? "#ff9500" : "#ff3b30";
const ratingBg = r => r >= 4 ? "#f0faf3" : r >= 3 ? "#fffbf0" : "#fff2f1";

const Badge = ({ label, type }) => {
  const styles = {
    Critical: { bg:"#fff2f1", color:"#c0392b", border:"rgba(255,59,48,0.2)" },
    "At risk": { bg:"#fffbf0", color:"#92500a", border:"rgba(255,149,0,0.2)" },
    Stable: { bg:"#f0faf3", color:"#1a7a35", border:"rgba(52,199,89,0.2)" },
    High: { bg:"#fff2f1", color:"#c0392b", border:"rgba(255,59,48,0.2)" },
    Medium: { bg:"#fffbf0", color:"#92500a", border:"rgba(255,149,0,0.2)" },
    Open: { bg:"#fff2f1", color:"#c0392b", border:"rgba(255,59,48,0.2)" },
    "In Review": { bg:"#fffbf0", color:"#92500a", border:"rgba(255,149,0,0.2)" },
  };
  const s = styles[label] || { bg:"#f5f5f7", color:"#3a3a3c", border:"rgba(0,0,0,0.1)" };
  return <span style={{ background:s.bg, color:s.color, border:`0.5px solid ${s.border}`, borderRadius:20, fontSize:10, fontWeight:700, padding:"3px 9px", whiteSpace:"nowrap" }}>{label}</span>;
};

const StarRow = ({ rating, size=12 }) => (
  <span style={{ display:"inline-flex", gap:1 }}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width={size} height={size} viewBox="0 0 12 12">
        <path d="M6 1l1.2 3.4h3.6L8 6.8l1.1 3.4L6 8.6 2.9 10.2 4 6.8 1.2 4.4h3.6z"
          fill={i<=Math.round(rating)?"#ff9500":"#e5e5ea"}/>
      </svg>
    ))}
  </span>
);

const MiniSparkline = ({ data, color, width=80, height=32 }) => {
  const max = Math.max(...data); const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v,i)=>`${(i/(data.length-1))*width},${height-((v-min)/range)*(height-4)-2}`).join(" ");
  return (
    <svg width={width} height={height} style={{ display:"block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default function StorePulseApp() {
  const [step, setStep] = useState("landing");
  const [query, setQuery] = useState("");
  const [storeData, setStoreData] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dashTab, setDashTab] = useState("overview");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [dateRange, setDateRange] = useState("60d");
  const inputRef = useRef(null);
  const chartRef = useRef(null);
  const donutRef = useRef(null);
  const chartsInited = useRef(false);

  useEffect(() => { if (step==="landing") inputRef.current?.focus(); }, [step]);

  useEffect(() => {
    if (step === "dashboard" && storeData && !chartsInited.current) {
      const id = setTimeout(() => initCharts(), 400);
      return () => clearTimeout(id);
    }
    if (step !== "dashboard") chartsInited.current = false;
  }, [step, storeData]);

  const initCharts = () => {
    if (!window.Chart || chartsInited.current) return;
    chartsInited.current = true;
    const td = storeData.trendData;
    if (chartRef.current) {
      if (chartRef.current._chartInstance) chartRef.current._chartInstance.destroy();
      const c = new window.Chart(chartRef.current, {
        type:"line",
        data:{ labels:td.labels, datasets:[
          { label:"Billing", data:td.billing, borderColor:"#ff3b30", backgroundColor:"rgba(255,59,48,0.06)", borderWidth:1.5, tension:0.4, fill:true, pointRadius:0 },
          { label:"Staff behavior", data:td.staff, borderColor:"#ff9500", backgroundColor:"rgba(255,149,0,0.04)", borderWidth:1.5, tension:0.4, fill:true, pointRadius:0 },
          { label:"Cancellation", data:td.cancellation, borderColor:"#5856d6", backgroundColor:"rgba(88,86,214,0.04)", borderWidth:1.5, tension:0.4, fill:true, pointRadius:0 },
        ]},
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{display:false}, tooltip:{ mode:"index", intersect:false, backgroundColor:"#ffffff", titleColor:"#1d1d1f", bodyColor:"#86868b", borderColor:"rgba(0,0,0,0.1)", borderWidth:1, cornerRadius:10, padding:10 }},
          scales:{ x:{ grid:{display:false}, ticks:{ color:"#86868b", font:{size:10,family:"Inter"}}}, y:{ grid:{color:"rgba(0,0,0,0.05)"}, ticks:{ color:"#86868b", font:{size:10,family:"Inter"}}, beginAtZero:true }}
        }
      });
      chartRef.current._chartInstance = c;
    }
    if (donutRef.current) {
      if (donutRef.current._chartInstance) donutRef.current._chartInstance.destroy();
      const colors = storeData.issueBreakdown.map(i=>i.color);
      const d = new window.Chart(donutRef.current, {
        type:"doughnut",
        data:{ labels: storeData.issueBreakdown.map(i=>i.label), datasets:[{ data: storeData.issueBreakdown.map(i=>i.pct), backgroundColor:colors, borderWidth:0, hoverOffset:6 }]},
        options:{ responsive:false, cutout:"72%", plugins:{ legend:{display:false}, tooltip:{ backgroundColor:"#ffffff", titleColor:"#1d1d1f", bodyColor:"#86868b", borderColor:"rgba(0,0,0,0.1)", borderWidth:1, cornerRadius:8 }}}
      });
      donutRef.current._chartInstance = d;
    }
  };

  const handleSearch = (name) => {
    const key = (name || query).toLowerCase().trim();
    if (!key) return;
    setError(""); setLoading(true);
    setTimeout(() => {
      const found = STORES[key];
      if (found) { setStoreData(found); setSelectedState(""); setStep("results"); }
      else setError(`No data found for "${name||query}". Try: Spectrum Mobile, Taco Bell, Best Buy, AT&T`);
      setLoading(false);
    }, 900);
  };

  const filteredReviews = storeData ? storeData.reviews.filter(r => {
    if (reviewFilter==="all") return true;
    if (reviewFilter==="positive") return r.rating>=4;
    if (reviewFilter==="negative") return r.rating<=2;
    return r.rating===3;
  }) : [];

  const stateRating = selectedState && storeData?.states?.[selectedState];
  const availableStates = storeData ? Object.keys(storeData.states) : [];
  const openEsc = storeData ? storeData.escalations.filter(e=>e.status==="Open").length : 0;

  return (
    <div style={{ fontFamily:"-apple-system,'SF Pro Display','Helvetica Neue',sans-serif", background: step==="dashboard"?"#f5f5f7":"#ffffff", minHeight:"100vh", color:"#1d1d1f" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
        .fu{animation:fadeUp 0.45s ease forwards;}
        .f1{animation-delay:0.04s;opacity:0;} .f2{animation-delay:0.1s;opacity:0;} .f3{animation-delay:0.16s;opacity:0;}
        .f4{animation-delay:0.22s;opacity:0;} .f5{animation-delay:0.28s;opacity:0;}
        .chip:hover{background:#e8e8ed!important;}
        .kpi-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.09)!important;}
        .btn-p:hover{background:#333!important;}
        .btn-s:hover{background:#f0f0f0!important;}
        .rev-row:hover{background:#fafafa!important;}
        .esc-item:hover{border-color:rgba(255,59,48,0.35)!important;background:#fff6f5!important;}
        .store-row:hover{background:#fafafa!important;}
        .nav-tab:hover{color:#1d1d1f!important;}
        .state-chip:hover{border-color:#007aff!important;background:#f0f7ff!important;}
        input:focus{outline:none!important;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#d0d0d5;border-radius:2px;}
        select{-webkit-appearance:none;appearance:none;}
      `}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" async />

      {/* ═══ LANDING ═══ */}
      {step==="landing" && (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 20px" }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",borderBottom:"0.5px solid rgba(0,0,0,0.08)",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(20px)",zIndex:10 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:26,height:26,background:"#1d1d1f",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="1,9 4,5.5 6.5,7.5 9.5,3.5 11,5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize:13,fontWeight:600,letterSpacing:-0.3 }}>StorePulse AI</span>
            </div>
            <div style={{ display:"flex",gap:20,fontSize:13,color:"#86868b" }}>
              {["Product","Intelligence","Security"].map(l=><span key={l} style={{ cursor:"pointer" }}>{l}</span>)}
              <div style={{ background:"#1d1d1f",color:"#fff",borderRadius:8,padding:"5px 14px",fontSize:12,fontWeight:500,cursor:"pointer" }}>Dashboard ›</div>
            </div>
          </div>
          <div style={{ maxWidth:640,width:"100%",textAlign:"center" }}>
            <div className="fu f1" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#f5f5f7",border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:500,color:"#86868b",marginBottom:28,letterSpacing:0.5,textTransform:"uppercase" }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:"#34c759",animation:"pulse 2s infinite" }}/>
              Evolving Operational Intelligence
            </div>
            <h1 className="fu f2" style={{ fontSize:"clamp(36px,6vw,54px)",fontWeight:700,letterSpacing:-2,lineHeight:1.08,marginBottom:18 }}>
              Intelligence that<br/><span style={{ color:"#86868b" }}>scales with your business.</span>
            </h1>
            <p className="fu f3" style={{ fontSize:16,color:"#6c6c70",lineHeight:1.7,marginBottom:36 }}>
              Aggregate location data, automate sentiment analysis,<br/>and uncover evidence-backed operational insights in real-time.
            </p>
            <div className="fu f4" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.12)",borderRadius:16,padding:6,display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 24px rgba(0,0,0,0.07)",marginBottom:12 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,flex:1,padding:"8px 14px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="#86868b" strokeWidth="1.4"/><path d="M10 10l3.5 3.5" stroke="#86868b" strokeWidth="1.4" strokeLinecap="round"/></svg>
                <input ref={inputRef} value={query} onChange={e=>{setQuery(e.target.value);setError("");}}
                  onKeyDown={e=>e.key==="Enter"&&handleSearch()}
                  placeholder='Try "Spectrum Mobile", "Taco Bell", "Best Buy"…'
                  style={{ border:"none",outline:"none",fontSize:15,flex:1,fontFamily:"inherit",color:"#1d1d1f",background:"transparent" }}/>
              </div>
              <button onClick={()=>handleSearch()} disabled={loading} className="btn-p"
                style={{ background:"#1d1d1f",color:"#fff",border:"none",borderRadius:11,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap" }}>
                {loading&&<div style={{ width:13,height:13,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite" }}/>}
                {loading?"Searching…":"Search ⌘↵"}
              </button>
            </div>
            {error&&<div className="fu" style={{ background:"#fff2f1",border:"0.5px solid rgba(255,59,48,0.2)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#c0392b",marginBottom:14 }}>{error}</div>}
            <div className="fu f5">
              <div style={{ fontSize:11,color:"#86868b",fontWeight:500,textTransform:"uppercase",letterSpacing:0.5,marginBottom:12 }}>Suggested Trends</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center" }}>
                {TRENDING.map(n=>(
                  <button key={n} className="chip" onClick={()=>{setQuery(n);handleSearch(n);}}
                    style={{ background:"#f5f5f7",border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:20,padding:"7px 16px",fontSize:13,fontWeight:500,color:"#3a3a3c",cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s" }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RESULTS ═══ */}
      {step==="results" && storeData && (
        <div style={{ maxWidth:720,margin:"0 auto",padding:"80px 24px 60px" }}>
          <button onClick={()=>{setStep("landing");setQuery("");setError("");}} className="btn-s"
            style={{ background:"none",border:"0.5px solid rgba(0,0,0,0.12)",borderRadius:8,padding:"6px 14px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#3a3a3c",marginBottom:28,display:"flex",alignItems:"center",gap:5,transition:"background 0.15s" }}>
            ← Back to search
          </button>
          <div className="fu f1" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:20,padding:28,marginBottom:14,boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:22 }}>
              <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:48,height:48,background:storeData.color,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:16 }}>{storeData.initials}</div>
                <div>
                  <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5 }}>{storeData.name}</div>
                  <div style={{ fontSize:12,color:"#86868b",marginTop:2 }}>{storeData.totalReviews.toLocaleString()} total reviews · USA</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:38,fontWeight:700,letterSpacing:-1,color:ratingColor(storeData.usaRating) }}>{storeData.usaRating.toFixed(1)}</div>
                <div style={{ fontSize:12,color:"#86868b" }}>/ 5.0 USA average</div>
              </div>
            </div>
            <StarRow rating={storeData.usaRating} size={15} />
            <div style={{ background:"#f5f5f7",borderRadius:8,height:8,overflow:"hidden",margin:"12px 0 20px" }}>
              <div style={{ height:"100%",width:`${(storeData.usaRating/5)*100}%`,background:ratingColor(storeData.usaRating),borderRadius:8,transition:"width 1s cubic-bezier(0.16,1,0.3,1)" }}/>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10 }}>
              {[{label:"Total Reviews",val:storeData.totalReviews.toLocaleString()},{label:"This Month",val:storeData.monthReviews.toLocaleString()},{label:"Avg Response",val:storeData.responseTime}].map(m=>(
                <div key={m.label} style={{ background:"#f9f9f9",borderRadius:12,padding:"12px 14px",textAlign:"center" }}>
                  <div style={{ fontSize:18,fontWeight:700,letterSpacing:-0.5 }}>{m.val}</div>
                  <div style={{ fontSize:11,color:"#86868b",marginTop:2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fu f2" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:20,padding:24,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:14,fontWeight:600,marginBottom:14 }}>Drill down by state</div>
            <select value={selectedState} onChange={e=>setSelectedState(e.target.value)}
              style={{ width:"100%",padding:"10px 36px 10px 14px",borderRadius:10,border:"0.5px solid rgba(0,0,0,0.15)",fontSize:14,fontFamily:"inherit",color:"#1d1d1f",background:"#ffffff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2386868b' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat right 14px center",marginBottom:14,cursor:"pointer" }}>
              <option value="">Select a state…</option>
              {ALL_STATES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <div style={{ display:"flex",flexWrap:"wrap",gap:7,marginBottom:selectedState?14:0 }}>
              {availableStates.map(s=>(
                <button key={s} className="state-chip" onClick={()=>setSelectedState(s)}
                  style={{ border:`0.5px solid ${selectedState===s?"#007aff":"rgba(0,0,0,0.1)"}`,background:selectedState===s?"#f0f7ff":"#f9f9f9",borderRadius:8,padding:"5px 11px",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:selectedState===s?"#007aff":"#3a3a3c",transition:"all 0.15s" }}>
                  {s} <span style={{ color:ratingColor(storeData.states[s]),fontWeight:700 }}>{storeData.states[s].toFixed(1)}</span>
                </button>
              ))}
            </div>
            {selectedState && stateRating && (
              <div style={{ background:ratingBg(stateRating),border:`0.5px solid ${ratingColor(stateRating)}30`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:12,color:"#86868b",marginBottom:4 }}>{selectedState} average rating</div>
                  <StarRow rating={stateRating} />
                </div>
                <div style={{ fontSize:34,fontWeight:700,letterSpacing:-1,color:ratingColor(stateRating) }}>{stateRating.toFixed(1)}</div>
              </div>
            )}
          </div>
          <div className="fu f3" style={{ display:"flex",gap:10 }}>
            <button onClick={()=>setStep("dashboard")} className="btn-p"
              style={{ flex:1,background:"#1d1d1f",color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s" }}>
              View Full Dashboard →
            </button>
            <button className="btn-s"
              style={{ background:"#f5f5f7",border:"0.5px solid rgba(0,0,0,0.1)",borderRadius:12,padding:"14px 20px",fontSize:15,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#3a3a3c",transition:"background 0.15s" }}>
              Export PDF
            </button>
          </div>
        </div>
      )}

      {/* ═══ DASHBOARD ═══ */}
      {step==="dashboard" && storeData && (
        <div style={{ display:"grid",gridTemplateColumns:"220px 1fr",minHeight:"100vh" }}>

          {/* Sidebar */}
          <div style={{ background:"#ffffff",borderRight:"0.5px solid rgba(0,0,0,0.08)",padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",overflowY:"auto" }}>
            <div style={{ padding:"0 20px 22px",display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid rgba(0,0,0,0.06)" }}>
              <div style={{ width:28,height:28,background:"#1d1d1f",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="1,10 4.5,6 7,8 10,4 12,6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize:13,fontWeight:600,letterSpacing:-0.3 }}>StorePulse AI</div>
                <div style={{ fontSize:10,color:"#86868b",marginTop:1 }}>Intelligence Platform</div>
              </div>
            </div>
            <div style={{ padding:"14px 12px",flex:1 }}>
              {[
                { section:"Overview", items:[
                  { id:"overview", label:"Dashboard", icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="1" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="1" width="4.5" height="4.5" rx="1"/><rect x="1" y="7.5" width="4.5" height="4.5" rx="1"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1"/></svg> },
                  { id:"stores", label:"Stores", icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 5L6.5 1.5 12 5v7H1z"/><rect x="5" y="8" width="3.5" height="4.5" rx="0.5"/></svg> },
                ]},
                { section:"Intelligence", items:[
                  { id:"escalations", label:"Escalations", badge:openEsc, icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6.5 1.5l1.2 3.3h3.5l-2.8 2 1 3.3-2.9-2-2.9 2 1-3.3L1.8 4.8h3.5z"/></svg> },
                  { id:"reviews", label:"Reviews", icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 2.5h9a1 1 0 011 1v5a1 1 0 01-1 1H4l-2.5 2V3.5a1 1 0 01.5-1z"/></svg> },
                ]},
                { section:"Analytics", items:[
                  { id:"trends", label:"Trends", icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 9.5l3.5-4 3 3 3-5.5 2 2.5"/></svg> },
                  { id:"reports", label:"Reports", icon:<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="1" width="9" height="11" rx="1.5"/><line x1="4.5" y1="4.5" x2="8.5" y2="4.5"/><line x1="4.5" y1="6.5" x2="8.5" y2="6.5"/><line x1="4.5" y1="8.5" x2="7" y2="8.5"/></svg> },
                ]},
              ].map(({ section, items }) => (
                <div key={section}>
                  <div style={{ fontSize:10,fontWeight:600,color:"#86868b",letterSpacing:0.6,textTransform:"uppercase",padding:"14px 8px 6px",marginTop:4 }}>{section}</div>
                  {items.map(item=>(
                    <div key={item.id} onClick={()=>setDashTab(item.id)}
                      style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:9,fontSize:13,fontWeight:500,color:dashTab===item.id?"#1d1d1f":"#3a3a3c",background:dashTab===item.id?"#f0f0f0":"transparent",cursor:"pointer",marginBottom:1,transition:"background 0.15s",opacity:dashTab===item.id?1:0.75 }}>
                      <span style={{ opacity: dashTab===item.id?1:0.6 }}>{item.icon}</span>
                      {item.label}
                      {item.badge ? <span style={{ marginLeft:"auto",background:"#ff3b30",color:"#fff",borderRadius:10,fontSize:10,fontWeight:600,padding:"1px 6px" }}>{item.badge}</span> : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ padding:"14px 20px",borderTop:"0.5px solid rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:9 }}>
              <div style={{ width:28,height:28,background:"#e8e8ed",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:"#3a3a3c",flexShrink:0 }}>H</div>
              <div>
                <div style={{ fontSize:12,fontWeight:500 }}>Harsha</div>
                <div style={{ fontSize:10,color:"#86868b" }}>Corp Ops · Admin</div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div style={{ overflowY:"auto" }}>
            {/* Topbar */}
            <div style={{ background:"#ffffff",borderBottom:"0.5px solid rgba(0,0,0,0.08)",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,position:"sticky",top:0,zIndex:50 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <button onClick={()=>setStep("results")} className="btn-s"
                  style={{ background:"none",border:"0.5px solid rgba(0,0,0,0.1)",borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:"#3a3a3c",transition:"background 0.15s" }}>
                  ← Results
                </button>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:22,height:22,background:storeData.color,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:9,fontWeight:700 }}>{storeData.initials}</div>
                  <span style={{ fontSize:13,fontWeight:600,letterSpacing:-0.3 }}>{storeData.name}</span>
                  <span style={{ fontSize:11,color:"#86868b" }}>· Analytics Dashboard</span>
                </div>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#86868b" }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:"#34c759",animation:"pulse 2s infinite" }}/>Live
                </div>
                {["30d","60d","90d","1y"].map(r=>(
                  <button key={r} onClick={()=>setDateRange(r)}
                    style={{ background:dateRange===r?"#1d1d1f":"none",color:dateRange===r?"#fff":"#86868b",border:`0.5px solid ${dateRange===r?"#1d1d1f":"rgba(0,0,0,0.1)"}`,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding:"24px 28px" }}>

              {/* ── OVERVIEW TAB ── */}
              {dashTab==="overview" && (
                <div>
                  <div className="fu f1" style={{ marginBottom:20 }}>
                    <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5,marginBottom:3 }}>Good morning, Harsha.</div>
                    <div style={{ fontSize:13,color:"#86868b" }}>Here's what's happening across {storeData.stores.length} locations today.</div>
                  </div>

                  {/* KPI Row */}
                  <div className="fu f2" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18 }}>
                    {[
                      { label:"USA Avg Rating", val:storeData.usaRating.toFixed(1), sub:"out of 5.0", color:ratingColor(storeData.usaRating) },
                      { label:"Total Reviews", val:storeData.totalReviews.toLocaleString(), sub:"All locations", color:"#007aff" },
                      { label:"This Month", val:storeData.monthReviews.toLocaleString(), sub:"New reviews", color:"#5856d6" },
                      { label:"Rating Trend", val:`${storeData.ratingTrend>0?"+":""}${storeData.ratingTrend}%`, sub:"vs last period", color:storeData.ratingTrend>=0?"#34c759":"#ff3b30" },
                    ].map((m,i)=>(
                      <div key={i} className="kpi-card" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:"18px 20px",transition:"all 0.2s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ fontSize:11,fontWeight:500,color:"#86868b",marginBottom:8,textTransform:"uppercase",letterSpacing:0.3 }}>{m.label}</div>
                        <div style={{ fontSize:28,fontWeight:700,letterSpacing:-0.8,color:m.color,marginBottom:4 }}>{m.val}</div>
                        <div style={{ fontSize:11,color:"#86868b" }}>{m.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Review Trend + Issue Breakdown */}
                  <div className="fu f3" style={{ display:"grid",gridTemplateColumns:"1.55fr 1fr",gap:14,marginBottom:14 }}>
                    <div style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16 }}>
                        <div>
                          <div style={{ fontSize:13,fontWeight:600,letterSpacing:-0.2 }}>Review trend</div>
                          <div style={{ fontSize:11,color:"#86868b",marginTop:2 }}>Negative reviews by category · 8 weeks</div>
                        </div>
                        <div style={{ display:"flex",background:"#f5f5f7",borderRadius:8,padding:3,gap:2 }}>
                          {["8w","3m","1y"].map(t=>(
                            <button key={t} style={{ background:t==="8w"?"#ffffff":"none",border:"none",borderRadius:6,padding:"4px 9px",fontSize:11,fontWeight:500,color:t==="8w"?"#1d1d1f":"#86868b",cursor:"pointer",fontFamily:"inherit" }}>{t}</button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display:"flex",gap:14,marginBottom:12 }}>
                        {[{c:"#ff3b30",l:"Billing"},{c:"#ff9500",l:"Staff behavior"},{c:"#5856d6",l:"Cancellation"}].map(({c,l})=>(
                          <span key={l} style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#86868b" }}>
                            <span style={{ width:8,height:8,borderRadius:"50%",background:c,display:"inline-block" }}/>
                            {l}
                          </span>
                        ))}
                      </div>
                      <div style={{ position:"relative",height:170 }}>
                        <canvas ref={chartRef}/>
                      </div>
                    </div>

                    <div style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize:13,fontWeight:600,letterSpacing:-0.2,marginBottom:4 }}>Issue breakdown</div>
                      <div style={{ fontSize:11,color:"#86868b",marginBottom:18 }}>By complaint category</div>
                      <div style={{ display:"flex",alignItems:"center",gap:20,marginBottom:16 }}>
                        <div style={{ position:"relative",flexShrink:0 }}>
                          <canvas ref={donutRef} width={100} height={100} style={{ display:"block" }}/>
                          <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",pointerEvents:"none" }}>
                            <span style={{ fontSize:16,fontWeight:700,letterSpacing:-0.5 }}>{storeData.totalReviews>10000?Math.round(storeData.totalReviews/1000)+"k":storeData.totalReviews}</span>
                            <span style={{ fontSize:9,color:"#86868b" }}>reviews</span>
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          {storeData.issueBreakdown.map(item=>(
                            <div key={item.label} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"0.5px solid rgba(0,0,0,0.05)" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:7,fontSize:12,fontWeight:500,color:"#3a3a3c" }}>
                                <div style={{ width:3,height:13,background:item.color,borderRadius:2 }}/>
                                {item.label}
                              </div>
                              <span style={{ fontSize:12,fontWeight:700,color:"#1d1d1f" }}>{item.pct}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Ranking + Critical Alerts */}
                  <div className="fu f4" style={{ display:"grid",gridTemplateColumns:"1.55fr 1fr",gap:14 }}>
                    <div style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
                        <div>
                          <div style={{ fontSize:13,fontWeight:600,letterSpacing:-0.2 }}>Store performance ranking</div>
                          <div style={{ fontSize:11,color:"#86868b",marginTop:2 }}>Ranked by risk · {storeData.stores.length} locations</div>
                        </div>
                        <button onClick={()=>setDashTab("stores")} style={{ background:"none",border:"none",fontSize:12,color:"#007aff",fontWeight:500,cursor:"pointer",fontFamily:"inherit" }}>View all →</button>
                      </div>
                      <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
                        <thead>
                          <tr style={{ borderBottom:"0.5px solid rgba(0,0,0,0.07)" }}>
                            {["#","Store","Rating","Reviews","Escalations","Risk"].map(h=>(
                              <th key={h} style={{ fontSize:10,fontWeight:600,color:"#86868b",textTransform:"uppercase",letterSpacing:0.5,padding:"6px 10px",textAlign:"left" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {storeData.stores.map((s,i)=>(
                            <tr key={i} className="store-row" style={{ borderBottom:"0.5px solid rgba(0,0,0,0.04)",transition:"background 0.15s",cursor:"pointer" }}>
                              <td style={{ padding:"10px 10px",color:"#86868b",fontVariantNumeric:"tabular-nums" }}>{String(i+1).padStart(2,"0")}</td>
                              <td style={{ padding:"10px 10px",fontWeight:600 }}>{s.name}</td>
                              <td style={{ padding:"10px 10px",fontWeight:700,color:ratingColor(s.rating),fontVariantNumeric:"tabular-nums" }}>{s.rating.toFixed(1)}</td>
                              <td style={{ padding:"10px 10px",fontVariantNumeric:"tabular-nums" }}>{s.reviews}</td>
                              <td style={{ padding:"10px 10px",fontWeight:700,color:ratingColor(s.rating),fontVariantNumeric:"tabular-nums" }}>{s.escalations}</td>
                              <td style={{ padding:"10px 10px" }}><Badge label={s.risk}/></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
                        <div>
                          <div style={{ fontSize:13,fontWeight:600,letterSpacing:-0.2 }}>Critical alerts</div>
                          <div style={{ fontSize:11,color:"#86868b",marginTop:2 }}>{openEsc} open · AI-flagged incidents</div>
                        </div>
                        <Badge label="Open" type="Open"/>
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                        {storeData.escalations.map((e,i)=>(
                          <div key={i} className="esc-item" onClick={()=>setDashTab("escalations")}
                            style={{ background:"#fff9f9",border:"0.5px solid rgba(255,59,48,0.15)",borderRadius:10,padding:"11px 13px",cursor:"pointer",transition:"all 0.18s" }}>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}>
                              <div style={{ fontSize:12,fontWeight:600 }}>{e.store}</div>
                              <Badge label={e.urgency}/>
                            </div>
                            <div style={{ fontSize:11,color:"#86868b" }}>{e.reason}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:16,paddingTop:14,borderTop:"0.5px solid rgba(0,0,0,0.06)" }}>
                        <div style={{ fontSize:11,color:"#86868b",marginBottom:8 }}>Avg. sentiment score this week</div>
                        <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
                          <span style={{ fontSize:28,fontWeight:700,letterSpacing:-0.8,color:"#ff3b30" }}>–0.87</span>
                          <span style={{ fontSize:11,color:"#86868b" }}>Extremely negative</span>
                        </div>
                        <div style={{ marginTop:8,background:"#f5f5f7",borderRadius:6,height:5,overflow:"hidden" }}>
                          <div style={{ width:"87%",height:"100%",background:"linear-gradient(90deg,#ff9500,#ff3b30)",borderRadius:6 }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ESCALATIONS TAB ── */}
              {dashTab==="escalations" && (
                <div>
                  <div className="fu f1" style={{ marginBottom:20 }}>
                    <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5,marginBottom:3 }}>Escalation queue</div>
                    <div style={{ fontSize:13,color:"#86868b" }}>{openEsc} open incidents · AI-flagged for legal or financial risk</div>
                  </div>
                  <div className="fu f2" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20 }}>
                    {[
                      { label:"Open", val:openEsc, color:"#ff3b30" },
                      { label:"In Review", val:storeData.escalations.filter(e=>e.status==="In Review").length, color:"#ff9500" },
                      { label:"Resolved", val:0, color:"#34c759" },
                      { label:"Legal Risk", val:storeData.escalations.filter(e=>e.reason.toLowerCase().includes("legal")||e.reason.toLowerCase().includes("fcc")||e.reason.toLowerCase().includes("attorney")||e.reason.toLowerCase().includes("fraud")).length, color:"#5856d6" },
                    ].map(m=>(
                      <div key={m.label} style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:14,padding:"16px 18px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ fontSize:11,fontWeight:500,color:"#86868b",marginBottom:6,textTransform:"uppercase",letterSpacing:0.3 }}>{m.label}</div>
                        <div style={{ fontSize:28,fontWeight:700,color:m.color,letterSpacing:-0.8 }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                    {storeData.escalations.map((e,i)=>(
                      <div key={i} className="fu" style={{ animationDelay:`${0.05*i}s`,opacity:0,background:"#ffffff",border:`0.5px solid ${e.urgency==="High"?"rgba(255,59,48,0.2)":"rgba(255,149,0,0.2)"}`,borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                          <div>
                            <div style={{ fontSize:14,fontWeight:700,marginBottom:5 }}>{storeData.name} – {e.store}</div>
                            <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
                              <Badge label={e.urgency}/><Badge label={e.category}/><Badge label={e.status}/>
                            </div>
                          </div>
                          <div style={{ textAlign:"right" }}>
                            <div style={{ fontSize:11,color:"#86868b" }}>{e.date}</div>
                            <div style={{ fontSize:12,color:"#86868b",marginTop:2 }}>Reviewer: <span style={{ fontWeight:600,color:"#3a3a3c" }}>{e.reviewer}</span></div>
                          </div>
                        </div>
                        <div style={{ background:"#f9f9f9",borderLeft:`3px solid ${e.urgency==="High"?"#ff3b30":"#ff9500"}`,borderRadius:"0 8px 8px 0",padding:"10px 14px",marginBottom:10,fontSize:12,color:"#3a3a3c",lineHeight:1.7,fontStyle:"italic" }}>
                          "{e.quote}"
                        </div>
                        <div style={{ background:e.urgency==="High"?"#fff2f1":"#fffbf0",border:`0.5px solid ${e.urgency==="High"?"rgba(255,59,48,0.2)":"rgba(255,149,0,0.2)"}`,borderRadius:8,padding:"8px 12px",marginBottom:12 }}>
                          <div style={{ fontSize:9,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",color:e.urgency==="High"?"#c0392b":"#92500a",marginBottom:2 }}>AI Escalation Reason</div>
                          <div style={{ fontSize:12,color:"#3a3a3c" }}>{e.reason}</div>
                        </div>
                        <div style={{ display:"flex",gap:8 }}>
                          <button className="btn-p" style={{ background:"#1d1d1f",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s" }}>📞 Call customer</button>
                          <button className="btn-s" style={{ background:"#f5f5f7",border:"0.5px solid rgba(0,0,0,0.1)",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#3a3a3c",transition:"background 0.15s" }}>📋 Assign to manager</button>
                          <button className="btn-s" style={{ background:"#f5f5f7",border:"0.5px solid rgba(0,0,0,0.1)",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#3a3a3c",transition:"background 0.15s" }}>✅ Mark resolved</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── REVIEWS TAB ── */}
              {dashTab==="reviews" && (
                <div>
                  <div className="fu f1" style={{ marginBottom:20 }}>
                    <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5,marginBottom:3 }}>Review intelligence feed</div>
                    <div style={{ fontSize:13,color:"#86868b" }}>All reviews · AI-analyzed · Sorted by urgency</div>
                  </div>

                  {/* Sentiment summary */}
                  <div className="fu f2" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18 }}>
                    {[
                      { label:"Positive", val:storeData.sentiment.positive, color:"#34c759", bg:"#f0faf3" },
                      { label:"Neutral", val:storeData.sentiment.neutral, color:"#ff9500", bg:"#fffbf0" },
                      { label:"Negative", val:storeData.sentiment.negative, color:"#ff3b30", bg:"#fff2f1" },
                    ].map(s=>(
                      <div key={s.label} style={{ background:s.bg,borderRadius:14,padding:"16px 18px",textAlign:"center",border:`0.5px solid ${s.color}20` }}>
                        <div style={{ fontSize:28,fontWeight:700,color:s.color,letterSpacing:-0.8 }}>{s.val}%</div>
                        <div style={{ fontSize:12,color:"#86868b",marginTop:3 }}>{s.label} sentiment</div>
                      </div>
                    ))}
                  </div>

                  <div className="fu f3" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
                      <div style={{ fontSize:13,fontWeight:600 }}>Recent reviews</div>
                      <div style={{ display:"flex",gap:6 }}>
                        {[["all","All"],["positive","Positive"],["neutral","Neutral"],["negative","Negative"]].map(([k,l])=>(
                          <button key={k} onClick={()=>setReviewFilter(k)}
                            style={{ background:reviewFilter===k?"#1d1d1f":"#f5f5f7",color:reviewFilter===k?"#fff":"#6c6c70",border:"none",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit" }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    {filteredReviews.map((r,i)=>(
                      <div key={i} className="rev-row"
                        style={{ display:"flex",gap:12,padding:"12px 10px",borderRadius:10,transition:"background 0.15s",borderBottom:i<filteredReviews.length-1?"0.5px solid rgba(0,0,0,0.05)":"none",borderLeft:`3px solid ${ratingColor(r.rating)}` }}>
                        <div style={{ width:32,height:32,borderRadius:"50%",background:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:"#3a3a3c",flexShrink:0 }}>{r.name.charAt(0)}</div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" }}>
                            <span style={{ fontSize:13,fontWeight:600 }}>{r.name}</span>
                            <StarRow rating={r.rating} size={11}/>
                            <span style={{ fontSize:11,color:"#86868b" }}>{r.date}</span>
                            <span style={{ fontSize:10,padding:"2px 7px",borderRadius:20,background:"#f5f5f7",color:"#6c6c70",fontWeight:500 }}>{r.category}</span>
                            <span style={{ fontSize:11,color:ratingColor(r.rating),fontWeight:600 }}>Sentiment: {r.rating>=4?"+0."+Math.round(r.rating*18):"-0."+Math.round((5-r.rating)*22)}</span>
                          </div>
                          <div style={{ fontSize:13,color:"#3a3a3c",lineHeight:1.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{r.text}</div>
                        </div>
                        <div style={{ flexShrink:0,display:"flex",alignItems:"center" }}>
                          <div style={{ fontSize:13,fontWeight:700,color:ratingColor(r.rating),background:ratingBg(r.rating),borderRadius:8,padding:"4px 10px" }}>{r.rating}.0</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STORES TAB ── */}
              {dashTab==="stores" && (
                <div>
                  <div className="fu f1" style={{ marginBottom:20 }}>
                    <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5,marginBottom:3 }}>Store intelligence</div>
                    <div style={{ fontSize:13,color:"#86868b" }}>{storeData.stores.length} locations · Click any store to expand</div>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12 }}>
                    {storeData.stores.map((s,i)=>(
                      <div key={i} className="fu kpi-card" style={{ animationDelay:`${0.05*i}s`,opacity:0,background:"#ffffff",border:`0.5px solid ${s.risk==="Critical"?"rgba(255,59,48,0.2)":"rgba(0,0,0,0.06)"}`,borderRadius:16,padding:18,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6 }}>
                          <div style={{ fontSize:13,fontWeight:700 }}>{s.name}</div>
                          <Badge label={s.risk}/>
                        </div>
                        <div style={{ fontSize:11,color:"#86868b",marginBottom:14 }}>{storeData.name}</div>
                        <div style={{ fontSize:28,fontWeight:700,letterSpacing:-1,color:ratingColor(s.rating),marginBottom:4 }}>{s.rating.toFixed(1)} <span style={{ fontSize:13,fontWeight:400,color:"#86868b" }}>/ 5.0</span></div>
                        <StarRow rating={s.rating} />
                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:14 }}>
                          <div style={{ background:"#f9f9f9",borderRadius:9,padding:"8px 10px",textAlign:"center" }}>
                            <div style={{ fontSize:14,fontWeight:700 }}>{s.reviews}</div>
                            <div style={{ fontSize:10,color:"#86868b",marginTop:1 }}>Reviews</div>
                          </div>
                          <div style={{ background:ratingBg(ratingColor(s.escalations)==="#ff3b30"?1:ratingColor(s.escalations)==="#ff9500"?3:5),borderRadius:9,padding:"8px 10px",textAlign:"center" }}>
                            <div style={{ fontSize:14,fontWeight:700,color:s.escalations>7?"#ff3b30":s.escalations>4?"#ff9500":"#34c759" }}>{s.escalations}</div>
                            <div style={{ fontSize:10,color:"#86868b",marginTop:1 }}>Escalations</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TRENDS TAB ── */}
              {dashTab==="trends" && (
                <div>
                  <div className="fu f1" style={{ marginBottom:20 }}>
                    <div style={{ fontSize:20,fontWeight:700,letterSpacing:-0.5,marginBottom:3 }}>Trend analysis</div>
                    <div style={{ fontSize:13,color:"#86868b" }}>State-level performance across all locations</div>
                  </div>
                  <div className="fu f2" style={{ background:"#ffffff",border:"0.5px solid rgba(0,0,0,0.06)",borderRadius:16,padding:22,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize:13,fontWeight:600,marginBottom:16 }}>State performance map</div>
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8 }}>
                      {Object.entries(storeData.states).sort((a,b)=>a[1]-b[1]).map(([state,rating])=>(
                        <div key={state} style={{ background:ratingBg(rating),border:`0.5px solid ${ratingColor(rating)}25`,borderRadius:10,padding:"10px 12px" }}>
                          <div style={{ fontSize:11,color:"#86868b",marginBottom:4 }}>{state}</div>
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <span style={{ fontSize:18,fontWeight:700,color:ratingColor(rating),letterSpacing:-0.5 }}>{rating.toFixed(1)}</span>
                            <div style={{ flex:1,height:4,background:"rgba(0,0,0,0.07)",borderRadius:2,overflow:"hidden" }}>
                              <div style={{ width:`${(rating/5)*100}%`,height:"100%",background:ratingColor(rating),borderRadius:2 }}/>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(dashTab==="reports") && (
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px",textAlign:"center" }}>
                  <div style={{ width:56,height:56,background:"#f5f5f7",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></svg>
                  </div>
                  <div style={{ fontSize:16,fontWeight:600,marginBottom:8 }}>Reports coming soon</div>
                  <div style={{ fontSize:13,color:"#86868b",maxWidth:320 }}>PDF export, scheduled reports, and executive summaries will be available in the next release.</div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"/>
    </div>
  );
}
