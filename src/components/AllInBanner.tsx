import React from 'react';
import { ArrowUpRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AllInBanner: React.FC = () => {
  return (
    <section
      aria-labelledby="all-in-title"
      className="relative overflow-hidden border-b border-mint/20 bg-[#071714] pt-28 pb-12 md:pt-32 md:pb-16"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(12,212,160,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,212,160,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-mint/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-mint"
            >
              <Sparkles size={14} aria-hidden="true" />
              We are going ALL IN
            </motion.div>

            <motion.h2
              id="all-in-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] text-white md:text-6xl"
            >
              Meet ReFi.Trading at <span className="text-mint">ALL IN 2026.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Join us at the Palais des Congrès in Montréal on September 16–17 for non-custodial AI trading in action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <EventDetail
                label="Pitch Competition by Osler"
                date="Wednesday, September 16 · 9:00 AM"
                detail="One of 10 selected startups"
              />
              <EventDetail
                label="Startup Zone · Booth C1"
                date="Thursday, September 17 · 12:30–5:30 PM"
                detail="Among Canada's Top 100 AI Startups"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <Link
                to="/demo"
                className="group inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 font-semibold text-charcoal transition-colors hover:bg-mint-light"
              >
                Set a time to meet
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <span className="text-sm text-gray-400">#ALLIN2026 · Montréal</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EventDetail: React.FC<{ label: string; date: string; detail: string }> = ({ label, date, detail }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-mint/30 hover:bg-white/[0.06]">
    <div className="flex items-start gap-3">
      <CalendarDays size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm text-gray-300">{date}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-mint/80">{detail}</p>
      </div>
    </div>
  </div>
);

export default AllInBanner;
