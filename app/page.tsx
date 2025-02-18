import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 md:px-12 text-center text-black dark:text-white">
      {/* Logo / Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Interview<span className="text-primary">Genie</span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
        Landing your dream job just got easier! <b>Interview Genie</b> is an
        AI-driven platform designed to prepare you with{" "}
        <b>
          realistic mock interviews, AI-powered resume building, and smart cover
          letter generation.
        </b>{" "}
        Whether you're a fresh graduate or a seasoned professional, our
        intelligent tools help you{" "}
        <b>boost confidence, refine answers, and optimize job applications</b>.
      </p>

      {/* CTA Button */}
      <Link href="/dashboard" prefetch={true}>
        <Button className="mt-6 px-6 py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
