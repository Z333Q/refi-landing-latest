import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowUpRight, Trophy, Brain, Zap } from 'lucide-react';

const BeatTheMachineSection: React.FC = () => {
  return (
    <section
      id="game"
      aria-labelledby="game-title"
      className="section-spacing relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-[#08201b] to-charcoal" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-mint/25 bg-charcoal-deep/60 p-8 backdrop-blur-sm md:p-14">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-mint"
            >
              <Gamepad2 size={14} aria-hidden="true" />
              The Challenge
            </motion.div>

            <motion.h2
              id="game-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl font-bold leading-tight text-white md:text-5xl"
            >
              Think You Can <span className="text-mint">Beat the Machine?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Step into the market and trade head-to-head against our reinforcement-learning agent. Read the shifting regimes, time your moves, and see if your instincts can outperform the same AI that powers ReFi.Trading.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3"
            >
              <Feature icon={<Brain size={20} />} title="Face the AI" text="Trade against our live RL agent" />
              <Feature icon={<Zap size={20} />} title="Real-Time" text="React to live market regimes" />
              <Feature icon={<Trophy size={20} />} title="Climb the Board" text="Beat your best score" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <a
                href="https://game.refi.trading"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-mint px-7 py-3.5 text-lg font-semibold text-charcoal transition-colors hover:bg-mint-light"
              >
                <Gamepad2 size={20} aria-hidden="true" />
                Play at game.refi.trading
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <span className="text-sm text-gray-400">Free to play · No sign-up required</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center transition-colors hover:border-mint/30">
    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-mint/10 text-mint">
      {icon}
    </div>
    <p className="font-semibold text-white">{title}</p>
    <p className="mt-1 text-sm text-gray-400">{text}</p>
  </div>
);

export default BeatTheMachineSection;
