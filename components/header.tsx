"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex-1 ml-12 lg:ml-0">
          <h1 className="text-xl md:text-2xl font-semibold">
            {getGreeting()}, User
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
