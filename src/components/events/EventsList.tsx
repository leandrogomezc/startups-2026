"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { EventWithCounts } from "@/lib/events/types";
import { formatPrice, formatShortDate, isPast, spotsRemaining } from "@/lib/events/format";

type Props = {
  events: EventWithCounts[];
  locale: string;
};

export function EventsList({ events, locale }: Props) {
  const t = useTranslations("Events");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = events.filter((e) => !isPast(e));
  const past = events.filter((e) => isPast(e));
  const displayed = tab === "upcoming" ? upcoming : past;

  return (
    <div className="mt-10">
      <div className="flex gap-1 rounded-lg bg-muted/50 p-1 w-fit">
        <TabButton active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
          {t("upcoming")} {upcoming.length > 0 && `(${upcoming.length})`}
        </TabButton>
        <TabButton active={tab === "past"} onClick={() => setTab("past")}>
          {t("past")} {past.length > 0 && `(${past.length})`}
        </TabButton>
      </div>

      {displayed.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t("noEventsYet")}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((event, i) => (
            <EventCard key={event.id} event={event} locale={locale} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function EventCard({ event, locale, index }: { event: EventWithCounts; locale: string; index: number }) {
  const t = useTranslations("Events");
  const past = isPast(event);
  const spots = spotsRemaining(event);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/events/${event.slug}`}
        className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md ${past ? "opacity-70" : ""}`}
      >
        {event.cover_image_url && (
          <div className="aspect-[2/1] overflow-hidden bg-muted">
            <img
              src={event.cover_image_url}
              alt=""
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatShortDate(event.starts_at, event.timezone, locale)}</span>
            <span className="text-border">·</span>
            {event.location_type === "online" ? (
              <>
                <Video className="h-3.5 w-3.5" />
                <span>{t("online")}</span>
              </>
            ) : (
              <>
                <MapPin className="h-3.5 w-3.5" />
                <span>{t("venue")}</span>
              </>
            )}
          </div>

          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description.slice(0, 120)}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {t("attendees", { count: event.confirmed_count })}
            </span>
            {!past && (
              <span className="font-medium">
                {event.price_cents > 0
                  ? `$${formatPrice(event.price_cents)}`
                  : t("free")}
                {spots !== null && spots === 0 && event.waitlist_enabled && (
                  <span className="ml-1.5 text-amber-600 dark:text-amber-400">
                    · {t("waitlistOpen")}
                  </span>
                )}
                {spots !== null && spots === 0 && !event.waitlist_enabled && (
                  <span className="ml-1.5 text-red-500">· {t("soldOut")}</span>
                )}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
