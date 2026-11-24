"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { CategorySlug } from "@/content/site";

/**
 * The sign-in and sign-up forms report what is happening in them; the illustrated scene beside the form reacts
 * (the padlock takes a key, the signboard gets painted). The forms work exactly the same without a scene.
 */

export type SignInScene = {
  /** A valid phone number or email is typed. */
  idOk: boolean;
  /** How many password characters are typed. */
  chars: number;
  /** "turning" while the request is out; "open" only on a real successful sign-in. */
  status: "idle" | "turning" | "open" | "refused";
  /** Bumps on every refused attempt so the lock shakes each time. */
  refusals: number;
};

export type SignUpScene = {
  step: number;
  type: CategorySlug | "";
  name: string;
  owner: string;
  district: string;
  phoneOk: boolean;
  strength: 0 | 1 | 2 | 3;
  agree: boolean;
  /** "open" only when the account was really created. */
  status: "idle" | "open";
};

export const initialSignIn: SignInScene = { idOk: false, chars: 0, status: "idle", refusals: 0 };
export const initialSignUp: SignUpScene = { step: 0, type: "", name: "", owner: "", district: "", phoneOk: false, strength: 0, agree: false, status: "idle" };

type Ctx = {
  signIn: SignInScene;
  signUp: SignUpScene;
  updateSignIn: (p: Partial<SignInScene> | ((s: SignInScene) => Partial<SignInScene>)) => void;
  updateSignUp: (p: Partial<SignUpScene>) => void;
};
const AuthSceneContext = createContext<Ctx | null>(null);

export function AuthSceneProvider({ children }: { children: ReactNode }) {
  const [signIn, setSignIn] = useState(initialSignIn);
  const [signUp, setSignUp] = useState(initialSignUp);
  const updateSignIn = useCallback<Ctx["updateSignIn"]>((p) => setSignIn((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) })), []);
  const updateSignUp = useCallback<Ctx["updateSignUp"]>((p) => setSignUp((s) => ({ ...s, ...p })), []);
  return <AuthSceneContext.Provider value={{ signIn, signUp, updateSignIn, updateSignUp }}>{children}</AuthSceneContext.Provider>;
}

/** Null where there is no scene (the forms keep working on their own). */
export const useAuthScene = () => useContext(AuthSceneContext);

/** 0–3: long enough, letters and digits mixed, long or with a symbol. */
export function passwordStrength(p: string): 0 | 1 | 2 | 3 {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-zA-Zঀ-৿]/.test(p) && /[0-9০-৯]/.test(p)) s++;
  if (p.length >= 12 || /[^a-zA-Z0-9ঀ-৿০-৯]/.test(p)) s++;
  return Math.max(1, s) as 1 | 2 | 3;
}
