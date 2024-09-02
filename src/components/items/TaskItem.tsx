import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon, PencilIcon, PinIcon, TrashIcon} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

type Priority = "Low" | "Medium" | "High"
type Status = "Not Started" | "In Progress" | "Completed"

interface Task {
    id: number
    title: string
    description: string
    priority: Priority
    status: Status
    pinned: boolean
    deadline: string
}

interface TaskItemProps {
    todo: Task;
    handleTogglePin: (id: number) => void;
}

function TaskItem({
                      todo,
                      handleTogglePin,
                  }: TaskItemProps) {
    return (
        <Card key={todo.id}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {todo.title}
                    <Button variant="ghost" size="icon" onClick={() => handleTogglePin(todo.id)}>
                        <PinIcon className={todo.pinned ? "text-primary" : "text-muted-foreground"} />
                    </Button>
                </CardTitle>
                <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-sm">
                    <span>Priority: {todo.priority}</span>
                    <span>Status: {todo.status}</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Deadline: {todo.deadline}
                </div>
            </CardContent>

        </Card>
    );
}

export default TaskItem;