import Sidebar from "@/components/Sidebar_desktop";
import {createServerSupabaseClient} from "@/utils/supabase/server"
import { getCurrentUserWithProfile  } from "../lib/data/user";
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCurrentUserWithProfile();

  if(!data){
      redirect("/login");
  }

  const {user, profile} = data;
    
  let avatar_url = profile?.avatar_url;

  if (!avatar_url) {
    avatar_url = profile?.full_name?.slice(0, 2).toUpperCase();
  }

    if(!avatar_url){
      avatar_url = user?.user_metadata.username?.charAt(0).toUpperCase();
    }


  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex min-h-screen">
        <Sidebar 
          username={user?.user_metadata.username}
          avatar_url={avatar_url}
        />

        <main className="mx-auto flex-1 max-w-6xl p-5 pb-28 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      
    </div>
  );
}