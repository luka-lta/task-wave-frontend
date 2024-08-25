import React, {useState} from 'react'
import {Plus, Pencil, Trash2, Loader2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {toast} from '@/components/ui/use-toast'
import DashboardHeader from "@/components/dashboard-header.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import AddCategoryDialog from "@/components/dialog/add-category.tsx";
import {Footer} from "@/components/footer.tsx";

interface Category {
    id: number
    name: string
    description?: string
    color?: string
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([
        {id: 1, name: 'Work', description: 'Work related tasks', color: '5f2eea'},
        {id: 2, name: 'Personal', description: 'Personal tasks', color: 'f0134d'},
        {id: 3, name: 'Shopping', description: 'Shopping list', color: 'f59e0b'},
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null)

    const handleAddCategory = () => {
        setIsLoading(true)
        // Simulating API call
        setTimeout(() => {
            const newCategory: Category = {
                id: Math.max(...categories.map(c => c.id), 0) + 1,
                name: newCategoryName,
            }
            setCategories([...categories, newCategory])
            setNewCategoryName('')
            setIsAddDialogOpen(false)
            setIsLoading(false)
            toast({
                title: 'Category added',
                description: `${newCategory.name} has been added to your categories.`,
            })
        }, 1000)
    }

    const handleEditCategory = () => {
        if (!editingCategory) return
        setIsLoading(true)
        // Simulating API call
        setTimeout(() => {
            const updatedCategories = categories.map(c =>
                c.id === editingCategory.id ? editingCategory : c
            )
            setCategories(updatedCategories)
            setIsEditDialogOpen(false)
            setEditingCategory(null)
            setIsLoading(false)
            toast({
                title: 'Category updated',
                description: `${editingCategory.name} has been updated.`,
            })
        }, 1000)
    }

    const handleDeleteCategory = () => {
        if (!deletingCategoryId) return
        setIsLoading(true)
        // Simulating API call
        setTimeout(() => {
            const updatedCategories = categories.filter(c => c.id !== deletingCategoryId)
            setCategories(updatedCategories)
            setIsDeleteDialogOpen(false)
            setDeletingCategoryId(null)
            setIsLoading(false)
            toast({
                title: 'Category deleted',
                description: 'The category has been deleted.',
                variant: 'destructive',
            })
        }, 1000)
    }

    return (
        <>
            <DashboardHeader title="Dashboard"/>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Categories</h1>
                <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
                    <Plus className="mr-2 h-4 w-4"/> Add Category
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <Badge style={{backgroundColor: `#${category.color}`}}>
                                        #{category.color}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setEditingCategory(category)
                                            setIsEditDialogOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4"/>
                                        <span className="sr-only">Edit {category.name}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setDeletingCategoryId(category.id)
                                            setIsDeleteDialogOpen(true)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                        <span className="sr-only">Delete {category.name}</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <AddCategoryDialog
                    isOpen={isAddDialogOpen}
                    onClose={() => setIsAddDialogOpen(false)}
                    onAddCategory={handleAddCategory}
                    isLoading={isLoading}
                />

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            Edit your category name.
                        </DialogDescription>
                        <Input
                            value={editingCategory?.name || ''}
                            onChange={e => setEditingCategory(prev => prev ? {...prev, name: e.target.value} : null)}
                            placeholder="Category name"
                        />
                        <Input
                            value={editingCategory?.description || ''}
                            onChange={e => setEditingCategory(prev => prev ? {...prev, description: e.target.value} : null)}
                            placeholder="Category description"
                        />
                        <Input
                            type={'color'}
                            value={`#${editingCategory?.color}` || ''}
                            onChange={e => {
                                const colorWithoutHash = e.target.value.replace('#', '');
                                setEditingCategory(prev => prev ? {...prev, color: colorWithoutHash} : null);
                            }}
                            placeholder="Category Color"
                        />
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditCategory} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Update Category
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the category.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteCategory} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Footer />
        </>
    )
}
