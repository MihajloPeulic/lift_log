"use client"

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

    <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-border bg-surface p-card lg:flex">


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
              className={`
                block rounded-button px-4 py-3 transition
                ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-surface-light hover:text-text"
                }
              `}
            >

              {item.name}

            </Link>

          );

        })}

      </nav>








      {/* Profile */}

      <Link
        href="/profile"
        className="mt-auto cursor-pointer rounded-button border border-border bg-surface-light p-card transition hover:bg-surface"
      >

        <div className="flex items-center gap-3">


          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary text-xl font-bold text-black">
              {
                avatar_url?.startsWith("http")
                  ? (
                    <img
                      src={avatar_url}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  )
                  : avatar_url
              }
          </div>
          <div>

            <p className="font-semibold">
              {username}
            </p>

            <p className="text-sm text-text-secondary">
              View profile
            </p>

          </div>


        </div>

      </Link>


    </aside>

  );
}