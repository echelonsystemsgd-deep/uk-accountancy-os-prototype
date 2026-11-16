"use client";

import React, { useState } from "react";
import AdminConsoleLayout from "@/components/shared/AdminConsoleLayout";
import { useDemo } from "@/lib/store";
import { Settings, ShieldAlert, Trash2, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const { triggerToast } = useDemo();

  const [retentionYears, setRetentionYears] = useState("6");
  const [purgeInactiveDays, setPurgeInactiveDays] = useState("90");
  const [autoNudgeActive, setAutoNudgeActive] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast(
      "Settings Saved",
      "UK GDPR data retention and 90-day unverified purge schedule updated.",
      "success"
    );
  };

  const handleTestNudge = () => {
    triggerToast(
      "Test Nudges Dispatched",
      "Simulated Day 7, 30, 60, and 85 nudge sequence dispatched to test sandbox.",
      "info"
    );
  };

  return (
    <AdminConsoleLayout
      pageTitle="Practice Configuration &amp; UK GDPR Policies"
      pageSubtitle="Statutory accounting retention rules, inactive user purge scheduler, and Resend/Twilio gateway settings"
    >
      <div className="max-w-3xl space-y-8 font-mono text-xs">
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-[#14241d] border border-[#1e382b] space-y-6">
          <span className="text-xs uppercase tracking-wider text-[#a4f4cf] font-bold block font-sans">
            Statutory Data Retention &amp; Inactivity Policy
          </span>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">
                Statutory Accounting Record Retention Period
              </label>
              <select
                value={retentionYears}
                onChange={(e) => setRetentionYears(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              >
                <option value="6">6 Years (HMRC Companies Act &amp; ICAEW Standard)</option>
                <option value="7">7 Years (Conservative Audit Archive)</option>
              </select>
              <span className="text-[10px] text-[#8a9d94] block mt-1">
                Records older than this period generate a statutory purge certificate.
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-sans font-medium mb-1">
                Unverified Inactive User Purge Threshold
              </label>
              <select
                value={purgeInactiveDays}
                onChange={(e) => setPurgeInactiveDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] text-white focus:outline-none focus:border-[#a4f4cf] text-xs"
              >
                <option value="90">90 Days (With 4 automated progressive nudges)</option>
                <option value="60">60 Days (Strict Data Minimization)</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1813] border border-[#1e382b] space-y-2 font-sans">
              <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                <input
                  type="checkbox"
                  checked={autoNudgeActive}
                  onChange={(e) => setAutoNudgeActive(e.target.checked)}
                  className="rounded border-[#1e382b] bg-[#14241d] text-[#a4f4cf]"
                />
                <span className="font-bold text-xs">
                  Automated Progressive Nudge Pipeline Active
                </span>
              </label>
              <p className="text-[11px] text-[#8a9d94] pl-6 font-mono">
                Dispatches automated friendly notices at Day 7, Day 30, Day 60, and Day 85 via Resend Email and WhatsApp before final Day 90 GDPR deletion.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#a4f4cf] text-[#0c1813] font-bold font-sans text-xs flex items-center gap-2 hover:bg-[#8ae8bd] transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Practice Policies</span>
            </button>
            <button
              type="button"
              onClick={handleTestNudge}
              className="px-4 py-2.5 rounded-lg bg-[#0c1813] border border-[#1e382b] hover:border-[#a4f4cf] text-slate-200 font-sans text-xs"
            >
              Test Nudge Sequence
            </button>
          </div>
        </form>
      </div>
    </AdminConsoleLayout>
  );
}
