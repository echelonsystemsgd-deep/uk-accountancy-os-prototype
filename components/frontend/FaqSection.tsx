"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function FaqSection() {
  const { setIsIntakeOpen } = useDemoStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How difficult is it to switch from my current UK accountant?",
      a: "The transfer process is completely frictionless. Under ICAEW professional conduct rules, we handle professional clearance directly with your previous accountant, transfer your Xero/QuickBooks records, and notify HMRC and Companies House with zero disruption to your day-to-day operations.",
    },
    {
      q: "When should we begin Corporation Tax planning before year-end?",
      a: "Effective tax planning should be conducted at least 60 to 90 days before your accounting reference date. This allows us to legitimately structure capital expenditure write-offs, pension contributions, and director dividend allocations before the statutory books close.",
    },
    {
      q: "How does the Client Portal Dropzone solve missing receipts?",
      a: "Our mobile-first dropzone lets directors photograph invoices or forward digital receipts instantly. Our AI engine extracts the merchant, date, VAT rate, and tax deductibility automatically, syncing directly with your Partner Dashboard so month-end closes take hours rather than weeks.",
    },
    {
      q: "Are your monthly retainer fees fixed?",
      a: "Yes. All our retainers are transparent fixed monthly arrangements with no hidden fees for emails or telephone advice. Your retainer includes year-end statutory accounts, CT600 Corporation Tax filing, quarterly VAT returns, confirmation statements, and ongoing tax planning.",
    },
    {
      q: "Are you qualified to submit R&D Tax Relief under the new HMRC merged scheme?",
      a: "Absolutely. Our chartered tax team specializes in the new merged R&D Expenditure Credit (RDEC) scheme and the SME intensive scheme. We prepare full technical narratives and electronic claim notifications in strict compliance with current HMRC regulations.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0F17] border-b border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
            Direct Answers
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Key insights on switching, statutory compliance, and strategic tax advisory.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#070A0F] border border-[#D4AF37]/25 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left touch-target-48 active:scale-[0.99] transition-transform"
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 mb-4">
            Have a specific scenario regarding director loans, IR35, or capital restructuring?
          </p>
          <button
            onClick={() => setIsIntakeOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] border border-[#D4AF37]/40 text-gold-300 hover:text-white hover:border-[#D4AF37] text-xs font-semibold transition-all touch-target-48 active:scale-95"
          >
            <span>Discuss with a Chartered Senior Partner</span>
          </button>
        </div>
      </div>
    </section>
  );
}
