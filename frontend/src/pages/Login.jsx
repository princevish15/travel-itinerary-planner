import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { data, error } = await fn.call(supabase.auth, { email, password });
    setBusy(false);
    if (error) return setError(error.message);
    if (mode === "signup" && !data.session) setInfo("Account created. Check your email to confirm, then sign in.");
  };

  return (
    <div className="login-wrap">
      <div className="login-hero">
        <div className="brand big">
          <span className="brand-mark">W</span> Wayfarer
        </div>
        <h1>Plan the trip, not the research.</h1>
        <p>
          Tell us where, when and how you like to travel. Get a day-by-day plan with attractions, food, stays and
          transport in seconds, then tweak and regenerate any day.
        </p>
      </div>
      <form className="card login-card" onSubmit={submit}>
        <h2>{mode === "signin" ? "Welcome back" : "Create your account"}</h2>
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="alert error">{error}</div>}
        {info && <div className="alert ok">{info}</div>}
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
