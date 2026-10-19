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

            {/* Two Partner Cards with Verified Real Photos & Official Bios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Partner 1: Pritpal Chaggar */}
              <div className="accountant-card p-5 space-y-3.5 border-t-4 border-t-primary hover:shadow-md transition">
                <div className="flex items-center space-x-3.5">
                  <img
                    src="/team/pritpal-chaggar.png"
                    alt="Pritpal Chaggar - Chartered Tax Advisor"
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 leading-tight">Pritpal Chaggar</h3>
                    <span className="text-[11px] font-bold text-primary block mt-0.5">
                      BSc(Hons), ATT, CTA
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chartered Tax Advisor</span>
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Pritpal is a qualified Chartered Tax Advisor with a broad range of experience on all tax related matters. His technical knowledge and commercial awareness allows him to support clients in ensuring that they do not pay more tax than is legally required.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-100">
                  <span className="font-medium text-neutral-700">Specialism:</span>
                  <span>Property Tax & CTA Advisory</span>
                </div>
              </div>

              {/* Partner 2: Kalpesh Patel */}
              <div className="accountant-card p-5 space-y-3.5 border-t-4 border-t-emerald-700 hover:shadow-md transition">
                <div className="flex items-center space-x-3.5">
                  <img
                    src="/team/kalpesh-patel.png"
                    alt="Kalpesh Patel - Chartered Accountant"
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 leading-tight">Kalpesh Patel</h3>
                    <span className="text-[11px] font-bold text-emerald-800 block mt-0.5">
                      BSc(Hons), FCA
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fellow Chartered Accountant</span>
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Kalpesh is a qualified Chartered Accountant and specialises in providing accounting compliance and tax consultancy services to individuals, partnerships and owner managed business.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-100">
                  <span className="font-medium text-neutral-700">Specialism:</span>
                  <span>Statutory Accounts & FCA Compliance</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => openIntakeModal({ notes: "Requesting strategic meeting with firm partners Pritpal Chaggar or Kalpesh Patel" })}
                className="touch-target-44 btn-tactile px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-2 shadow-sm"
              >
                <span>Book Direct Meeting with Pritpal or Kalpesh</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
