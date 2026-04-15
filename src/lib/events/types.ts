export type LocationType = "online" | "venue";
export type RegistrationStatus = "confirmed" | "waitlist" | "cancelled" | "pending_payment";
export type PaymentStatus = "unpaid" | "paid" | "na";

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  location_type: LocationType;
  venue_address: string | null;
  meet_url: string | null;
  cover_image_url: string | null;
  host_display_name: string;
  host_bio: string | null;
  host_image_url: string | null;
  capacity: number | null;
  waitlist_enabled: boolean;
  is_published: boolean;
  price_cents: number;
  stripe_price_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegistrationRow {
  id: string;
  event_id: string;
  email: string;
  name: string;
  status: RegistrationStatus;
  stripe_checkout_session_id: string | null;
  payment_status: PaymentStatus;
  waitlist_position: number | null;
  reminder_sent_at: string | null;
  created_at: string;
}

/** Counts sent alongside the event for public display. */
export interface EventWithCounts extends EventRow {
  confirmed_count: number;
  waitlist_count: number;
}
