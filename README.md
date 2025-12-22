# flat-i18n

<p align="center">
  <img src="./branding/flat-i18n-logo.svg" alt="flat-i18n logo" width="120" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/flat-i18n"><img src="https://img.shields.io/npm/v/flat-i18n?color=22d3ee&label=npm" /></a>
  <a href="https://www.npmjs.com/package/flat-i18n"><img src="https://img.shields.io/npm/dm/flat-i18n?color=22d3ee" /></a>
  <a href="https://github.com/exagonssoft/flat-i18n/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/exagonssoft/flat-i18n/ci.yml?label=CI" /></a>
  <img src="https://img.shields.io/badge/typescript-100%25-blue" />
  <img src="https://img.shields.io/badge/zero--dependencies-✔-success" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
</p>

> **Flat JSON based i18n. Zero magic.**

`flat-i18n` is a minimal internationalization utility for JavaScript and React applications.
It is designed for developers who want **full control**, **predictable behavior**, and **no framework lock-in**.

* No routing coupling
* No async loaders
* No hidden state

**Just JSON → Getter → (Optional) React Provider.**

---

## Table of Contents

* [Why flat-i18n?](#why-flat-i18n)
* [Features](#features)
* [Installation](#installation)
* [JSON format](#json-format)
* [Setup](#setup-required)
* [Server usage](#server-usage)
* [React usage](#react-usage-optional)
* [What flat-i18n is NOT](#what-flat-i18n-is-not)
* [Philosophy](#philosophy)
* [License](#license)
* [Roadmap](#roadmap-non-binding)

---

## Why flat-i18n?

Most i18n libraries are **over-engineered**.

`flat-i18n` exists because sometimes you just want:

* one JSON file
* flat keys
* **O(1)** lookups
* server + client support
* zero dependencies
* zero magic

If that resonates, this library is for you.

---

## Features

* ✅ Flat JSON structure
* ✅ Framework-agnostic core
* ✅ Optional React provider
* ✅ Works in **Node**, **Edge**, and **Client** environments
* ✅ SSR-safe
* ✅ Tree-shakable
* ✅ Zero runtime dependencies
* ✅ TypeScript-first

---

## Installation

```bash
npm install flat-i18n
```

---

## JSON format

`flat-i18n` expects **one single JSON file** with language keys at the top level.

```json
{
  "en": {
    "app.name": "PinPocket",
    "nav.home": "Home",
    "seo.title": "Save, Organize, Collaborate"
  },
  "es": {
    "app.name": "PinPocket",
    "nav.home": "Inicio",
    "seo.title": "Guardar, Organizar, Colaborar"
  }
}
```

### Design rules

* Keys are **flat** (no nesting)
* Values are **strings only**
* No runtime mutation
* No dynamic loading

---

## Setup (required)

Before using `flat-i18n`, initialize it **once**:

```ts
import { createI18n } from "flat-i18n";
import texts from "./texts.json";

createI18n(texts, "en");
```

This should be done:

* at application bootstrap
* before server handlers
* before rendering (SSR)

---

## Server usage

Use `getText` anywhere — **server**, **edge**, **scripts**, or **metadata generation**.

```ts
import { getText } from "flat-i18n";

const title = getText("seo.title", "es");
```

### Behavior

* Missing key → returns the key
* Missing locale → falls back to the default locale
* Not initialized → throws an explicit error

---

## React usage (controlled, optional)

`flat-i18n` **does not manage the language state**.

Your application owns the selected language (user preference, storage, API, etc.) and passes it to the provider.

### App-level language state (example)

```tsx
import { createContext, useContext, useState } from "react";

const AppLangContext = createContext(null);

export function AppLangProvider({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <AppLangContext.Provider value={{ lang, setLang }}>
      {children}
    </AppLangContext.Provider>
  );
}

export function useAppLang() {
  return useContext(AppLangContext);
}
```

### Wiring flat-i18n

```tsx
import { I18nProvider } from "flat-i18n/react";
import { useAppLang } from "./AppLangContext";

function AppShell({ children }) {
  const { lang } = useAppLang();

  return (
    <I18nProvider currentLang={lang}>
      {children}
    </I18nProvider>
  );
}
```

### Using translations in components

```tsx
import { useI18n } from "flat-i18n/react";

function Header() {
  const { t } = useI18n();
  return <h1>{t("app.name")}</h1>;
}
```

Changing the app language automatically updates all translations.
No routing. No reloads.

Use it in components:

```tsx
import { useI18n } from "flat-i18n";

const { t, locale, setLocale } = useI18n();

<h1>{t("app.name")}</h1>
<button onClick={() => setLocale("es")}>ES</button>
```

---

## What flat-i18n is NOT

* ❌ No pluralization engine
* ❌ No string interpolation
* ❌ No routing integration
* ❌ No async loading
* ❌ No opinionated structure

These features can be built **on top**, not baked in.

---

## Philosophy

flat-i18n follows three simple rules:

1. **Explicit is better than implicit**
2. **Boring code scales better**
3. **You should understand the entire library in under 5 minutes**

---

## License

MIT © Exagon-Soft

---

## Roadmap (non-binding)

* v0.2.0 — string interpolation helpers
* v0.3.0 — locale persistence utilities
* v1.0.0 — API freeze

---

If you like this approach, use it, fork it, or build on top of it.

**flat-i18n** — *the boring i18n that just works.*
