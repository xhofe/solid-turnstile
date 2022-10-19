import { createEffect, JSX, splitProps } from "solid-js";

const global = globalThis ?? window;
let turnstileState =
  typeof (global as any).turnstile !== "undefined" ? "ready" : "unloaded";
let ensureTurnstile: () => Promise<any>;

// Functions responsible for loading the turnstile api, while also making sure
// to only load it once
{
  const TURNSTILE_LOAD_FUNCTION = "cf__reactTurnstileOnLoad";
  const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

  let turnstileLoad: {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  };
  const turnstileLoadPromise = new Promise((resolve, reject) => {
    turnstileLoad = { resolve, reject };
    if (turnstileState === "ready") resolve(undefined);
  });
  (global as any)[TURNSTILE_LOAD_FUNCTION] = () => {
    turnstileLoad.resolve();
    turnstileState = "ready";
  };

  ensureTurnstile = () => {
    if (turnstileState === "unloaded") {
      turnstileState = "loading";
      const url = `${TURNSTILE_SRC}?onload=${TURNSTILE_LOAD_FUNCTION}&render=explicit`;
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.addEventListener("error", () => {
        turnstileLoad.reject("Failed to load Turnstile.");
      });
      document.head.appendChild(script);
    }
    return turnstileLoadPromise;
  };
}

export default function Turnstile(
  props: TurnstileProps &
    Omit<JSX.HTMLAttributes<HTMLDivElement>, "onError" | "onLoad">
) {
  let ref: HTMLDivElement;
  const [local, others] = splitProps(props, [
    "sitekey",
    "action",
    "cData",
    "theme",
    "tabIndex",
    "responseField",
    "responseFieldName",
    "onVerify",
    "onError",
    "onLoad",
    "onExpire",
  ]);

  createEffect((prev: (() => void) | undefined) => {
    prev?.();
    Object.keys(local).forEach((key) => {
      local[key as keyof typeof local];
    });
    if (!ref) return;
    let cancelled = false;
    let widgetId = "";
    (async () => {
      // load turnstile
      if (turnstileState !== "ready") {
        try {
          await ensureTurnstile();
        } catch (e) {
          local.onError?.(e);
          return;
        }
      }
      if (cancelled || !ref) return;
      const turnstileOptions: TurnstileOptions = {
        sitekey: local.sitekey,
        action: local.action,
        cData: local.cData,
        theme: local.theme,
        tabindex: local.tabIndex,
        callback: (token: string) => local.onVerify(token),
        "error-callback": () => local.onError?.(),
        "expired-callback": () => local.onExpire?.(),
        "response-field": local.responseField,
        "response-field-name": local.responseFieldName,
      };

      widgetId = window.turnstile.render(ref, turnstileOptions);
      local.onLoad?.(widgetId);
    })();
    return () => {
      cancelled = true;
      if (widgetId) window.turnstile.remove(widgetId);
    };
  });

  return <div ref={ref!} {...others} />;
}

export interface TurnstileProps extends TurnstileCallbacks {
  sitekey: string;
  action?: string;
  cData?: string;
  theme?: "light" | "dark" | "auto";
  tabIndex?: number;
  responseField?: boolean;
  responseFieldName?: string;
}

interface TurnstileCallbacks {
  onVerify: (token: string) => void;
  onLoad?: (widgetId: string) => void;
  onError?: (error?: Error | any) => void;
  onExpire?: () => void;
}

// Generic typescript definitions of the turnstile api
// Last updated: 2022-10-02 21:30:00 UTC

declare global {
  interface Window {
    turnstile: {
      render: (
        idOrContainer: string | HTMLElement,
        options: TurnstileOptions
      ) => string;
      reset: (widgetIdOrContainer: string | HTMLElement) => void;
      getResponse: (
        widgetIdOrContainer: string | HTMLElement
      ) => string | undefined;
      remove: (widgetIdOrContainer: string | HTMLElement) => void;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  tabindex?: number;
  // undocumented fields
  size?: "normal" | "invisible" | "compact"; // UNUSED; compact warns that its unavailable
  "response-field"?: boolean; // defaults to true
  "response-field-name"?: string; // defaults to cf-turnstile-response
}

// query arguments when adding the script

// compat=recaptcha      registers the turnstile api as window.grecaptcha and enables recaptcha compat
// onload=x              function is executed when turnstile is loaded
// render=explicit       if this value is anything but 'explicit', the DOM is searched for implicit widgets
