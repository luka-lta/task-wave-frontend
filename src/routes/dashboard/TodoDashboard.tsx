import React, { useState } from 'react'
import { format } from "date-fns"
import { CalendarIcon, Pencil, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import DashboardHeader from "@/components/dashboard-header"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Todo {
    id: string
    name: string
    description: string
    deadline: Date
    category: string
}

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance']

export default function TodoDashboard() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', name: 'Buy groceries', description: 'Pick up milk, eggs, and bread', deadline: new Date(), category: 'Shopping' },
        { id: '2', name: 'Clean the house', description: 'Vacuum, mop, and dust the entire house', deadline: new Date(), category: 'Personal' },
        { id: '3', name: 'Call mom', description: 'Wish her a happy birthday', deadline: new Date(), category: 'Personal' },
    ])
    const [newTodo, setNewTodo] = useState<Partial<Todo>>({})
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [todoToDelete, setTodoToDelete] = useState<string | null>(null)

    const handleCreateTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.name && newTodo.description && newTodo.deadline && newTodo.category) {
            setTodos([...todos, { ...newTodo, id: Date.now().toString() } as Todo])
            setNewTodo({})
        }
    }

    const handleEditTodo = () => {
        if (editingTodo) {
            setTodos(todos.map(todo => todo.id === editingTodo.id ? editingTodo : todo))
            setIsEditDialogOpen(false)
            setEditingTodo(null)
        }
    }

    const handleDeleteTodo = () => {
        if (todoToDelete) {
            setTodos(todos.filter(todo => todo.id !== todoToDelete))
            setIsDeleteDialogOpen(false)
            setTodoToDelete(null)
        }
    }

    const updateEditingTodo = (field: keyof Todo, value: string | Date) => {
        if (editingTodo) {
            setEditingTodo({ ...editingTodo, [field]: value })
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <DashboardHeader title='Dashboard' userAvatarUrl='https://picsum.photos/40/40'/>
            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Create New Todo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateTodo} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={newTodo.name || ''}
                                        onChange={e => setNewTodo({...newTodo, name: e.target.value})}
                                        placeholder="Enter todo name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={newTodo.description || ''}
                                        onChange={e => setNewTodo({...newTodo, description: e.target.value})}
                                        placeholder="Enter todo description"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Deadline</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !newTodo.deadline && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {newTodo.deadline ? format(newTodo.deadline, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={newTodo.deadline}
                                                onSelect={date => date && setNewTodo({...newTodo, deadline: date})}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select onValueChange={value => setNewTodo({...newTodo, category: value})}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">Create Todo</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
                    <div className="grid gap-4">
                        {todos.map(todo => (
                            <Card key={todo.id}>
                                <CardHeader>
                                    <CardTitle>{todo.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{todo.description}</p>
                                    <p className="mt-2"><strong>Deadline:</strong> {format(todo.deadline, "PPP")}</p>
                                    <p><strong>Category:</strong> {todo.category}</p>
                                </CardContent>
                                <CardFooter className="justify-end space-x-2">
                                    <Button variant="outline" onClick={() => {
                                        setEditingTodo(todo)
                                        setIsEditDialogOpen(true)
                                    }}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => {
                                        setTodoToDelete(todo.id)
                                        setIsDeleteDialogOpen(true)
                                    }}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    {editingTodo && (
                        <form onSubmit={e => { e.preventDefault(); handleEditTodo(); }} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editingTodo.name}
                                    onChange={e => updateEditingTodo('name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editingTodo.description}
                                    onChange={e => updateEditingTodo('description', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Deadline</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {format(editingTodo.deadline, "PPP")}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={editingTodo.deadline}
                                            onSelect={date => date && updateEditingTodo('deadline', date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select defaultValue={editingTodo.category} onValueChange={value => updateEditingTodo('category', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Todo</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this todo? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteTodo}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}