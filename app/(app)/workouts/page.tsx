"use client";

import { useEffect, useState } from "react";
import "./workouts.css";
import { supabase } from "../../../lib/supabaseClient";

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

      const ping = await supabase
        .from("workouts")
        .select("id", { head: true, count: "exact" });

      if (ping.error) {
        setStatus({ state: "error", message: `DB Error: ${ping.error.message}` });
        return;
      }

      setStatus({
        state: "ok",
        message: `Connected (workouts rows: ${ping.count ?? "unknown"})`,
      });

      const res = await supabase
        .from("workouts")
        .select("*")
        .order("created_at", { ascending: false });

      if (res.error) {
        setStatus({ state: "error", message: `Query Error: ${res.error.message}` });
        return;
      }

      setRows((res.data as Workout[]) ?? []);
    }

    run();
  }, []);

  const statusClass =
    status.state === "checking"
      ? "status--checking"
      : status.state === "ok"
      ? "status--ok"
      : "status--error";

  return (
    <main className="workouts">
      <h1 className="workouts__title">Workouts</h1>


      <section className="tableWrap" style={{ marginTop: 16 }}>
        {rows.length === 0 && status.state !== "checking" && (
          <div className="card" style={{ marginTop: 16 }}>
            <p style={{ margin: 0 }}>No rows found (or no access).</p>
            <p className="muted" style={{ marginTop: 8 }}>
              Αν έχεις RLS χωρίς policy για SELECT, θα είναι άδειο ή error.
            </p>
          </div>
        )}

        {rows.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Minutes</th>
                <th>Active</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => (
                <tr key={w.id}>
                  <td>
                    <div className="rowTitle">{w.title}</div>
                    {w.notes && <div className="rowNotes">{w.notes}</div>}
                  </td>
                  <td>
                    <span className={`pill pill--${w.difficulty}`}>
                      {w.difficulty}
                    </span>
                  </td>
                  <td>{w.duration_minutes}</td>
                  <td>{w.is_active ? "Yes" : "No"}</td>
                  <td>{new Date(w.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
