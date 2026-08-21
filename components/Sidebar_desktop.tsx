"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard"
  },
  {
    name: "Training",
    href: "/training"
  },
  {
    name: "Nutrition",
    href: "/nutrition"
  },
];

type SidebarProps = {
  username: string;
  avatar_url: string;
};

export default function Sidebar({
  username,
  avatar_url
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 shrink-0 flex-col justify-between border-r border-border bg-surface p-card lg:flex">
      {/* Gornji deo: Logo i Navigacija */}
      <div className="flex flex-col overflow-y-auto custom-scrollbar">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="mb-10 flex items-center gap-3 text-2xl font-bold"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-button bg-primary text-black">
            L
          </span>
          LiftLog
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-button px-4 py-3 transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-surface-light hover:text-text"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile dno */}
      <div className="pt-4">
        <Link
          href="/profile"
          className="block cursor-pointer rounded-button border border-border bg-surface-light p-card transition hover:bg-surface"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-xl font-bold text-black">
              {avatar_url?.startsWith("http") ? (
                <img
                  src={avatar_url}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                avatar_url
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{username}</p>
              <p className="text-sm text-text-secondary">View profile</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}