"use client";

import { useSyncExternalStore } from "react";
import { ADMIN_SESSION_KEY } from "../../lib/admin-demo";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

/**
 * Demo-only session: a value in sessionStorage, no real auth. A module-level
 * listener set lets the same tab re-render on sign in/out (the `storage`
 * event only fires cross-tab).
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", cb);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function setSession(on: boolean) {
  try {
    if (on) sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    else sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function AdminApp() {
  const authed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return authed ? (
    <AdminDashboard onSignOut={() => setSession(false)} />
  ) : (
    <AdminLogin onSignIn={() => setSession(true)} />
  );
}
