"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function FaqSection() {
  const { setIsIntakeOpen } = useDemoStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the process for transferring from our current accountant?",
      a: "The handover process is managed directly by our team. Under ICAEW professional conduct guidelines, we request professional clearance, retrieve historical working papers, and transfer your accounting software access with zero operational downtime.",
    },
    {
      q: "When should Corporation Tax planning commence before year end?",
      a: "Strategic planning is most effective 60 to 90 days before your accounting reference date. This window allows for legitimate optimization of capital asset expensing, pension contributions, and director dividend allocations before accounts are finalized.",
    },
    {
      q: "How does the digital document dropzone function for directors?",
      a: "Directors can upload invoices from desktop or capture receipts on mobile. The system extracts the merchant name, date, and 20% VAT split automatically, flagging tax-deductible items for statutory CT600 preparation.",
    },
    {
      q: "Are practice retainers fixed on a monthly basis?",
      a: "Yes. Retainers are agreed in advance with a transparent monthly fee covering annual statutory accounts, CT600 filing, quarterly VAT submissions, confirmation statements, and ongoing tax advisory.",
    },
    {
      q: "Are you qualified to submit R&D relief under current HMRC guidelines?",
      a: "Yes. Our team prepares claims under the merged R&D Expenditure Credit (RDEC) scheme and SME intensive rules, drafting technical documentation in full compliance with HMRC standards.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07080C] border-b border-white/[0.08]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#94A3B8] text-sm mt-2">
            Details regarding transfer, compliance standards, and retainer structure.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0D0F17] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors"
                >
                  <span className="text-sm font-medium text-[#EDEDED] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#EDEDED]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs text-[#94A3B8] leading-relaxed border-t border-white/[0.04]">
                    <div className="pt-3">{faq.a}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsIntakeOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0E111A] hover:bg-[#131622] border border-white/[0.1] text-xs font-medium text-[#EDEDED] transition-colors"
          >
            <span>Have a specific inquiry? Speak with a Partner</span>
          </button>
        </div>
      </div>
    </section>
  );
}
