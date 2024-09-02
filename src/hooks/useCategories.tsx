import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import {Category} from "@/types/Category.ts";

export const useCategories = (initialCategories: Category[]) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isLoading, setIsLoading] = useState(false);

    const addCategory = (name: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newCategory: Category = {
                id: Math.max(...categories.map(c => c.id), 0) + 1,
                name,
            };
            setCategories([...categories, newCategory]);
            setIsLoading(false);
            toast({
                title: 'Category added',
                description: `${newCategory.name} has been added to your categories.`,
            });
        }, 1000);
    };

    const editCategory = (updatedCategory: Category) => {
        setIsLoading(true);
        setTimeout(() => {
            setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
            setIsLoading(false);
            toast({
                title: 'Category updated',
                description: `${updatedCategory.name} has been updated.`,
            });
        }, 1000);
    };

    const deleteCategory = (categoryId: number) => {
        setIsLoading(true);
        setTimeout(() => {
            setCategories(categories.filter(c => c.id !== categoryId));
            setIsLoading(false);
            toast({
                title: 'Category deleted',
                description: 'The category has been deleted.',
                variant: 'destructive',
            });
        }, 1000);
    };

    return {
        categories,
        isLoading,
        addCategory,
        editCategory,
        deleteCategory,
    };
};
