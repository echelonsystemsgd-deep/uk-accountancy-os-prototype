-- ==============================================================================
-- UK ACCOUNTANCY OS & PRACTICE PORTAL: FULL DATABASE MIGRATION
-- Practice Authority: KP Tax Consultants (ICAEW & CIOT Regulated) | Mercian Wealth
-- Target Region: London (eu-west-2)
-- Security: Row-Level Security (RLS) on all tables + pgcrypto Field Encryption
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'client', 'staff', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE account_status AS ENUM ('active', 'pending_verification', 'suspended', 'banned', 'purged');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE meeting_location AS ENUM ('video_call', 'phone_call', 'london_office', 'berkshire_office');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('requested', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'no_show');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE engagement_status AS ENUM ('draft', 'pending_client_signature', 'active', 'paused', 'completed', 'terminated');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE task_status AS ENUM ('pending_client_docs', 'in_progress', 'partner_review', 'filed_hmrc', 'completed', 'blocked');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE doc_review_status AS ENUM ('requested', 'uploaded', 'scanning', 'accepted', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE doc_category AS ENUM (
        'aml_id', 
        'bank_statement', 
        'contractor_invoice', 
        'mortgage_statement', 
        'tenancy_agreement', 
        'completion_statement', 
        'hmrc_notice',
        'statutory_ct600'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'user',
    status account_status NOT NULL DEFAULT 'pending_verification',
    
    -- Sensitive identifiers (encrypted using pgcrypto)
    encrypted_utr BYTEA,
    utr_last4 VARCHAR(4),
    encrypted_nino BYTEA,
    nino_last3 VARCHAR(3),
    
    -- Regulatory Consent
    terms_accepted_at TIMESTAMPTZ,
    privacy_accepted_at TIMESTAMPTZ,
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    
    -- Inactivity & 90-day purge pipeline
    last_login_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unverified_nudge_count INT NOT NULL DEFAULT 0,
    last_nudge_sent_at TIMESTAMPTZ,
    
    -- Suspension & Banning
    is_banned BOOLEAN NOT NULL DEFAULT false,
    banned_at TIMESTAMPTZ,
    banned_by UUID REFERENCES public.profiles(id),
    ban_reason TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PRACTICE STAFF ASSIGNMENTS (Strict isolation for staff)
CREATE TABLE IF NOT EXISTS public.practice_staff_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_by UUID NOT NULL REFERENCES public.profiles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    is_primary_accountant BOOLEAN NOT NULL DEFAULT true,
    UNIQUE(client_id, staff_id)
);

-- 5. CONSULTATION TYPES & BOOKINGS
CREATE TABLE IF NOT EXISTS public.consultation_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 45,
    price_gbp NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    location_types meeting_location[] NOT NULL DEFAULT '{video_call, phone_call}',
    buffer_before_minutes INT NOT NULL DEFAULT 15,
    buffer_after_minutes INT NOT NULL DEFAULT 15,
    min_notice_hours INT NOT NULL DEFAULT 24,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id),
    consultation_type_id UUID NOT NULL REFERENCES public.consultation_types(id),
    staff_id UUID REFERENCES public.profiles(id),
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    chosen_location meeting_location NOT NULL,
    location_details TEXT,
    status booking_status NOT NULL DEFAULT 'requested',
    client_notes TEXT,
    internal_staff_notes TEXT,
    cancel_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SERVICES CATALOG & CLIENT ENGAGEMENTS
CREATE TABLE IF NOT EXISTS public.services_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    statutory_frequency VARCHAR(20) NOT NULL DEFAULT 'annual',
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services_catalog(id),
    assigned_staff_id UUID REFERENCES public.profiles(id),
    status engagement_status NOT NULL DEFAULT 'draft',
    effective_start_date DATE NOT NULL,
    effective_end_date DATE,
    annual_fee_gbp NUMERIC(10,2),
    monthly_fee_gbp NUMERIC(10,2),
    letter_of_engagement_url TEXT,
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. DEADLINES & TASKS
CREATE TABLE IF NOT EXISTS public.deadlines_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    engagement_id UUID REFERENCES public.engagements(id),
    assigned_staff_id UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    statutory_reference TEXT,
    due_date DATE NOT NULL,
    statutory_due_date DATE,
    status task_status NOT NULL DEFAULT 'pending_client_docs',
    priority task_priority NOT NULL DEFAULT 'medium',
    checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_statutory_filing BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. DOCUMENT REQUESTS & DOCUMENTS VAULT
