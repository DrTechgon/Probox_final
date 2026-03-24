"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const quickPoints = [
  {
    icon: Sparkles,
    label: "Interactive demo",
    detail: "A live 3D guide that gives the landing page a clearer focal point.",
  },
  {
    icon: Workflow,
    label: "Client-side only",
    detail: "Lazy-loaded Spline keeps the server-rendered shell stable.",
  },
  {
    icon: ShieldCheck,
    label: "Responsive layout",
    detail: "Stacks cleanly on mobile while preserving a framed scene on desktop.",
  },
];

export default function AIHero() {
  return (
    <section className="relative overflow-hidden bg-[#f6f8fc] pt-28 text-slate-950 md:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(201,133,69,0.16),_transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(15,23,42,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.24)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 px-6 pb-20 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/[0.85] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#c98545]" />
            AI Experience Layer
          </div>

          <h1 className="mt-6 font-display text-[clamp(3.2rem,7vw,6.35rem)] font-bold leading-[0.94] tracking-[-0.055em] text-slate-950">
            Meet Whobee, the interactive 3D guide for modern AI experiences.
          </h1>

          <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-slate-600 md:text-[1.08rem]">
            This section turns the robot scene into a proper landing-page hero
            instead of a standalone demo. The structure stays light-themed,
            readable, and usable while keeping the Spline scene interactive.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c98545] px-6 py-3 text-sm font-semibold text-[#0f2145] shadow-[0_18px_34px_rgba(201,133,69,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#b87435]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#why-probox"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/[0.88] px-6 py-3 text-sm font-semibold text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
            >
              Why it fits here
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {quickPoints.map(({ icon: Icon, label, detail }) => (
              <Card
                key={label}
                className="rounded-[1.75rem] border-white/80 bg-white/[0.78] shadow-[0_20px_45px_rgba(15,23,42,0.06)] backdrop-blur"
              >
                <CardHeader className="pb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/[0.04] text-[#c98545]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg text-slate-900">
                    {label}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
                    {detail}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative h-[440px] overflow-hidden rounded-[2.25rem] border border-white/75 bg-white/[0.72] shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur md:h-[560px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(201,133,69,0.18),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.7),rgba(248,250,252,0.4))]" />

            <div className="absolute inset-0 p-4 md:p-6">
              <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-full border border-white/70 bg-white/[0.72] px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur md:inset-x-6 md:top-6">
                <span>Whobee Live Scene</span>
                <span className="inline-flex items-center gap-2 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Interactive
                </span>
              </div>

              <InteractiveRobotSpline
                scene={ROBOT_SCENE_URL}
                className="absolute inset-x-0 bottom-0 top-10 md:top-12"
              />

              <Card className="absolute bottom-5 left-5 hidden w-56 rounded-[1.6rem] border-white/[0.85] bg-white/[0.88] shadow-[0_22px_42px_rgba(15,23,42,0.08)] backdrop-blur lg:block">
                <CardContent className="p-3">
                  <div
                    className="h-28 rounded-[1.25rem] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80")',
                    }}
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Visual Accent
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Supporting robotics imagery keeps the hero from feeling
                    empty around the main scene.
                  </p>
                </CardContent>
              </Card>

              <Card className="absolute bottom-5 right-5 w-[13rem] rounded-[1.6rem] border-white/[0.85] bg-white/[0.90] shadow-[0_22px_42px_rgba(15,23,42,0.08)] backdrop-blur md:w-[15rem]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Bot className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Scene Role
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        AI hero companion
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Keep `scene` as the only required prop so this stays easy to
                    reuse with alternate Spline URLs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
