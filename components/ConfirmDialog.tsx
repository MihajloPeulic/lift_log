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
        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
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
                shadow-xl
                "
            >

                <h2 className="text-xl font-bold">
                    {title}
                </h2>


                <p className="mt-3 text-text-secondary">
                    {description}
                </p>



                <div className="mt-6 flex gap-3">


                    <button
                        onClick={onCancel}
                        className="
                        flex-1
                        rounded-button
                        border
                        border-border
                        py-3
                        font-bold
                        hover:bg-background
                        cursor-pointer
                        "
                    >
                        Cancel
                    </button>



                    <button
                        formAction={formAction}
                        type="submit"
                        onClick={onConfirm}
                        className="
                        flex-1
                        rounded-button
                        bg-red-500
                        py-3
                        font-bold
                        text-white
                        hover:bg-red-600
                        cursor-pointer
                        "
                    >
                        Delete
                    </button>


                </div>


            </div>

        </div>
    );
}