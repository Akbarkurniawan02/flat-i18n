"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { getText } from "../core";

type I18nContextValue = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: string;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: (key: string) => getText(key, locale),
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
