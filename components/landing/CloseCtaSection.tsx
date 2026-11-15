"use client";

import React from "react";
import { ArrowRight, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useDemo } from "@/lib/store";

export default function CloseCtaSection() {
  const { openIntakeModal } = useDemo();

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0c1813] border-b border-[#1e382b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#14241d] border border-[#1e382b] relative overflow-hidden shadow-2xl space-y-8">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#a4f4cf]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1813] border border-[#1e382b] text-[11px] font-mono font-semibold text-[#a4f4cf] uppercase tracking-wider">
              <span>Next Steps</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              Move accounts faster. Eliminate tax surprises.
            </h2>
            <p className="text-sm sm:text-base text-[#8a9d94] leading-relaxed max-w-2xl">
              Let’s review your property portfolio structure, calculate your exact Section 24 Corporation Tax savings, and prepare your SPV accounts for HMRC MTD compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
            <button
              onClick={() => openIntakeModal()}
              className="px-7 py-4 rounded-xl bg-[#a4f4cf] hover:bg-[#8ae8bd] text-[#0c1813] font-display font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#a4f4cf]/20 hover:scale-[1.01]"
            >
              <span>Scope Your Property SPV</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/447851055929?text=Hello%20KP%20Tax%20Consultants,%20I%20would%20like%20to%20discuss%20my%20UK%20Property%20SPV%20portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-[#0c1813] hover:bg-[#1e382b]/60 border border-[#1e382b] hover:border-[#a4f4cf]/40 text-slate-100 font-display font-semibold text-sm tracking-tight flex items-center justify-center gap-2.5 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#a4f4cf]" />
              <span>WhatsApp Direct (+44 7851 055929)</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#1e382b]/80 flex flex-wrap items-center gap-6 text-xs text-[#8a9d94] font-mono relative z-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#a4f4cf]" />
              <span>ICAEW &amp; CIOT Chartered Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#a4f4cf]" />
              <span>Free Initial Section 24 Exposure Review</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#a4f4cf]" />
              <span>London &amp; Berkshire Offices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
