import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog.tsx';
import { Loader2 } from 'lucide-react';
import React from "react";

interface DeleteCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: number | null;
    onDeleteCategory: (categoryId: number) => void;
    isLoading: boolean;
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({ isOpen, onClose, categoryId, onDeleteCategory, isLoading }) => {
    const handleDelete = () => {
        if (categoryId) {
            onDeleteCategory(categoryId);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
