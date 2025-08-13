"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type WaitlistPayload = {
  name: string;
  email: string;
};

export default function ShotcutLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: WaitlistPayload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
    };

    if (!payload.name || !payload.email) {
      setMessage("Please fill in your name and email.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const res = await fetch("/api/shotcut/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setMessage("Success! Please check your inbox for a confirmation.");
      (e.target as HTMLFormElement).reset();
    } catch {
      setMessage("You're on the list! (mock response)");
      (e.target as HTMLFormElement).reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${inter.className} scroll-smooth bg-neutral-950 text-neutral-100`}>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-20%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#7A00FF] blur-3xl opacity-20 animate-pulse" />
        <div className="absolute right-[-15%] bottom-[-10%] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-[#7A00FF] to-[#00D1FF] blur-3xl opacity-20" />
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a href="#" aria-label="Shotcut.ai home" className="flex items-center gap-3 font-semibold">
            <img src="/logo-rounded.png" alt="Shotcut.ai" className="h-8 w-8 rounded-lg" />
            <span className="text-lg tracking-tight">Shotcut.ai</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#how" className="hover:text-neutral-300">How it works</a>
            <a href="#features" className="hover:text-neutral-300">Features</a>
            <a href="#pricing" className="hover:text-neutral-300">Pricing</a>
            <a href="#use-cases" className="hover:text-neutral-300">Use cases</a>
            <a href="#waitlist" className="hover:text-neutral-300">Waitlist</a>
          </nav>
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Join the Waitlist
          </a>
          <button
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 transition hover:bg-slate-100 md:hidden"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t border-neutral-800 bg-neutral-950 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-3 text-sm">
              <a href="#how" className="py-2 hover:text-neutral-300">How it works</a>
              <a href="#features" className="py-2 hover:text-neutral-300">Features</a>
              <a href="#pricing" className="py-2 hover:text-neutral-300">Pricing</a>
              <a href="#use-cases" className="py-2 hover:text-neutral-300">Use cases</a>
              <a
                href="#waitlist"
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div data-reveal className="opacity-0 translate-y-4 transition duration-700">
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#7A00FF]" />
              AI-powered video automation
            </p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              From <span className="bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] bg-clip-text text-transparent">Script</span> to
              <span className="bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] bg-clip-text text-transparent"> Stunning Video</span> in Minutes
            </h1>
            <p className="mt-5 max-w-prose text-lg text-neutral-300">
              Generate professional videos instantly with AI — no editing skills required. Paste your script, pick a style and voiceover, and download in HD.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Join the Waitlist
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-800 px-6 py-3 text-base font-semibold text-neutral-100 transition hover:bg-neutral-900"
              >
                See how it works
              </a>
            </div>
          </div>

          <div data-reveal className="relative opacity-0 translate-y-4 transition duration-700">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-[#00D1FF]/20 to-[#7A00FF]/20 blur-2xl" />
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3 shadow-xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800">
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="hidden flex-col bg-neutral-900 md:flex">
                    <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 text-xs text-neutral-400">script.txt</span>
                    </div>
                    <div className="px-4 py-3 text-[13px] leading-6 text-neutral-300">
                      <pre className="whitespace-pre-wrap">Hook: Transform your ideas into stunning videos—instantly.
Intro: Today, we’ll explore how AI turns your script into scenes.
Scene 1: Title card with brand colors and upbeat music.
Scene 2: Voiceover explains the problem and solution.
Scene 3: Showcase dynamic B-roll and motion graphics.
CTA: Try Shotcut.ai and create your first video in minutes.</pre>
                    </div>
                  </div>
                  <div className="relative bg-black/95">
                    <img
                      src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop"
                      alt="Video preview placeholder"
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button aria-label="Play preview" className="group inline-flex items-center justify-center rounded-full bg-white/10 p-4 ring-1 ring-white/30 backdrop-blur transition hover:bg.white/20">
                        <svg className="h-10 w-10 text-white drop-shadow-md transition group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg.white/10 px-3 py-2 text-xs text-white ring-1 ring-white/20 backdrop-blur">
                      <span>Preview • Auto scenes, captions, and animations</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-[#00D1FF] to-[#7A00FF]" />
                        AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-neutral-400">Placeholder visual. Replace with your product demo or video.</p>
            </div>
          </div>
        </section>

        <section id="how" className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
              <p className="mt-3 text-neutral-300">Three simple steps — from idea to export.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {["Paste your script","Pick style & voiceover","Download your video"].map((title, i) => (
                <div key={title} data-reveal className="opacity-0 translate-y-4 transition duration-700 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm hover:shadow-md">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D1FF] to-[#7A00FF] text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                      {i === 0 && (<><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></>)}
                      {i === 1 && (<path d="M20 7l-8 10L4 12" />)}
                      {i === 2 && (<><path d="M4 4h16v12H4z" /><path d="M8 20h8" /></>)}
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{i===0?"Drop in your text. We parse your narrative into scenes automatically.":i===1?"Choose a template, motion style, and an AI voice in dozens of accents.":"Export in HD or social formats, ready to publish wherever your audience is."}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-neutral-800 bg-neutral-900/40">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful features built-in</h2>
              <p className="mt-3 text-neutral-300">Everything you need to go from script to share.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {["AI voiceovers in multiple accents","Automatic scene selection & animations","Custom branding & colors","Export in HD & social formats","Auto captions"].map((title) => (
                <div key={title} data-reveal className="opacity-0 translate-y-4 transition duration-700 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#00D1FF] to-[#7A00FF] text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <h3 className="font-semibold">{title}</h3>
                  </div>
                  <p className="text-sm text-neutral-300">Premium-quality results with no timeline editing required.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose your plan</h2>
              <p className="mt-3 text-neutral-300">Simple pricing while we’re in early access.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[{
                name: "Starter", price: "$19", period: "/mo",
                features: ["5 videos/month","Standard AI voices","720p exports"], highlight: false,
              },{
                name: "Pro", price: "$49", period: "/mo",
                features: ["Unlimited videos","Premium voices","1080p exports","Brand presets"], highlight: true,
              },{
                name: "Team", price: "$99", period: "/mo",
                features: ["Everything in Pro","Team library","Shared brand kits"], highlight: false,
              }].map((tier) => (
                <div key={tier.name} data-reveal className={`opacity-0 translate-y-4 transition duration-700 rounded-2xl border bg-neutral-900 p-6 shadow-sm ${tier.highlight ? "border-[#7A00FF] ring-1 ring-[#7A00FF]/30" : "border-neutral-800"}`}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                    {tier.highlight && <span className="rounded-full bg-[#7A00FF]/10 px-3 py-1 text-xs font-medium text-[#00D1FF]">Most popular</span>}
                  </div>
                  <div className="mt-4 flex items-end gap-1">
                    <div className="text-4xl font-extrabold">{tier.price}</div>
                    <div className="text-neutral-400">{tier.period}</div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-neutral-300">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#7A00FF]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#waitlist" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90">Join the Waitlist</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="bg-neutral-950">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Use cases</h2>
              <p className="mt-3 text-neutral-300">Designed for creators, teams, and educators.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
              {["Marketing videos","Explainers & tutorials","Social media reels & shorts","Educational content"].map((uc) => (
                <div key={uc} className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <h3 className="font-semibold">{uc}</h3>
                  <p className="mt-1 text-sm text-neutral-300">High-performing content, ready to publish.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-800 bg-neutral-900/40">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by early users</h2>
              <p className="mt-3 text-neutral-300">What our beta users are saying.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {["I turned a blog post into a full video in under 5 minutes. Unreal.", "The AI voiceovers sound human. My team saved days on video edits.", "Perfect for quick explainers and product demos. The styles look premium."].map((quote, idx) => (
                <figure key={idx} data-reveal className="opacity-0 translate-y-4 transition duration-700 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
                  <blockquote className="text-neutral-200">“{quote}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <img className="h-9 w-9 rounded-full object-cover" src={[
                      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=128&q=80&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=128&q=80&auto=format&fit=crop",
                    ][idx]} alt="User avatar" />
                    <div className="text-sm">
                      <div className="font-medium">Beta User</div>
                      <div className="text-neutral-400">Early Access</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-950">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] p-1 opacity-0 translate-y-4 transition duration-700">
              <div className="rounded-[22px] bg-neutral-950 p-10 text-center sm:p-12">
                <h3 className="text-2xl font-bold tracking-tight text.white sm:text-3xl">Your Next Video is Just a Script Away.</h3>
                <p className="mt-3 text-neutral-300">Join the waitlist to get early access and exclusive launch perks.</p>
                <div className="mt-6">
                  <a href="#waitlist" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90">
                    Join the Waitlist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="border-t border-neutral-800 bg-neutral-900/40">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center opacity-0 translate-y-4 transition duration-700">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Be first in line</h2>
              <p className="mt-3 text-neutral-300">Sign up to get notified the moment Shotcut.ai launches.</p>
            </div>
            <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-xl" data-reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-200">Name</label>
                  <input id="name" name="name" type="text" placeholder="Alex Morgan" required className="mt-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder-neutral-500 shadow-sm transition focus:border-[#00D1FF] focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/30" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-neutral-200">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required className="mt-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder-neutral-500 shadow-sm transition focus:border-[#00D1FF] focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/30" />
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
                <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7A00FF] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <span>Join the Waitlist</span>
                  )}
                </button>
                <p className="text-sm text-neutral-300" aria-live="polite">{message}</p>
              </div>
              <p className="mt-4 text-xs text-neutral-400">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-neutral-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Shotcut.ai</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-200">Privacy</a>
            <a href="#" className="hover:text-neutral-200">Terms</a>
            <a href="#waitlist" className="hover:text-neutral-200">Get early access</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


