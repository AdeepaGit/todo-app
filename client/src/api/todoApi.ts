import axios from "axios";
import type { Todo } from "../types/todo";

const API = axios.create({
    baseURL: "http://localhost:5000/api/todos",
    headers: {
        "Content-Type": "application/json",
    },
});

// Get all TODOs
export const getTodos = async (): Promise<Todo[]> => {
    const response = await API.get<Todo[]>("/");
    return response.data;
};

// Create a TODO
export const createTodo = async (todo: {
    title: string;
    description?: string;
}): Promise<Todo> => {
    const response = await API.post<Todo>("/", todo);
    return response.data;
};

// Update a TODO
export const updateTodo = async (
    id: string,
    todo: { title: string; description?: string }
): Promise<Todo> => {
    const response = await API.put<Todo>(`/${id}`, todo);
    return response.data;
};

// Toggle TODO completion
export const toggleTodo = async (id: string): Promise<Todo> => {
    const response = await API.patch<Todo>(`/${id}/done`);
    return response.data;
};

// Delete a TODO
export const deleteTodo = async (id: string): Promise<void> => {
    await API.delete(`/${id}`);
};