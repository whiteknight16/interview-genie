"use client";

import React, { useState } from "react";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import ModeToggle from "@/components/ModeToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Left: Logo */}
      <Link href="/" prefetch={true}>
        <h1 className="text-2xl font-bold">
          Interview<span className="text-primary">Genie</span>
        </h1>
      </Link>

      {/* Middle: Nav Links (Hidden on Mobile) */}
      <div className="hidden md:flex gap-6">
        <SignedIn>
          <Link href="/dashboard" className="hover:text-primary">
            Industrial Insights
          </Link>
          <Link href="/resume" className="hover:text-primary">
            Build Resume
          </Link>
          <Link href="/ai-cover-letter" className="hover:text-primary">
            Build Cover Letter
          </Link>
          <Link href="/interview" className="hover:text-primary">
            Interview
          </Link>
        </SignedIn>
      </div>

      {/* Right: Actions (Mode Toggle + Auth) */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-gray-900 shadow-md md:hidden flex flex-col items-center gap-4 py-4">
          <SignedIn>
            <Link href="/dashboard" className="hover:text-primary">
              Industrial Insights
            </Link>
            <Link href="/resume" className="hover:text-primary">
              Build Resume
            </Link>
            <Link href="/ai-cover-letter" className="hover:text-primary">
              Build Cover Letter
            </Link>
            <Link href="/interview" className="hover:text-primary">
              Interview
            </Link>
          </SignedIn>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
