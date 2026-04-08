'use client';

import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface StackingCardItem {
  title: string;
  description: string;
  image: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  image: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({
  i,
  title,
  description,
  image,
  color,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[90%] sm:w-[80%] md:w-[70%] rounded-3xl p-6 sm:p-8 md:p-10 origin-top border border-white/20 shadow-xl shadow-black/[0.08]"
      >
        {/* Card number + divider */}
        <div className="flex items-center mb-1">
          <span className="text-[11px] font-mono text-white/30 tracking-[0.25em]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 ml-4 bg-white/10" />
        </div>

        <h2 className="text-xl sm:text-2xl text-center font-semibold text-white mt-2">
          {title}
        </h2>

        <div className="flex flex-col md:flex-row h-full mt-5 gap-6 md:gap-10">
          <div className="w-full md:w-[40%] relative md:top-[10%]">
            <p className="text-sm text-white/80 leading-relaxed">
              {description}
            </p>
            <span className="flex items-center gap-2 pt-4">
              <a
                href="#"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-white"
              >
                <span className="underline underline-offset-4 decoration-white/30 group-hover/link:decoration-white transition-colors">
                  Learn more
                </span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 group-hover/link:bg-white/25 transition-colors">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="translate-x-px"
                  >
                    <path
                      d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </span>
          </div>

          <div className="relative w-full md:w-[60%] h-48 md:h-full rounded-2xl overflow-hidden ring-1 ring-white/10">
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface StackingCardsProps {
  items: StackingCardItem[];
  className?: string;
}

export default function StackingCards({ items, className }: StackingCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className={cn('relative', className)}>
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.05;
        return (
          <Card
            key={item.title}
            i={i}
            title={item.title}
            description={item.description}
            image={item.image}
            color={item.color}
            progress={scrollYProgress}
            range={[i * (1 / items.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
