import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Scan, 
  Brain, 
  Globe, 
  Database, 
  Newspaper, 
  Cpu, 
  GitMerge, 
  Files, 
  DollarSign, 
  Mail,
  Bot,
  Zap,
  LayoutDashboard,
  History,
  ShieldCheck,
  FileBarChart,
  Lightbulb,
  Users
} from 'lucide-react';

const IconNode = ({ 
  icon: Icon, 
  label, 
  sublabel, 
  x, 
  y, 
  color = "text-blue-400",
  size = "normal"
}: { 
  icon: any, 
  label: string, 
  sublabel?: string, 
  x: number, 
  y: number, 
  color?: string,
  size?: "normal" | "small" | "large"
}) => {
  const boxSize = size === "large" ? "w-32 h-32" : size === "small" ? "w-24 h-24" : "w-28 h-28";
  const iconSize = size === "large" ? 32 : size === "small" ? 20 : 24;

  return (
    <motion.div 
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      whileHover={{ scale: 1.05, y: y - 5 }}
      className={`absolute ${boxSize} glass rounded-2xl flex flex-col items-center justify-center text-center p-2 z-10 border-foreground/5 hover:border-foreground/20 transition-colors group shadow-xl`}
    >
      <div className={`${color} mb-1 group-hover:brightness-125 transition-all`}>
        <Icon size={iconSize} strokeWidth={1.5} />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/90 leading-tight">{label}</span>
      {sublabel && <span className="text-[7px] text-muted uppercase tracking-tighter mt-0.5 leading-tight">{sublabel}</span>}
    </motion.div>
  );
};

const LabelNode = ({ label, sublabel, x, y, color = "text-muted" }: { label: string, sublabel?: string, x: number, y: number, color?: string }) => (
  <div 
    style={{ left: x, top: y, transform: 'translate(0, -50%)' }}
    className="absolute flex flex-col z-10 pl-4"
  >
    <span className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
    {sublabel && <span className="text-[8px] text-muted/60 uppercase tracking-tighter">{sublabel}</span>}
  </div>
);

