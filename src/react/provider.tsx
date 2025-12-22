"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { getText } from "../core";

type I18nContextValue = {
  lang: string;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Controlled i18n provider.
 * Language is owned by the application.
 */
export function I18nProvider({
  currentLang,
  children,
}: {
  currentLang: string;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider
      value={{
        lang: currentLang,
        t: (key: string) => getText(key, currentLang),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
}
