/**
 * NOTIFICATION SERVICE & 90-DAY INACTIVITY NUDGE PIPELINE
 * Resend Transactional Email Engine & Twilio UK SMS Dispatch
 */

export interface NotificationPayload {
  recipientEmail: string;
  recipientPhone?: string;
  recipientName: string;
  type: 
    | "BOOKING_CONFIRMED" 
    | "DOCUMENT_REQUESTED" 
    | "DEADLINE_WARNING_14D" 
    | "NEW_ACCOUNTANT_MESSAGE"
    | "INACTIVITY_NUDGE_DAY7"
    | "INACTIVITY_NUDGE_DAY30"
    | "INACTIVITY_NUDGE_DAY60"
    | "INACTIVITY_NUDGE_DAY85"
    | "ACCOUNT_PURGED_DAY90";
  metadata?: Record<string, any>;
}

export async function dispatchNotification(payload: NotificationPayload): Promise<{
  emailDispatched: boolean;
  smsDispatched: boolean;
  channelLog: string;
}> {
  // In production, calls Resend API: https://api.resend.com/emails
  // and Twilio Messages API: https://api.twilio.com/2010-04-01/Accounts/.../Messages.json
  
  const timestamp = new Date().toISOString();
  let emailDispatched = true;
  let smsDispatched = Boolean(payload.recipientPhone);
  let channelLog = `[NOTIFICATION ${timestamp}] Dispatched ${payload.type} to ${payload.recipientEmail}`;

  if (payload.type.startsWith("INACTIVITY_NUDGE")) {
    channelLog += ` (Automated 90-day unverified user retention pipeline)`;
  }

  return {
    emailDispatched,
    smsDispatched,
    channelLog,
  };
}

export function getNudgeTemplate(day: 7 | 30 | 60 | 85 | 90, userName: string) {
  switch (day) {
    case 7:
      return {
        subject: "Complete your UK Property SPV tax profile",
        body: `Hi ${userName}, you recently registered on the Mercian Wealth & KP Tax Consultants portal. Complete your profile to unlock automated Section 24 relief tracking and direct document review with our Chartered Accountants.`,
      };
    case 30:
      return {
        subject: "Notice: Upcoming HMRC MTD deadline & consultation slots",
        body: `Hi ${userName}, HMRC's Making Tax Digital rules require continuous digital records. Book a 10-minute consultation with Kalpesh Patel FCA or Pritpal Chaggar CTA before quarter end.`,
      };
    case 60:
      return {
        subject: "Action Required: Inactive account scheduled for review",
        body: `Hi ${userName}, we haven't seen any activity on your account. To protect your data under UK GDPR, inactive accounts are reviewed after 60 days. Log in to keep your account active.`,
      };
    case 85:
      return {
        subject: "Final Notice: Your draft account will be purged in 5 days",
        body: `Hi ${userName}, under our statutory data privacy policy, unverified accounts inactive for 90 days are permanently purged. Log in today if you wish to retain your property records.`,
      };
    case 90:
      return {
        subject: "Account Data Purged (UK GDPR Compliance)",
        body: `Hi ${userName}, as per our 90-day inactivity policy, your unverified registration details have been securely purged from our systems. You are welcome to re-register whenever you need property accountancy services.`,
      };
  }
}