export default function ArchitectureDiagram() {
  // Coordinate System: 1200 x 850
  // Zoomed out effect by using a larger viewBox and scale
  
  return (
    <div className="w-full py-12 overflow-x-auto flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[1200px] h-[850px] bg-background rounded-[3rem] border border-border overflow-hidden origin-center shadow-2xl"
      >
        
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[120px] -z-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/[0.05] blur-[120px] -z-20" />

        {/* SVG Connections Layer */}
        <svg viewBox="0 0 1200 850" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" className="fill-foreground/40" />
            </marker>
          </defs>

          <g className="stroke-foreground/20" strokeWidth="1.5" fill="none">
            {/* --- TOP FLOW (Verification) --- */}
            {/* Docs(100) -> OCR(270) -> AI(440) -> API(700) */}
            <path d="M 156 150 L 214 150" markerEnd="url(#arrowhead)" />
            <path d="M 326 150 L 384 150" markerEnd="url(#arrowhead)" />
            <path d="M 496 150 L 644 150" markerEnd="url(#arrowhead)" />
            
            {/* AI Correction(440,150) to DB(550,375) */}
            {/* AI Bottom: (440, 206), DB Left: (486, 375) */}
            <path d="M 440 206 L 440 375 L 486 375" markerEnd="url(#arrowhead)" />
            
            {/* DB(550,375) to API(700,150) (Update Loop) */}
            {/* DB Top: (550, 311), API Bottom: (700, 206) */}
            <path d="M 550 311 L 550 260 L 700 260 L 700 206" markerEnd="url(#arrowhead)" />
            <text x="680" y="260" className="fill-foreground/40 text-[7px] uppercase tracking-widest font-bold" transform="rotate(-90, 680, 260)">update data</text>

            {/* --- BOTTOM FLOW (Payouts) --- */}
            {/* Bulletins(100) -> LLM(270) -> Mapping(440) -> Payouts(700) */}
            <path d="M 156 600 L 214 600" markerEnd="url(#arrowhead)" />
            <path d="M 326 600 L 384 600" markerEnd="url(#arrowhead)" />
            <path d="M 496 600 L 644 600" markerEnd="url(#arrowhead)" />
            
            {/* Retail Files(440,750) to Mapping(440,600) */}
            {/* Retail Top: (440, 702), Mapping Bottom: (440, 656) */}
            <path d="M 440 702 L 440 656" markerEnd="url(#arrowhead)" />
            
            {/* Mapping(440,600) to DB(550,375) */}
            {/* Mapping Top: (440, 544), DB Bottom: (550, 439) */}
            <path d="M 440 544 L 440 480 L 550 480 L 550 439" markerEnd="url(#arrowhead)" />

            {/* --- RIGHT STACK CONNECTIONS --- */}
            {/* DB(550,375) to Spine(800) */}
            <path d="M 614 375 L 800 375" strokeDasharray="4 4" />
            
            {/* Vertical Spine */}
            <path d="M 800 100 L 800 750" strokeDasharray="4 4" />
            
            {/* Branches to Right Stack Nodes(900) */}
            <path d="M 800 100 L 852 100" markerEnd="url(#arrowhead)" />
            <path d="M 800 250 L 852 250" markerEnd="url(#arrowhead)" />
            <path d="M 800 400 L 852 400" markerEnd="url(#arrowhead)" />
            <path d="M 800 550 L 852 550" markerEnd="url(#arrowhead)" />
            <path d="M 800 700 L 852 700" markerEnd="url(#arrowhead)" />

            {/* AI Bot(900,250) Splits to Labels(1030) */}
            <path d="M 948 250 L 980 250 L 980 200 L 1020 200" markerEnd="url(#arrowhead)" />
            <path d="M 948 250 L 980 250 L 980 300 L 1020 300" markerEnd="url(#arrowhead)" />
            
            {/* SMTP(900,550) to Trigger Label(1030) */}
            <path d="M 948 550 L 1020 550" markerEnd="url(#arrowhead)" />
          </g>
        </svg>

        {/* --- ELEMENTS --- */}

        {/* Section Headers */}
        <div className="absolute top-10 left-12 text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500/40">Document Verification</div>
        <div className="absolute bottom-[300px] left-12 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-500/40">Payout Generation</div>

        {/* Background Containers */}
        <div className="absolute top-14 left-10 w-[700px] h-[190px] border border-blue-500/10 bg-blue-500/[0.02] rounded-[3rem] -z-10" />
        <div className="absolute bottom-[90px] left-10 w-[700px] h-[190px] border border-orange-500/10 bg-orange-500/[0.02] rounded-[3rem] -z-10" />

        {/* Top Flow Nodes */}
        <IconNode x={100} y={150} icon={FileText} label="Documents" sublabel="by dealer" />
        <IconNode x={270} y={150} icon={Scan} label="OCR" sublabel="Engine" />
        <IconNode x={440} y={150} icon={Brain} label="AI Correction" sublabel="Layer" />
        <IconNode x={700} y={150} icon={ShieldCheck} label="Verification" sublabel="via Gov APIs" color="text-blue-400" />

        {/* Bottom Flow Nodes */}
        <IconNode x={100} y={600} icon={Newspaper} label="Bulletins" color="text-orange-400" />
        <IconNode x={270} y={600} icon={Brain} label="LLM for Rules" sublabel="Generation" color="text-orange-400" />
        <IconNode x={440} y={600} icon={GitMerge} label="Mapping" sublabel="Function" color="text-orange-400" />
        <IconNode x={700} y={600} icon={DollarSign} label="Payouts" color="text-orange-400" />
        
        {/* Retail Files Input */}
        <IconNode x={440} y={750} icon={Files} label="Retail and" sublabel="other Files" color="text-orange-400" size="small" />

        {/* Central Database */}
        <IconNode x={550} y={375} icon={Database} label="SQL Database" color="text-green-400" size="large" />

        {/* Right Stack Nodes */}
        <IconNode x={900} y={100} icon={History} label="Data Logging" color="text-blue-400" size="small" />
        
        <IconNode x={900} y={250} icon={Bot} label="AI Bot" color="text-purple-400" size="small" />
        <LabelNode x={1030} y={200} label="Recommendation" sublabel="using AI" color="text-purple-400/80" />
        <LabelNode x={1030} y={300} label="Insights" sublabel="using AI" color="text-purple-400/80" />

        <IconNode x={900} y={400} icon={LayoutDashboard} label="Dashboard" color="text-green-400" size="small" />
        
        <IconNode x={900} y={550} icon={Mail} label="SMTP Integration" color="text-orange-400" size="small" />
        <LabelNode x={1030} y={550} label="Auto Email" sublabel="Triggers" color="text-orange-400/80" />

        <IconNode x={900} y={700} icon={FileBarChart} label="Reports" color="text-blue-400" size="small" />

      </motion.div>
    </div>
  );
}
