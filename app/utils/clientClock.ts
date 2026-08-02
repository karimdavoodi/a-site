"use client";

import { useSyncExternalStore } from "react";
import { getZonedNow, type ZonedNow } from "./timezone";

const noop = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

const listeners = new Set<() => void>();
let snapshot: ZonedNow | null = null;
let timer: ReturnType<typeof setInterval> | undefined;

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  if (timer === undefined) {
    snapshot = getZonedNow();
    timer = setInterval(() => {
      snapshot = getZonedNow();
      for (const listener of listeners) listener();
    }, 1000);
  }
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = undefined;
    }
  };
};

const getSnapshot = () => (snapshot ??= getZonedNow());
const getServerSnapshot = () => null;

export function useMosqueClock(): ZonedNow | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
