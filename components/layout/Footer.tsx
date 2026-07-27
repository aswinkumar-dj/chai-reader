import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  "Quick Links": ["About", "Contact", "Home", "FAQ", "Support / Help Center"],
  "For Partners": ["For Authors", "For Publishers", "Become a Partner"],
  Legal: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden rounded-[12px] bg-[#f5f9ff] px-8 pb-0 pt-10 md:px-16">
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-[535px]">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Chai Reader" width={140} height={28} />
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-[#686868]">
            Chai Reader is an AI-powered book commerce platform designed to
            transform how people discover and experience books—through
            reading, chatting with books, and more. It is owned and operated
            by Ailaysa Technologies Pvt Ltd.
          </p>
        </div>

        {/* 2 columns on tablet (more room per column), 3 only from lg up */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-16">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-semibold text-black">{heading}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[#686868] transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Wave graphic -- negative margins pull it past the footer's own
          padding so it reaches both edges of the rounded card, instead
          of being constrained to the inner content width like the text
          above it. overflow-hidden on the footer itself clips it back
          to the card's rounded corners. */}
      <svg
        className="relative z-0 mt-10 -mb-1 -mx-8 w-[calc(100%+4rem)] md:-mx-16 md:w-[calc(100%+8rem)]"
        viewBox="0 0 1366 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C300,110 1000,10 1366,60 L1366,120 L0,120 Z"
          fill="#dbe7fb"
        />
        <path
          d="M0,80 C400,30 900,120 1366,70 L1366,120 L0,120 Z"
          fill="#c7d9fa"
        />
        <path
          d="M0,95 C350,60 950,110 1366,85 L1366,120 L0,120 Z"
          fill="#b6cdfb"
        />
      </svg>
    </footer>
  );
}