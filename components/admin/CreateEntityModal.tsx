"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { EntityType } from "@/lib/types";
import {
  X,
  Building2,
  Home,
  FileText,
  Plus,
  CheckCircle2,
  Scale,
  PoundSterling,
} from "lucide-react";

export default function CreateEntityModal() {
  const {
    clients,
    activeClient,
    isCreateEntityModalOpen,
    closeCreateEntityModal,
    addNewClient,
    addNewProperty,
    createPracticeInvoice,
  } = useDemoStore();

  const [activeTab, setActiveTab] = useState<"client" | "property" | "invoice">("client");

  // Form states: New Client
  const [clientName, setClientName] = useState("");
  const [entityType, setEntityType] = useState<EntityType>("spv_ltd");
  const [companyNumber, setCompanyNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [annualRent, setAnnualRent] = useState(48000);
  const [assignedAccountant, setAssignedAccountant] = useState<"Kalpesh Patel FCA" | "Pritpal Chaggar CTA">("Kalpesh Patel FCA");

  // Form states: New Property
  const [targetClientId, setTargetClientId] = useState(activeClient.id);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [propertyType, setPropertyType] = useState<"Residential BTL" | "HMO" | "Commercial" | "Multi-unit">("Residential BTL");
  const [ownershipSplit, setOwnershipSplit] = useState("100% SPV Ltd");
  const [propRent, setPropRent] = useState(24000);
  const [mortgageLender, setMortgageLender] = useState("Barclays Commercial");
  const [outstandingMortgage, setOutstandingMortgage] = useState(195000);

  // Form states: New Invoice
  const [invoiceClientId, setInvoiceClientId] = useState(activeClient.id);
  const [serviceDescription, setServiceDescription] = useState("Year-End Statutory Accounts & CT600 Corporation Tax Filing");
  const [netFee, setNetFee] = useState(1850);
  const [dueDate, setDueDate] = useState("2026-11-15");

  if (!isCreateEntityModalOpen) return null;

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !contactName || !email) return;

    addNewClient({
      entityName: clientName,
      entityType,
      companyNumber: entityType === "spv_ltd" ? (companyNumber || "15289104") : undefined,
      primaryContact: contactName,
      email,
      phone: phone || "+44 7700 900552",
      annualRent,
      assignedAccountant,
    });
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyAddress || !postcode) return;

    addNewProperty(targetClientId, {
      address: propertyAddress,
      postcode,
      propertyType,
      ownershipSplit,
      annualRentalIncome: propRent,
      mortgageLender,
      outstandingMortgage,
    });
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    createPracticeInvoice({
      clientId: invoiceClientId,
      serviceDescription,
      netAmount: netFee,
      dueDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="accountant-card max-w-xl w-full p-6 bg-white space-y-5 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-neutral-900 leading-tight">
              Practice Creation Wizard
            </h2>
            <p className="text-xs text-neutral-500">
              Add new landlord clients, register portfolio assets, or issue VAT fee notes.
            </p>
          </div>
          <button
            type="button"
            onClick={closeCreateEntityModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Sub-tabs */}
        <div className="flex space-x-2 border-b border-neutral-200 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("client")}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition ${
              activeTab === "client" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1. New Client Entity</span>
          </button>
          <button
            onClick={() => setActiveTab("property")}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition ${
              activeTab === "property" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>2. Add Property Asset</span>
          </button>
          <button
            onClick={() => setActiveTab("invoice")}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition ${
              activeTab === "invoice" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Issue Fee Note</span>
          </button>
        </div>

        {/* TAB 1: NEW CLIENT */}
        {activeTab === "client" && (
          <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Entity / Portfolio Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Highland Property Holdings Ltd"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Structure Type *</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as EntityType)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white"
                >
                  <option value="spv_ltd">SPV Limited Company</option>
                  <option value="joint">Joint Landlords (Spouses / Partners)</option>
                  <option value="individual">Individual Buy-to-Let Landlord</option>
                </select>
              </div>

              {entityType === "spv_ltd" && (
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Companies House Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 15289104"
                    value={companyNumber}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Primary Director / Owner *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alistair Macleod"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Direct Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alistair@highlandproperties.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Mobile (for WhatsApp Chaser)</label>
                <input
                  type="tel"
                  placeholder="+44 7700 900552"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Annual Rental Turnover (£)</label>
                <input
                  type="number"
                  step={5000}
                  value={annualRent}
                  onChange={(e) => setAnnualRent(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Assigned Senior Partner</label>
                <select
                  value={assignedAccountant}
                  onChange={(e) => setAssignedAccountant(e.target.value as "Kalpesh Patel FCA" | "Pritpal Chaggar CTA")}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white"
                >
                  <option value="Kalpesh Patel FCA">Kalpesh Patel FCA</option>
                  <option value="Pritpal Chaggar CTA">Pritpal Chaggar CTA</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-white rounded-md font-semibold hover:bg-neutral-800 transition"
            >
              Create Client & Generate Compliance Checklist →
            </button>
          </form>
        )}

        {/* TAB 2: ADD PROPERTY */}
        {activeTab === "property" && (
          <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Select Target Client Portfolio *</label>
              <select
                value={targetClientId}
                onChange={(e) => setTargetClientId(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white font-semibold"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.entityName} ({c.properties.length} existing properties)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Property Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 58 Montpellier Terrace, Cheltenham"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">UK Postcode *</label>
                <input
                  type="text"
                  required
                  placeholder="GL50 1UX"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono uppercase"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Asset Category</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as "Residential BTL" | "HMO" | "Commercial" | "Multi-unit")}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white"
                >
                  <option value="Residential BTL">Residential Buy-to-Let</option>
                  <option value="HMO">House in Multiple Occupation (HMO)</option>
                  <option value="Commercial">Commercial / Retail Unit</option>
                  <option value="Multi-unit">Multi-Unit Freehold Block</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Gross Annual Rent (£)</label>
                <input
                  type="number"
                  step={1000}
                  value={propRent}
                  onChange={(e) => setPropRent(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Mortgage Lender</label>
                <input
                  type="text"
                  placeholder="e.g. NatWest Commercial"
                  value={mortgageLender}
                  onChange={(e) => setMortgageLender(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Outstanding Debt (£)</label>
                <input
                  type="number"
                  step={5000}
                  value={outstandingMortgage}
                  onChange={(e) => setOutstandingMortgage(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-800 text-white rounded-md font-semibold hover:bg-emerald-700 transition"
            >
              Add Property & Update Schedule →
            </button>
          </form>
        )}

        {/* TAB 3: ISSUE FEE NOTE */}
        {activeTab === "invoice" && (
          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Bill To Client Entity *</label>
              <select
                value={invoiceClientId}
                onChange={(e) => setInvoiceClientId(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white font-semibold"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.entityName} (Unbilled WIP: £{c.unbilledWip.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Service Description *</label>
              <select
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none bg-white"
              >
                <option value="Section 24 Portfolio Restructuring & 2024/25 Self Assessment Computations">Section 24 Restructuring & Self Assessment (£1,850)</option>
                <option value="Statutory Financial Statements (FRS 105), CT600 Corporation Tax & Confirmation Statement">Statutory Accounts (FRS 105) & CT600 (£2,400)</option>
                <option value="SPV Limited Company Formation, Articles & HMRC Registration Package">SPV Company Formation & HMRC Registration (£950)</option>
                <option value="Making Tax Digital (MTD) for ITSA Quarterly Bookkeeping & Digital Bridging">MTD for ITSA Quarterly Compliance Retainer (£1,200)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Net Professional Fee (£) *</label>
                <input
                  type="number"
                  step={50}
                  value={netFee}
                  onChange={(e) => setNetFee(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Payment Due Date *</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* VAT calculation card */}
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-xs font-mono space-y-1">
              <div className="flex justify-between text-neutral-600 font-sans">
                <span>Net Advisory Amount:</span>
                <span>£{netFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600 font-sans">
                <span>UK Standard VAT (20%):</span>
                <span>£{Math.round(netFee * 0.2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 border-t border-neutral-200 pt-1 text-sm">
                <span className="font-sans">Total Due (GBP):</span>
                <span>£{Math.round(netFee * 1.2).toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-white rounded-md font-semibold hover:bg-neutral-800 transition"
            >
              Issue VAT Fee Note & Record in Ledger →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