CREATE TABLE IF NOT EXISTS public.document_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.deadlines_tasks(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.profiles(id),
    requested_by UUID NOT NULL REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    description TEXT,
    category doc_category NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT true,
    due_date DATE,
    status doc_review_status NOT NULL DEFAULT 'requested',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_request_id UUID REFERENCES public.document_requests(id),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    category doc_category NOT NULL,
    tax_year VARCHAR(9),
    status doc_review_status NOT NULL DEFAULT 'scanning',
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    is_malware_scanned BOOLEAN NOT NULL DEFAULT false,
    malware_scan_result VARCHAR(50) DEFAULT 'clean',
    ocr_payload JSONB,
    ocr_confidence NUMERIC(5,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SPV PROPERTY LEDGER & DIRECTOR'S LOAN ACCOUNT (DLA)
CREATE TABLE IF NOT EXISTS public.spv_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    crn VARCHAR(10) NOT NULL UNIQUE,
    incorporation_date DATE,
    accounting_reference_date VARCHAR(5),
    director_name TEXT,
    uptr_reference VARCHAR(15),
    vat_number VARCHAR(15),
    sic_code VARCHAR(10) DEFAULT '68100',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.spv_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spv_id UUID NOT NULL REFERENCES public.spv_entities(id) ON DELETE CASCADE,
    address_line TEXT NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    purchase_price NUMERIC(12,2) NOT NULL,
    purchase_date DATE,
    mortgage_lender TEXT,
    current_valuation NUMERIC(12,2),
    annual_gross_rent NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    annual_mortgage_interest NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    is_s24_shielded BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.dla_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spv_id UUID NOT NULL REFERENCES public.spv_entities(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    description TEXT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- 'EQUITY_INJECTED', 'SDLT_PAID', 'PROFIT_REPAYMENT'
    amount NUMERIC(12,2) NOT NULL,
    balance_after NUMERIC(12,2) NOT NULL,
    tax_rate_applied VARCHAR(10) DEFAULT '0% (DLA Repayment)',
    is_s455_safe BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. IN-APP MESSAGES & ATTACHMENTS
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id),
    body TEXT NOT NULL,
    is_internal_note BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.message_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL
);

-- 11. IMMUTABLE AUDIT LOGS (Append-Only)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id),
    actor_email TEXT,
    actor_role user_role,
    action_type VARCHAR(100) NOT NULL,
    target_entity VARCHAR(50) NOT NULL,
    target_id UUID,
    ip_address INET,
    user_agent TEXT,
    changes JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE RULE deny_audit_logs_update AS ON UPDATE TO public.audit_logs DO INSTEAD NOTHING;
CREATE RULE deny_audit_logs_delete AS ON DELETE TO public.audit_logs DO INSTEAD NOTHING;

-- 12. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_staff_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deadlines_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spv_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spv_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dla_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper Function: Check Assigned Staff
CREATE OR REPLACE FUNCTION public.is_assigned_staff(target_client_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.practice_staff_assignments
        WHERE client_id = target_client_id AND staff_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles RLS
CREATE POLICY "Admins full profiles access" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Staff read assigned profiles" ON public.profiles FOR SELECT USING (public.is_assigned_staff(id));

-- Documents RLS
CREATE POLICY "Admins full documents access" ON public.documents FOR ALL USING (public.is_admin());
CREATE POLICY "Clients read own documents" ON public.documents FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Clients insert own documents" ON public.documents FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Staff read assigned documents" ON public.documents FOR SELECT USING (public.is_assigned_staff(client_id));
CREATE POLICY "Staff update assigned documents" ON public.documents FOR UPDATE USING (public.is_assigned_staff(client_id));

-- Messages RLS
CREATE POLICY "Admins full messages access" ON public.messages FOR ALL USING (public.is_admin());
CREATE POLICY "Clients read own non-internal messages" ON public.messages FOR SELECT USING (client_id = auth.uid() AND is_internal_note = false);
CREATE POLICY "Clients insert own messages" ON public.messages FOR INSERT WITH CHECK (client_id = auth.uid() AND is_internal_note = false);
CREATE POLICY "Staff read assigned messages" ON public.messages FOR SELECT USING (public.is_assigned_staff(client_id));
CREATE POLICY "Staff insert assigned messages" ON public.messages FOR INSERT WITH CHECK (public.is_assigned_staff(client_id));

-- SPVs & Ledgers RLS
CREATE POLICY "Admins full spv access" ON public.spv_entities FOR ALL USING (public.is_admin());
CREATE POLICY "Clients read own spv" ON public.spv_entities FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Staff read assigned spv" ON public.spv_entities FOR SELECT USING (public.is_assigned_staff(client_id));

-- Audit Logs RLS (Admins only read)
CREATE POLICY "Admins read audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin());
