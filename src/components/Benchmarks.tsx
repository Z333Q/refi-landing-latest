import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck } from 'lucide-react';

const Benchmarks: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal-deep border-b border-gray-700 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl h-full mx-auto px-6">
        <div className="w-full flex justify-between items-end mb-6 px-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-mint text-xs font-bold tracking-[0.25em] uppercase"
              >
                Multi-Asset Intelligence
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  boxShadow: ["0 0 0px rgba(220,38,38,0)", "0 0 15px rgba(220,38,38,0.5)", "0 0 0px rgba(220,38,38,0)"],
                  borderColor: ["rgba(239, 68, 68, 0.4)", "rgba(239, 68, 68, 0.9)", "rgba(239, 68, 68, 0.4)"]
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.5 },
                  x: { delay: 0.5, duration: 0.5 },
                  boxShadow: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" },
                  borderColor: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-900/20 rounded-full border border-red-500/40"
              >
                <FileCheck size={10} className="text-red-400" />
                <span className="text-[8px] text-red-200 font-mono uppercase tracking-[0.1em] font-bold">
                  USPTO Patent Pending
                </span>
              </motion.div>
            </div>

            <h2 className="text-3xl font-bold">Dynamic Basket Adaptation</h2>
          </div>

          <div className="flex gap-6">
            <MetricSmall label="Basket CAGR" value="+28.06%" />
            <MetricSmall label="Sharpe" value="+2.07" />
            <MetricSmall label="Max Drawdown" value="-7.48%" />
          </div>
        </div>

        <div className="w-full h-[400px] bg-charcoal-deep rounded-xl border border-charcoal-border relative overflow-hidden flex flex-col shadow-2xl">
          <div className="flex-1 relative p-6">
            <div className="absolute inset-0 flex">
              <div className="w-[60%] h-full border-r border-dashed border-gray-700/50 flex flex-col justify-end p-4">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Growth Regime</span>
              </div>
              <div className="w-[40%] h-full bg-red-900/5 flex flex-col justify-end p-4 relative">
                <div className="absolute top-0 left-0 bottom-0 w-px bg-red-500/30"></div>
                <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Volatility Regime</span>
              </div>
            </div>

            <div className="absolute top-[75%] left-0 right-0 border-t border-dotted border-gray-500 flex items-center">
              <span className="text-[9px] text-gray-400 bg-charcoal-deep px-2 ml-2 -mt-2">Portfolio VaR Limit (-10%)</span>
            </div>

            <RegimeSimulationChart />
          </div>

          <div className="h-16 border-t border-charcoal-border bg-charcoal-light flex relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono w-24">
              Basket<br />Composition
            </div>

            <div className="flex-1 flex relative ml-28 mr-6 my-4 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '60%' }}
                transition={{ delay: 5, duration: 4, ease: "easeInOut" }}
                className="h-full bg-mint flex items-center justify-center overflow-hidden"
              >
                <span className="text-[9px] text-charcoal font-bold whitespace-nowrap px-2">FULL EQUITY BASKET (50+)</span>
              </motion.div>

              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '40%' }}
                transition={{ delay: 5, duration: 4, ease: "easeInOut" }}
                className="h-full bg-gray-600 flex items-center justify-center overflow-hidden"
              >
                <span className="text-[9px] text-white font-bold whitespace-nowrap px-2">DEFENSIVE ROTATION</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between mt-4 text-[10px] text-gray-500 px-4">
          <span>*Backtested on US Equities Basket (Tech/Healthcare/Finance)</span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-mint"></div> ReFi Smart Basket</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-500"></div> S&P 500 Index</span>
          </span>
        </div>
      </div>
    </section>
  );
};

const MetricSmall: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-right">
    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</div>
    <div className="text-lg font-bold text-mint">{value}</div>
  </div>
);

const RegimeSimulationChart = () => {
  return (
    <svg className="w-full h-full visible overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      <motion.path
        d="M0,260 C120,250 220,210 320,190 S520,110 620,110 C670,110 720,290 820,300 S920,290 1000,280"
        fill="none"
        stroke="#374151"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: "linear" }}
      />
      <motion.path
        d="M0,240 C90,230 190,190 290,170 S490,90 590,90 C640,90 690,270 790,280 S890,270 1000,260"
        fill="none"
        stroke="#374151"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: "linear", delay: 0.2 }}
      />

      <motion.path
        d="M0,250 C100,240 200,200 300,180 S500,100 600,100 C650,100 700,280 800,290 S900,280 1000,270"
        fill="none"
        stroke="#6B7280"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: "linear" }}
      />

      <motion.path
        d="M0,250 C100,240 200,200 300,180 S500,100 600,100 C620,100 650,120 700,125 S900,110 1000,100"
        fill="none"
        stroke="#0CD4A0"
        strokeWidth="3"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: "linear" }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
      >
        <circle cx="620" cy="110" r="4" fill="#EF4444" />
        <line x1="620" y1="110" x2="620" y2="46" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />

        <rect
          x="535"
          y="15"
          width="170"
          height="32"
          rx="16"
          fill="#EF4444"
          filter="url(#shadow)"
        />

        <text
          x="620"
          y="35"
          fontSize="10"
          fill="#FFFFFF"
          textAnchor="middle"
          fontWeight="bold"
          letterSpacing="0.5px"
        >
          RL AGENT: SECTOR ROTATION
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.5 }}
      >
        <text x="800" y="260" fontSize="10" fill="#EF4444" textAnchor="middle">Index Breaks Risk Limit</text>
      </motion.g>
    </svg>
  );
};

export default Benchmarks;
