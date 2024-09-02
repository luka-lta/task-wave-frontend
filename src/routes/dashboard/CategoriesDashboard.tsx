import { useCategories } from '@/hooks/useCategories';
import {useState} from "react";
import {Category} from "@/types/Category.ts";
import {Pencil, Plus, Trash2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {EditCategoryDialog} from "@/components/dialog/category/edit-category.tsx";
import {DeleteCategoryDialog} from "@/components/dialog/category/delete-category.tsx";
import DashboardHeader from "@/components/dashboard-header.tsx";
import {Footer} from "@/components/footer.tsx";
import AddCategoryDialog from "@/components/dialog/category/add-category.tsx";

export default function CategoriesPage() {
    const { categories, isLoading, addCategory, editCategory, deleteCategory } = useCategories([
        { id: 1, name: 'Work', description: 'Work related tasks', color: '5f2eea' },
        { id: 2, name: 'Personal', description: 'Personal tasks', color: 'f0134d' },
        { id: 3, name: 'Shopping', description: 'Shopping list', color: 'f59e0b' },
    ]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

    return (
        <>
            <DashboardHeader title={'Categories'} />
            <div className='container mx-auto py-10'>

                <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Category
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
                    onAddCategory={addCategory}
                    isLoading={isLoading}
                />

                {editingCategory && (
                    <EditCategoryDialog
                        isOpen={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                        category={editingCategory}
                        onEditCategory={editCategory}
                        isLoading={isLoading}
                    />
                )}

                {deletingCategoryId && (
                    <DeleteCategoryDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={() => setIsDeleteDialogOpen(false)}
                        categoryId={deletingCategoryId}
                        onDeleteCategory={deleteCategory}
                        isLoading={isLoading}
                    />
                )}

            </div>
            <Footer />
        </>
    );
}
