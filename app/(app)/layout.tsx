import Sidebar from "@/components/Sidebar_desktop";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { getCurrentUserWithProfile } from "../lib/data/user";
import { redirect } from 'next/navigation';
import MobileNav from "@/components/MobileNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCurrentUserWithProfile();

  if (!data) {
    redirect("/login");
  }

  const { user, profile } = data;
    
  let avatar_url = profile?.avatar_url;

  if (!avatar_url) {
    avatar_url = profile?.full_name?.trim().split(/\s+/)
      .map((part: string) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="min-h-screen w-full text-text">
      {/* lg:pl-72 pomera radni prostor tačno desno od fiksnog Sidebara (w-72 / 288px) */}
      <div className="flex min-h-screen w-full lg:pl-72">
        <Sidebar 
          username={user?.user_metadata.full_name}
          avatar_url={avatar_url}
        />

        {/* main sada sa mx-auto precizno centrira sadržaj u preostalom delu ekrana */}
        <main className="mx-auto w-full max-w-6xl min-w-0 p-5 pb-28 lg:p-8 lg:pb-8">
          {children}
        </main>

        <MobileNav></MobileNav>

      </div>
    </div>
  );
}