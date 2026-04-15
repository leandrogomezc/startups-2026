"use client";

import { ArrowLeft, Calendar, MapPin, Users, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { EventWithCounts } from "@/lib/events/types";
import { formatEventDate, formatPrice, isPast, spotsRemaining } from "@/lib/events/format";
import { RsvpForm } from "./RsvpForm";

type Props = {
  event: EventWithCounts;
  locale: string;
  backLabel: string;
};

export function EventDetail({ event, locale, backLabel }: Props) {
  const t = useTranslations("Events");
  const past = isPast(event);
  const spots = spotsRemaining(event);
  const isFull = spots !== null && spots === 0;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      {event.cover_image_url && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={event.cover_image_url}
            alt=""
            className="w-full object-cover"
            style={{ maxHeight: 400 }}
          />
        </div>
      )}

      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {event.title}
      </h1>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatEventDate(event.starts_at, event.timezone, locale)}
        </span>
        {event.location_type === "online" ? (
          <span className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            {t("online")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.venue_address || t("venue")}
          </span>
        )}
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {t("attendees", { count: event.confirmed_count })}
          {event.capacity != null && (
            <span className="text-muted-foreground/60">/ {event.capacity}</span>
          )}
        </span>
      </div>

      {event.price_cents > 0 && (
        <p className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          ${formatPrice(event.price_cents)}
        </p>
      )}
      {event.price_cents === 0 && (
        <p className="mt-4 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t("free")}
        </p>
      )}

      {/* Host */}
      <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        {event.host_image_url && (
          <img
            src={event.host_image_url}
            alt={event.host_display_name}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-xs text-muted-foreground">{t("hostedBy")}</p>
          <p className="font-medium text-foreground">{event.host_display_name}</p>
          {event.host_bio && (
            <p className="mt-0.5 text-sm text-muted-foreground">{event.host_bio}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">{t("about")}</h2>
        <div className="mt-3 prose prose-sm prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap">
          {event.description}
        </div>
      </div>

      {/* RSVP */}
      {!past && (
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">{t("rsvpTitle")}</h2>
          {isFull && !event.waitlist_enabled ? (
            <p className="mt-3 text-sm text-muted-foreground">{t("rsvpErrorFull")}</p>
          ) : (
            <RsvpForm event={event} locale={locale} />
          )}
        </div>
      )}
    </div>
  );
}
