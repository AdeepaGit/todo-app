
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Todo } from "../types/todo";

type TodoFormProps = {
    editingTodo: Todo | null;
    onSubmit: (data: {
        title: string;
        description: string;
    }) => void;
    onCancel: () => void;
};

const TodoForm = ({
    editingTodo,
    onSubmit,
    onCancel,
}: TodoFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
        } else {
            setTitle("");
            setDescription("");
        }

        setTitleError("");
    }, [editingTodo]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title.trim()) {
            setTitleError("Task title is required.");
            return;
        }

        setTitleError("");

        onSubmit({
            title: title.trim(),
            description: description.trim(),
        });
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);

        if (value.trim()) {
            setTitleError("");
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                    {editingTodo ? "Edit Task" : "Create New Task"}
                </h3>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close form"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Task Title *
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) => handleTitleChange(event.target.value)}
                        placeholder="Enter task title"
                        required
                        aria-invalid={!!titleError}
                        aria-describedby={titleError ? "title-error" : undefined}
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${titleError
                                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                    />

                    {titleError && (
                        <p
                            id="title-error"
                            className="mt-1 text-sm text-red-600"
                        >
                            {titleError}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Enter task description (optional)"
                        rows={3}
                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        {editingTodo ? "Update Task" : "Create Task"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default TodoForm;
