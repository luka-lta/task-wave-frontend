import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import {useAuth} from "@/context/auth-context.tsx";
import {Task} from "@/types/Task.ts";

export const useTasks = (initialTasks: Task[]) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost/api/v1/task/all', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data.tasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks().catch((err) => setError(err.message));
    }, []);

    const addTask = async (
        title: string,
        description: string,
        deadline: string,
        priority: string,
        status: string,
        pinned: boolean,
    ) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    status,
                    pinned,
                    deadline,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            toast({
                title: 'Task added',
                description: `${title} has been added to your tasks.`,
            });

            fetchTasks();
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error adding the task.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const editTask = async (updatedTasks: Task) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/task/edit/${updatedTasks.todoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedTasks),
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            setTasks((prev) =>
                prev.map((task) => (task.todoId === updatedTasks.todoId ? updatedTasks : task))
            );
            toast({
                title: 'Task updated',
                description: `${updatedTasks.title} has been updated.`,
            });
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error updating the task.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (taskId: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/task/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setTasks((prev) => prev.filter((task) => task.todoId !== taskId));
            toast({
                title: 'task deleted',
                description: 'The task has been deleted.',
                variant: 'destructive',
            });
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error deleting the task.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        tasks,
        isLoading,
        error,
        addTask,
        editTask,
        deleteTask,
    };
};
