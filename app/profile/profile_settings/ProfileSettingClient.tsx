"use client";

import Link from "next/link";
import { ArrowLeft, UserRound, Mail, Lock } from "lucide-react";
import ChangePassword from "./ChangePassword";
import { useRef } from "react";
import { changeUserInfo } from "@/app/actions/auth";

export default function EditProfile({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {

    const formRef = useRef<HTMLFormElement>(null);

    function handleSave() {
        formRef.current?.requestSubmit();
    }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-2xl px-2">

        <Link
          href="/profile"
          className="mb-6 flex items-center gap-2 text-text-primary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Profile</span>
        </Link>

        <div className="rounded-card border border-border bg-surface p-6">

          <header className="mb-8">
            <h2 className="text-2xl font-bold">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Update your account information.
            </p>
          </header>

          <form ref={formRef} action={changeUserInfo} className="divide-y divide-white/10">
            
            <input
                hidden
                name="oldName"
                value={fullName}
            />

            <input
                hidden
                name="oldEmail"
                value={email}
            />

            {/* Full name */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Full name
                </label>
              </div>

              <input
                name="fullName"
                placeholder={fullName}
                className="
                  w-64
                  rounded-button
                  border
                  border-border
                  bg-background
                  px-3
                  py-2
                  text-right
                  outline-none
                  focus:border-primary
                "
              />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Email
                </label>
              </div>

              <input
                type="email"
                name="email"
                placeholder={email}
                className="
                  w-64
                  rounded-button
                  border
                  border-border
                  bg-background
                  px-3
                  py-2
                  text-right
                  outline-none
                  focus:border-primary
                "
              />
            </div>

            <ChangePassword></ChangePassword>

            <button
              type="submit"
              hidden
              className="
                mt-6
                w-full
                rounded-button
                bg-primary
                py-3
                font-semibold
                text-black
                hover:bg-primary-hover
              "
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}