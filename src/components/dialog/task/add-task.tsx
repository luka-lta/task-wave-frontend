import React, { useState } from 'react'
import {AlertCircle, Battery, CheckCircle, Loader2} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {Textarea} from "@/components/ui/textarea.tsx";

interface AddTaskDialogProps {
    isOpen: boolean
    onClose: () => void
    onAddTask: (
        title: string,
        description: string,
        deadline: string,
        priority: string,
        status: string,
        pinned: boolean,
    ) => void
    isLoading: boolean
}

export default function AddTaskDialog({
                                          isOpen,
                                          onClose,
                                          onAddTask,
                                          isLoading,
                                      }: AddTaskDialogProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: new Date().toISOString().split('T')[0],
        priority: 'NO-PRIORITY',
        status: 'ToDo',
        pinned: false,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> |
            { target: { id: string; value: string } }
    ) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (id: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, pinned: checked }))
    }

    const handleAddTask = () => {
        const { title, description, deadline, priority, status, pinned } = formData
        if (!title.trim()) {
            alert('Title is required')
            return
        }
        onAddTask(title, description, deadline, priority, status, pinned)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Create a new task with details. Fill out the information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Task title"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Task description"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline
                        </Label>
                        <Input
                            id="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select
                            value={formData.priority}
                            onValueChange={handleSelectChange('priority')}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NO-PRIORITY">No priority</SelectItem>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select
                            value={formData.status}
                            onValueChange={handleSelectChange('status')}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ToDo">
                                    <div className="flex items-center">
                                        <AlertCircle className="text-yellow-500 mr-2" style={{ fontSize: '1.25em' }} />
                                        To Do
                                    </div>
                                </SelectItem>
                                <SelectItem value="In progress">
                                    <div className="flex items-center">
                                        <Battery className="text-blue-500 mr-2" style={{ fontSize: '1.25em' }} />
                                        In Progress
                                    </div>
                                </SelectItem>

                                <SelectItem value="Finished">
                                    <div className="flex items-center">
                                        <CheckCircle className="text-green-500 mr-2" style={{ fontSize: '1.25em' }} />
                                        Finished
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="pinned"
                            checked={formData.pinned}
                            onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="pinned">Pinned</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Add Task
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}