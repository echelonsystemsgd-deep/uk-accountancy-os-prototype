-- ==============================================================================
-- KP TAX CONSULTANTS LTD / KP ACCOUNTANTS - PHASE 2 PRODUCTION SCHEMA
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Practice Accounts & Admins (Kalpesh Patel FCA, Pritpal Chaggar CTA, Managers)
CREATE TABLE IF NOT EXISTS public.practice_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('partner', 'senior_accountant', 'practice_manager')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Client Portfolios (Landlord entities, Joint accounts, SPVs)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_name TEXT NOT NULL,                         -- e.g. 'Marcus & Sarah Sterling'
    entity_type TEXT NOT NULL CHECK (entity_type IN ('individual', 'joint', 'spv_ltd')),
    company_number TEXT,                               -- e.g. '14285721' (if SPV)
    primary_email TEXT NOT NULL,
    primary_phone TEXT NOT NULL,
    assigned_accountant TEXT NOT NULL DEFAULT 'Kalpesh Patel',
    status TEXT NOT NULL DEFAULT 'onboarding' CHECK (status IN ('onboarding', 'chasing_docs', 'review_ready', 'submitted')),
    magic_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
    token_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Individual Associated Parties (Directors, Joint Owners)
CREATE TABLE IF NOT EXISTS public.client_parties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    relationship TEXT NOT NULL CHECK (relationship IN ('primary_owner', 'joint_spouse', 'director')),
    utr_number TEXT,
    national_insurance_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Properties Breakdown
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    address_line TEXT NOT NULL,
    postcode TEXT NOT NULL,
    property_type TEXT NOT NULL CHECK (property_type IN ('residential_btl', 'hmo', 'commercial')),
    ownership_split TEXT NOT NULL DEFAULT '100%',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Document Checklist & Uploads
CREATE TABLE IF NOT EXISTS public.document_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    party_id UUID REFERENCES public.client_parties(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('id_aml', 'tax_record', 'mortgage', 'tenancy', 'expense')),
    document_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'uploaded', 'verified', 'rejected')),
    is_overdue BOOLEAN DEFAULT FALSE,
    due_date DATE NOT NULL,
    file_storage_path TEXT,
    file_name TEXT,
    file_size_bytes BIGINT,
    mime_type TEXT,
    ocr_metadata JSONB DEFAULT '{}'::jsonb,
    uploaded_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT
);

-- 6. Multi-Channel Chaser Audit Logs
CREATE TABLE IF NOT EXISTS public.communication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'sms', 'email')),
    recipient TEXT NOT NULL,
    message_body TEXT NOT NULL,
    triggered_by TEXT NOT NULL DEFAULT 'partner_manual',
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('queued', 'sent', 'delivered', 'failed')),
    external_message_id TEXT,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;

-- Practice Partner Policy: Authenticated staff have full access
CREATE POLICY "Practice staff have full access to clients" ON public.clients
    FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "Practice staff have full access to parties" ON public.client_parties
    FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "Practice staff have full access to properties" ON public.properties
    FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "Practice staff have full access to docs" ON public.document_requests
    FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "Practice staff have full access to coms" ON public.communication_logs
    FOR ALL TO authenticated USING (TRUE);

-- Anonymous / Client Portal Policy (Permits reading & inserting for the demo platform)
CREATE POLICY "Allow anon read for demo clients" ON public.clients
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Allow anon update for demo clients" ON public.clients
    FOR UPDATE TO anon USING (TRUE);

CREATE POLICY "Allow anon read for demo docs" ON public.document_requests
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Allow anon insert/update for demo docs" ON public.document_requests
    FOR ALL TO anon USING (TRUE);

CREATE POLICY "Allow anon insert for communications" ON public.communication_logs
    FOR ALL TO anon USING (TRUE);

CREATE POLICY "Allow anon read for properties" ON public.properties
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Allow anon read for parties" ON public.client_parties
    FOR SELECT TO anon USING (TRUE);

-- 7. Insert Initial Seed Data for Marcus & Sarah Sterling Demonstration Portfolio
INSERT INTO public.clients (id, entity_name, entity_type, company_number, primary_email, primary_phone, assigned_accountant, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Marcus & Sarah Sterling', 'joint', NULL, 'marcus.sterling@example.co.uk', '+44 7861 690954', 'Kalpesh Patel FCA', 'chasing_docs'),
    ('22222222-2222-2222-2222-222222222222', 'Sterling Property Holdings Ltd', 'spv_ltd', '14285721', 'accounts@sterlingholdings.co.uk', '+44 7861 690954', 'Pritpal Chaggar CTA', 'review_ready')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.client_parties (client_id, full_name, relationship, utr_number, national_insurance_number)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Marcus Sterling', 'primary_owner', '9482710582', 'QQ 12 34 56 A'),
    ('11111111-1111-1111-1111-111111111111', 'Sarah Sterling', 'joint_spouse', '8392019485', 'QQ 98 76 54 B')
ON CONFLICT DO NOTHING;

INSERT INTO public.properties (client_id, address_line, postcode, property_type, ownership_split)
VALUES
    ('11111111-1111-1111-1111-111111111111', '14 High Street, Cheltenham', 'GL50 1DZ', 'residential_btl', '50/50 Joint'),
    ('22222222-2222-2222-2222-222222222222', '22 Park Road, Gloucester', 'GL1 1LH', 'commercial', '100% SPV Ltd')
ON CONFLICT DO NOTHING;

INSERT INTO public.document_requests (client_id, category, document_title, status, is_overdue, due_date)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'mortgage', 'NatWest Mortgage Interest Certificate (14 High St)', 'pending', TRUE, CURRENT_DATE - INTERVAL '6 days'),
    ('11111111-1111-1111-1111-111111111111', 'id_aml', 'Sarah Proof of Address (Council Tax / Utility Bill)', 'pending', TRUE, CURRENT_DATE - INTERVAL '4 days'),
    ('11111111-1111-1111-1111-111111111111', 'tenancy', 'AST Agreement 2024/25 (14 High St)', 'verified', FALSE, CURRENT_DATE),
    ('22222222-2222-2222-2222-222222222222', 'tax_record', 'Barclays Commercial Loan Annual Schedule', 'verified', FALSE, CURRENT_DATE)
ON CONFLICT DO NOTHING;
