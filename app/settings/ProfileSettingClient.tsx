"use client";

import { useRef } from "react";
import { UserRound, Mail } from "lucide-react";
import ChangePassword from "./ChangePassword";
import { changeUserInfo } from "@/app/actions/auth";

export default function EditProfile({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mt-3 rounded-card border border-border bg-surface p-4 sm:p-card">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold sm:text-2xl">Edit Profile</h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Update your account information.
        </p>
      </header>

      {/* Promenjeno u divide-border da bi pratilo tvoje sistemske boje */}
      <form ref={formRef} action={changeUserInfo} className="divide-y divide-border">
        
        <input hidden name="oldName" value={fullName} />
        <input hidden name="oldEmail" value={email} />

        {/* Full name */}
        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 shrink-0 text-primary" />
            <label className="whitespace-nowrap text-sm font-medium">
              Full name
            </label>
          </div>

          <input
            name="fullName"
            placeholder={fullName}
            className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary sm:w-64 sm:text-right sm:text-base"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <label className="whitespace-nowrap text-sm font-medium">
              Email
            </label>
          </div>

          <input
            type="email"
            name="email"
            placeholder={email}
            className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary sm:w-64 sm:text-right sm:text-base"
          />
        </div>

        {/* Change Password Component */}
        <div className="py-3 sm:py-4">
          <ChangePassword />
        </div>

        {/* Submit Button (Prikazan, full width, responzivan) */}
        <div className="pt-5 sm:pt-6">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-button bg-primary py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-hover sm:py-3 sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}