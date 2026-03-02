"use client";

import { usePathname } from 'next/navigation';
import Link from "next/link";

const links = [
  { label: "Search ticket", path: "/search" }, 
  { label: "My Booking", path: "/booking" }
];

export default function AccelokaNavbar() {
  const pathname = usePathname();

  return (
    <div
      className={
        "flex items-center gap-3 px-12 py-10 font-(family-name:--font-schibsted)"
      }
    >
      {/* Pill Navbar */}
      <nav className="flex flex-1 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <span className="mr-2 text-3xl font-medium text-blue-600 tracking-tight whitespace-nowrap">
          Acceloka
        </span>

        <div className="flex flex-1 items-center justify-center gap-2 pr-20">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-full px-5 py-2 text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600!"
                    : "text-gray-500 hover:bg-black/5 hover:text-gray-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500 shadow transition-transform duration-200 hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    </div>
  );
}