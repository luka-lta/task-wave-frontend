import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import {useAuth} from "@/context/auth-context.tsx";
import {Category} from "@/types/Category.ts";

export const useCategories = (initialCategories: Category[]) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {user} = useAuth();

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost/api/v1/category/all', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.categories);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories().catch((err) => setError(err.message));
    }, []);

    const addCategory = async (name: string, description: string, color: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/category/create/${user.sub}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name, description, color }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            toast({
                title: 'Category added',
                description: `${name} has been added to your categories.`,
            });

            fetchCategories();
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error adding the category.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const editCategory = async (updatedCategory: Category) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/category/edit/${updatedCategory.categoryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedCategory),
            });
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            setCategories((prev) =>
                prev.map((category) => (category.categoryId === updatedCategory.categoryId ? updatedCategory : category))
            );
            toast({
                title: 'Category updated',
                description: `${updatedCategory.name} has been updated.`,
            });
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error updating the category.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (categoryId: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost/api/v1/category/delete/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            setCategories((prev) => prev.filter((category) => category.categoryId !== categoryId));
            toast({
                title: 'Category deleted',
                description: 'The category has been deleted.',
                variant: 'destructive',
            });
        } catch (err) {
            setError(err.message);
            toast({
                title: 'Error',
                description: 'There was an error deleting the category.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        categories,
        isLoading,
        error,
        addCategory,
        editCategory,
        deleteCategory,
    };
};
