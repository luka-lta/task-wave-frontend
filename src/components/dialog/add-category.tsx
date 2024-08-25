import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
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

interface AddCategoryDialogProps {
    isOpen: boolean
    onClose: () => void
    onAddCategory: (name: string, description: string, color: string) => void
    isLoading: boolean
}

export default function AddCategoryDialog({ isOpen, onClose, onAddCategory, isLoading }: AddCategoryDialogProps) {
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryDescription, setNewCategoryDescription] = useState('')
    const [newCategoryColor, setNewCategoryColor] = useState('000000')

    const handleAddCategory = () => {
        onAddCategory(newCategoryName, newCategoryDescription, newCategoryColor)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to organize your tasks.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Category name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                            placeholder="Category description"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="color" className="text-right">
                            Color
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Input
                                id="color"
                                type="color"
                                value={`#${newCategoryColor}`}
                                onChange={(e) => {
                                    const colorWithoutHash = e.target.value.replace('#', '')
                                    setNewCategoryColor(colorWithoutHash)
                                }}
                                className="h-10 w-10 p-0 border-none"
                            />
                            <Input
                                value={`#${newCategoryColor}`}
                                onChange={(e) => {
                                    const colorWithoutHash = e.target.value.replace('#', '')
                                    setNewCategoryColor(colorWithoutHash)
                                }}
                                placeholder="#000000"
                                className="flex-grow"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddCategory} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}