"use client"

import { useState, useRef } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useFormStatus } from "react-dom";

type DeleteButtonProps  = {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
};

export function DeleteButton({
  children,
  className,
  pendingText = "Submitting...",
  formAction,
}: DeleteButtonProps ) {

  const [open, setOpen] = useState(false);
  const deleteRef = useRef<HTMLButtonElement>(null);

  const { pending } = useFormStatus();
    
  return (
    <>
        <button
          onClick={() => setOpen(true)}
          type="button"
          disabled={pending}
          className={className}
        >
          {pending ? pendingText : children}
        </button>

        {/* Pravo submit dugme */}
        <button
            ref={deleteRef}
            hidden
            type="submit"
            formAction={formAction}
        />

        <ConfirmDialog
            open={open}
            title="Delete meal item?"
            description="Are you sure you want to delete this item? This action cannot be undone."
            onCancel={() => setOpen(false)}
            onConfirm={() => {
                setOpen(false);
                deleteRef.current?.click();
            }}
        />
    </>
  );
}