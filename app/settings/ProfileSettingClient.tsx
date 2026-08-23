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
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className="card-main">
      
      {/* Header */}
      <header>
        <h1 className="text-h1">Edit Profile</h1>
        <p className="text-caption mt-1">
          Update your account information.
        </p>
      </header>

      <div className="mt-5 divide-y divide-border border-t border-border">
        
        {/* Full name */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
          <div className="flex items-center gap-2">
            <UserRound className="icon-sm text-primary shrink-0" />
            <label className="text-sm sm:text-base font-bold text-text">
              Full name
            </label>
          </div>

          <input
            name="fullName"
            placeholder={oldFullName}
            onBlur={(e) => handleFullNameChange(e.currentTarget.value)}
            disabled={loading}
            className="input-box w-full sm:w-64 text-left disabled:opacity-50 placeholder:text-text-muted"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
          <div className="flex items-center gap-2">
            <Mail className="icon-sm text-primary shrink-0" />
            <label className="text-sm sm:text-base font-bold text-text">
              Email
            </label>
          </div>

          <input
            type="email"
            name="email"
            placeholder={oldEmail}
            onBlur={(e) => handleEmailChange(e.currentTarget.value)}
            disabled={loading}
            className="input-box w-full sm:w-64 text-left disabled:opacity-50 placeholder:text-text-muted"
          />
        </div>

        {/* Change Password Component */}
        <div className="pt-2">
          <ChangePassword />
        </div>

      </div>

      {/* Prikaz greške, uspjeha ili loading stanja na dnu */}
      {(error || successMessage || loading) && (
        <div className="mt-5">
          {error && (
            <div className="rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20 font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-button bg-green-500/10 p-3 text-xs sm:text-sm text-green-500 border border-green-500/20 font-medium">
              {successMessage}
            </div>
          )}

          {loading && !error && !successMessage && (
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-text-secondary py-1 font-medium">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>{loadingType === "email" ? "Updating email..." : "Updating name..."}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}