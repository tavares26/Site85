"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  agency,
  allProfessionals,
  barbers,
  brooklynServices,
  fifthServices,
  stylists,
  takenSlots,
  timeSlots,
  type Universe,
} from "@/data/fictional-data";

type Draft = {
  universe: Universe;
  serviceId: string | null;
  proId: string | null;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
  firstVisit: boolean;
};

const STEPS = [
  "Service",
  "Professional",
  "Date",
  "Time",
  "Details",
  "Review",
] as const;

const empty: Draft = {
  universe: "brooklyn",
  serviceId: null,
  proId: null,
  date: null,
  time: null,
  name: "",
  email: "",
  phone: "",
  notes: "",
  firstVisit: false,
};

type Day = { iso: string; weekday: string; day: string; month: string; closed: boolean };

function buildDays(universe: Universe): Day[] {
  const out: Day[] = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  for (let i = 1; i <= 16; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dow = d.getDay();
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      // Brooklyn is dark on Mondays. Fifth takes Sunday and Monday by request only.
      closed: universe === "brooklyn" ? dow === 1 : dow === 0 || dow === 1,
    });
  }
  return out;
}

const emailLooksReal = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function BookingFlow() {
  const params = useSearchParams();
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(empty);
  const [days, setDays] = useState<Day[]>([]);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const [ref] = useState(() => `BF-${Math.floor(1000 + Math.random() * 8999)}`);

  const isBk = draft.universe === "brooklyn";

  // Deep link from a barber or stylist page.
  useEffect(() => {
    const pro = params.get("pro");
    if (!pro) return;
    const found = allProfessionals.find((p) => p.id === pro);
    if (!found) return;
    setDraft((d) => ({ ...d, universe: found.universe, proId: found.id }));
  }, [params]);

  // Dates are built on the client so the server never renders a different day.
  useEffect(() => setDays(buildDays(draft.universe)), [draft.universe]);

  const services = isBk ? brooklynServices : fifthServices;
  const team = isBk ? barbers : stylists;

  const service = services.find((s) => s.id === draft.serviceId) ?? null;
  const pro = team.find((p) => p.id === draft.proId) ?? null;

  const taken = draft.proId ? (takenSlots[draft.proId] ?? []) : [];

  const detailsValid = draft.name.trim().length >= 2 && emailLooksReal(draft.email);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!draft.serviceId;
      case 1:
        return !!draft.proId;
      case 2:
        return !!draft.date;
      case 3:
        return !!draft.time;
      case 4:
        return detailsValid;
      default:
        return true;
    }
  }, [step, draft, detailsValid]);

  const go = (next: number) => {
    setTouched(false);
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  /* ---------------------------------------------------------------- theme */
  const shell = isBk ? "tex-brick tex-grain text-bk-paper" : "tex-stock text-ff-noir";
  const h = isBk
    ? "font-slab text-huge uppercase text-bk-paper"
    : "font-didone text-huge text-ff-noir";
  const sub = isBk
    ? "font-grot text-xl text-bk-paper/65"
    : "font-garamond text-2xl text-ff-noir/65";
  const chip = (on: boolean) =>
    isBk
      ? `border px-5 py-4 text-left transition-colors ${
          on
            ? "border-bk-brass bg-bk-brass/12 text-bk-paper"
            : "border-bk-brass/25 text-bk-paper/75 hover:border-bk-brass/70"
        }`
      : `border px-5 py-4 text-left transition-colors ${
          on
            ? "border-ff-rouge bg-ff-rouge/8 text-ff-noir"
            : "border-ff-noir/20 text-ff-noir/75 hover:border-ff-noir/60"
        }`;
  const primary = isBk
    ? "stamp bg-bk-brass px-7 py-3.5 text-bk-ink transition-colors hover:bg-bk-paper disabled:cursor-not-allowed disabled:bg-bk-brass/25 disabled:text-bk-paper/40"
    : "stamp bg-ff-noir px-7 py-3.5 text-ff-chalk transition-colors hover:bg-ff-rouge disabled:cursor-not-allowed disabled:bg-ff-noir/20 disabled:text-ff-noir/40";
  const ghost = isBk
    ? "stamp border border-bk-brass/35 px-5 py-3.5 text-bk-paper/70 hover:border-bk-brass"
    : "stamp border border-ff-noir/25 px-5 py-3.5 text-ff-noir/70 hover:border-ff-noir";
  const field = isBk
    ? "w-full border-b border-bk-brass/35 bg-transparent py-3 font-grot text-xl text-bk-paper placeholder:text-bk-paper/30 focus:border-bk-brass"
    : "w-full border-b border-ff-noir/25 bg-transparent py-3 font-garamond text-xl text-ff-noir placeholder:text-ff-noir/30 focus:border-ff-rouge";

  /* --------------------------------------------------------------- booked */
  if (done) {
    return (
      <section className={`flex min-h-screen flex-col justify-center px-5 py-28 sm:px-8 lg:px-12 ${shell}`}>
        <div className="mx-auto w-full max-w-3xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`stamp inline-block px-3 py-1.5 ${
                isBk ? "bg-bk-wine text-bk-paper" : "bg-ff-rouge text-ff-chalk"
              }`}
            >
              {agency.demoWarning}
            </span>

            <h1 className={`mt-8 ${isBk ? "font-slab text-mega uppercase leading-[0.84] text-bk-paper" : "font-didone text-mega leading-[0.84] text-ff-noir"}`}>
              You&rsquo;re
              <span className={isBk ? "block text-bk-brass" : "block italic text-ff-rouge"}>
                booked.
              </span>
            </h1>

            <dl className={`mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 ${isBk ? "" : ""}`}>
              {[
                ["House", isBk ? "The Brooklyn Room" : "The Fifth Room"],
                ["Service", service?.name ?? ""],
                ["With", pro?.name ?? ""],
                ["When", `${draft.date} at ${draft.time}`],
                ["Under", draft.name],
                ["Reference", ref],
              ].map(([k, v]) => (
                <div key={k} className={isBk ? "rule-brass pt-3" : "rule-hair pt-3"}>
                  <dt className={`stamp ${isBk ? "text-bk-paper/45" : "text-ff-noir/45"}`}>{k}</dt>
                  <dd className={isBk ? "mt-1 font-grot text-2xl text-bk-paper" : "mt-1 font-didone text-2xl text-ff-noir"}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className={`mt-10 max-w-measure ${sub}`}>
              Nothing was sent, nothing was saved and no chair is being held. Refresh the
              page and the whole appointment disappears, which is exactly what a
              demonstration should do.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                className={primary}
                onClick={() => {
                  setDone(false);
                  setDraft(empty);
                  setStep(0);
                }}
              >
                Book another
              </button>
              <Link href={isBk ? "/brooklyn" : "/fifth"} className={ghost}>
                Back to the {isBk ? "shop" : "salon"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- steps */
  return (
    <section className={`min-h-screen px-5 py-28 sm:px-8 sm:py-32 lg:px-12 ${shell}`}>
      <div className="mx-auto w-full max-w-5xl">
        <span
          className={`stamp inline-block px-3 py-1.5 ${
            isBk ? "bg-bk-wine text-bk-paper" : "bg-ff-rouge text-ff-chalk"
          }`}
        >
          {agency.demoWarning}
        </span>

        {/* Progress. This content really is a sequence, so it gets numbers. */}
        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {STEPS.map((label, i) => {
            const state = i < step ? "past" : i === step ? "now" : "next";
            return (
              <li key={label} className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => go(i)}
                  className={`stamp flex items-center gap-2 transition-colors ${
                    state === "now"
                      ? isBk
                        ? "text-bk-brass"
                        : "text-ff-rouge"
                      : state === "past"
                        ? isBk
                          ? "text-bk-paper/60 hover:text-bk-brass"
                          : "text-ff-noir/60 hover:text-ff-rouge"
                        : isBk
                          ? "cursor-default text-bk-paper/25"
                          : "cursor-default text-ff-noir/25"
                  }`}
                  aria-current={state === "now" ? "step" : undefined}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem] ${
                      state === "past"
                        ? isBk
                          ? "border-bk-brass bg-bk-brass text-bk-ink"
                          : "border-ff-rouge bg-ff-rouge text-ff-chalk"
                        : state === "now"
                          ? isBk
                            ? "border-bk-brass"
                            : "border-ff-rouge"
                          : isBk
                            ? "border-bk-paper/20"
                            : "border-ff-noir/20"
                    }`}
                  >
                    {state === "past" ? <Check size={12} strokeWidth={3} /> : i + 1}
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            {/* ------------------------------------------------ 1. Service */}
            {step === 0 && (
              <div>
                <h1 className={h}>Pick a service</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  Two houses, two lists. Choose the room first.
                </p>

                <div className="mt-8 flex gap-3" role="group" aria-label="Choose a house">
                  {(["brooklyn", "fifth"] as Universe[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setDraft({ ...empty, universe: u })}
                      className={`stamp px-6 py-3 transition-colors ${
                        draft.universe === u
                          ? isBk
                            ? "bg-bk-brass text-bk-ink"
                            : "bg-ff-noir text-ff-chalk"
                          : isBk
                            ? "border border-bk-brass/35 text-bk-paper/70"
                            : "border border-ff-noir/25 text-ff-noir/70"
                      }`}
                      aria-pressed={draft.universe === u}
                    >
                      {u === "brooklyn" ? "Brooklyn, barbershop" : "Fifth, salon"}
                    </button>
                  ))}
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => set("serviceId", s.id)}
                      className={chip(draft.serviceId === s.id)}
                      aria-pressed={draft.serviceId === s.id}
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className={isBk ? "font-slab text-2xl uppercase" : "font-didone text-2xl"}>
                          {s.name}
                        </span>
                        <span className="stamp shrink-0 opacity-70">${s.price}</span>
                      </span>
                      <span className={`mt-1.5 block ${isBk ? "font-grot text-lg opacity-65" : "font-garamond text-lg opacity-70"}`}>
                        {s.duration} minutes. {s.blurb}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------- 2. Professional */}
            {step === 1 && (
              <div>
                <h1 className={h}>Choose who</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  Everyone here can do {service?.name.toLowerCase()}. They do not all do it
                  the same way.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {team.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set("proId", p.id)}
                      className={`${chip(draft.proId === p.id)} flex gap-4`}
                      aria-pressed={draft.proId === p.id}
                    >
                      <span className="relative h-24 w-20 shrink-0 overflow-hidden bg-black/30">
                        <Image
                          src={p.portrait}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className={isBk ? "block font-slab text-xl uppercase" : "block font-didone text-xl"}>
                          {p.name}
                        </span>
                        <span className="stamp mt-1 block opacity-60">{p.chair}</span>
                        <span className={`mt-1.5 block ${isBk ? "font-grot text-base opacity-70" : "font-garamond text-base opacity-75"}`}>
                          {p.specialties.slice(0, 2).join(", ")}
                        </span>
                        <span className={`stamp mt-1 block ${isBk ? "text-bk-brass" : "text-ff-rouge"}`}>
                          {p.rating.toFixed(1)} / {p.reviews} reviews
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------------------------- 3. Date */}
            {step === 2 && (
              <div>
                <h1 className={h}>Pick a day</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  {isBk
                    ? "The shop is dark on Mondays."
                    : "Sundays and Mondays are by request only."}
                </p>

                {days.length === 0 ? (
                  <p className={`mt-10 ${sub}`}>Loading the diary.</p>
                ) : (
                  <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                    {days.map((d) => (
                      <button
                        key={d.iso}
                        type="button"
                        disabled={d.closed}
                        onClick={() => set("date", d.iso)}
                        className={`${chip(draft.date === d.iso)} px-3 py-3 text-center ${
                          d.closed ? "cursor-not-allowed opacity-25" : ""
                        }`}
                        aria-pressed={draft.date === d.iso}
                      >
                        <span className="stamp block opacity-60">{d.weekday}</span>
                        <span className={isBk ? "mt-1 block font-slab text-2xl" : "mt-1 block font-didone text-2xl"}>
                          {d.day}
                        </span>
                        <span className="stamp block opacity-45">{d.month}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --------------------------------------------------- 4. Time */}
            {step === 3 && (
              <div>
                <h1 className={h}>Pick a time</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  {pro?.name} on {draft.date}. Faded slots are already taken.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
                  {timeSlots.map((t) => {
                    const gone = taken.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={gone}
                        onClick={() => set("time", t)}
                        className={`${chip(draft.time === t)} px-3 py-3 text-center ${
                          gone ? "cursor-not-allowed line-through opacity-25" : ""
                        }`}
                        aria-pressed={draft.time === t}
                      >
                        <span className={isBk ? "font-slab text-xl" : "font-didone text-xl"}>{t}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ------------------------------------------------ 5. Details */}
            {step === 4 && (
              <div>
                <h1 className={h}>Your details</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  Nothing here leaves the browser. It is here so the flow is complete.
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="bk-name" className={`stamp block ${isBk ? "text-bk-paper/50" : "text-ff-noir/50"}`}>
                      Name
                    </label>
                    <input
                      id="bk-name"
                      className={field}
                      value={draft.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="First and last"
                      autoComplete="name"
                      aria-invalid={touched && draft.name.trim().length < 2}
                    />
                    {touched && draft.name.trim().length < 2 && (
                      <p className={`stamp mt-2 ${isBk ? "text-bk-wine" : "text-ff-rouge"}`}>
                        Add a name so the chair knows who is coming.
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="bk-email" className={`stamp block ${isBk ? "text-bk-paper/50" : "text-ff-noir/50"}`}>
                      Email
                    </label>
                    <input
                      id="bk-email"
                      type="email"
                      className={field}
                      value={draft.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={touched && !emailLooksReal(draft.email)}
                    />
                    {touched && !emailLooksReal(draft.email) && (
                      <p className={`stamp mt-2 ${isBk ? "text-bk-wine" : "text-ff-rouge"}`}>
                        That address is missing something.
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="bk-phone" className={`stamp block ${isBk ? "text-bk-paper/50" : "text-ff-noir/50"}`}>
                      Phone, optional
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      className={field}
                      value={draft.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="(212) 555-0100"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="sm:col-span-1 sm:pt-7">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.firstVisit}
                        onChange={(e) => set("firstVisit", e.target.checked)}
                        className={`h-5 w-5 ${isBk ? "accent-[#B69A6A]" : "accent-[#8A1520]"}`}
                      />
                      <span className={isBk ? "font-grot text-lg text-bk-paper/80" : "font-garamond text-lg text-ff-noir/80"}>
                        First time here
                      </span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="bk-notes" className={`stamp block ${isBk ? "text-bk-paper/50" : "text-ff-noir/50"}`}>
                      Anything we should know
                    </label>
                    <textarea
                      id="bk-notes"
                      rows={3}
                      className={`${field} resize-none`}
                      value={draft.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Allergies, a photo you want to bring, how long since the last cut."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------- 6. Review */}
            {step === 5 && (
              <div>
                <h1 className={h}>Read it back</h1>
                <p className={`mt-4 max-w-measure ${sub}`}>
                  Last look before the confirmation that confirms nothing.
                </p>

                <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {[
                    ["House", isBk ? "The Brooklyn Room, 214 Wythe Avenue" : "The Fifth Room, 1067 Fifth Avenue"],
                    ["Service", service ? `${service.name}, ${service.duration} min, $${service.price}` : "—"],
                    ["With", pro ? `${pro.name}, ${pro.chair}` : "—"],
                    ["Day", draft.date ?? "—"],
                    ["Time", draft.time ?? "—"],
                    ["Name", draft.name || "—"],
                    ["Email", draft.email || "—"],
                    ["Phone", draft.phone || "Not given"],
                    ["First visit", draft.firstVisit ? "Yes" : "No"],
                    ["Notes", draft.notes || "None"],
                  ].map(([k, v]) => (
                    <div key={k} className={isBk ? "rule-brass pt-3" : "rule-hair pt-3"}>
                      <dt className={`stamp ${isBk ? "text-bk-paper/45" : "text-ff-noir/45"}`}>{k}</dt>
                      <dd className={isBk ? "mt-1 font-grot text-xl text-bk-paper" : "mt-1 font-garamond text-xl text-ff-noir"}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ---------------------------------------------------- navigation */}
        <div className="mt-14 flex flex-wrap items-center gap-4">
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} className={ghost}>
              Back
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className={primary}
              disabled={step !== 4 && !canAdvance}
              onClick={() => {
                if (step === 4 && !detailsValid) {
                  setTouched(true);
                  return;
                }
                go(step + 1);
              }}
            >
              Continue to {STEPS[step + 1]}
            </button>
          ) : (
            <button type="button" className={primary} onClick={() => setDone(true)}>
              Confirm the demo booking
            </button>
          )}

          {step === 4 && !detailsValid && touched && (
            <span className={`stamp ${isBk ? "text-bk-wine" : "text-ff-rouge"}`}>
              Two fields still need you.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
