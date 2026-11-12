-- =========================================================================
-- MERCIAN WEALTH TAX & LEDGER SUITE: PRODUCTION DATABASE SCHEMA
-- Operating Entity: SUKHPREET KAUR LEGACY WEALTH LTD
-- Supported Framework: Supabase Postgres with Strict Row Level Security (RLS)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Roles
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM ('director', 'accountant', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS company_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role app_role DEFAULT 'director',
  company_name TEXT DEFAULT 'SUKHPREET KAUR LEGACY WEALTH LTD',
  company_number TEXT DEFAULT '15984210',
  vat_registered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Property Portfolio
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  address_line1 TEXT NOT NULL,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  purchase_date DATE NOT NULL,
  purchase_price NUMERIC(12,2) NOT NULL,
  stamp_duty_paid NUMERIC(10,2) DEFAULT 0,
  legal_fees NUMERIC(10,2) DEFAULT 0,
  current_valuation NUMERIC(12,2) NOT NULL,
  monthly_rent NUMERIC(10,2) NOT NULL,
  mortgage_lender TEXT,
  monthly_mortgage_payment NUMERIC(10,2) DEFAULT 0,
  monthly_mortgage_interest NUMERIC(10,2) DEFAULT 0,
  is_spv_held BOOLEAN DEFAULT TRUE,
  tenant_name TEXT,
  tenancy_start DATE,
  tenancy_end DATE,
  deposit_scheme_ref TEXT,
  is_arrears BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories & Expense Types
DO $$ BEGIN
  CREATE TYPE tax_classification AS ENUM (
    'revenue_deductible',
    'capital_allowance',
    'capital_enhancement',
    'non_tax_dla'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS ledger_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  classification tax_classification NOT NULL,
  ct600_box TEXT NOT NULL,
  description TEXT
);

INSERT INTO ledger_categories (id, name, classification, ct600_box, description) VALUES
('rent_income', 'Residential Rental Income', 'revenue_deductible', 'Box 145', 'Gross turnover from property lettings'),
('mortgage_interest', 'Mortgage Loan Interest (Section 24 SPV)', 'revenue_deductible', 'Box 155', '100% allowable corporate finance expense for SPVs'),
('property_repairs', 'Day-to-day Maintenance & Repairs', 'revenue_deductible', 'Box 155', 'Like-for-like repairs, gas/electrical safety, boiler servicing'),
('property_capital_improvement', 'Property Extension / Structural Improvement', 'capital_enhancement', 'Capital Asset', 'Capital additions increasing CGT base cost basis'),
('insurance', 'Landlord Buildings & Contents Insurance', 'revenue_deductible', 'Box 155', 'Annual buildings and landlord liability insurance'),
('letting_agent_fees', 'Letting & Management Fees', 'revenue_deductible', 'Box 155', 'Letting agency commission, inventory and tenant find fees'),
('legal_professional', 'Accountancy, Legal & Compliance Fees', 'revenue_deductible', 'Box 155', 'Statutory accounts prep, CT600 filing, legal advisory'),
('travel_mileage', 'Property Inspection Mileage (45p/mile)', 'revenue_deductible', 'Box 155', 'HMRC approved 45p/mile business vehicle expense'),
('dla_deposit', 'Director Capital Injected (Deposit / Legal)', 'non_tax_dla', 'Balance Sheet', 'Director equity loan injected into company'),
('dla_withdrawal', 'Director Capital Repaid to Personal Account', 'non_tax_dla', 'Balance Sheet', 'Tax-free repayment of Director Loan balance')
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  classification = EXCLUDED.classification,
  ct600_box = EXCLUDED.ct600_box;

-- 4. General Transactions & Bills
DO $$ BEGIN
  CREATE TYPE tx_type AS ENUM ('income', 'expense');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL, -- Positive = Income/Inflow, Negative = Outflow/Expense
  type tx_type NOT NULL,
  category_id TEXT REFERENCES ledger_categories(id),
  receipt_url TEXT,
  receipt_hash TEXT,
  ocr_extracted_data JSONB,
  is_allowable BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Director's Loan Account (DLA) Ledger
CREATE TABLE IF NOT EXISTS dla_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  credit NUMERIC(12,2) DEFAULT 0, -- Money Director Put In (Company owes Director)
  debit NUMERIC(12,2) DEFAULT 0,  -- Money Director Took Out (Repayment)
  reference_property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  source_type TEXT DEFAULT 'deposit', -- 'deposit', 'personal_card', 'mileage', 'cash_withdrawal'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HMRC Compliant Mileage Logs
CREATE TABLE IF NOT EXISTS mileage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  purpose TEXT NOT NULL,
  miles NUMERIC(8,2) NOT NULL,
  rate_per_mile NUMERIC(4,2) DEFAULT 0.45,
  total_claim NUMERIC(10,2) GENERATED ALWAYS AS (miles * rate_per_mile) STORED,
  is_credited_to_dla BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Generated Tax Packages
CREATE TABLE IF NOT EXISTS tax_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  tax_year TEXT NOT NULL, -- e.g. "2024/25"
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_rental_turnover NUMERIC(12,2) NOT NULL,
  total_allowable_expenses NUMERIC(12,2) NOT NULL,
  estimated_corporation_tax NUMERIC(12,2) NOT NULL,
  dla_closing_balance NUMERIC(12,2) NOT NULL,
  pdf_report_url TEXT,
  csv_export_url TEXT,
  status TEXT DEFAULT 'ready_for_accountant',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Document Vault
CREATE TABLE IF NOT EXISTS document_vault (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'completion_statement', 'lease', 'mortgage', 'compliance', 'invoice'
  file_url TEXT NOT NULL,
  file_size TEXT,
  file_hash TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Row Level Security Policies
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dla_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mileage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_vault ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own company profile"
  ON company_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can manage own properties"
  ON properties FOR ALL
  USING (auth.uid() = entity_id);

CREATE POLICY "Users can manage own transactions"
  ON transactions FOR ALL
  USING (auth.uid() = entity_id);

CREATE POLICY "Users can manage own DLA entries"
  ON dla_entries FOR ALL
  USING (auth.uid() = entity_id);

CREATE POLICY "Users can manage own mileage"
  ON mileage_logs FOR ALL
  USING (auth.uid() = entity_id);

CREATE POLICY "Users can view own tax packages"
  ON tax_packages FOR ALL
  USING (auth.uid() = entity_id);

CREATE POLICY "Users can view own documents"
  ON document_vault FOR ALL
  USING (auth.uid() = entity_id);
