import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, TrendingUp, Layers, AlertTriangle } from 'lucide-react';

const Benchmarks: React.FC = () => {
  const spyData = [
    0, 1.5, 2.5, 1.8, 3.2, 5.0, 4.2, 6.5, 7.8, 7.0,
    9.5, 8.8, 11.2, 9.5, 8.0, 5.5, 4.0, 2.5, 4.0, 7.0,
    9.5, 12.0, 13.5, 12.8, 15.0, 17.5, 16.5, 19.5, 18.0, 15.0,
    11.0, 8.5, 6.0, 4.5, 3.5, 5.0, 7.0, 9.5, 12.0, 14.0,
    16.0, 18.5, 21.0, 23.0, 21.0, 24.5, 27.0, 26.0, 29.5, 31.0,
    33.0, 36.0, 34.0, 37.0, 39.0, 41.0, 39.0, 42.5, 45.0, 43.0,
    46.0, 48.0, 50.0, 48.0, 52.0, 55.0, 53.0, 56.0, 58.0, 60.0,
    62.0, 60.0, 64.0, 66.0, 65.0, 68.0, 70.0, 68.0, 55.0, 50.0,
    52.0, 54.0, 56.0, 54.0, 51.0, 53.0, 55.0, 57.0, 58.5, 57.0,
    58.0, 59.5, 58.5, 59.0, 59.8, 58.0, 56.0, 57.5, 59.0, 59.9
  ];

  const refinityData = [
    0, 0.8, 1.5, 2.2, 3.0, 3.8, 4.5, 5.2, 6.0, 6.8,
    7.5, 8.2, 9.0, 9.8, 10.5, 11.2, 11.8, 12.5, 13.2, 14.0,
    14.8, 15.5, 16.2, 17.0, 17.8, 18.5, 19.2, 20.0, 20.8, 21.5,
    22.2, 23.0, 23.5, 24.0, 24.5, 25.2, 26.0, 26.8, 27.5, 28.2,
    29.0, 29.8, 30.5, 31.2, 32.0, 32.8, 33.5, 34.2, 35.0, 35.8,
    36.5, 37.5, 38.2, 39.0, 39.8, 40.5, 41.2, 42.0, 42.8, 43.5,
    44.5, 45.2, 46.0, 46.8, 47.5, 48.2, 49.0, 49.8, 50.5, 51.2,
    52.0, 52.8, 53.5, 54.2, 55.0, 56.0, 56.8, 57.5, 58.0, 58.5,
    59.0, 59.8, 60.5, 61.2, 62.0, 62.8, 63.5, 64.2, 65.0, 65.5,
    66.0, 66.8, 67.2, 67.8, 68.2, 68.5, 68.8, 69.0, 69.2, 69.3
  ];

  const generatePath = (data: number[], height: number, width: number) => {
    const maxVal = 80;
    const stepX = width / (data.length - 1);

    let d = `M0,${height - (data[0] / maxVal) * height}`;

    for (let i = 1; i < data.length; i++) {
      const x = i * stepX;
      const y = height - (data[i] / maxVal) * height;
      d += ` L${x},${y}`;
    }

    return d;
  };

  const chartWidth = 800;
  const chartHeight = 300;

  const spyPath = generatePath(spyData, chartHeight, chartWidth);
  const refinityPath = generatePath(refinityData, chartHeight, chartWidth);

  const spyArea = `${spyPath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;
  const refinityArea = `${refinityPath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

  return (
    <section className="py-24 bg-charcoal-deep border-b border-gray-700 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-charcoal-light border border-gray-700 text-[10px] font-mono text-mint uppercase tracking-widest mb-3">
               Research Backtest, ReFinity Configuration
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Example Research Results
            </h2>
            <p className="text-gray-body max-w-xl text-sm">
              Example results from an internal ReFinity Portfolio Rebalancing used to validate proof-gated execution workflows. Results shown are simulated. ReFi.Trading does not offer investment strategies or recommendations. Users define rules and risk limits. Users execute trades via their broker.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono text-gray-400 bg-charcoal border border-gray-700 px-4 py-2 rounded">
            <div className="flex flex-col">
                <span className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-mint"></span> ReFinity Configuration
                </span>
                <span className="text-white font-bold ml-4">SHARPE 4.38</span>
            </div>
            <div className="h-6 w-px bg-gray-700 mx-2"></div>
            <div className="flex flex-col">
                <span className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-error"></span> S&P 500 (SPY)
                </span>
                <span className="text-gray-300 font-bold ml-4">SHARPE 1.00</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8 bg-charcoal border border-gray-700 rounded relative min-h-[400px] flex flex-col">

             <div className="absolute top-4 left-4 z-20 flex gap-8 pointer-events-none">
                <div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider font-mono mb-1">CUMULATIVE RETURN</div>
                    <div className="text-2xl text-white font-mono font-medium tracking-tight">69.3% <span className="text-xs text-mint">+22.5% p.a.</span></div>
                </div>
                <div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider font-mono mb-1">VOLATILITY</div>
                    <div className="text-2xl text-white font-mono font-medium tracking-tight">3.7% <span className="text-xs text-gray-500">LOW</span></div>
                </div>
             </div>

             <div className="flex-grow relative mt-16 ml-4 mb-8 pr-12">
                <div className="absolute left-0 right-12 top-0 bottom-0 border-l border-b border-gray-700/50 grid grid-cols-4 grid-rows-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-t border-gray-700/30 w-full h-full"></div>
                    ))}
                    <div className="absolute inset-0 flex justify-between">
                         {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-full w-px bg-gray-700/30"></div>
                        ))}
                    </div>
                </div>

                <svg className="absolute left-0 right-12 top-0 bottom-0 w-auto h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                   <defs>
                      <linearGradient id="gradientMint" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#0CD4A0" stopOpacity="0.15" />
                         <stop offset="100%" stopColor="#0CD4A0" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#EF4444" stopOpacity="0.1" />
                         <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                      </linearGradient>
                   </defs>

                   <motion.path
                      d={spyArea}
                      fill="url(#gradientRed)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                   />
                   <motion.path
                      d={spyPath}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "linear" }}
                      viewport={{ once: true }}
                   />

                   <motion.path
                      d={refinityArea}
                      fill="url(#gradientMint)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                   />
                   <motion.path
                      d={refinityPath}
                      fill="none"
                      stroke="#0CD4A0"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "linear", delay: 0.2 }}
                      viewport={{ once: true }}
                   />

                   <motion.circle
                      cx={chartWidth} cy={chartHeight - (spyData[spyData.length-1]/80)*chartHeight} r="3" fill="#EF4444"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2 }}
                      viewport={{ once: true }}
                   />
                   <motion.circle
                      cx={chartWidth} cy={chartHeight - (refinityData[refinityData.length-1]/80)*chartHeight} r="3" fill="#0CD4A0"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2 }}
                      viewport={{ once: true }}
                   />
                   <motion.circle
                      cx={chartWidth} cy={chartHeight - (refinityData[refinityData.length-1]/80)*chartHeight} r="8" stroke="#0CD4A0" strokeWidth="1" fill="none"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0, scale: 1.5 }}
                      animate={{ opacity: [0, 0.5, 0], scale: [1, 2, 2.5] }}
                      transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
                   />
                </svg>

                <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-gray-500 font-mono text-right pointer-events-none h-full py-0">
                   <span>+80%</span>
                   <span>+60%</span>
                   <span>+40%</span>
                   <span>+20%</span>
                   <span>0%</span>
                </div>
             </div>

             <div className="flex justify-between pl-4 pr-16 pb-2 text-[9px] text-gray-500 font-mono uppercase tracking-wider border-t border-gray-700/50 pt-2">
                <span>Apr '23</span>
                <span>Oct '23</span>
                <span>Apr '24</span>
                <span>Oct '24</span>
                <span>Apr '25</span>
                <span>Oct '25</span>
             </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-full">

             <div className="bg-charcoal border border-gray-700 p-5 rounded flex flex-col justify-center relative overflow-hidden group hover:border-mint/20 transition-colors">
                <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                   <Activity size={12} className="text-mint" /> Sharpe Ratio
                </div>
                <div className="text-2xl text-white font-mono font-medium">4.38</div>
                <div className="text-[10px] text-gray-500 mt-1">vs 1.00 (SPY). <span className="text-mint">4.3x Efficiency.</span></div>
             </div>

             <div className="bg-charcoal border border-gray-700 p-5 rounded flex flex-col justify-center relative group hover:border-mint/20 transition-colors">
                <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                   <Shield size={12} className="text-mint" /> Max Drawdown
                </div>
                <div className="text-2xl text-white font-mono font-medium">-1.08%</div>
                <div className="text-[10px] text-gray-500 mt-1">vs -19.73% (SPY). <span className="text-white">Capital Protected.</span></div>
             </div>

             <div className="bg-charcoal border border-gray-700 p-5 rounded flex flex-col justify-center relative group hover:border-mint/20 transition-colors">
                <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                   <TrendingUp size={12} className="text-mint" /> Annual Return (CAGR)
                </div>
                <div className="text-2xl text-white font-mono font-medium">22.47%</div>
                <div className="text-[10px] text-gray-500 mt-1">Consistent compounding.</div>
             </div>

             <div className="bg-gradient-to-br from-charcoal-light to-charcoal-deep border border-mint/20 p-5 rounded flex flex-col justify-center shadow-[0_0_15px_rgba(12,212,160,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Layers size={40} className="text-mint" />
                </div>
                <div className="text-mint text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                   <Layers size={12} /> Asset Universe
                </div>
                <div className="text-3xl text-white font-mono font-medium">292</div>
                <div className="text-[10px] text-gray-400 mt-1">Liquid U.S. Equities. <span className="text-white">Broad diversification.</span></div>
             </div>

          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-start gap-3 text-[9px] text-gray-600 font-sans leading-relaxed max-w-5xl mx-auto">
           <AlertTriangle size={12} className="flex-shrink-0 mt-0.5 text-gray-500" />
           <div>
              <strong className="text-gray-500 uppercase tracking-wider block mb-1">Hypothetical Performance Disclaimer</strong>
              Source: "RF-RL Regime Strategy Portfolio Returns Estimate" (Nov 2025). Data reflects historical out-of-sample performance (2023-04-18 to 2025-10-17) for the Refinity© Strategy portfolio,
              constructed by equal-weighting <strong>292 liquid U.S. equities</strong> selected via fundamental and robustness filters.
              The results are simulated and do not represent actual trading. Past performance is not indicative of future results.
              The Sharpe Ratio of 4.38 and Max Drawdown of -1.08% are based on daily returns net of estimated trading costs (0.025% daily drag) and risk-free rate (4.25%).
           </div>
        </div>
      </div>
    </section>
  );
};

export default Benchmarks;
