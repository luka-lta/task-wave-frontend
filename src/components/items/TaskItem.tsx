import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Task} from "@/types/Task.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {CalendarIcon, PinIcon} from "lucide-react";


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
                    {todo.pinned && <PinIcon className="ml-2 h-4" />}
                </CardTitle>
                <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-sm">
                    <Badge>Priority: {todo.priority}</Badge>
                    <Badge>Status: {todo.status}</Badge>
                    <Badge
                        style={{backgroundColor: `${todo.category?.color ? `#${todo.category.color}` : 'black'}`}}
                    >
                        Category: {todo.category?.name || 'no category'}
                    </Badge>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    Deadline: {todo.deadline}
                </div>
            </CardContent>

        </Card>
    );
}

export default TaskItem;