'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';


export default function AI_alt() { 
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50">
      {/* 3D Robot Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <InteractiveRobotSpline
          scene={ROBOT_SCENE_URL}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 pt-20 md:pt-32 lg:pt-40 px-4 md:px-8 pointer-events-none flex flex-col min-h-screen">
        <div className="text-center text-gray-900 drop-shadow-sm w-full max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-balance">
            Next-Generation AI Services
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Transform your business operations with our custom predictive models, generative AI platforms, and automated workflows.
          </p>
        </div>


      </div>
    </div>
  );
}
