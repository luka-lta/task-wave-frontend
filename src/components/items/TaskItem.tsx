import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CalendarIcon} from "lucide-react";
import {Task} from "@/types/Task.ts";


interface TaskItemProps {
    todo: Task;
}

function TaskItem({
                      todo,
                  }: TaskItemProps) {
    return (
        <Card key={todo.todoId}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {todo.title}
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