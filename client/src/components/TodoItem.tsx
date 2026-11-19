
import {
    CheckCircle2,
    Circle,
    Pencil,
    Trash2,
} from "lucide-react";

import type { Todo } from "../types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
};

const TodoItem = ({
    todo,
    onToggle,
    onEdit,
    onDelete,
}: TodoItemProps) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

            {/* Task Information */}
            <div className="flex min-w-0 items-start gap-4">

                {/* Completion Button */}
                <button
                    type="button"
                    onClick={() => onToggle(todo._id)}
                    className="mt-1 shrink-0 text-blue-600 transition hover:text-blue-700"
                    aria-label={todo.done ? "Mark as active" : "Mark as completed"}
                >
                    {todo.done ? (
                        <CheckCircle2 size={22} />
                    ) : (
                        <Circle size={22} />
                    )}
                </button>

                {/* Title and Description */}
                <div className="min-w-0">
                    <h3
                        className={`font-semibold ${todo.done
                                ? "text-slate-400 line-through"
                                : "text-slate-800"
                            }`}
                    >
                        {todo.title}
                    </h3>

                    {todo.description && (
                        <p className="mt-1 text-sm text-slate-500">
                            {todo.description}
                        </p>
                    )}

                    <span
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${todo.done
                                ? "bg-green-50 text-green-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                    >
                        {todo.done ? "Completed" : "Active"}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    onClick={() => onEdit(todo)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    aria-label="Edit task"
                >
                    <Pencil size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(todo._id)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete task"
                >
                    <Trash2 size={18} />
                </button>
            </div>

        </div>
    );
};

export default TodoItem;
