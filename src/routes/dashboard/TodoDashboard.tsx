"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { CalendarIcon, PencilIcon, PinIcon, PlusIcon, TrashIcon } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header.tsx";
import {Footer} from "@/components/footer.tsx";
import TaskItem from "@/components/items/TaskItem.tsx";

type Priority = "Low" | "Medium" | "High"
type Status = "Not Started" | "In Progress" | "Completed"

interface Todo {
    id: number
    title: string
    description: string
    priority: Priority
    status: Status
    pinned: boolean
    deadline: string
}

export default function TodoDashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<Priority>("Medium")
    const [status, setStatus] = useState<Status>("Not Started")
    const [pinned, setPinned] = useState(false)
    const [deadline, setDeadline] = useState("")

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setPriority("Medium")
        setStatus("Not Started")
        setPinned(false)
        setDeadline("")
        setEditingTodo(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingTodo) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingTodo.id
                        ? { ...todo, title, description, priority, status, pinned, deadline }
                        : todo
                )
            )
        } else {
            const newTodo: Todo = {
                id: Date.now(),
                title,
                description,
                priority,
                status,
                pinned,
                deadline,
            }
            setTodos([...todos, newTodo])
        }
        resetForm()
        setIsDialogOpen(false)
    }

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo)
        setTitle(todo.title)
        setDescription(todo.description)
        setPriority(todo.priority)
        setStatus(todo.status)
        setPinned(todo.pinned)
        setDeadline(todo.deadline)
        setIsDialogOpen(true)
    }

    const handleDelete = (todo: Todo) => {
        setTodoToDelete(todo)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (todoToDelete) {
            setTodos(todos.filter((todo) => todo.id !== todoToDelete.id))
            setIsDeleteDialogOpen(false)
            setTodoToDelete(null)
        }
    }

    const handleTogglePin = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, pinned: !todo.pinned } : todo)))
    }

    return (
        <>
            <DashboardHeader title={'Tasks'} />
            <div className="container mx-auto p-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New ToDo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingTodo ? "Edit ToDo" : "Add New ToDo"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={status} onValueChange={(value: Status) => setStatus(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center space-x-2">
                                <Switch id="pinned" checked={pinned} onCheckedChange={setPinned} />
                                <Label htmlFor="pinned">Pinned</Label>
                            </div>
                            <Input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                            <DialogFooter>
                                <Button type="submit">{editingTodo ? "Update" : "Add"} ToDo</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <div className="space-y-4">
                    {todos
                        .sort((a, b) => (b.pinned ? 1 : -1))
                        .map((todo) => (
                            <div>
                                <TaskItem
                                    todo={todo}
                                    handleTogglePin={handleTogglePin}
                                />

                                <CardFooter className="flex justify-end space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEdit(todo)}>
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(todo)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete this ToDo?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the ToDo.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </>
    )
}