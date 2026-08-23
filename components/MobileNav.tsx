"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Utensils, 
  User 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nutrition", href: "/nutrition", icon: Utensils },
  { name: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 pb-safe backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 px-2 py-2 text-center text-[10px] font-semibold sm:text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 rounded-button py-2 transition-colors ${
                isActive
                  ? "text-primary font-bold"
                  : "text-text-secondary hover:text-text hover:bg-surface-light/50"
              }`}
            >
              <Icon 
                className="h-5 w-5 sm:h-6 sm:w-6" 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}