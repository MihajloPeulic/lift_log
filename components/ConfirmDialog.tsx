"use client";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    onCancel: () => void;
    formAction?: (formData: FormData) => void | Promise<void>;
    onConfirm: () => void;
};

export function ConfirmDialog({
    open,
    title,
    description,
    onCancel,
    onConfirm,
    formAction
}: ConfirmDialogProps) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="card-main w-full max-w-md shadow-2xl p-5 sm:p-6 space-y-4">
                
                <h2 className="text-h1">
                    {title}
                </h2>

                <p className="text-caption leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
                    <button
                        onClick={onCancel}
                        type="button"
                        className="cursor-pointer rounded-button border border-border px-4 py-2.5 text-sm font-semibold hover:bg-surface-light transition-colors text-text"
                    >
                        Cancel
                    </button>

                    <button
                        formAction={formAction}
                        type="submit"
                        onClick={onConfirm}
                        className="cursor-pointer rounded-button bg-red-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}