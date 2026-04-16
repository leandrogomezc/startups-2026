/** Bucket name for event cover images (Supabase Storage). Override with SUPABASE_EVENT_COVERS_BUCKET. */
export const DEFAULT_EVENT_COVERS_BUCKET = "event-covers";

export function getEventCoversBucket(): string {
  return process.env.SUPABASE_EVENT_COVERS_BUCKET?.trim() || DEFAULT_EVENT_COVERS_BUCKET;
}
