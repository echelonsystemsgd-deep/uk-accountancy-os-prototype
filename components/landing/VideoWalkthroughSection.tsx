"use client";

import React, { useState } from "react";
import { Play, Pause, RotateCcw, Volume2, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function VideoWalkthroughSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: "01 Ingestion", time: "0:00", desc: "Open Banking mortgage feed & contractor OCR parsing" },
    { title: "02 S24 Tax Engine", time: "0:25", desc: "Automated 100% mortgage interest corporate deduction" },
    { title: "03 DLA Extraction", time: "0:45", desc: "0% Income Tax profit withdrawal ledger tracking" },
    { title: "04 HMRC CT600", time: "1:10", desc: "Instant vector A4 statutory tax pack generation" },
  ];

  return (
    <section id="demo" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241d] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
            <span>Product Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            Now see the platform in action.
          </h2>
          <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed">
            Watch how a commercial mortgage debit from Paragon Bank flows through the automated Section 24 engine, updates the Director’s Loan Account, and compiles an audit-proof CT600 tax pack.
          </p>
        </div>

        {/* Video Player Frame */}
        <div className="rounded-2xl border border-[#1e382b] bg-[#14241d] overflow-hidden shadow-2xl">
          {/* Simulated Screen Player Area */}
          <div className="relative aspect-video w-full bg-[#08100d] flex items-center justify-center overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0c1813] via-[#14241d]/80 to-[#1e382b]/30"></div>

            {/* Interactive Preview Canvas */}
            <div className="relative z-10 w-11/12 max-w-3xl p-6 sm:p-8 rounded-xl bg-[#0c1813]/90 border border-[#1e382b] backdrop-blur-md shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#1e382b] pb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-white font-bold">MERCIAN OS · AUTONOMOUS LEDGER RUNTIME</span>
                </div>
                <span className="text-[#a4f4cf]">CHAPTER: {chapters[activeChapter].title}</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded bg-[#14241d] border border-[#1e382b] flex justify-between items-center">
                  <span className="text-[#8a9d94]">Active Ledger:</span>
                  <span className="text-white font-bold">Belgrave Legacy Wealth Ltd (SPV #14892011)</span>
                </div>
                <div className="p-3 rounded bg-[#14241d] border border-[#1e382b] flex justify-between items-center">
                  <span className="text-[#8a9d94]">Current Operation:</span>
                  <span className="text-[#a4f4cf] font-bold">{chapters[activeChapter].desc}</span>
                </div>
              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2.5 rounded-full bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#a4f4cf]/20"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Demonstration</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Walkthrough</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Timestamp Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-[#0c1813]/90 border-t border-[#1e382b] flex items-center justify-between text-xs font-mono text-[#8a9d94] z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-[#a4f4cf] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>{chapters[activeChapter].time} / 1:35</span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`text-[11px] transition-colors ${
                      activeChapter === idx ? "text-[#a4f4cf] font-bold" : "hover:text-white"
                    }`}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#8a9d94]" />
                <span className="text-[10px] text-emerald-400">1080p HD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
