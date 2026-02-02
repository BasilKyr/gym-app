// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    supabase?: any;
    api?: (action: string) => Promise<any>;
  }
}

export default function HomePage() {
  // Sidebar "Classes" collapse
  const [classesCollapsed, setClassesCollapsed] = useState(false);

  // Stagger reveal (όπως το script σου)
  useEffect(() => {
    const selectors = [
      "#heroLeft",
      "#heroRight",
      "#secTitle",
      "#secSub",
      ".tiles .tile:nth-child(1)",
      ".tiles .tile:nth-child(2)",
      ".tiles .tile:nth-child(3)",
      ".tiles .tile:nth-child(4)",
      ".tiles .tile:nth-child(5)",
      "#quickTitle",
      ".quick .q:nth-child(1)",
      ".quick .q:nth-child(2)",
      ".quick .q:nth-child(3)",
      ".quick .q:nth-child(4)",
      "#todayBand",
    ];

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const hiddenNodes = selectors
      .map((s) => document.querySelector(s))
      .filter(Boolean) as HTMLElement[];

    if (reduced) {
      document.querySelectorAll("._hidden").forEach((n) => n.classList.remove("_hidden"));
      return;
    }

    const reveal = (nodes: HTMLElement[]) =>
      nodes.forEach((n, i) => {
        setTimeout(() => {
          n.classList.add("_show");
          n.classList.remove("_hidden");
        }, i * 110);
      });

    hiddenNodes.forEach((n) => n.classList.add("_hidden"));

    const main = document.querySelector("main");
    if (!main) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal(hiddenNodes);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(main);
    return () => io.disconnect();
  }, []);

  // Logout (ίδια λογική όπως το script σου)
  async function handleLogout() {
    try {
      if (window.supabase?.auth?.signOut) {
        await window.supabase.auth.signOut();
      } else if (window.api) {
        try {
          await window.api("logout");
        } catch { }
      }

      localStorage.removeItem("session");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="app-nav" role="banner">
        <div className="app-nav__inner">
          {/* ✅ δεν εμφανίζεται πλέον MVAPP */}
          <div className="app-nav__left"></div>

          <div className="app-nav__right">
            <Link href="/welcome" className="nav-btn nav-btn--primary" id="welcomeCta">
              <span className="nav-ic" aria-hidden="true">
                <i className="fa-solid fa-house"></i>
              </span>
              <span className="nav-label">Welcome</span>
            </Link>

            <button
              id="btnLogout"
              className="nav-btn nav-btn--ghost"
              type="button"
              title="Logout"
              onClick={handleLogout}
            >
              <span className="nav-ic" aria-hidden="true">
                <i className="fa-solid fa-door-open"></i>
              </span>
              <span className="nav-label">Logout</span>
            </button>

            {/* ✅ Notifications (envelope) */}
            <button className="lang-btn notif-btn" type="button" aria-label="Notifications" title="Notifications">
              <i className="fa-solid fa-bell"></i>
              <span className="notif-badge" aria-label="3 notifications">
                3
              </span>
            </button>

            <button className="lang-btn settings-btn" type="button" aria-label="Settings" title="Settings">
              <i className="fa-solid fa-sliders"></i>
            </button>

            {/* ✅ Language flags */}
            <button className="lang-btn" type="button" aria-label="Ελληνικά" title="Ελληνικά">
              <img className="lang-flag lang-flag--gr" alt="GR" src="https://flagcdn.com/w40/gr.png" />
            </button>

            <button className="lang-btn" type="button" aria-label="English" title="English">
              <img className="lang-flag" alt="EN" src="https://flagcdn.com/w40/gb.png" />
            </button>
          </div>
        </div>
      </header>

      {/* APP SHELL */}
      <div className="app-shell">
        {/* LEFT SIDEBAR */}
        <aside className="side-nav" aria-label="Sidebar">
          <div className="side-nav__top">
            <Link className="side-brand" href="/" aria-label="MVAPP Home">
              <span className="side-brand__logo" aria-hidden="true">
                <i className="fa-solid fa-dumbbell"></i>
              </span>
              <span className="side-brand__name">MVAPP</span>
            </Link>
            <div className="side-sub">Workspace</div>
          </div>

          <nav className="side-menu" aria-label="Primary navigation">
            <Link className="side-item is-active" href="/">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-table-cells"></i>
              </span>
              <span className="side-txt">Dashboard</span>
            </Link>

            <Link className="side-item" href="/community">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-users"></i>
              </span>
              <span className="side-txt">Community</span>
              <span className="side-badge" aria-label="3 notifications">
                3
              </span>
            </Link>

            <Link className="side-item" href="/reports">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-chart-line"></i>
              </span>
              <span className="side-txt">Analytic</span>
            </Link>

            <Link className="side-item" href="/members">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-regular fa-id-badge"></i>
              </span>
              <span className="side-txt">Members</span>
            </Link>
          </nav>

          <div className={`side-group ${classesCollapsed ? "is-collapsed" : ""}`} aria-label="Classes">
            <div className="side-group__label">Classes</div>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-dumbbell"></i>
              </span>
              <span className="side-txt">Crossfit</span>
              <span className="side-count" aria-label="7 items">
                7
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-bolt"></i>
              </span>
              <span className="side-txt">TRX</span>
              <span className="side-count" aria-label="11 items">
                11
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-spa"></i>
              </span>
              <span className="side-txt">Yoga</span>
              <span className="side-count" aria-label="2 items">
                2
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-person-running"></i>
              </span>
              <span className="side-txt">HIIT</span>
              <span className="side-count" aria-label="5 items">
                5
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-heart-pulse"></i>
              </span>
              <span className="side-txt">Cardio</span>
              <span className="side-count" aria-label="8 items">
                8
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-hand-fist"></i>
              </span>
              <span className="side-txt">Boxing</span>
              <span className="side-count" aria-label="4 items">
                4
              </span>
            </Link>

            <Link className="side-item side-item--compact" href="/schedule">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-person-swimming"></i>
              </span>
              <span className="side-txt">Swimming</span>
              <span className="side-count" aria-label="3 items">
                3
              </span>
            </Link>

            <button
              className="side-more"
              type="button"
              onClick={() => setClassesCollapsed((v) => !v)}
            >
              <span>{classesCollapsed ? "Show more" : "Show less"}</span>
              <i
                className="fa-solid fa-chevron-down"
                aria-hidden="true"
                style={{ transform: classesCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}
              ></i>
            </button>
          </div>

          <div className="side-nav__bottom">
            <Link className="side-item" href="/help">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-circle-info"></i>
              </span>
              <span className="side-txt">Help</span>
            </Link>

            <Link className="side-item" href="/settings">
              <span className="side-ic" aria-hidden="true">
                <i className="fa-solid fa-sliders"></i>
              </span>
              <span className="side-txt">Settings</span>
            </Link>
          </div>
        </aside>

        {/* YOUR PAGE CONTENT */}
        <main className="app-content container container-custom" role="main">
          <h2 className="section-title mt-4 _hidden" id="secTitle">
            Ενότητες
          </h2>
          <p className="section-sub _hidden" id="secSub">
            Βασικές λειτουργίες γυμναστηρίου
          </p>

          <nav className="tiles mt-2" role="navigation" aria-label="Κύριες επιλογές">
            <Link className="tile _hidden" href="/members" role="link">
              <span className="hint" aria-hidden="true">
                1
              </span>
              <div className="ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8v-1a5 5 0 0 0-5-5H11a5 5 0 0 0-5 5v1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3>Μέλη</h3>
                <p>Προσθήκη, αναζήτηση & επεξεργασία μελών.</p>
              </div>
            </Link>

            <Link className="tile _hidden" href="/attendance" role="link">
              <span className="hint" aria-hidden="true">
                2
              </span>
              <div className="ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 2v4M16 2v4M4 9h16M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3>Παρουσίες</h3>
                <p>Καταχώριση & προβολή παρουσιών ανά ημέρα.</p>
              </div>
            </Link>

            <Link className="tile _hidden" href="/reports" role="link">
              <span className="hint" aria-hidden="true">
                3
              </span>
              <div className="ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 20V6M8 20v-6M12 20V4M16 20v-9M20 20v-3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3>Αναφορές</h3>
                <p>Σύνολα & γραφήματα σε εύρος ημερομηνιών.</p>
              </div>
            </Link>

            <Link className="tile _hidden" href="/card" role="link">
              <span className="hint" aria-hidden="true">
                4
              </span>
              <div className="ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="9" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M6.5 16.5c1-1.4 3-1.6 4.9-1.6 1.8 0 3.7.2 4.9 1.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path d="M14.5 9.5h4M14.5 12h4M14.5 14.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3>Καρτέλα Αθλητή</h3>
                <p>Στοιχεία μέλους & σωματομετρήσεις (εκτύπωση).</p>
              </div>
            </Link>

            <Link className="tile _hidden" href="/schedule" role="link">
              <span className="hint" aria-hidden="true">
                5
              </span>
              <div className="ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4 8h16M8 4v16M4 12h16M4 16h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3>Πρόγραμμα (Grid)</h3>
                <p>Ραντεβού ανά ώρα & επιβεβαίωση παρουσίας.</p>
              </div>
            </Link>
          </nav>
        </main>
      </div>
    </>
  );
}
