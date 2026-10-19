"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Award, Building2, UserCheck, ArrowRight } from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function AboutPracticeSection() {
  const { openIntakeModal } = useDemoStore();

  return (
    <section id="about-firm" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image & Trust Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-lg relative bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                alt="Chartered Tax Advisory and Statutory Accounting Practice Review"
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-neutral-200 text-xs">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Regulated UK Accountancy Practice</span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  Institute of Chartered Accountants in England & Wales (ICAEW)
                </p>
              </div>
            </div>
          </div>

          {/* Practice Story & Partner Leadership (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Leadership & Credentials
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Senior Chartered Expertise Behind Every Property Computation
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Founded to provide landlords and limited companies with the rigorous tax architecture usually reserved for institutional private banking clients. We bridge the gap between compliance filing and strategic tax mitigation.
              </p>
            </div>

            {/* Two Partner Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="accountant-card p-4 space-y-2 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-neutral-900">Pritpal Chaggar</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800">
                    BSc(Hons), ATT, CTA
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 block">
                  Chartered Tax Adviser
                </span>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Specializes in complex property restructuring, Section 162 incorporation relief, SDLT planning, and resolving contentious HMRC compliance inquiries.
                </p>
              </div>

              <div className="accountant-card p-4 space-y-2 border-l-4 border-l-emerald-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-neutral-900">Kalpesh Patel</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800">
                    BSc(Hons), FCA
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 block">
                  Fellow Chartered Accountant
                </span>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Leads practice compliance, year-end statutory accounts, SPV Corporation Tax filings, and landlord Self Assessment computational architecture.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => openIntakeModal({ notes: "Requesting strategic meeting with firm partners" })}
                className="touch-target-44 px-4 py-2.5 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-1.5"
              >
                <span>Book Meeting with Kalpesh or Pritpal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
