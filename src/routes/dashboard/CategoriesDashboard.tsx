import { useCategories } from '@/hooks/useCategories';
import {useState} from "react";
import {Category} from "@/types/Category.ts";
import {Loader2, Plus} from "lucide-react";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EditCategoryDialog} from "@/components/dialog/category/edit-category.tsx";
import {DeleteCategoryDialog} from "@/components/dialog/category/delete-category.tsx";
import DashboardHeader from "@/components/dashboard-header.tsx";
import {Footer} from "@/components/footer.tsx";
import AddCategoryDialog from "@/components/dialog/category/add-category.tsx";
import CategoryItem from "@/components/items/CategoryItem.tsx";

export default function CategoriesPage() {
    const { categories, isLoading, addCategory, editCategory, deleteCategory } = useCategories([]);

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
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
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
                                <CategoryItem
                                    category={category}
                                    key={category.categoryId}
                                    setEditingCategory={setEditingCategory}
                                    setIsEditDialogOpen={setIsEditDialogOpen}
                                    setDeletingCategoryId={setDeletingCategoryId}
                                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}

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
