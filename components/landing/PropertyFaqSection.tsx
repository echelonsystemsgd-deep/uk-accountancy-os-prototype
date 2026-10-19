"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function PropertyFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Section 24 restrict mortgage interest relief for higher-rate landlords?",
      a: "Under Section 24 of the Finance (No. 2) Act 2015, individual landlords can no longer deduct mortgage interest from gross rental turnover to determine taxable profit. Instead, you are taxed on gross rent minus non-finance costs, receiving only a 20% basic rate tax reduction on finance costs. For higher-rate (40%) and additional-rate (45%) taxpayers, this significantly inflates taxable income and can even push basic-rate landlords into higher tax brackets.",
    },
    {
      q: "Should I buy buy-to-let properties personally or through an SPV Limited Company?",
      a: "Special Purpose Vehicle (SPV) limited companies allow 100% of mortgage interest to be deducted as legitimate business expenses prior to Corporation Tax (19% on profits under £50,000, up to 25% for larger profits). However, limited companies entail higher mortgage arrangement fees, commercial interest rates, and Corporation Tax compliance filings. We model your exact 5-year portfolio trajectory to calculate whether the net post-tax yield favors an SPV.",
    },
    {
      q: "Can I transfer existing buy-to-let properties into an SPV without triggering Stamp Duty and CGT?",
      a: "Transferring properties from personal ownership into a company is treated as a disposal at market value by HMRC, which can trigger both Capital Gains Tax (CGT) and Stamp Duty Land Tax (SDLT). However, for substantial property portfolios operated as an active property business, Section 162 Incorporation Relief and Partnership provisions (Schedule 15 SDLT) may allow CGT to be deferred and SDLT minimized. A full bespoke clearance from a Chartered Tax Adviser is essential before executing.",
    },
    {
      q: "What documents must I provide for my annual landlord tax computation?",
      a: "We require: (1) Annual mortgage interest certificates from each lender covering 6 April to 5 April, (2) Letting agent annual financial summaries or monthly statements, (3) Tenancy agreements (ASTs) for any newly tenanted properties, (4) Invoices for major repairs, gas safety inspections, and insurance, and (5) Your P60 employment slip to verify your personal income tax bracket.",
    },
    {
      q: "When must I report and pay Capital Gains Tax after selling a UK residential property?",
      a: "Since April 2020, any UK resident selling a residential property with a taxable capital gain must file a dedicated UK Property Return and pay the estimated Capital Gains Tax to HMRC within 60 days of legal completion. Failing to file within 60 days incurs automatic late-filing penalties and statutory interest.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Clear Answers for Property Investors
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Frequently Asked Property Tax Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Clear, authoritative guidance on Section 24, corporate incorporations, and statutory UK filing obligations.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed pr-6">
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
