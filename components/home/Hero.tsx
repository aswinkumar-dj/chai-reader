"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mb-20 mt-8">
      <div className="relative flex w-full flex-col items-start justify-center gap-8 overflow-visible rounded-[12px] border border-[#e9e9e9] bg-white px-8 py-10 md:h-[237px] md:px-12 lg:pr-[380px]">
        {/* Text content -- capped width so it never runs under the
            illustration on the right. lg:pr-[380px] on the parent card
            reserves space for the illustration at the same breakpoint
            it becomes visible, so there's nothing to overlap. */}
        <div className="max-w-[576px]">
          <h1
            className="bg-clip-text text-[28px] leading-tight tracking-[-0.28px] text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(89.99999647896357deg, rgb(64,41,64) 0%, rgb(47,42,57) 32.632%, rgb(35,15,92) 58.304%, rgb(47,42,57) 77.29%, rgb(36,23,36) 100%)",
            }}
          >
            <span className="font-medium">The Echo of our </span>
            <span className="font-semibold">Silent Pages</span>
          </h1>

          <p className="mt-4 text-justify text-base leading-[1.6] text-[#404040] opacity-80">
            A global publishing technology pavilion designed to run alongside
            major international book fairs
          </p>

          <Link
            href="#genres"
            className="mt-6 inline-flex items-center gap-3 text-lg font-medium text-[#433e38] transition-opacity hover:opacity-70"
          >
            Explore More
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Illustration -- only shown from lg (1024px) upward, matching
            the reserved padding above. Below lg, tablet/mobile get a
            clean text-only hero rather than a cramped overlap. clamp()
            scales it fluidly up to your confirmed max size. */}
        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{
            width: "clamp(320px, 34vw, 465.05px)",
            height: "clamp(260px, 28vw, 381.06px)",
          }}
        >
          <Image
            src="/hero-illustration.png"
            alt="Life of the Wild book illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}