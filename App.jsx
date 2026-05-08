import { useState, useRef } from "react";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@50
const CREW_COLORS = ["#F5A623","#4D9DE0","#3DDC84","#C77DFF"];
function hexToRgb(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
--bg:#0c1017;--s1:#111820;--s2:#18212e;--s3:#1e2a38;
--b1:#1f2d3d;--b2:#2a3d52;
--txt:#dce4ef;--dim:#8494a7;--mute:#4a5a6e;
--amber:#F5A623;--blue:#4D9DE0;--green:#3DDC84;--red:#E8402A;--purple:#C77DFF;
}
body{background:var(--bg);color:var(--txt);font-family:'Inter',sans-serif;min-height:100vh;li
/* APP SHELL */
.app{display:flex;flex-direction:column;min-height:100vh}
/* TOP NAV */
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:54px
background:var(--s1);border-bottom:1px solid var(--b1);position:sticky;top:0;z-index:100}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{font-family:'Barlow Condensed',sans-serif;font-size:21px;font-weight:900;letter-spacing
.logo span{color:var(--txt);opacity:.35}
.nav-company{font-size:11px;color:var(--mute);padding-left:16px;border-left:1px solid var(--b
.tabs{display:flex;gap:2px;background:var(--bg);border:1px solid var(--b1);border-radius:7px;
.tab{font-size:11px;font-weight:600;letter-spacing:.5px;padding:6px 16px;border-radius:5px;cu
color:var(--dim);border:none;background:transparent;transition:all .15s;white-space:nowrap}
.tab.active{background:var(--s2);color:var(--txt);box-shadow:0 1px 4px rgba(0,0,0,.3)}
.tab:hover:not(.active){color:var(--txt)}
.nav-right{display:flex;align-items:center;gap:16px}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 7px v
@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}
.nav-stat{display:flex;flex-direction:column;align-items:flex-end}
.nav-stat-v{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;line-hei
.nav-stat-l{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute);mar
/* BODY */
.body{flex:1;display:flex;overflow:hidden;height:calc(100vh - 54px)}
/* ── SHARED LEFT PANEL ── */
.left{width:320px;min-width:320px;background:var(--s1);border-right:1px solid var(--b1);
display:flex;flex-direction:column;overflow:hidden}
.left-scroll{flex:1;overflow-y:auto;padding-bottom:12px}
.left-scroll::-webkit-scrollbar{width:2px}
.left-scroll::-webkit-scrollbar-thumb{background:var(--b2)}
.lsec{padding:14px 18px 0}
.lsec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
.lsec-title{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--mute);fon
.plus{font-size:14px;color:var(--amber);cursor:pointer;width:20px;height:20px;display:flex;al
border-radius:3px;background:rgba(245,166,35,.1);transition:background .15s;opacity:.8}
.plus:hover{opacity:1;background:rgba(245,166,35,.18)}
/* JOB CARD */
.jcard{background:var(--s2);border:1px solid var(--b1);border-radius:6px;padding:10px 12px;ma
.jcard:hover{border-color:var(--b2)}
.jc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px}
.jc-name{font-size:12px;font-weight:600;color:var(--txt);line-height:1.25;padding-right:8px}
.badge{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;padding:2px 6px;border-rad
.bh{background:rgba(232,64,42,.1);color:#e88;border:1px solid rgba(232,64,42,.18)}
.bm{background:rgba(245,166,35,.1);color:var(--amber);border:1px solid rgba(245,166,35,.18)}
.bl{background:rgba(77,157,224,.08);color:var(--blue);border:1px solid rgba(77,157,224,.15)}
.jc-meta{display:flex;gap:10px;align-items:center}
.jc-m{font-size:10px;color:var(--dim);display:flex;align-items:center;gap:3px}
.jc-type{font-size:10px;color:var(--mute);margin-top:3px}
.x{position:absolute;right:8px;bottom:8px;font-size:10px;color:var(--mute);cursor:pointer;opa
.jcard:hover .x{opacity:.7}
.x:hover{color:var(--red);opacity:1!important}
/* CREW CARD */
.ccard{background:var(--s2);border:1px solid var(--b1);border-radius:6px;padding:10px 12px;
margin-bottom:5px;display:flex;align-items:center;gap:10px;position:relative}
.ccard:hover .x{opacity:.7}
.cdot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.cinfo{flex:1;min-width:0}
.cname{font-size:12px;font-weight:600;color:var(--txt)}
.cveh{font-size:10px;color:var(--mute);margin-top:2px}
/* ADD FORM */
.aform{background:var(--s3);border:1px solid var(--b2);border-radius:6px;padding:12px;margin-
.fl{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute);margin-bott
.inp{background:var(--s1);border:1px solid var(--b1);color:var(--txt);font-family:'Inter',san
font-size:11px;padding:7px 9px;border-radius:5px;width:100%;outline:none;transition:border-
.inp:focus{border-color:var(--amber)}
.inp::placeholder{color:var(--mute)}
.inp:last-of-type{margin-bottom:0}
.arow{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px}
.prirow{display:flex;gap:5px;margin-bottom:7px}
.pribtn{flex:1;padding:5px;border:1px solid var(--b1);background:transparent;color:var(--mute
border-radius:4px;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;
.pribtn.active{border-color:var(--amber);background:rgba(245,166,35,.1);color:var(--amber)}
.savebtn{background:var(--amber);color:#000;font-family:'Barlow Condensed',sans-serif;font-si
letter-spacing:2px;border:none;padding:7px;border-radius:5px;cursor:pointer;width:100%;tran
.savebtn:hover{opacity:.85}
/* DISPATCH ZONE */
.dzone{padding:14px 18px 18px;border-top:1px solid var(--b1)}
.sum-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.sum-l{font-size:10px;color:var(--dim)}
.sum-r{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--a
.dbtn{width:100%;background:var(--amber);color:#000;font-family:'Barlow Condensed',sans-serif
font-size:21px;font-weight:900;letter-spacing:4px;border:none;padding:15px;border-radius:8p
cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;ga
.dbtn:hover{background:#ffbe4d;box-shadow:0 4px 20px rgba(245,166,35,.22)}
.dbtn:active{transform:scale(.98)}
.dbtn:disabled{background:var(--s3);color:var(--mute);cursor:not-allowed;box-shadow:none;tran
.err{font-size:10px;color:#e87;margin-top:8px;line-height:1.6;word-break:break-all}
/* ── RIGHT PANEL ── */
.right{flex:1;overflow-y:auto;background:var(--bg)}
/* EMPTY */
.empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:cent
.ei{font-size:44px}
.et{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:3
.es{font-size:11px;color:var(--dim);max-width:250px;line-height:1.7}
/* LOADING */
.loading{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:ce
.ring{width:40px;height:40px;border:2px solid var(--b2);border-top-color:var(--amber);border-
@keyframes spin{to{transform:rotate(360deg)}}
.lmsg{font-size:11px;color:var(--dim);letter-spacing:2px;text-transform:uppercase;text-align:
/* ── DISPATCH BRIEF ── */
.brief{padding:28px 32px;display:flex;flex-direction:column;gap:18px}
.brief-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.brief-co{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;letter-spa
.brief-dt{font-size:11px;color:var(--dim);margin-top:4px}
.chips{display:flex;gap:7px;flex-wrap:wrap}
.chip{font-size:10px;font-weight:600;padding:4px 11px;border-radius:20px;white-space:nowrap}
.chip-j{background:rgba(77,157,224,.1);color:var(--blue);border:1px solid rgba(77,157,224,.18
.chip-c{background:rgba(245,166,35,.08);color:var(--amber);border:1px solid rgba(245,166,35,.
.chip-h{background:rgba(61,220,132,.07);color:var(--green);border:1px solid rgba(61,220,132,.
.cb{border-radius:10px;overflow:hidden;border:1px solid var(--b1)}
.cb-hdr{padding:14px 18px;display:flex;align-items:center;justify-content:space-between;borde
.cb-l{display:flex;align-items:center;gap:11px}
.cb-bar{width:4px;height:34px;border-radius:2px;flex-shrink:0}
.cb-n{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;letter-spacing
.cb-v{font-size:10px;color:var(--dim);margin-top:2px}
.cb-r{text-align:right}
.cb-hrs{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;line-height:
.cb-st{font-size:9px;color:var(--dim);letter-spacing:1px;text-transform:uppercase;margin-top:
.stop{display:grid;grid-template-columns:46px 1fr auto;align-items:stretch;border-bottom:1px
.stop:last-child{border-bottom:none}
.stop:hover{background:var(--s2)}
.sn-col{display:flex;flex-direction:column;align-items:center;padding:14px 0}
.sn{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:900;line-height:1}
.sline{width:1px;flex:1;margin-top:5px;opacity:.25}
.stop:last-child .sline{display:none}
.sbody{padding:12px 8px 12px 2px}
.sname{font-size:13px;font-weight:600;color:var(--txt);margin-bottom:3px;line-height:1.2}
.saddr{font-size:10px;color:var(--mute);margin-bottom:6px;display:flex;align-items:center;gap
.spills{display:flex;gap:4px;flex-wrap:wrap}
.pill{font-size:8px;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius
.pt{background:var(--s3);color:var(--dim);border:1px solid var(--b2)}
.pd{background:rgba(245,166,35,.06);color:var(--amber);border:1px solid rgba(245,166,35,.13)}
.sr{padding:12px 18px 12px 8px;display:flex;flex-direction:column;align-items:flex-end;justif
.st{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;letter-spacing:.
.sn2{font-size:9px;color:var(--dim);text-align:right;max-width:130px;line-height:1.5}
.flags-box{background:var(--s1);border:1px solid var(--b1);border-radius:10px;overflow:hidden
.flags-ttl{padding:12px 18px;border-bottom:1px solid var(--b1);font-size:9px;letter-spacing:2
text-transform:uppercase;color:var(--amber);font-weight:700;background:rgba(245,166,35,.03)
.flag-r{display:flex;gap:11px;align-items:flex-start;padding:11px 18px;border-bottom:1px soli
.flag-r:last-child{border-bottom:none}
.ficon{font-size:14px;flex-shrink:0;margin-top:1px}
.ftxt{font-size:11px;color:var(--dim);line-height:1.65}
.insight-box{background:rgba(61,220,132,.03);border:1px solid rgba(61,220,132,.12);border-rad
.insight-l{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--green);fon
.insight-t{font-size:12px;color:var(--dim);line-height:1.75}
/* ── DASHBOARD ── */
.dash{padding:28px 32px;display:flex;flex-direction:column;gap:20px}
.dash-hdr{display:flex;align-items:flex-start;justify-content:space-between}
.dash-title{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;letter-s
.dash-sub{font-size:11px;color:var(--dim);margin-top:4px}
.period-sel{display:flex;gap:4px;background:var(--s2);border:1px solid var(--b1);border-radiu
.psel{font-size:10px;font-weight:600;padding:5px 12px;border-radius:4px;cursor:pointer;color:
.psel.active{background:var(--s3);color:var(--txt)}
.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.metric{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:18px}
.metric-val{font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;line-hei
.metric-lbl{font-size:10px;color:var(--dim);font-weight:500;letter-spacing:.3px;margin-bottom
.metric-delta{font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;display:inline
.up{background:rgba(61,220,132,.1);color:var(--green)}
.dn{background:rgba(232,64,42,.1);color:var(--red)}
.chart-row{display:grid;grid-template-columns:2fr 1fr;gap:12px}
.chart-box{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:18px}
.chart-title{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mute);fon
/* BAR CHART */
.bars{display:flex;align-items:flex-end;gap:6px;height:100px}
.bar-col{display:flex;flex-direction:column;align-items:center;gap:5px;flex:1}
.bar{width:100%;border-radius:3px 3px 0 0;transition:height .3s;min-height:4px}
.bar-lbl{font-size:8px;color:var(--mute);letter-spacing:.5px;white-space:nowrap}
.bar-val{font-size:9px;color:var(--dim);font-weight:600}
/* DONUT */
.donut-wrap{display:flex;flex-direction:column;align-items:center;gap:12px}
.donut-svg{overflow:visible}
.donut-legend{display:flex;flex-direction:column;gap:7px;width:100%}
.legend-item{display:flex;align-items:center;gap:8px;font-size:10px;color:var(--dim)}
.legend-dot{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.legend-pct{font-weight:700;color:var(--txt);margin-left:auto}
/* TIMELINE TABLE */
.timeline-box{background:var(--s1);border:1px solid var(--b1);border-radius:10px;overflow:hid
.timeline-hdr{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;padding:10px 18px;
border-bottom:1px solid var(--b1);background:rgba(0,0,0,.2)}
.th{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute);font-weight
.trow{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;padding:12px 18px;
border-bottom:1px solid var(--b1);align-items:center;transition:background .15s}
.trow:last-child{border-bottom:none}
.trow:hover{background:var(--s2)}
.td{font-size:11px;color:var(--dim)}
.td-name{color:var(--txt);font-weight:500}
.eff-bar{height:4px;border-radius:2px;background:var(--b2);overflow:hidden}
.eff-fill{height:100%;border-radius:2px;background:var(--green);transition:width .5s}
/* ROI CARD */
.roi-card{background:linear-gradient(135deg,rgba(245,166,35,.06),rgba(61,220,132,.04));
border:1px solid rgba(245,166,35,.2);border-radius:10px;padding:22px;display:flex;align-ite
.roi-left .roi-num{font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:900;c
.roi-left .roi-lbl{font-size:11px;color:var(--dim);margin-top:4px}
.roi-breakdown{display:flex;flex-direction:column;gap:8px;flex:1}
.roi-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;
background:rgba(0,0,0,.25);border-radius:6px;border:1px solid var(--b1)}
.roi-item-l{font-size:11px;color:var(--dim)}
.roi-item-v{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:va
/* ── WHAT-IF ── */
.whatif{padding:28px 32px;display:flex;flex-direction:column;gap:20px}
.wi-hdr{display:flex;align-items:flex-start;justify-content:space-between}
.wi-title{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;letter-spa
.wi-sub{font-size:11px;color:var(--dim);margin-top:4px;max-width:400px;line-height:1.6}
.scenario-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.scenario-card{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:20p
.scenario-card:hover,.scenario-card.active{border-color:var(--amber);background:rgba(245,166,
.sc-icon{font-size:24px;margin-bottom:10px}
.sc-title{font-size:13px;font-weight:600;color:var(--txt);margin-bottom:4px}
.sc-desc{font-size:11px;color:var(--dim);line-height:1.6}
.wi-result{background:var(--s1);border:1px solid var(--b1);border-radius:10px;overflow:hidden
.wi-result-hdr{padding:14px 20px;border-bottom:1px solid var(--b1);background:rgba(245,166,35
font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--amber);font-weight:
.wi-compare{display:grid;grid-template-columns:1fr 1fr;divide:divide}
.wi-col{padding:20px}
.wi-col:first-child{border-right:1px solid var(--b1)}
.wi-col-title{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--mute);fon
.wi-stat{margin-bottom:14px}
.wi-stat-val{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:900;line-he
.wi-stat-lbl{font-size:10px;color:var(--dim)}
.wi-delta{background:rgba(61,220,132,.08);border:1px solid rgba(61,220,132,.15);border-radius
display:flex;justify-content:space-between;align-items:center}
.wi-d-val{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:900;color:var(
.wi-d-lbl{font-size:10px;color:var(--dim)}
.wi-analysis{padding:16px 20px;border-top:1px solid var(--b1);font-size:12px;color:var(--dim)
.sk{border-radius:8px;background:linear-gradient(90deg,var(--s1) 25%,var(--s2) 50%,var(--s1)
@keyframes sk{0%{background-position:-700px 0}100%{background-position:700px 0}}
`;
// ── DATA ──
const INIT_JOBS = [
{id:1,name:"Riviera HOA — Block A",address:"1420 Beryl St, PB",type:"Mowing + Edge",duratio
{id:2,name:"Sullivan Residence",address:"4821 Ingraham St, PB",type:"Irrigation Repair",dur
{id:3,name:"Duck Dive Restaurant",address:"4650 Mission Blvd, PB",type:"Shrub Trim + Cleanu
{id:4,name:"Riviera HOA — Block B",address:"1480 Beryl St, PB",type:"Mowing + Edge",duratio
{id:5,name:"Pacific Terrace Hotel",address:"610 Diamond St, PB",type:"Full Grounds",duratio
];
const INIT_CREW = [
{id:1,name:"Miguel R.",vehicle:"Truck 1 · Irrigation certified"},
{id:2,name:"Carlos & Javier",vehicle:"Truck 2 · Mow + Trim crew"},
];
const JOB_TYPES=["Mowing + Edge","Irrigation Repair","Shrub Trim + Cleanup","Full Grounds","I
const TODAY = new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric
// Dashboard mock data
const WEEK_DATA = [
{day:"Mon",jobs:7,hrs:9.5,eff:94},
{day:"Tue",jobs:5,hrs:7.0,eff:88},
{day:"Wed",jobs:8,hrs:10.2,eff:96},
{day:"Thu",jobs:6,hrs:8.5,eff:91},
{day:"Fri",jobs:9,hrs:11.0,eff:89},
{day:"Sat",jobs:4,hrs:5.5,eff:97},
];
const JOB_MIX = [
{label:"Mowing + Edge",pct:42,color:"#F5A623"},
{label:"Irrigation",pct:18,color:"#4D9DE0"},
{label:"Trim + Cleanup",pct:24,color:"#3DDC84"},
{label:"Full Grounds",pct:16,color:"#C77DFF"},
];
const HISTORY = [
{name:"Pacific Terrace Hotel",type:"Full Grounds",est:120,actual:114,eff:95,crew:"Miguel R.
{name:"Riviera HOA — A",type:"Mowing + Edge",est:90,actual:88,eff:98,crew:"Carlos & Javier"
{name:"Sullivan Residence",type:"Irrigation Repair",est:60,actual:72,eff:83,crew:"Miguel R.
{name:"Duck Dive Restaurant",type:"Shrub Trim",est:45,actual:41,eff:97,crew:"Carlos & Javie
{name:"Riviera HOA — B",type:"Mowing + Edge",est:75,actual:77,eff:97,crew:"Carlos & Javier"
];
const SCENARIOS = [
{id:"add_crew",icon:" {id:"drop_job",icon:" {id:"early_start",icon:" {id:"heavy_day",icon:" ",title:"Add a 3rd Crew",desc:"What if you added one more truck? See
",title:"Drop Lowest-Priority Job",desc:"If you had to cut one job t
",title:"Start at 6:30 AM Instead",desc:"30-minute earlier start
",title:"Max Capacity Day",desc:"What's the true max jobs per day w
];
geogra
const LOAD_MSGS = ["Reading job locations...","Matching crew skills...","Clustering by const WI_LOAD = ["Modeling scenario...","Running comparison...","Calculating impact...","Gene
// Donut math
function buildDonut(data, size=90, stroke=14){
const r = (size - stroke) / 2;
const cx = size/2, cy = size/2;
const circ = 2*Math.PI*r;
let offset = 0;
return data.map(d => {
const len = (d.pct/100)*circ;
const seg = {offset, len, color:d.color};
offset += len;
return seg;
});
}
export default function App() {
const [tab, setTab] = useState("dispatch");
const [company, setCompany] = useState("CJS Landscape Solutions");
const [jobs, setJobs] = useState(INIT_JOBS);
const [crew, setCrew] = useState(INIT_CREW);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [err, setErr] = useState("");
const [showJF, setShowJF] = useState(false);
const [showCF, setShowCF] = useState(false);
const [nj, setNj] = useState({name:"",address:"",type:"Mowing + Edge",duration:60,priority:
const [nc, setNc] = useState({name:"",vehicle:""});
const [loadMsg, setLoadMsg] = useState("");
const [period, setPeriod] = useState("week");
const [selScenario, setSelScenario] = useState(null);
const [wiResult, setWiResult] = useState(null);
const [wiLoading, setWiLoading] = useState(false);
const [wiMsg, setWiMsg] = useState("");
const ivRef = useRef(null);
const totalMins = jobs.reduce((s,j)=>s+j.duration,0);
const callAI = async (prompt, maxTok=2000) => {
const res = await fetch("https://api.anthropic.com/v1/messages",{
method:"POST",
headers:{"content-type":"application/json","anthropic-version":"2023-06-01","anthropic-
body: JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:maxTok,messages:[{ro
});
const raw = await res.text();
if(!res.ok) throw new Error(`API ${res.status}: ${raw.slice(0,200)}`);
const data = JSON.parse(raw);
const txt = data.content?.find(b=>b.type==="text")?.text||"";
return txt.replace(/```json\n?|```\n?/g,"").trim();
};
const spinMsgs = (msgs, setFn, ref) => {
let i=0; setFn(msgs[0]);
ref.current = setInterval(()=>{i=(i+1)%msgs.length;setFn(msgs[i]);},1100);
};
const dispatch = async () => {
if(!jobs.length||!crew.length){setErr("Need at least 1 job and 1 crew.");return;}
${j.du
setLoading(true);setErr("");setResult(null);
spinMsgs(LOAD_MSGS,setLoadMsg,ivRef);
try {
const jList = jobs.map((j,i)=>`${i+1}. "${j.name}" at ${j.address} | ${j.type} | const cList = crew.map((c,i)=>`${i+1}. ${c.name} — ${c.vehicle}`).join("\n");
const prompt = `Dispatch AI for "${company}" landscaping in Pacific Beach, San Diego.
JOBS:\n${jList}\nCREW:\n${cList}
Rules: cluster geographically (all PB: Beryl/Mission/Ingraham/Diamond), high priority first,
Return ONLY JSON:
{"totalJobs":n,"crewCount":n,"totalFieldHours":n,"assignments":[{"crewName":"","vehicle":"","
const txt = await callAI(prompt);
setResult(JSON.parse(txt));
} catch(e){setErr(e.message);} finally {clearInterval(ivRef.current);setLoading(false);}
};
const runScenario = async (sc) => {
setSelScenario(sc.id);setWiResult(null);setWiLoading(true);
spinMsgs(WI_LOAD,setWiMsg,ivRef);
const jList = jobs.map((j,i)=>`${i+1}. "${j.name}" | ${j.type} | ${j.duration}min | ${j.p
const cList = crew.map(c=>`${c.name} (${c.vehicle})`).join(", ");
const prompt = `Field service dispatcher. Company: "${company}". Current jobs: ${jList}.
Scenario: "${sc.title}" — ${sc.desc}
Return ONLY JSON (no markdown):
{"scenarioName":"${sc.title}","baseline":{"label":"Current Setup","jobs":${jobs.length},"crew
try {
const txt = await callAI(prompt,1000);
setWiResult(JSON.parse(txt));
} catch(e){console.error(e);} finally {clearInterval(ivRef.current);setWiLoading(false);}
};
const addJob = () => {
if(!nj.name||!nj.address)return;
setJobs(j=>[...j,{...nj,id:Date.now()}]);
setNj({name:"",address:"",type:"Mowing + Edge",duration:60,priority:"medium"});
setShowJF(false);
};
const addCrew = () => {
if(!nc.name)return;
setCrew(c=>[...c,{...nc,id:Date.now()}]);
setNc({name:"",vehicle:""});
setShowCF(false);
};
const maxJobs = Math.max(...WEEK_DATA.map(d=>d.jobs));
const donutSegs = buildDonut(JOB_MIX);
// ── SHARED LEFT ──
const LeftPanel = () => (
<div className="left">
<div style={{padding:"14px 18px 10px",borderBottom:"1px solid var(--b1)"}}>
<input value={company} onChange={e=>setCompany(e.target.value)}
style={{background:"transparent",border:"none",color:"var(--dim)",fontSize:11,fontW
letterSpacing:".3px",fontFamily:"inherit",outline:"none",width:"100%"}} />
<div style={{fontSize:10,color:"var(--mute)",marginTop:3}}>{TODAY}</div>
</div>
<div style={{padding:"10px 18px",borderBottom:"1px solid var(--b1)",display:"flex",just
<div style={{fontSize:10,color:"var(--dim)"}}>{jobs.length} jobs · {crew.length} crew
<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,co
{Math.floor(totalMins/60)}h {totalMins%60}m
</div>
</div>
<div className="left-scroll">
<div className="lsec">
<div className="lsec-hdr">
<div className="lsec-title">Jobs Today</div>
<div className="plus" onClick={()=>{setShowJF(v=>!v);setShowCF(false)}}>+</div>
</div>
{showJF&&(
<div className="aform">
<div className="fl">Property / Client</div>
<input className="inp" placeholder="e.g. Sullivan Residence" value={nj.name} on
<div className="fl">Address</div>
<input className="inp" placeholder="e.g. 4821 Ingraham St" value={nj.address} o
<div className="arow">
<div><div className="fl">Type</div>
<select className="inp" value={nj.type} onChange={e=>setNj(p=>({...p,type:e
{JOB_TYPES.map(t=><option key={t}>{t}</option>)}
</select>
</div>
<div><div className="fl">Minutes</div>
<input className="inp" type="number" min="15" step="15" value={nj.duration}
</div>
</div>
<div className="fl">Priority</div>
<div className="prirow">
{["high","medium","low"].map(p=>(
<button key={p} className={`pribtn${nj.priority===p?" active":""}`} onClick
))}
</div>
<button className="savebtn" onClick={addJob}>ADD JOB</button>
</div>
)}
{jobs.map(j=>(
<div key={j.id} className="jcard">
<div className="jc-top">
<div className="jc-name">{j.name}</div>
<div className={`badge b${j.priority[0]}`}>{j.priority}</div>
</div>
<div className="jc-meta">
<div className="jc-m" style={{fontSize:10,color:"var(--dim)"}}>{j.address}</d
<div className="jc-m">{j.duration}m</div>
</div>
<div className="jc-type">{j.type}</div>
<span className="x" onClick={()=>setJobs(js=>js.filter(x=>x.id!==j.id))}>✕</spa
</div>
))}
</div>
<div className="lsec" style={{marginTop:14}}>
<div className="lsec-hdr">
<div className="lsec-title">Crew Available</div>
<div className="plus" onClick={()=>{setShowCF(v=>!v);setShowJF(false)}}>+</div>
</div>
{showCF&&(
<div className="aform">
<div className="fl">Name / Team</div>
<input className="inp" placeholder="e.g. Marco & Luis" value={nc.name} onChange
<div className="fl">Vehicle + Skills Note</div>
<input className="inp" placeholder="Truck 3 · Irrigation certified" value={nc.v
<button className="savebtn" onClick={addCrew}>ADD CREW</button>
</div>
)}
{crew.map((c,ci)=>(
<div key={c.id} className="ccard">
<div className="cdot" style={{background:CREW_COLORS[ci%4]}} />
<div className="cinfo"><div className="cname">{c.name}</div><div className="cve
<span className="x" style={{position:"static",opacity:.4}} onClick={()=>setCrew
</div>
))}
</div>
</div>
<div className="dzone">
{err&&<div className="err">{err}</div>}
<div className="sum-bar">
<div className="sum-l">{jobs.length} jobs · {crew.length} crews active</div>
<div className="sum-r">{Math.floor(totalMins/60)}h {totalMins%60}m est.</div>
</div>
<button className="dbtn" onClick={()=>{if(tab==="whatif")return;dispatch();}} disable
style={tab==="whatif"?{background:"var(--s3)",color:"var(--mute)",cursor:"not-allow
{loading?<><div className="ring" style={{width:16,height:16,borderWidth:2}}/>ROUTIN
</button>
</div>
</div>
);
return (
<>
<style>{FONTS}{CSS}</style>
<div className="app">
{/* NAV */}
<div className="nav">
<div className="nav-left">
<div className="logo">CREW<span>ROUTE</span></div>
<div className="tabs">
{[["dispatch","▶ Dispatch"],["dashboard","Dashboard"],["whatif","What-If"]].map
<button key={id} className={`tab${tab===id?" active":""}`} onClick={()=>setTa
))}
</div>
</div>
<div className="nav-right">
<div className="live-dot" />
<div className="nav-stat"><div className="nav-stat-v">{jobs.length}</div><div cla
<div className="nav-stat"><div className="nav-stat-v" style={{color:"var(--amber)
<div className="nav-stat"><div className="nav-stat-v" style={{color:"var(--green)
</div>
</div>
<div className="body">
<LeftPanel />
{/* ── DISPATCH TAB ── */}
{tab==="dispatch"&&(
<div className="right">
{loading&&<div className="loading"><div className="ring"/><div className="lmsg"
{!loading&&!result&&(
<div className="empty">
<div className="ei"> </div>
<div className="et">Ready to Dispatch</div>
<div className="es">Your jobs and crew are loaded. Hit Dispatch Crews for y
</div>
)}
{!loading&&result&&(
<div className="brief">
<div className="brief-hdr">
<div>
<div className="brief-co">{company}</div>
<div className="brief-dt">Dispatch Brief · {TODAY}</div>
</div>
<div className="chips">
<div className="chip chip-j">{result.totalJobs} Jobs</div>
<div className="chip chip-c">{result.crewCount} Crews</div>
<div className="chip chip-h">{result.totalFieldHours}h Field</div>
</div>
</div>
{result.assignments?.map((a,ai)=>{
const color=CREW_COLORS[ai%4];
return(
<div key={ai} className="cb">
<div className="cb-hdr" style={{background:`rgba(${hexToRgb(color)},.
<div className="cb-l">
<div className="cb-bar" style={{background:color}}/>
<div><div className="cb-n">{a.crewName}</div><div className="cb-v
</div>
<div className="cb-r">
<div className="cb-hrs" style={{color}}>{a.hoursOnField}h</div>
<div className="cb-st">{a.route?.length} stops</div>
</div>
</div>
{a.route?.map((s,si)=>(
<div key={si} className="stop">
<div className="sn-col">
<div className="sn" style={{color}}>{s.stop}</div>
<div className="sline" style={{background:color}}/>
</div>
<div className="sbody">
<div className="sname">{s.jobName}</div>
<div className="saddr">{s.address}</div>
<div className="spills">
<span className="pill pt">{s.jobType}</span>
<span className="pill pd">{s.minutes}min</span>
</div>
</div>
<div className="sr">
<div className="st" style={{color}}>{s.arrivalTime}</div>
<div className="sn2">{s.dispatchNote}</div>
</div>
</div>
))}
</div>
);
})}
{result.flags?.length>0&&(
<div className="flags-box">
<div className="flags-ttl">Dispatch Flags</div>
{result.flags.map((f,fi)=>(
<div key={fi} className="flag-r"><span className="ficon">{f.icon}</sp
))}
</div>
)}
{result.ownerInsight&&(
<div className="insight-box">
<div className="insight-l">Owner Insight</div>
<div className="insight-t">{result.ownerInsight}</div>
</div>
)}
</div>
)}
</div>
)}
{/* ── DASHBOARD TAB ── */}
{tab==="dashboard"&&(
<div className="right">
<div className="dash">
<div className="dash-hdr">
<div><div className="dash-title">Performance Dashboard</div><div className=
<div className="period-sel">
{["week","month","quarter"].map(p=>(
<button key={p} className={`psel${period===p?" active":""}`} onClick={(
{p.charAt(0).toUpperCase()+p.slice(1)}
</button>
))}
</div>
</div>
{/* METRICS */}
<div className="metric-grid">
{[
{val:"$9,240",lbl:"Weekly Revenue",delta:"+14%",up:true,color:"var(--gree
{val:"6.8h",lbl:"Avg Field Hours / Day",delta:"+0.4h",up:true,color:"var(
{val:"93%",lbl:"Route Efficiency",delta:"+8%",up:true,color:"var(--amber)
{val:"31min",lbl:"Time Saved / Day",delta:"vs manual",up:true,color:"var(
].map((m,i)=>(
<div key={i} className="metric">
<div className="metric-val" style={{color:m.color}}>{m.val}</div>
<div className="metric-lbl">{m.lbl}</div>
<div className={`metric-delta ${m.up?"up":"dn"}`}>{m.delta}</div>
</div>
))}
</div>
{/* CHARTS ROW */}
<div className="chart-row">
<div className="chart-box">
<div className="chart-title">Jobs Completed — This Week</div>
<div className="bars">
{WEEK_DATA.map((d,i)=>(
<div key={i} className="bar-col">
<div className="bar-val">{d.jobs}</div>
<div className="bar" style={{height:`${(d.jobs/maxJobs)*80}px`,back
<div className="bar-lbl">{d.day}</div>
</div>
))}
</div>
</div>
<div className="chart-box">
<div className="chart-title">Job Type Mix</div>
<div className="donut-wrap">
<svg className="donut-svg" width="90" height="90" viewBox="0 0 90 90">
{buildDonut(JOB_MIX).map((seg,i)=>(
<circle key={i} cx="45" cy="45" r="31" fill="none"
stroke={JOB_MIX[i].color} strokeWidth="14"
strokeDasharray={`${seg.len} ${2*Math.PI*31-seg.len}`}
strokeDashoffset={-seg.offset}
transform="rotate(-90 45 45)" opacity=".85"/>
))}
</svg>
<div className="donut-legend">
{JOB_MIX.map((d,i)=>(
<div key={i} className="legend-item">
<div className="legend-dot" style={{background:d.color}}/>
<span>{d.label}</span>
<span className="legend-pct">{d.pct}%</span>
</div>
))}
</div>
</div>
</div>
</div>
{/* TIMELINE */}
<div className="timeline-box">
<div className="timeline-hdr">
<div className="th">Property</div>
<div className="th">Type</div>
<div className="th">Est.</div>
<div className="th">Actual</div>
<div className="th">Efficiency</div>
</div>
{HISTORY.map((r,i)=>(
<div key={i} className="trow">
<div className="td td-name">{r.name}</div>
<div className="td">{r.type}</div>
<div className="td">{r.est}m</div>
<div className="td" style={{color:r.actual>r.est?"var(--red)":"var(--gr
<div className="td">
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div className="eff-bar" style={{width:60}}>
<div className="eff-fill" style={{width:`${r.eff}%`,background:r.
</div>
<span style={{fontSize:10,color:"var(--dim)"}}>{r.eff}%</span>
</div>
</div>
</div>
))}
</div>
{/* ROI CARD */}
<div className="roi-card">
<div className="roi-left">
<div className="roi-num">$9,687</div>
<div className="roi-lbl">Estimated Annual Value Recovered</div>
</div>
<div className="roi-breakdown">
{[
["Planning time saved","31 min/day × $75/hr × 250 days","$9,687/yr"],
["Fuel efficiency gain","~18% fewer miles driven","~$2,400/yr"],
["Overtime reduced","Better load balancing","~$3,200/yr"],
].map(([l,d,v],i)=>(
<div key={i} className="roi-item">
<div>
<div className="roi-item-l" style={{fontWeight:500,color:"var(--txt
<div className="roi-item-l" style={{fontSize:10,marginTop:2}}>{d}</
</div>
<div className="roi-item-v">{v}</div>
</div>
))}
</div>
</div>
</div>
</div>
)}
{/* ── WHAT-IF TAB ── */}
{tab==="whatif"&&(
<div className="right">
<div className="whatif">
<div className="wi-hdr">
<div>
<div className="wi-title">Scenario Planner</div>
<div className="wi-sub">Run AI-powered what-if scenarios against your cur
</div>
</div>
<div className="scenario-grid">
{SCENARIOS.map(sc=>(
<div key={sc.id} className={`scenario-card${selScenario===sc.id?" active"
<div className="sc-icon">{sc.icon}</div>
<div className="sc-title">{sc.title}</div>
<div className="sc-desc">{sc.desc}</div>
</div>
))}
</div>
{wiLoading&&(
<div style={{display:"flex",alignItems:"center",gap:14,padding:"20px <div className="ring"/>
<div className="lmsg" style={{textAlign:"left"}}>{wiMsg}</div>
</div>
0"}}>
)}
{!wiLoading&&wiResult&&(
<div className="wi-result">
<div className="wi-result-hdr">Scenario Analysis: {wiResult.scenarioName}
<div className="wi-compare">
{[wiResult.baseline,wiResult.proposed].map((col,ci)=>(
<div key={ci} className="wi-col">
<div className="wi-col-title">{col.label}</div>
{[
{l:"Jobs",v:col.jobs},
{l:"Crews",v:col.crews},
{l:"Field Hours",v:`${col.fieldHours}h`},
{l:"Est. Daily Revenue",v:`$${col.estDailyRevenue?.toLocaleString
].map((s,i)=>(
<div key={i} className="wi-stat">
<div className="wi-stat-val" style={{color:ci===1?"var(--green)
<div className="wi-stat-lbl">{s.l}</div>
</div>
))}
</div>
))}
</div>
{wiResult.delta&&(
<div className="wi-delta">
<div>
<div className="wi-d-val">{wiResult.delta.efficiencyGain}</div>
<div className="wi-d-lbl">Efficiency Gain</div>
</div>
<div style={{textAlign:"right"}}>
<div className="wi-d-val" style={{color:"var(--amber)"}}>
{wiResult.delta.revenueImpact>=0?"+":""}${Math.abs(wiResult.delta
</div>
<div className="wi-d-lbl">Revenue Impact</div>
</div>
</div>
)}
{wiResult.analysis&&(
<div className="wi-analysis">{wiResult.analysis}</div>
)}
</div>
)}
</div>
</div>
)}
</div>
</div>
</>
);
}
