"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // αν δεν έχεις lib στο root, πες μου πού το έβαλες

type Workout = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  duration_minutes: number;
  notes: string | null;
  is_active: boolean;
  created_at: string;
};

type DbStatus =
  | { state: "checking" }
  | { state: "ok"; message: string }
  | { state: "error"; message: string };

export default function WorkoutsPage() {
  const [status, setStatus] = useState<DbStatus>({ state: "checking" });
  const [rows, setRows] = useState<Workout[]>([]);

  useEffect(() => {
    async function run() {
      setStatus({ state: "checking" });

      // “Ping”/health check: κάνουμε ένα μικρό query
      // Head: true -> δεν κατεβάζει rows, μόνο ελέγχει ότι επιτρέπεται το SELECT
      const ping = await supabase
        .from("workouts")
        .select("id", { head: true, count: "exact" });

      if (ping.error) {
        setStatus({
          state: "error",
          message: `DB Error: ${ping.error.message}`,
        });
        return;
      }

      setStatus({
        state: "ok",
        message: `Connected ✅ (workouts rows: ${ping.count ?? "unknown"})`,
      });

      // Τώρα κανονικό query για εμφάνιση δεδομένων
      const res = await supabase
        .from("workouts")
        .select("*")
        .order("created_at", { ascending: false });

      if (res.error) {
        setStatus({
          state: "error",
          message: `Query Error: ${res.error.message}`,
        });
        return;
      }

      setRows((res.data as Workout[]) ?? []);
    }

    run();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Workouts</h1>

      <div style={{ marginTop: 12, padding: 12, borderRadius: 10, border: "1px solid #ddd" }}>
        {status.state === "checking" && <b>Checking DB connection…</b>}
        {status.state === "ok" && <b style={{ color: "green" }}>{status.message}</b>}
        {status.state === "error" && (
          <b style={{ color: "crimson" }}>{status.message}</b>
        )}

        <div style={{ marginTop: 8, fontSize: 13, opacity: 0.8 }}>
          Using env: <code>NEXT_PUBLIC_SUPABASE_URL</code> + <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        {rows.length === 0 && status.state !== "checking" && (
          <p>No rows found (or no access).</p>
        )}

        {rows.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Title</th>
                <th style={th}>Difficulty</th>
                <th style={th}>Minutes</th>
                <th style={th}>Active</th>
                <th style={th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => (
                <tr key={w.id}>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{w.title}</div>
                    {w.notes && (
                      <div style={{ fontSize: 13, opacity: 0.8 }}>{w.notes}</div>
                    )}
                  </td>
                  <td style={td}>{w.difficulty}</td>
                  <td style={td}>{w.duration_minutes}</td>
                  <td style={td}>{w.is_active ? "Yes" : "No"}</td>
                  <td style={td}>{new Date(w.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  padding: "10px 8px",
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "10px 8px",
  verticalAlign: "top",
};
