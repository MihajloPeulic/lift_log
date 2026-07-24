"use client"

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
};

export function SubmitButton({
  children,
  className,
  pendingText = "Submitting...",
  formAction,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      formAction={formAction}
      type="submit"
      disabled={pending}
      className={className}
    >
      {pending ? pendingText : children}
    </button>
  );
}