"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <main className="shell">
      {/* LEFT: GLASS PANEL */}
      <section className="panel">
        <div className="card">
          {/* Brand */}
          <div className="brand">
            <div className="logo" aria-hidden="true">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <div className="brand-name">MVAPP</div>
          </div>

          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">We Are Happy To See You Again</p>

          {/* Tabs */}
          <div className="tabs" role="tablist" aria-label="Auth tabs">
            <span className="pill" aria-hidden="true"></span>

            <button
              className={`tab ${tab === "signin" ? "active" : ""}`}
              type="button"
              onClick={() => setTab("signin")}
            >
              Sign in
            </button>

            <button
              className={`tab ${tab === "signup" ? "active" : ""}`}
              type="button"
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              // εδώ μετά θα βάλεις Supabase sign in / sign up
              console.log("submit", tab);
            }}
          >
            <label className="field">
              <span className="sr-only">Email</span>
              <input type="email" placeholder="Enter your email" required />
              <span className="icon" aria-hidden="true">
                <i className="fa-solid fa-at"></i>
              </span>
            </label>

            <label className="field">
              <span className="sr-only">Password</span>
              <input type="password" placeholder="Enter your password" required />
              <button className="eye" type="button" aria-label="Show password">
                <i className="fa-solid fa-lock"></i>
              </button>
            </label>

            <div className="row">
              <label className="check">
                <input type="checkbox" />
                <span className="box" aria-hidden="true">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="txt">Remember me</span>
              </label>

              <a className="link" href="#">
                Forgot Password?
              </a>
            </div>

            <button className="primary" type="submit">
              {tab === "signin" ? "Login" : "Create account"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="oauth apple" type="button">
              <span className="oauth-ic" aria-hidden="true">
                <i className="fa-brands fa-apple"></i>
              </span>
              <span className="oauth-text">Log in with Apple</span>
            </button>

            <button className="oauth google" type="button">
              <span className="oauth-ic" aria-hidden="true">
                <i className="fa-brands fa-google"></i>
              </span>
              <span className="oauth-text">Log in with Google</span>
            </button>
          </form>
        </div>
      </section>

      {/* RIGHT: HERO */}
      <section className="hero" aria-hidden="true">
        <div className="hero-overlay">
          <div className="legal">
            <small>© 2025 MVAPP. All rights reserved.</small>
            <small>Unauthorized use or reproduction is prohibited.</small>
          </div>
        </div>
      </section>
    </main>
  );
}
