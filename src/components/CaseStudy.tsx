import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Layers, 
  Database, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Cpu,
  Globe,
  Activity,
  FileText,
  BarChart3
} from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <span className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em]">{subtitle}</span>
    <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight">{title}</h2>
  </div>
);

const MetricCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass p-6 rounded-3xl border-foreground/5 flex flex-col gap-4 transition-all duration-300"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  </motion.div>
);

export default function CaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30"
    >
      {/* Top Progress / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[60] glass border-b-0 border-foreground/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="hidden sm:block h-4 w-px bg-foreground/10" />
            <div className="text-sm font-bold tracking-tighter cursor-pointer hidden sm:block" onClick={onBack}>
              Asmit Dash<span className="text-blue-500">.</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-muted">
            <a href="#problem" className="hover:text-blue-400 transition-colors">Problem</a>
            <a href="#architecture" className="hover:text-blue-400 transition-colors">Architecture</a>
            <a href="#decisions" className="hover:text-blue-400 transition-colors">Decisions</a>
            <a href="#impact" className="hover:text-blue-400 transition-colors">Impact</a>
          </div>
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
            View Architecture
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-32">
        {/* Hero Section */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
              FinTech & AI
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold mt-8 leading-[1.1] tracking-tight">
              Document Compliance & <br />
              <span className="text-muted">Financial Orchestration</span>
            </h1>
            
            <blockquote className="mt-12 p-8 border-l-2 border-blue-500 bg-blue-500/5 rounded-r-3xl text-xl sm:text-2xl text-foreground/90 leading-relaxed italic">
              "A scalable AI-powered platform that automates document verification → payout decisioning → financial reconciliation, reducing manual effort by 70%."
            </blockquote>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <MetricCard label="Docs Processed/Day" value="10,000+" icon={FileText} />
              <MetricCard label="Manual Effort Reduction" value="70%" icon={Zap} />
              <MetricCard label="Verification Accuracy" value="98.5%" icon={ShieldCheck} />
              <MetricCard label="Audit Traceability" value="100%" icon={Activity} />
            </div>
          </motion.div>
        </header>

        {/* Problem Framing */}
        <section id="problem" className="mb-32">
          <SectionHeader title="The Real Problem" subtitle="Problem Framing" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl text-muted leading-relaxed">
                Most enterprises treat Document Verification, Payout Systems, and Financial Reconciliation as <span className="text-foreground font-semibold underline decoration-blue-500 underline-offset-4">separate systems</span>.
              </p>
              <div className="space-y-4">
                {[
                  "Verified documents ≠ valid payouts",
                  "Claims processed without full validation",
                  "No traceability between decision layers",
                  "Finance teams rely on manual reconciliation"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-foreground/80"
                  >
                    <AlertCircle size={18} className="text-red-500 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="pt-8">
                <div className="text-3xl font-bold text-foreground leading-tight">
                  “Verification without financial linkage is <span className="text-blue-500">incomplete</span>.”
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-[2.5rem] p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-foreground/5"
            >
              <div className="aspect-square flex flex-col items-center justify-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/20">
                  <AlertCircle size={40} />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">System Fragmentation</div>
                  <p className="text-muted text-sm mt-2">The root cause of 90% of payout discrepancies.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solution Philosophy */}
        <section className="mb-32">
          <SectionHeader title="Closed-Loop Compliance" subtitle="Solution Philosophy" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {[
                { label: "Verification", icon: ShieldCheck },
                { label: "Decision", icon: Cpu },
                { label: "Payment", icon: Zap },
                { label: "Validation", icon: CheckCircle2 },
                { label: "Audit", icon: Activity }
              ].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                      <step.icon size={28} />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{step.label}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden md:block text-muted/30" size={24} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </section>

        {/* System Architecture */}
        <section id="architecture" className="mb-32">
          <SectionHeader title="System Architecture" subtitle="Visual Blueprint" />
          <ArchitectureDiagram />
        </section>

        {/* Architectural Decisions */}
        <section id="decisions" className="mb-32">
          <SectionHeader title="Key Decisions" subtitle="Engineering Trade-offs" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Rule Engine over ML-Only",
                reason: "Compliance requires explainability. Hybrid system provides both AI power and deterministic auditability.",
                impact: "100% explainable payout decisions."
              },
              {
                title: "Async API Validation",
                reason: "External APIs are unreliable. Queue-based validation with retry logic ensures system progress.",
                impact: "Zero data loss during API downtime."
              },
              {
                title: "Decoupled Payout Layer",
                reason: "Financial logic evolves frequently. Independent scaling allows for rapid scheme updates.",
                impact: "Deployment time reduced from days to hours."
              },
              {
                title: "Reconciliation as a Core Layer",
                reason: "Most systems treat it as reporting. We made it a validation gate for every transaction.",
                impact: "Eliminated 99% of payout discrepancies."
              }
            ].map((decision, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2rem] border-foreground/5 space-y-4 hover:border-blue-500/30 transition-colors"
              >
                <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">Decision 0{i + 1}</div>
                <h4 className="text-xl font-bold">{decision.title}</h4>
                <p className="text-muted leading-relaxed">{decision.reason}</p>
                <div className="pt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
                  <TrendingUp size={16} />
                  {decision.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-32">
          <SectionHeader title="The Stack" subtitle="Technology" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden glass rounded-3xl border-foreground/5"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/5">
                  <th className="p-6 text-xs font-mono uppercase tracking-widest text-muted">Layer</th>
                  <th className="p-6 text-xs font-mono uppercase tracking-widest text-muted">Tech</th>
                  <th className="p-6 text-xs font-mono uppercase tracking-widest text-muted">Why?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {[
                  { layer: "Backend", tech: "FastAPI", why: "Async + scalable APIs" },
                  { layer: "OCR", tech: "Tesseract", why: "Customizable + cost-effective" },
                  { layer: "Cloud", tech: "AWS EC2 + S3", why: "Scalable + storage" },
                  { layer: "DB", tech: "PostgreSQL", why: "Structured financial data" },
                  { layer: "Processing", tech: "Pandas", why: "Fast rule-based transforms" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-foreground/[0.02] transition-colors">
                    <td className="p-6 font-bold">{row.layer}</td>
                    <td className="p-6 text-blue-400 font-mono">{row.tech}</td>
                    <td className="p-6 text-muted">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* Impact */}
        <section id="impact" className="mb-32">
          <SectionHeader title="The Result" subtitle="Impact" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Manual Effort", before: "High", after: "↓ 70%", color: "text-blue-400" },
              { label: "Error Rate", before: "Frequent", after: "Minimal", color: "text-green-400" },
              { label: "Processing Time", before: "Slow", after: "Real-time", color: "text-purple-400" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-foreground/5 text-center"
              >
                <div className="text-sm text-muted mb-4 uppercase tracking-widest">{stat.label}</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-muted line-through opacity-50">{stat.before}</div>
                  <ArrowRight size={16} className="text-muted" />
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.after}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Positioning */}
        <footer className="text-center pt-24 border-t border-foreground/5">
          <p className="text-2xl sm:text-3xl font-medium text-muted max-w-3xl mx-auto leading-relaxed">
            DCP transforms document processing into a <span className="text-foreground">financial decision system</span>, ensuring every transaction is verified, eligible, and auditable.
          </p>
          <button 
            onClick={onBack}
            className="mt-12 px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 transition-all font-bold flex items-center gap-2 mx-auto active:scale-95 shadow-xl shadow-foreground/10"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
        </footer>
      </main>
    </motion.div>
  );
}
