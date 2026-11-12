"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PropertyFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Section 24 restrict mortgage interest relief for personal landlords?",
      a: "Under Section 24 of the Finance (No. 2) Act 2015, individual landlords can no longer deduct mortgage interest from gross rental turnover to determine taxable profit. Instead, you are taxed on gross rent minus non-finance costs, receiving only a 20% basic rate tax reduction on finance costs. For higher-rate (40%) and additional-rate (45%) taxpayers, this can push effective tax rates over 60%–80%.",
    },
    {
      q: "Why is an SPV Limited Company superior for mortgage interest deductions?",
      a: "An SPV (Special Purpose Vehicle) limited company is governed by UK Corporation Tax rules. Unlike personal ownership, 100% of mortgage interest is legally classified as an allowable business finance expense. Corporation Tax is charged only on net operating profits at 19% (for profits up to £50,000) or up to 25% with marginal relief.",
    },
    {
      q: "How does the Director’s Loan Account (DLA) allow tax-free profit withdrawal?",
      a: "When you fund the property purchase deposit, SDLT, and legal fees from your personal savings, the SPV owes you that capital. The company can repay your loan tax-free: attracting 0% Income Tax and 0% National Insurance until the injected capital is fully recovered.",
    },
    {
      q: "What is the Section 455 tax penalty and how does the platform protect me?",
      a: "If a director withdraws more money than they have injected, the DLA becomes overdrawn. If not repaid within 9 months and 1 day after the accounting year-end, HMRC levies a 33.75% Section 455 tax penalty. Mercian Wealth Tax & Ledger monitors your live DLA balance and prevents overdrawing.",
    },
    {
      q: "Can I generate a clean pack to send to my existing accountant?",
      a: "Yes. Our single-click 'CT600 Tax Pack' produces an official PDF executive summary containing your P&L, Balance Sheet, and Capital Asset register, accompanied by pre-formatted CSV schedules ready for CT600 tax software like Taxcalc, Xero, or Iris.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-[#0B0F19] border-b border-[#1F293D] text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
            STATUTORY GUIDANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Property Tax Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear, authoritative guidance on Section 24, corporate SPV structuring, and director loan tax shields.
          </p>
        </div>

        <div className="divide-y divide-[#1F293D] border-y border-[#1F293D]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-sky-400 transition touch-target-44"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
