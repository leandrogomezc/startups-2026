import { cookies } from "next/headers";

const COOKIE_NAME = "fc_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getAdminPassword(): string | null {
  return process.env.EVENTS_ADMIN_PASSWORD || null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = getAdminPassword();
  if (!password) return false;
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === password;
}

export async function setAdminCookie(password: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
