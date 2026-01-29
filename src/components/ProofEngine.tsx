import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Lock, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const generateHash = () => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

const ProofEngine: React.FC = () => {
  const [step, setStep] = useState(0);
  const [zkHash, setZkHash] = useState('');
  const [aceHash, setAceHash] = useState('');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const nextStep = (prev + 1) % 7;
        if (nextStep === 3) {
          setZkHash(generateHash());
          setAceHash(generateHash());
        }
        if (nextStep === 5) {
          setTxHash(generateHash());
        }
        return nextStep;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Proof Engine</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
                The <span className="text-mint">Atomic Dual-Proof Gate</span>. Execution requires simultaneous quantitative (zk-VaR) and qualitative (Chainlink ACE) verification.
            </p>
        </div>

        <div className="bg-charcoal-light border border-gray-700 rounded-xl p-4 md:p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-11 gap-4 items-center">

                <motion.div
                    className={`col-span-3 md:col-span-2 border rounded p-4 transition-all duration-700 ${step >= 0 ? 'border-mint bg-mint/5' : 'border-gray-700 bg-charcoal'}`}
                    animate={{ scale: step === 0 ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-xs text-gray-500 mb-2">1. SIGNAL</div>
                    <div className={`font-bold text-sm transition-colors duration-500 ${step >= 0 ? 'text-white' : 'text-gray-600'}`}>Regime Shift</div>
                </motion.div>

                <div className="hidden md:flex col-span-1 justify-center">
                    <motion.div
                        animate={{ opacity: step >= 1 ? [0.3, 1, 0.3] : 0.3 }}
                        transition={{ duration: 1, repeat: step >= 1 && step < 2 ? Infinity : 0 }}
                    >
                        <ArrowRight size={16} className="text-gray-600" />
                    </motion.div>
                </div>

                <motion.div
                    className={`col-span-3 md:col-span-2 border rounded p-4 transition-all duration-700 ${step >= 1 ? 'border-mint bg-mint/5' : 'border-gray-700 bg-charcoal'}`}
                    animate={{ scale: step === 1 ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-xs text-gray-500 mb-2">2. MPT</div>
                    <div className={`font-bold text-sm transition-colors duration-500 ${step >= 1 ? 'text-white' : 'text-gray-600'}`}>Rebalance</div>
                </motion.div>

                <div className="hidden md:flex col-span-1 justify-center">
                    <motion.div
                        animate={{ opacity: step >= 2 ? [0.3, 1, 0.3] : 0.3 }}
                        transition={{ duration: 1, repeat: step >= 2 && step < 4 ? Infinity : 0 }}
                    >
                        <ArrowRight size={16} className="text-gray-600" />
                    </motion.div>
                </div>

                <motion.div
                    className={`col-span-3 md:col-span-3 border rounded p-4 transition-all duration-700 ${step >= 2 ? 'border-mint bg-mint/10 shadow-[0_0_15px_rgba(12,212,160,0.1)]' : 'border-gray-700 bg-charcoal'}`}
                    animate={{
                        scale: step === 2 || step === 3 ? [1, 1.02, 1] : 1,
                        boxShadow: step >= 2 ? [
                            '0 0 15px rgba(12,212,160,0.1)',
                            '0 0 25px rgba(12,212,160,0.2)',
                            '0 0 15px rgba(12,212,160,0.1)'
                        ] : '0 0 0px rgba(12,212,160,0)'
                    }}
                    transition={{ duration: 2, repeat: step >= 2 && step < 4 ? Infinity : 0 }}
                >
                    <div className="text-xs text-gray-500 mb-2 flex justify-between">
                        <span>3. ATOMIC DUAL-PROOF</span>
                        <motion.div
                            animate={{ rotate: step >= 2 && step < 4 ? 360 : 0 }}
                            transition={{ duration: 2, repeat: step >= 2 && step < 4 ? Infinity : 0, ease: "linear" }}
                        >
                            <Lock size={12} className={step >= 4 ? 'text-mint' : 'text-gray-600'} />
                        </motion.div>
                    </div>
                    <div className="space-y-2">
                        <motion.div
                            className={`flex items-center justify-between text-xs p-2 rounded bg-charcoal border transition-all duration-500 ${step >= 2 ? 'border-gray-700' : 'border-transparent'}`}
                            animate={{
                                backgroundColor: step === 2 || step === 3 ? ['rgba(16, 24, 32, 1)', 'rgba(12, 212, 160, 0.05)', 'rgba(16, 24, 32, 1)'] : 'rgba(16, 24, 32, 1)'
                            }}
                            transition={{ duration: 1.5, repeat: step >= 2 && step < 4 ? Infinity : 0 }}
                        >
                            <span className={`transition-colors duration-500 ${step >= 2 ? 'text-white' : 'text-gray-600'}`}>Quantitative (zk-VaR)</span>
                            <AnimatePresence>
                                {step >= 4 && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        <Shield size={12} className="text-mint" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <motion.div
                            className={`flex items-center justify-between text-xs p-2 rounded bg-charcoal border transition-all duration-500 ${step >= 2 ? 'border-gray-700' : 'border-transparent'}`}
                            animate={{
                                backgroundColor: step === 2 || step === 3 ? ['rgba(16, 24, 32, 1)', 'rgba(12, 212, 160, 0.05)', 'rgba(16, 24, 32, 1)'] : 'rgba(16, 24, 32, 1)'
                            }}
                            transition={{ duration: 1.5, repeat: step >= 2 && step < 4 ? Infinity : 0, delay: 0.3 }}
                        >
                            <span className={`transition-colors duration-500 ${step >= 2 ? 'text-white' : 'text-gray-600'}`}>Qualitative (Chainlink ACE)</span>
                            <AnimatePresence>
                                {step >= 4 && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                    >
                                        <FileCheck size={12} className="text-mint" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="hidden md:flex col-span-1 justify-center">
                    <motion.div
                        animate={{ opacity: step >= 4 ? [0.3, 1, 0.3] : 0.3 }}
                        transition={{ duration: 1, repeat: step >= 4 && step < 5 ? Infinity : 0 }}
                    >
                        <ArrowRight size={16} className="text-gray-600" />
                    </motion.div>
                </div>

                <motion.div
                    className={`col-span-3 md:col-span-1 border rounded p-4 flex flex-col items-center justify-center transition-all duration-700 ${step >= 4 ? 'border-mint bg-mint text-charcoal' : 'border-gray-700 bg-charcoal text-gray-600'}`}
                    animate={{
                        scale: step === 4 ? [1, 1.15, 1.1] : step >= 4 ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-[10px] uppercase tracking-wider mb-1 font-bold">GATE</div>
                    <motion.div
                        className="font-bold text-sm"
                        animate={{ scale: step === 4 ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {step >= 4 ? 'OPEN' : 'LOCKED'}
                    </motion.div>
                </motion.div>

            </div>

            <div className="mt-8 bg-charcoal border border-gray-700 rounded p-4 font-mono text-xs text-gray-500 h-56 overflow-hidden relative">
                <div className="space-y-1">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 0 ? 1 : 0, x: step >= 0 ? 0 : -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-white"
                    >
                        &gt; Market Data: VIX spike detected (Regime: High_Vol)
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-white"
                    >
                        &gt; Policy Rule: Reduce equity exposure from 60% to 40% per user configuration
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-white"
                    >
                        &gt; <span className="text-mint">INIT_ATOMIC_GATE (Dual-Proof)</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-white pl-4"
                    >
                        |-- Generating zk-SNARK (Risk &lt; 3% VaR)... <span className="text-mint">VALID</span>
                    </motion.div>

                    {step >= 3 && zkHash && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-500 pl-8 text-[10px] truncate"
                        >
                            proof_hash: {zkHash}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white pl-4"
                    >
                        |-- Querying Chainlink ACE (KYC/Sanctions)... <span className="text-mint">PASS</span>
                    </motion.div>

                    {step >= 3 && aceHash && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-500 pl-8 text-[10px] truncate"
                        >
                            attestation_id: {aceHash}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 4 ? 1 : 0, x: step >= 4 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-mint"
                    >
                        &gt; Atomic Gate Verified. Broker Order Signed.
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: step >= 5 ? 1 : 0, x: step >= 5 ? 0 : -10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-white"
                    >
                        &gt; Executing via IBKR API... Confirmed.
                    </motion.div>

                    {step >= 5 && txHash && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-500 pl-4 text-[10px] truncate"
                        >
                            tx_id: {txHash}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center">
                <button className="text-mint text-sm font-medium border-b border-mint hover:opacity-80 transition-opacity">
                    Read Chainlink ACE Integration Docs
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProofEngine;
