"use client";

import { UserRound, Mail, Loader2 } from "lucide-react";
import ChangePassword from "./ChangePassword";
import { useState, useEffect } from "react";
import { changeEmail, changeFullName } from "../actions/updateProfile";

export default function EditProfile({
  oldFullName,
  oldEmail,
}: {
  oldFullName: string;
  oldEmail: string;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"email" | "name" | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleEmailChange(email: string) {
    // Ako je polje prazno ili je isti email kao stari, nemoj raditi ništa
    if (!email || email === oldEmail) return;

    setError("");
    setSuccessMessage("");
    setLoading(true);
    setLoadingType("email");

    const res = await changeEmail(email, oldEmail);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      setLoadingType(null);
      return;
    }

    if (res?.success) {
      setSuccessMessage(res.success);
    }
    
    setLoading(false);
    setLoadingType(null);
  }

  async function handleFullNameChange(full_name: string) {
    // Ako je polje prazno ili je isto ime kao staro, nemoj raditi ništa
    if (!full_name || full_name === oldFullName) return;

    setError("");
    setSuccessMessage("");
    setLoading(true);
    setLoadingType("name");
    
    const res = await changeFullName(full_name, oldFullName);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      setLoadingType(null);
      return;
    }

    if (res?.success) {
      setSuccessMessage(res.success);
    }
    
    setLoading(false);
    setLoadingType(null);
  }

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 20000); // 20 sekundi

      // Čišćenje tajmera ako se komponenta unmountuje ili se error promijeni
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className="mt-3 rounded-card border border-border bg-surface p-4 sm:p-card">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold sm:text-2xl">Edit Profile</h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Update your account information.
        </p>
      </header>

      <div className="divide-y divide-border">
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
            placeholder={oldFullName}
            onBlur={(e) => handleFullNameChange(e.currentTarget.value)}
            disabled={loading}
            className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary sm:w-64 sm:text-right sm:text-base disabled:opacity-50 placeholder:text-text-muted"
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
            placeholder={oldEmail}
            onBlur={(e) => handleEmailChange(e.currentTarget.value)}
            disabled={loading}
            className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary sm:w-64 sm:text-right sm:text-base disabled:opacity-50 placeholder:text-text-muted"
          />
        </div>

        {/* Change Password Component */}
        <div className="py-3">
          <ChangePassword />
        </div>
      </div>

      {/* Prikaz greške ili uspjeha na dnu */}
      {(error || successMessage || loading) && (
        <div className="mt-4">
          {error && (
            <div className="rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-button bg-green-500/10 p-3 text-xs sm:text-sm text-green-500 border border-green-500/20">
              {successMessage}
            </div>
          )}

          {loading && !error && !successMessage && (
            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary py-1">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>{loadingType === "email" ? "Updating email..." : "Updating name..."}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}