"use client";

import { Suspense, lazy } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-50 text-gray-900">
            <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Loading scene</span>
          </div>
        }
      >
        <Spline scene={scene} className="h-full w-full" />
      </Suspense>
    </div>
  );
}
