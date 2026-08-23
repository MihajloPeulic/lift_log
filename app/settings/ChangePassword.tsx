"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { changePassword } from "../actions/updateProfile";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function closeModal() {
    setOpen(false);
    setError("");
    setSuccessMessage("");
    setLoading(false);
  }

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccessMessage("");

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmedPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (String(newPassword).length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const res = await changePassword(currentPassword, newPassword, confirmPassword);

    if (res?.error) {
      setError(res.error);
    }

    if (res?.success) {
      setSuccessMessage(res.success);
    }

    setLoading(false);
  }

  return (
    <>
      {/* Clickable row */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer flex w-full items-center justify-between py-3 text-left hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lock className="icon-sm text-primary shrink-0" />
          <span className="text-sm sm:text-base font-bold text-text">
            Change password
          </span>
        </div>

        <span className="text-lg text-text-secondary">
          →
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="card-main w-full max-w-md shadow-2xl p-5 sm:p-6 space-y-5">
            
            {/* Header */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-text">
                Change password
              </h2>
            </div>

            {/* Forma */}
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-1.5">
                  Current password
                </label>
                <input
                  name="currentPassword"
                  type="password"
                  disabled={loading}
                  className="input-box disabled:opacity-50 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-1.5">
                  New password
                </label>
                <input
                  name="newPassword"
                  type="password"
                  disabled={loading}
                  className="input-box disabled:opacity-50 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-1.5">
                  Confirm new password
                </label>
                <input
                  name="confirmedPassword"
                  type="password"
                  disabled={loading}
                  className="input-box disabled:opacity-50 text-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* Greška / Uspjeh */}
              {error && (
                <div className="rounded-button bg-red-500/10 p-2.5 text-xs text-red-500 border border-red-500/20 font-medium">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="rounded-button bg-green-500/10 p-2.5 text-xs text-green-500 border border-green-500/20 font-medium">
                  {successMessage}
                </div>
              )}

              {/* Akcioni dugmići */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="cursor-pointer rounded-button border border-border px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-surface-light transition-colors disabled:opacity-50 text-text"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer flex items-center justify-center gap-2 rounded-button bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-black hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Save changes</span>
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}
    </>
  );
}