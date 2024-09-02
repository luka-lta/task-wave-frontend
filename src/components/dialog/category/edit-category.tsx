import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog.tsx';
import {Loader2} from 'lucide-react';
import React, {useEffect, useState} from "react";
import {Category} from "@/types/Category.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";

interface EditCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
    onEditCategory: (category: Category) => void;
    isLoading: boolean;
}

export const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          category,
                                                                          onEditCategory,
                                                                          isLoading
                                                                      }) => {
    const [categoryData, setCategoryData] = useState<Category>(category || {
        categoryId: 0,
        name: '',
        description: '',
        color: '',
    });

    useEffect(() => {
        if (category) {
            setCategoryData(category);
        }
    }, [category]);

    const handleSave = () => {
        onEditCategory(categoryData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Update the details of the category.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={categoryData.name}
                            onChange={(e) => setCategoryData({...categoryData, name: e.target.value})}
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
                            value={categoryData.description || ''}
                            onChange={(e) => setCategoryData({...categoryData, description: e.target.value})}
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
                                value={`#${categoryData.color}`}
                                onChange={(e) => setCategoryData({
                                    ...categoryData,
                                    color: e.target.value.replace('#', '')
                                })}
                                placeholder="Category color"
                                className="h-10 w-10 p-0 border-none"
                            />
                            <Input
                                value={`#${categoryData.color}`}
                                onChange={(e) => setCategoryData({
                                    ...categoryData,
                                    color: e.target.value.replace('#', '')
                                })}
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
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
