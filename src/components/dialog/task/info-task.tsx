import {Task} from "@/types/Task.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Edit} from "lucide-react";

interface TaskInfoDialogProps {
    task: Task,
    onClose: () => void
    isOpen: boolean
}

export default function TaskInfoDialog({ task, isOpen, onClose }: TaskInfoDialogProps) {

    const formatDate = (date?: Date) => {
        return date ? new Date(date).toLocaleString() : 'Not set'
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">ID:</span>
                        <span className="col-span-3">{task.todoId}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Owner ID:</span>
                        <span className="col-span-3">{task.ownerId}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Category:</span>
                        <Badge style={{backgroundColor: `#${task.category?.color}`}}>{task.category?.name || 'Not set'}</Badge>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Description:</span>
                        <span className="col-span-3">{task.description || 'No description'}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Deadline:</span>
                        <span className="col-span-3">{formatDate(task.deadline)}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Priority:</span>
                        <span className="col-span-3">{task.priority || 'Not set'}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Status:</span>
                        <span className="col-span-3">{task.status || 'Not set'}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Pinned:</span>
                        <span className="col-span-3">{task.pinned ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Started On:</span>
                        <span className="col-span-3">{formatDate(task.startedOn)}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Finished On:</span>
                        <span className="col-span-3">{formatDate(task.finishedOn)}</span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" className="bg-yellow-500" onClick={onClose}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}