"use client";

import { useState } from "react";
import { Lock, ArrowLeft, X } from "lucide-react";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function closeModal() {
    setOpen(false);
    setStep(1);
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleNext() {
    if (!oldPassword) return;

    setStep(2);
  }

  function handleSave() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ovdje ide server action / supabase update password

    closeModal();
  }

  return (
    <>
      {/* Clickable row */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
            cursor-pointer
            flex
            w-full
            items-center
            justify-between
            py-3
            text-left
            hover:text-primary
        "
        >
  <div className="flex items-center gap-2">
    <Lock className="h-4 w-4 text-primary" />

    <span className="text-sm font-medium">
      Change password
    </span>
  </div>



    <span className="text-lg">
      →
    </span>
  

</button>


      {/* Modal */}
      {open && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-card
              border
              border-border
              bg-surface
              p-6
            "
          >

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Change password
              </h2>

              <button onClick={closeModal}>
                <X className="h-5 w-5" />
              </button>
            </div>


            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">

                <div>
                  <label className="text-sm font-medium">
                    Current password
                  </label>

                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) =>
                      setOldPassword(e.target.value)
                    }
                    className="
                      mt-2
                      w-full
                      rounded-button
                      border
                      border-border
                      bg-background
                      px-3
                      py-2
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>


                <div className="flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={closeModal}
                    className="
                      rounded-button
                      border
                      border-border
                      px-4
                      py-2
                      cursor-pointer
                    "
                  >
                    Cancel
                  </button>


                  <button
                    onClick={handleNext}
                    type="button"
                    className="
                      rounded-button
                      bg-primary
                      px-4
                      py-2
                      text-black
                      cursor-pointer
                    "
                  >
                    Next
                  </button>

                </div>

              </div>
            )}


            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">

                <div>
                  <label className="text-sm font-medium">
                    New password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="
                      mt-2
                      w-full
                      rounded-button
                      border
                      border-border
                      bg-background
                      px-3
                      py-2
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="
                      mt-2
                      w-full
                      rounded-button
                      border
                      border-border
                      bg-background
                      px-3
                      py-2
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>


                <div className="flex justify-end gap-3">

                  <button
                    onClick={closeModal}
                    type="button"
                    className="
                        cursor-pointer
                      rounded-button
                      border
                      border-border
                      px-4
                      py-2
                    "
                  >
                    Cancel
                  </button>


                  <button
                    onClick={handleSave}
                    type="button"
                    className="
                        cursor-pointer
                      rounded-button
                      bg-primary
                      px-4
                      py-2
                      text-black
                    "
                  >
                    Save
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </>
  );
}