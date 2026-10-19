"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import {
  Send,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle2,
  Clock,
  History,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";

export default function ChaserView() {
  const {
    activeClient,
    clients,
    setSelectedClientId,
    sendChaser,
    communicationLogs,
    activeChaserDocumentId,
    setActiveChaserDocumentId,
    setCurrentView,
  } = useDemoStore();

  const [channel, setChannel] = useState<"whatsapp" | "sms" | "email">("whatsapp");
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  // Determine which document is being chased
  const pendingDocs = activeClient.documents.filter((d) => d.status === "pending");
  const selectedDoc =
    activeClient.documents.find((d) => d.id === activeChaserDocumentId) || pendingDocs[0];

  const defaultTemplates = {
    whatsapp: `Hi ${activeClient.primaryContact.split(" ")[0]}, Kalpesh here from Kai Accountants. We are finalizing your ${activeClient.taxYear} property tax return to apply your Section 24 mortgage relief. We just need your ${selectedDoc?.title || "missing certificate"} for ${selectedDoc?.ownerOrProperty || "your portfolio"}. You can snap a photo directly using your secure upload link: https://kptc-portal.uk/d/ms-7281. Thank you!`,
    sms: `Kai Accountants: Hi ${activeClient.primaryContact.split(" ")[0]}, we need your ${selectedDoc?.title || "mortgage certificate"} to finalize your property tax computation. Please upload photo: https://kptc-portal.uk/d/ms-7281`,
    email: `Dear ${activeClient.primaryContact},\n\nWe are currently preparing the statutory accounts and ${activeClient.taxYear} tax computation for ${activeClient.entityName}.\n\nTo ensure all eligible mortgage interest deductions and finance costs are claimed against your rental profit under Section 24 rules, we require the following outstanding document:\n\n• ${selectedDoc?.title || "Mortgage Certificate"} (${selectedDoc?.ownerOrProperty})\n\nPlease upload a digital copy or phone photo via your encrypted client dropzone:\nhttps://kptc-portal.uk/d/ms-7281\n\nKind regards,\n${activeClient.assignedAccountant}\nKai Accountants / KP Tax Consultants`,
  };

  const [messageText, setMessageText] = useState(defaultTemplates[channel]);

  // When channel or document changes, update template
  const handleChannelChange = (newChannel: "whatsapp" | "sms" | "email") => {
    setChannel(newChannel);
    setMessageText(defaultTemplates[newChannel]);
  };

  const handleDocumentChange = (docId: string) => {
    setActiveChaserDocumentId(docId);
    const newDoc = activeClient.documents.find((d) => d.id === docId);
    const updated = {
      ...defaultTemplates,
      whatsapp: `Hi ${activeClient.primaryContact.split(" ")[0]}, Kalpesh here from Kai Accountants. We are finalizing your ${activeClient.taxYear} property tax return to apply your Section 24 mortgage relief. We just need your ${newDoc?.title || "missing certificate"} for ${newDoc?.ownerOrProperty || "your portfolio"}. You can snap a photo directly using your secure upload link: https://kptc-portal.uk/d/ms-7281. Thank you!`,
    };
    setMessageText(updated[channel]);
  };

  const handleSend = () => {
    setIsDispatching(true);
    setTimeout(() => {
      sendChaser(activeClient.id, channel, messageText);
      setIsDispatching(false);
    }, 450);
  };


  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Screen 5: Multi-Channel Chaser & Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Dispatch contextual document requests via WhatsApp, SMS, or Email with pre-filled Section 24 tax relief messaging.
          </p>
        </div>

        {/* Client selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-neutral-500 font-medium">Active Recipient:</span>
          <select
            value={activeClient.id}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="border border-neutral-200 rounded px-2.5 py-1 text-xs bg-white text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.entityName} ({c.documents.filter((d) => d.status === "pending").length} missing)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chaser Dispatcher (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="accountant-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">
                  Compose Targeted Document Request
                </h2>
                <p className="text-xs text-neutral-500">
                  Recipient: <strong className="text-neutral-700">{activeClient.primaryContact}</strong> ({channel === "email" ? activeClient.email : activeClient.phone})
                </p>
              </div>

              <span className="text-xs text-neutral-500">
                Assigned: <strong>{activeClient.assignedAccountant}</strong>
              </span>
            </div>

            {/* Target Document Selector */}
            {pendingDocs.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 block">
                  Select Missing Item to Request:
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {pendingDocs.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => handleDocumentChange(doc.id)}
                      className={`text-left p-2.5 rounded border text-xs transition ${
                        (selectedDoc?.id === doc.id)
                          ? "border-primary bg-neutral-50 font-semibold text-neutral-900"
                          : "border-neutral-200 hover:border-neutral-300 text-neutral-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{doc.title}</span>
                        {doc.isOverdue && (
                          <span className="text-[10px] text-red-700 font-semibold bg-red-50 px-1.5 py-0.5 rounded">
                            Overdue
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-normal">
                        Target: {doc.ownerOrProperty}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Channel Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 block">
                Select Dispatch Channel:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "whatsapp",
                    label: "WhatsApp Business",
                    sub: "88% Response Rate",
                    icon: <MessageSquare className="w-4 h-4 text-emerald-700" />,
                    badge: "Fastest",
                  },
                  {
                    id: "sms",
                    label: "SMS Text",
                    sub: "Direct Mobile Link",
                    icon: <Smartphone className="w-4 h-4 text-slate-700" />,
                  },
                  {
                    id: "email",
                    label: "Practice Email",
                    sub: "Formal Letter Style",
                    icon: <Mail className="w-4 h-4 text-neutral-600" />,
                  },
                ].map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleChannelChange(ch.id as any)}
                    className={`p-3 rounded border text-left transition flex flex-col justify-between ${
                      channel === ch.id
                        ? "border-primary bg-neutral-50 ring-1 ring-primary"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      {ch.icon}
                      {ch.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1 rounded">
                          {ch.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-neutral-900 block leading-tight">
                        {ch.label}
                      </span>
                      <span className="text-[10px] text-neutral-500">{ch.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 block">
                Message Preview & Customization:
              </label>
              <textarea
                rows={5}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3 text-xs border border-neutral-200 rounded font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary text-neutral-900 bg-white"
              />
              <p className="text-[11px] text-neutral-500">
                Includes automated tokenized link leading straight to Marcus's Screen 4 Dropzone.
              </p>
            </div>

            {/* Send Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentView("dropzone")}
                className="text-xs text-neutral-600 hover:text-neutral-900 font-medium inline-flex items-center space-x-1"
              >
                <span>View What Client Sees (Dropzone)</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={isDispatching}
                className="touch-target-44 btn-tactile px-5 py-2 rounded text-xs font-semibold text-white bg-primary hover:bg-neutral-800 transition inline-flex items-center space-x-2 shadow-sm disabled:opacity-70"
              >
                <Send className={`w-4 h-4 transition-transform duration-300 ${isDispatching ? "translate-x-1 -translate-y-1 text-emerald-400" : ""}`} />
                <span>{isDispatching ? "Dispatching Tokenized Link..." : `Dispatch ${channel.toUpperCase()} Nudge Now`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Activity Trail & Compliance Log (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="accountant-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-neutral-700" />
                <h2 className="text-sm font-semibold text-neutral-900">
                  Practice Audit & Communication Trail
                </h2>
              </div>
              <span className="text-[11px] text-neutral-500 num-tabular">
                {communicationLogs.length} events logged
              </span>
            </div>

            <div className="space-y-3">
              {communicationLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-neutral-900">
                      {log.channel === "whatsapp" ? (
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                      ) : log.channel === "sms" ? (
                        <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-neutral-600" />
                      )}
                      <span className="uppercase text-[11px] tracking-wide text-neutral-800">
                        {log.channel} Sent
                      </span>
                    </div>

                    <span className="text-[10px] text-neutral-500">{log.sentAt}</span>
                  </div>

                  <p className="text-[11px] text-neutral-700 leading-relaxed line-clamp-3 bg-white p-2 rounded border border-neutral-100">
                    "{log.messageBody}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                    <span>To: <strong className="text-neutral-700">{log.recipient}</strong></span>
                    <span className="inline-flex items-center space-x-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{log.status === "read" ? "Delivered & Read" : "Delivered"}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-neutral-500 text-center pt-2">
              All communications time-stamped for ICAEW practice assurance and audit defenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
